import { useState, useRef } from 'react';
import { ChevronRight, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { Reveal } from '../ui/Reveal';
import { getDbInstance } from '../../firebase';
import { useLanguage } from '../../context/useLanguage';

const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MIN_MESSAGE_LENGTH = 10;
const MAX_MESSAGE_LENGTH = 3000;
const SUBMIT_COOLDOWN_MS = 5000;

export function Contact() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState('idle');
  const [errors, setErrors] = useState({});
  const lastSubmitTimeRef = useRef(0);

  const validate = () => {
    const newErrors = {};
    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedMessage = formData.message.trim();

    if (!trimmedName) {
      newErrors.name = t.contact.form.errors.nameRequired;
    } else if (trimmedName.length > MAX_NAME_LENGTH) {
      newErrors.name = `${t.contact.form.name} must be ${MAX_NAME_LENGTH} characters or less`;
    }

    if (!trimmedEmail) {
      newErrors.email = t.contact.form.errors.emailRequired;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail) || trimmedEmail.length > MAX_EMAIL_LENGTH) {
      newErrors.email = t.contact.form.errors.emailInvalid;
    }

    if (!trimmedMessage) {
      newErrors.message = t.contact.form.errors.messageRequired;
    } else if (trimmedMessage.length < MIN_MESSAGE_LENGTH) {
      newErrors.message = t.contact.form.errors.messageLength;
    } else if (trimmedMessage.length > MAX_MESSAGE_LENGTH) {
      newErrors.message = `${t.contact.form.message} must be ${MAX_MESSAGE_LENGTH} characters or less`;
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

    // Silently drop submissions caught by bot honeypot
    if (honeypot) {
      setStatus('success');
      return;
    }

    // Client-side rate-limit cooldown
    const now = Date.now();
    if (now - lastSubmitTimeRef.current < SUBMIT_COOLDOWN_MS) {
      return;
    }

    if (!validate()) return;

    setStatus('submitting');
    lastSubmitTimeRef.current = now;

    try {
      const db = await getDbInstance();
      if (!db) {
        throw new Error('Database service is unavailable');
      }

      const { collection, addDoc, serverTimestamp } = await import('firebase/firestore');
      await addDoc(collection(db, 'contact_submissions'), {
        name: formData.name.trim(),
        email: formData.email.trim(),
        message: formData.message.trim(),
        createdAt: serverTimestamp(),
      });

      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Contact submission failed:', {
        timestamp: new Date().toISOString(),
        error: error.message,
      });
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-32 bg-transparent">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <Reveal>
          <h3 className="text-6xl md:text-7xl font-bold tracking-tighter text-white mb-8">
            {t.contact.heading}
          </h3>
          <p className="text-2xl font-medium text-white/70 mb-12 max-w-2xl mx-auto tracking-tight">
            {t.contact.subheading}
          </p>
        </Reveal>

        <Reveal delay={200}>
          <div className="relative max-w-xl mx-auto">
            <div className="absolute -inset-6 bg-white/[0.04] backdrop-blur-md md:backdrop-blur-[19px] rounded-[28px] -z-10 border border-white/10 shadow-2xl" />

            {status === 'success' ? (
              <div className="p-12 flex flex-col items-center gap-4">
                <CheckCircle size={48} className="text-green-400" />
                <h4 className="text-2xl font-bold text-white">{t.contact.form.sent}</h4>
                <p className="text-white/80 font-medium">{t.contact.form.sentMessage}</p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-4 text-[#3898ff] hover:underline font-bold text-[15px]"
                >
                  {t.contact.form.sendAnother}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-8 md:p-12 flex flex-col gap-5" noValidate>
                {/* Honeypot field for bot detection (hidden from human users) */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="website_hp">Website</label>
                  <input
                    id="website_hp"
                    name="website_hp"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                  />
                </div>

                <div className="flex flex-col gap-1.5 text-left">
                  <label htmlFor="name" className="text-[13px] font-bold text-white/80 uppercase tracking-wider">
                    {t.contact.form.name}
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    maxLength={MAX_NAME_LENGTH}
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={t.contact.form.namePlaceholder}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                    className={`w-full px-5 py-3 rounded-2xl bg-white/[0.06] backdrop-blur-sm border text-white font-medium text-[16px] placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#e86bd8]/50 focus:border-[#e86bd8] transition-all ${
                      errors.name ? 'border-red-400' : 'border-white/15'
                    }`}
                  />
                  {errors.name && (
                    <span id="name-error" role="alert" className="text-red-400 text-[12px] font-medium mt-1 flex items-center gap-1">
                      <AlertCircle size={12} /> {errors.name}
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-1.5 text-left">
                  <label htmlFor="email" className="text-[13px] font-bold text-white/80 uppercase tracking-wider">
                    {t.contact.form.email}
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    maxLength={MAX_EMAIL_LENGTH}
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={t.contact.form.emailPlaceholder}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    className={`w-full px-5 py-3 rounded-2xl bg-white/[0.06] backdrop-blur-sm border text-white font-medium text-[16px] placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#e86bd8]/50 focus:border-[#e86bd8] transition-all ${
                      errors.email ? 'border-red-400' : 'border-white/15'
                    }`}
                  />
                  {errors.email && (
                    <span id="email-error" role="alert" className="text-red-400 text-[12px] font-medium mt-1 flex items-center gap-1">
                      <AlertCircle size={12} /> {errors.email}
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-1.5 text-left">
                  <label htmlFor="message" className="text-[13px] font-bold text-white/80 uppercase tracking-wider">
                    {t.contact.form.message}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    maxLength={MAX_MESSAGE_LENGTH}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={t.contact.form.messagePlaceholder}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                    className={`w-full px-5 py-3 rounded-2xl bg-white/[0.06] backdrop-blur-sm border text-white font-medium text-[16px] placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#e86bd8]/50 focus:border-[#e86bd8] transition-all resize-none ${
                      errors.message ? 'border-red-400' : 'border-white/15'
                    }`}
                  />
                  {errors.message && (
                    <span id="message-error" role="alert" className="text-red-400 text-[12px] font-medium mt-1 flex items-center gap-1">
                      <AlertCircle size={12} /> {errors.message}
                    </span>
                  )}
                </div>

                {status === 'error' && (
                  <div role="alert" className="text-red-400 text-[13px] font-medium flex items-center gap-1 justify-center">
                    <AlertCircle size={14} /> {t.contact.form.error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="mt-2 bg-white text-[#0f1013] px-8 py-3.5 rounded-full font-bold text-[16px] hover:bg-white/90 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
                >
                  {status === 'submitting' ? (
                    <>
                      <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                      {t.contact.form.sending}
                    </>
                  ) : (
                    <>
                      {t.contact.form.send} <Send size={16} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </Reveal>

        <Reveal delay={300}>
          <div className="mt-16 text-[#3898ff] hover:text-[#5fb0ff] hover:underline font-bold text-[17px]">
            <a href="mailto:khiev.sokpirun999@gmail.com" className="inline-flex items-center gap-1 group">
              {t.contact.emailDirectly} <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
          <div className="mt-4 text-[#3898ff] hover:text-[#5fb0ff] hover:underline font-bold text-[17px]">
            <a href="https://github.com/Sokphirun99" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 group">
              {t.contact.github} <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
