import React, { useState } from 'react';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('sending');
    try {
      // Simple test submit: POST to /api/newsletter (placeholder)
      await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      setStatus('sent');
      setEmail('');
    } catch {
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-[#1F322E]/80 p-4 rounded-xl shadow-inner">
      <div className="text-white mb-3 text-center">
        <h4 className="text-lg font-semibold">Suscríbete a nuestro newsletter</h4>
        <p className="text-sm text-white/70">Recibe novedades y eventos directamente en tu correo.</p>
      </div>
      <div className="flex gap-2">
        <input
          type="email"
          placeholder="tu@correo.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 px-3 py-2 rounded-md bg-white/5 text-white outline-none focus:ring-2 focus:ring-[#FFDD08]/40"
          aria-label="Correo electrónico"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-[#FFDD08] text-[#1F322E] rounded-md font-medium"
          disabled={status === 'sending'}
        >
          {status === 'sending' ? 'Enviando...' : 'Suscribir'}
        </button>
      </div>
      {status === 'sent' && <p className="text-sm text-green-400 mt-2">¡Gracias! Revisa tu correo.</p>}
      {status === 'error' && <p className="text-sm text-red-400 mt-2">Error. Intenta nuevamente.</p>}
    </form>
  );
}
