import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Send, Mail, Phone, MapPin, Linkedin, Github, CheckCircle, AlertCircle } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { data, sendContactMessage } = usePortfolio();
  const { profile } = data;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    honeypot: '' // Spam trap
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [responseMsg, setResponseMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('error');
      setResponseMsg('Please fill in your name, email, and message.');
      return;
    }

    setStatus('submitting');
    const result = await sendContactMessage(formData);
    if (result.success) {
      setStatus('success');
      setResponseMsg(result.message || 'Thank you! Your message has been sent to Bilal.');
      setFormData({ name: '', email: '', subject: '', message: '', honeypot: '' });
    } else {
      setStatus('error');
      setResponseMsg(result.error || 'Failed to send message. Please try again or email directly.');
    }
  };

  return (
    <section id="contact" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Contact info & channels */}
        <div className="lg:col-span-5 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-xs font-mono text-sky-700 mb-2 shadow-sm">
            <Send className="w-3.5 h-3.5" />
            <span>Initiate Direct Contact</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display tracking-tight">
            Let's Build Something Exceptional Together
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            I am actively open to software engineering roles, full-stack systems engineering, and technology advisory consulting. Feel free to reach out directly.
          </p>

          {/* Quick contact list cards */}
          <div className="space-y-3 pt-2">
            <a
              href={`mailto:${profile.email}`}
              className="flex items-center gap-4 p-4 rounded-2xl bg-white/90 backdrop-blur-xl border border-slate-200 hover:border-sky-400 transition-all group shadow-sm"
            >
              <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center group-hover:scale-105 transition-transform border border-sky-200">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] font-mono text-slate-500">Direct Email</div>
                <div className="text-sm font-semibold text-slate-900 group-hover:text-sky-600 transition-colors">
                  {profile.email}
                </div>
              </div>
            </a>

            <a
              href={`tel:${profile.phone.replace(/\s+/g, '')}`}
              className="flex items-center gap-4 p-4 rounded-2xl bg-white/90 backdrop-blur-xl border border-slate-200 hover:border-sky-400 transition-all group shadow-sm"
            >
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-105 transition-transform border border-indigo-200">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] font-mono text-slate-500">Phone & WhatsApp</div>
                <div className="text-sm font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  {profile.phone}
                </div>
              </div>
            </a>

            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/90 backdrop-blur-xl border border-slate-200 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-200">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] font-mono text-slate-500">Current Base</div>
                <div className="text-sm font-semibold text-slate-900">
                  {profile.location}
                </div>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3 pt-2">
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-xs font-mono text-slate-700 hover:text-slate-900 flex items-center gap-2 transition-colors shadow-sm"
            >
              <Linkedin className="w-4 h-4 text-sky-600" />
              <span>LinkedIn</span>
            </a>

            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-xs font-mono text-slate-700 hover:text-slate-900 flex items-center gap-2 transition-colors shadow-sm"
            >
              <Github className="w-4 h-4 text-slate-800" />
              <span>GitHub</span>
            </a>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-7">
          <form
            onSubmit={handleSubmit}
            className="p-6 sm:p-8 rounded-3xl bg-white/95 backdrop-blur-xl border border-slate-200 shadow-sm space-y-4"
          >
            <h3 className="text-xl font-bold text-slate-900 font-display">Send a Direct Message</h3>

            {/* Hidden honeypot field to trap spambots */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="hp_field">Do not fill this</label>
              <input
                type="text"
                id="hp_field"
                name="hp_field"
                value={formData.honeypot || ''}
                onChange={e => setFormData({ ...formData, honeypot: e.target.value })}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-slate-700 font-semibold">Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Wong"
                  value={formData.name || ''}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-sky-500 focus:bg-white focus:outline-none text-sm text-slate-900 placeholder:text-slate-400 font-sans transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-slate-700 font-semibold">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="alex@company.com"
                  value={formData.email || ''}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-sky-500 focus:bg-white focus:outline-none text-sm text-slate-900 placeholder:text-slate-400 font-sans transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-slate-700 font-semibold">Subject</label>
              <input
                type="text"
                placeholder="e.g. Software Engineering Opportunity"
                value={formData.subject || ''}
                onChange={e => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-sky-500 focus:bg-white focus:outline-none text-sm text-slate-900 placeholder:text-slate-400 font-sans transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-slate-700 font-semibold">Message *</label>
              <textarea
                required
                rows={5}
                placeholder="Share your inquiry, team background, or requirements..."
                value={formData.message || ''}
                onChange={e => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-sky-500 focus:bg-white focus:outline-none text-sm text-slate-900 placeholder:text-slate-400 font-sans leading-relaxed transition-colors"
              />
            </div>

            {/* Status alerts */}
            {status === 'success' && (
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 shrink-0 text-emerald-600" />
                <span>{responseMsg}</span>
              </div>
            )}

            {status === 'error' && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{responseMsg}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full py-3.5 rounded-xl bg-sky-600 hover:bg-sky-500 disabled:opacity-50 text-white font-bold text-sm transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              {status === 'submitting' ? (
                <span>Sending message...</span>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Send Message to Bilal</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
