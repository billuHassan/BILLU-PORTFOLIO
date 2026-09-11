import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Send, Mail, Phone, MapPin, Linkedin, Github, CheckCircle, AlertCircle, ShieldAlert } from 'lucide-react';

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
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-900">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Contact info & channels */}
        <div className="lg:col-span-5 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs font-mono text-cyan-300 mb-2">
            <Send className="w-3.5 h-3.5" />
            <span>Initiate Direct Contact</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight">
            Let's Build Something Exceptional Together
          </h2>

          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            I am actively seeking entry-level software engineering, systems development, technology consulting, and IT advisory opportunities. Let's discuss your project or team requirements.
          </p>

          {/* Quick contact list cards */}
          <div className="space-y-3 pt-2">
            <a
              href={`mailto:${profile.email}`}
              className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 transition-colors group"
            >
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] font-mono text-slate-400">Direct Email</div>
                <div className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors">
                  {profile.email}
                </div>
              </div>
            </a>

            <a
              href={`tel:${profile.phone.replace(/\s+/g, '')}`}
              className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 transition-colors group"
            >
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] font-mono text-slate-400">Phone & WhatsApp</div>
                <div className="text-sm font-semibold text-white group-hover:text-indigo-300 transition-colors">
                  {profile.phone}
                </div>
              </div>
            </a>

            <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] font-mono text-slate-400">Current Base</div>
                <div className="text-sm font-semibold text-white">
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
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-xs font-mono text-slate-300 hover:text-white flex items-center gap-2 transition-colors"
            >
              <Linkedin className="w-4 h-4 text-cyan-400" />
              <span>LinkedIn</span>
            </a>

            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-xs font-mono text-slate-300 hover:text-white flex items-center gap-2 transition-colors"
            >
              <Github className="w-4 h-4 text-cyan-400" />
              <span>GitHub</span>
            </a>
          </div>
        </div>

        {/* Right Column: Contact Form with Honeypot */}
        <div className="lg:col-span-7">
          <form
            onSubmit={handleSubmit}
            className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-xl shadow-2xl space-y-5"
          >
            <h3 className="text-xl font-bold text-white font-display">Send a Direct Message</h3>

            {/* Hidden honeypot field to trap spambots */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="hp_field">Do not fill this</label>
              <input
                type="text"
                id="hp_field"
                name="hp_field"
                value={formData.honeypot}
                onChange={e => setFormData({ ...formData, honeypot: e.target.value })}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-slate-300">Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Wong"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-500 focus:outline-none text-sm text-white placeholder:text-slate-600 font-sans"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-slate-300">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="alex@company.com"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-500 focus:outline-none text-sm text-white placeholder:text-slate-600 font-sans"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-slate-300">Subject / Role Description</label>
              <input
                type="text"
                placeholder="e.g. Software Engineering Opportunity / Advisory Discussion"
                value={formData.subject}
                onChange={e => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-500 focus:outline-none text-sm text-white placeholder:text-slate-600 font-sans"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-slate-300">Message *</label>
              <textarea
                required
                rows={5}
                placeholder="Share your inquiry, team background, or technical specifications..."
                value={formData.message}
                onChange={e => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-500 focus:outline-none text-sm text-white placeholder:text-slate-600 font-sans leading-relaxed"
              />
            </div>

            {/* Status alerts */}
            {status === 'success' && (
              <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-xs text-emerald-300 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 shrink-0 text-emerald-400" />
                <span>{responseMsg}</span>
              </div>
            )}

            {status === 'error' && (
              <div className="p-3.5 rounded-xl bg-rose-950/60 border border-rose-500/40 text-xs text-rose-300 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                <span>{responseMsg}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-slate-950 font-bold text-sm transition-all shadow-[0_0_20px_rgba(56,189,248,0.25)] flex items-center justify-center gap-2"
            >
              {status === 'submitting' ? (
                <span>Transmitting message...</span>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Transmit Message to Bilal</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
