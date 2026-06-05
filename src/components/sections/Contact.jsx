import { useState } from 'react';
import { ChevronRight, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { Reveal } from '../ui/Reveal';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase';

export function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Enter a valid email';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('submitting');
    try {
      if (db) {
        await addDoc(collection(db, 'contact_submissions'), {
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
          createdAt: serverTimestamp(),
        });
      }
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-32 bg-transparent">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <Reveal>
          <h3 className="text-6xl md:text-7xl font-bold tracking-tighter text-[#1d1d1f] mb-8">
            Let's talk.
          </h3>
          <p className="text-2xl font-medium text-slate-700 mb-12 max-w-2xl mx-auto tracking-tight">
            Got an idea for a game or an app? I'm always open to discussing new projects.
          </p>
        </Reveal>

        <Reveal delay={200}>
          <div className="relative max-w-xl mx-auto">
            <div className="absolute -inset-6 bg-white/10 backdrop-blur-xl rounded-[2.5rem] -z-10 border border-white/20 shadow-2xl" />

            {status === 'success' ? (
              <div className="p-12 flex flex-col items-center gap-4">
                <CheckCircle size={48} className="text-green-500" />
                <h4 className="text-2xl font-black text-black">Message sent!</h4>
                <p className="text-black/80 font-bold">Thank you for reaching out. I'll get back to you soon.</p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-4 text-[#0071e3] hover:underline font-bold text-[15px]"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-8 md:p-12 flex flex-col gap-5" noValidate>
                <div className="flex flex-col gap-1.5 text-left">
                  <label htmlFor="name" className="text-[13px] font-black text-black uppercase tracking-wider">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className={`w-full px-5 py-3 rounded-2xl bg-white/40 backdrop-blur-sm border text-black font-bold text-[16px] placeholder:text-black/30 focus:outline-none focus:ring-2 focus:ring-[#0071e3]/50 transition-all ${
                      errors.name ? 'border-red-400' : 'border-black/10'
                    }`}
                  />
                  {errors.name && (
                    <span className="text-red-500 text-[12px] font-bold mt-1 flex items-center gap-1">
                      <AlertCircle size={12} /> {errors.name}
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-1.5 text-left">
                  <label htmlFor="email" className="text-[13px] font-black text-black uppercase tracking-wider">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className={`w-full px-5 py-3 rounded-2xl bg-white/40 backdrop-blur-sm border text-black font-bold text-[16px] placeholder:text-black/30 focus:outline-none focus:ring-2 focus:ring-[#0071e3]/50 transition-all ${
                      errors.email ? 'border-red-400' : 'border-black/10'
                    }`}
                  />
                  {errors.email && (
                    <span className="text-red-500 text-[12px] font-bold mt-1 flex items-center gap-1">
                      <AlertCircle size={12} /> {errors.email}
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-1.5 text-left">
                  <label htmlFor="message" className="text-[13px] font-black text-black uppercase tracking-wider">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project..."
                    className={`w-full px-5 py-3 rounded-2xl bg-white/40 backdrop-blur-sm border text-black font-bold text-[16px] placeholder:text-black/30 focus:outline-none focus:ring-2 focus:ring-[#0071e3]/50 transition-all resize-none ${
                      errors.message ? 'border-red-400' : 'border-black/10'
                    }`}
                  />
                  {errors.message && (
                    <span className="text-red-500 text-[12px] font-bold mt-1 flex items-center gap-1">
                      <AlertCircle size={12} /> {errors.message}
                    </span>
                  )}
                </div>

                {status === 'error' && (
                  <div className="text-red-500 text-[13px] font-bold flex items-center gap-1 justify-center">
                    <AlertCircle size={14} /> Something went wrong. Please try again.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="mt-2 bg-[#1d1d1f] text-white px-8 py-3.5 rounded-full font-bold text-[16px] hover:bg-black transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
                >
                  {status === 'submitting' ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message <Send size={16} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </Reveal>

        <Reveal delay={300}>
          <div className="mt-16 text-[#0071e3] hover:underline font-bold text-[17px]">
            <a href="mailto:khiev.sokpirun999@gmail.com" className="inline-flex items-center gap-1 group">
              Or email me directly <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
          <div className="mt-4 text-[#0071e3] hover:underline font-bold text-[17px]">
            <a href="https://github.com/Sokphirun99" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 group">
              View GitHub Profile <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
