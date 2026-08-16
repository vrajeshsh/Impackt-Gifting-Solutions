'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

interface QuickQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function QuickQuoteModal({ isOpen, onClose }: QuickQuoteModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    companyName: '',
    quantity: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you! Our team will reach out within 24 hours.');
    onClose();
    setFormData({ name: '', email: '', companyName: '', quantity: '' });
  };

  return (
    <div className="fixed inset-0 z-[70] bg-charcoal/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-ivory shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-soft-beige/30">
          <div>
            <h3 className="font-display text-2xl text-charcoal">Quick Quote</h3>
            <p className="text-warm-gray text-sm mt-1">Fill in your details and we will get back within 24 hours.</p>
          </div>
          <button onClick={onClose} className="p-2 hover:text-accent transition-colors" aria-label="Close modal">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium mb-3 text-charcoal">Full Name *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3.5 border border-soft-beige/50 bg-ivory focus:outline-none focus:border-accent transition-colors text-sm"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-3 text-charcoal">Work Email *</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3.5 border border-soft-beige/50 bg-ivory focus:outline-none focus:border-accent transition-colors text-sm"
              placeholder="you@company.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-3 text-charcoal">Company Name *</label>
            <input
              type="text"
              required
              value={formData.companyName}
              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              className="w-full px-4 py-3.5 border border-soft-beige/50 bg-ivory focus:outline-none focus:border-accent transition-colors text-sm"
              placeholder="Your company name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-3 text-charcoal">Approximate Quantity *</label>
            <input
              type="number"
              required
              min="1"
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
              className="w-full px-4 py-3.5 border border-soft-beige/50 bg-ivory focus:outline-none focus:border-accent transition-colors text-sm"
              placeholder="e.g., 50"
            />
          </div>

          <button type="submit" className="w-full btn-primary">
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
}
