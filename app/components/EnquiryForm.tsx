'use client';

import { useState } from 'react';

export default function EnquiryForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>(
    'idle'
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone }),
      });
      if (!res.ok) throw new Error('failed');
      setStatus('sent');
      setName('');
      setPhone('');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'sent') {
    return (
      <div className="bg-stone rounded-2xl p-8 text-center">
        <p className="font-display text-2xl mb-1">Thank you, {name || 'friend'}.</p>
        <p className="text-ink/60 text-sm">
          We&apos;ve received your details and will call you shortly.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-stone rounded-2xl p-8 flex flex-col gap-4 max-w-md"
    >
      <div>
        <p className="font-display text-2xl mb-1">Let&apos;s plan your event</p>
        <p className="text-ink/60 text-sm">
          Leave your name and number, we&apos;ll call you back.
        </p>
      </div>
      <label className="text-xs uppercase tracking-widest text-ink/50">
        Name
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Your full name"
          className="mt-1 w-full rounded-lg border border-ink/15 bg-cream px-4 py-3 text-sm text-ink outline-none focus:border-ink/40"
        />
      </label>
      <label className="text-xs uppercase tracking-widest text-ink/50">
        Phone number
        <input
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          type="tel"
          placeholder="10-digit mobile number"
          pattern="[0-9+ ]{7,15}"
          className="mt-1 w-full rounded-lg border border-ink/15 bg-cream px-4 py-3 text-sm text-ink outline-none focus:border-ink/40"
        />
      </label>
      <button
        type="submit"
        disabled={status === 'sending'}
        className="btn-primary justify-center mt-2 disabled:opacity-60"
      >
        {status === 'sending' ? 'Sending…' : 'Request a Call Back'}
      </button>
      {status === 'error' && (
        <p className="text-xs text-red-600">
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  );
}
