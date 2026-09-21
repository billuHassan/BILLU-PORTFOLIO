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
    <section id="contact" className="py-10 sm:py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Contact info & channels */}
        <div className="lg:col-span-5 space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-xs font-mono text-cyan-300 mb-1 shadow-sm">
            <Send className="w-3.5 h-3.5 text-cyan-400" />
            <span>Initiate Direct Contact</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display tracking-tight">
            Let's Build Something Exceptional Together
          </h2>

          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
            I am actively open to software engineering roles, full-stack systems engineering, and technology advisory consulting. Feel free to reach out directly.
          </p>

          {/* Quick contact list cards */}
          <div className="space-y-2.5 pt-1">
            <a
              href={`mailto:${profile.email}`}
              className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-[#0d1527]/90 backdrop-blur-xl border border-slate-800 hover:border-cyan-500/40 transition-all group shadow-md"
            >
              <div className="w-10 h-10 rounded-xl bg-[#090f1d] text-cyan-400 flex items-center justify-center group-hover:scale-105 transition-transform border border-slate-800">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] font-mono text-slate-400">Direct Email</div>
                <div className="text-xs sm:text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors">
                  {profile.email}
                </div>
              </div>
            </a>

            <a
              href={`tel:${profile.phone.replace(/\s+/g, '')}`}
              className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-[#0d1527]/90 backdrop-blur-xl border border-slate-800 hover:border-cyan-500/40 transition-all group shadow-md"
            >
              <div className="w-10 h-10 rounded-xl bg-[#090f1d] text-emerald-400 flex items-center justify-center group-hover:scale-105 transition-transform border border-slate-800">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] font-mono text-slate-400">Phone & WhatsApp</div>
                <div className="text-xs sm:text-sm font-semibold text-white group-hover:text-emerald-300 transition-colors">
                  {profile.phone}
                </div>
              </div>
            </a>

            <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-[#0d1527]/90 backdrop-blur-xl border border-slate-800 shadow-md">
              <div className="w-10 h-10 rounded-xl bg-[#090f1d] text-purple-400 flex items-center justify-center border border-slate-800">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] font-mono text-slate-400">Current Base</div>
                <div className="text-xs sm:text-sm font-semibold text-white">
                  {profile.location}
                </div>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-2.5 pt-1">
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-2 rounded-xl bg-[#090f1d] hover:bg-slate-800 border border-slate-800 text-xs font-mono text-slate-300 hover:text-white flex items-center gap-2 transition-colors shadow-sm"
            >
              <Linkedin className="w-3.5 h-3.5 text-cyan-400" />
              <span>LinkedIn</span>
            </a>

            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-2 rounded-xl bg-[#090f1d] hover:bg-slate-800 border border-slate-800 text-xs font-mono text-slate-300 hover:text-white flex items-center gap-2 transition-colors shadow-sm"
            >
              <Github className="w-3.5 h-3.5 text-slate-300" />
              <span>GitHub</span>
            </a>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-7">
          <form
            onSubmit={handleSubmit}
            className="p-5 sm:p-7 rounded-3xl bg-[#0d1527]/95 backdrop-blur-xl border border-slate-800 shadow-xl space-y-4"
          >
            <h3 className="text-lg sm:text-xl font-bold text-white font-display">Send a Direct Message</h3>

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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono text-slate-300 font-semibold">Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Wong"
                  value={formData.name || ''}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#090f1d] border border-slate-800 focus:border-cyan-400 focus:outline-none text-xs sm:text-sm text-white placeholder:text-slate-500 font-sans transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-mono text-slate-300 font-semibold">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="alex@company.com"
                  value={formData.email || ''}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#090f1d] border border-slate-800 focus:border-cyan-400 focus:outline-none text-xs sm:text-sm text-white placeholder:text-slate-500 font-sans transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-mono text-slate-300 font-semibold">Subject</label>
              <input
                type="text"
                placeholder="e.g. Software Engineering Opportunity"
                value={formData.subject || ''}
                onChange={e => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#090f1d] border border-slate-800 focus:border-cyan-400 focus:outline-none text-xs sm:text-sm text-white placeholder:text-slate-500 font-sans transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-mono text-slate-300 font-semibold">Message *</label>
              <textarea
                required
                rows={4}
                placeholder="Share your inquiry, team background, or requirements..."
                value={formData.message || ''}
                onChange={e => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#090f1d] border border-slate-800 focus:border-cyan-400 focus:outline-none text-xs sm:text-sm text-white placeholder:text-slate-500 font-sans leading-relaxed transition-colors"
              />
            </div>

            {/* Status alerts */}
            {status === 'success' && (
              <div className="p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-xs text-emerald-300 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 shrink-0 text-emerald-400" />
                <span>{responseMsg}</span>
              </div>
            )}

            {status === 'error' && (
              <div className="p-3.5 rounded-xl bg-rose-950/80 border border-rose-500/50 text-xs text-rose-300 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                <span>{responseMsg}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-slate-950 font-bold text-xs sm:text-sm font-mono transition-all shadow-md shadow-cyan-500/20 flex items-center justify-center gap-2 cursor-pointer"
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
