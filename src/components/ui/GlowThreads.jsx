import { useEffect, useRef } from 'react';

const VERT = `
  attribute vec2 aPos;
  void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`;

const FRAG = `
  precision highp float;

  uniform vec2  uRes;
  uniform float uTime;
  uniform float uSpeed;
  uniform float uCount;
  uniform vec3  uColA;
  uniform vec3  uColB;
  uniform vec3  uColC;
  uniform vec3  uBg;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  // three-stop thread palette, white-hot in the middle
  vec3 ramp(float t) {
    vec3 c = mix(uColA, uColB, smoothstep(0.0, 0.55, t));
    return mix(c, uColC, smoothstep(0.5, 1.0, t));
  }

  // one fan of threads inside its own bending frame
  vec3 fan(vec2 uv, float baseAngle, float curl, float freq,
           float phase, float strength, float t) {
    float r = length(uv);
    float ang = baseAngle + curl * r;          // bend with distance
    float ca = cos(ang), sa = sin(ang);
    vec2 p = mat2(ca, -sa, sa, ca) * uv;

    float breathe = 0.20 + 0.13 * sin(t * 0.23 + phase);  // swell & pinch

    vec3 acc = vec3(0.0);
    for (int i = 0; i < 16; i++) {
      if (float(i) >= uCount) break;
      float fi = float(i);
      float k  = fi / max(uCount - 1.0, 1.0);

      float y = sin(p.x * freq + phase + fi * 0.4 + t * 0.32)
                * breathe * (0.55 + 0.9 * k)
                + (k - 0.5) * 0.14;

      float d = abs(p.y - y);
      // hot exponential core wrapped in a soft reciprocal halo
      float glow = exp(-d * 80.0) * 0.6 + 0.012 / (d + 0.012);
      acc += ramp(k) * glow;
    }
    return acc * strength;
  }

  void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;
    float t = uTime * uSpeed;

    vec3 col = vec3(0.0);
    col += fan(uv,                      -0.45,  0.38, 1.8, 1.7, 0.080, t);
    col += fan(uv,                       0.28, -0.52, 1.4, 4.3, 0.055, t);
    col += fan(uv + vec2(0.16, 0.30),   -0.90,  0.22, 2.2, 9.1, 0.032, t);

    col = 1.0 - exp(-col * 1.5);             // gentle filmic roll-off

    float g = hash(gl_FragCoord.xy + fract(uTime) * vec2(113.0, 271.0));
    col *= 0.94 + 0.12 * g;                  // luminance grain
    col += (g - 0.5) * 0.018;                // dither

    gl_FragColor = vec4(uBg + col, 1.0);
  }
`;

function hex(h) {
  const n = parseInt(h.slice(1), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

export function GlowThreads({
  colors = ['#e86bd8', '#f5f0fa', '#8b5bd6'],
  background = '#0f1013',
  speed = 1.0,
  count = 9,
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', { antialias: false, alpha: false });
    if (!gl) {
      if (canvas.parentElement) {
        canvas.parentElement.style.background =
          'radial-gradient(120% 90% at 30% 20%, #2a1440 0%, #0f1013 60%)';
      }
      return;
    }

    function compile(type, src) {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(s));
      }
      return s;
    }

    const vertShader = compile(gl.VERTEX_SHADER, VERT);
    const fragShader = compile(gl.FRAGMENT_SHADER, FRAG);
    const prog = gl.createProgram();
    gl.attachShader(prog, vertShader);
    gl.attachShader(prog, fragShader);
    gl.linkProgram(prog);

    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(prog));
      return;
    }

    gl.useProgram(prog);

    // Fullscreen triangle
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW
    );
    const aPos = gl.getAttribLocation(prog, 'aPos');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const U = {};
    for (const name of [
      'uRes',
      'uTime',
      'uSpeed',
      'uCount',
      'uColA',
      'uColB',
      'uColC',
      'uBg',
    ]) {
      U[name] = gl.getUniformLocation(prog, name);
    }

    let isMobile = window.innerWidth < 768;

    function updateSize() {
      isMobile = window.innerWidth < 768;
      // Mobile optimizations: DPR 1 to prevent rendering millions of pixels per frame
      const maxDpr = isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.floor(canvas.clientWidth * maxDpr);
      const h = Math.floor(canvas.clientHeight * maxDpr);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    }

    const resizeObserver = new ResizeObserver(() => {
      updateSize();
    });
    resizeObserver.observe(canvas);

    window.addEventListener('resize', updateSize);
    updateSize();

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    let lastTime = performance.now();
    let accumulatedTime = 0;
    let animId;

    function frame(now) {
      if (document.hidden) return;

      const delta = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      if (!reduceMotion) {
        accumulatedTime += delta;
      }
      const t = reduceMotion ? 0 : accumulatedTime;

      // Responsive settings: 5 threads and 0.6x speed on mobile for performance
      const effectiveCount = isMobile ? Math.min(count, 5) : count;
      const effectiveSpeed = isMobile ? speed * 0.6 : speed;

      gl.uniform2f(U.uRes, canvas.width, canvas.height);
      gl.uniform1f(U.uTime, t);
      gl.uniform1f(U.uSpeed, effectiveSpeed);
      gl.uniform1f(U.uCount, effectiveCount);
      gl.uniform3fv(U.uColA, hex(colors[0]));
      gl.uniform3fv(U.uColB, hex(colors[1]));
      gl.uniform3fv(U.uColC, hex(colors[2]));
      gl.uniform3fv(U.uBg, hex(background));

      gl.drawArrays(gl.TRIANGLES, 0, 3);

      if (!reduceMotion && !document.hidden) {
        animId = requestAnimationFrame(frame);
      }
    }

    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (animId) cancelAnimationFrame(animId);
      } else {
        lastTime = performance.now();
        if (!reduceMotion) {
          animId = requestAnimationFrame(frame);
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    if (!document.hidden) {
      animId = requestAnimationFrame(frame);
    }

    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateSize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (gl) {
        gl.deleteProgram(prog);
        gl.deleteShader(vertShader);
        gl.deleteShader(fragShader);
        gl.deleteBuffer(buf);
      }
    };
  }, [colors, background, speed, count]);

  return (
    <canvas
      ref={canvasRef}
      id="threads"
      className="fixed inset-0 w-full h-full pointer-events-none z-0 block"
      style={{ background }}
    />
  );
}
