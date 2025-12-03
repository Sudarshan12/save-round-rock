import React, { useState, useEffect } from 'react';
import { GeneratedEmail, EMAIL_RECIPIENT } from '../types';
import { Copy, Check, Mail, RefreshCw, Pencil } from 'lucide-react';

interface EmailPreviewProps {
  emailData: GeneratedEmail;
  onReset: () => void;
}

export const EmailPreview: React.FC<EmailPreviewProps> = ({ emailData, onReset }) => {
  const [subject, setSubject] = useState(emailData.subject);
  const [body, setBody] = useState(emailData.body);
  const [copiedSubject, setCopiedSubject] = useState(false);
  const [copiedBody, setCopiedBody] = useState(false);

  useEffect(() => {
    setSubject(emailData.subject);
    setBody(emailData.body);
  }, [emailData]);

  const copyToClipboard = (text: string, isSubject: boolean) => {
    navigator.clipboard.writeText(text).then(() => {
      if (isSubject) {
        setCopiedSubject(true);
        setTimeout(() => setCopiedSubject(false), 2000);
      } else {
        setCopiedBody(true);
        setTimeout(() => setCopiedBody(false), 2000);
      }
    });
  };

  const handleMailto = () => {
    const s = encodeURIComponent(subject);
    const b = encodeURIComponent(body);
    window.location.href = `mailto:${EMAIL_RECIPIENT}?subject=${s}&body=${b}`;
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
      <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-slate-800">Generated Draft</h2>
        <button 
          onClick={onReset}
          className="text-sm text-slate-500 hover:text-blue-600 flex items-center gap-1 font-medium transition-colors"
        >
          <RefreshCw className="w-4 h-4" /> Start Over
        </button>
      </div>

      <div className="p-6 sm:p-8 space-y-6">
        
        {/* Recipient */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">To</label>
          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200">
            <span className="font-mono text-sm text-slate-700 select-all">{EMAIL_RECIPIENT}</span>
          </div>
        </div>

        {/* Subject */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex justify-between items-center">
            Subject
            <span className="text-slate-300 font-normal lowercase flex items-center gap-1"><Pencil className="w-3 h-3" /> editable</span>
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="flex-1 p-3 bg-white rounded-lg border border-slate-200 text-slate-800 font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
            <button
              onClick={() => copyToClipboard(subject, true)}
              className="p-3 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg border border-slate-200 transition-colors"
              title="Copy Subject"
            >
              {copiedSubject ? <Check className="w-5 h-5 text-green-600" /> : <Copy className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex justify-between items-center">
            Message Body
            <span className="text-slate-300 font-normal lowercase flex items-center gap-1"><Pencil className="w-3 h-3" /> editable</span>
          </label>
          <div className="relative">
            <textarea
              className="w-full h-80 p-4 bg-white rounded-lg border border-slate-200 text-slate-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-y font-sans leading-relaxed whitespace-pre-wrap"
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
            <button
              onClick={() => copyToClipboard(body, false)}
              className="absolute top-3 right-3 p-2 text-slate-500 hover:text-blue-600 hover:bg-white bg-white/80 backdrop-blur-sm rounded-md border border-slate-200 shadow-sm transition-all z-10"
              title="Copy Body"
            >
              {copiedBody ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleMailto}
            className="flex-1 flex justify-center items-center py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
          >
            <Mail className="w-5 h-5 mr-2" />
            Open in Mail App
          </button>
          <div className="text-xs text-slate-400 text-center sm:text-left mt-2 sm:mt-0 flex items-center justify-center sm:justify-start">
             <span className="hidden sm:inline mx-2 text-slate-300">|</span>
             <span>Review and edit before sending.</span>
          </div>
        </div>
      </div>
    </div>
  );
};