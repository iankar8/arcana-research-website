"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, Loader2, Sparkles } from "lucide-react";

interface LeadCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  hasCompletedDemo: boolean;
}

export default function LeadCaptureModal({ isOpen, onClose, hasCompletedDemo }: LeadCaptureModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    title: "",
    phone: "",
    interest: "implementation",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // TODO: Replace with actual API endpoint (Supabase, HubSpot, etc.)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Log to console for now
      console.log("Lead captured:", formData);
      
      setIsSubmitted(true);
      
      // Close modal after 2 seconds
      setTimeout(() => {
        onClose();
        setIsSubmitted(false);
        setFormData({
          name: "",
          email: "",
          company: "",
          title: "",
          phone: "",
          interest: "implementation",
        });
      }, 2000);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              {!isSubmitted ? (
                <>
                  {/* Header */}
                  <div className="relative p-8 pb-6 border-b border-gray-100">
                    <button
                      onClick={onClose}
                      className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>

                    {hasCompletedDemo && (
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold mb-4">
                        <CheckCircle className="w-4 h-4" />
                        Demo Completed
                      </div>
                    )}

                    <h2 className="text-3xl font-black mb-2">
                      See This in Your Bank
                    </h2>
                    <p className="text-text-muted">
                      Schedule a call to discuss implementing AI capabilities in your institution.
                    </p>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-semibold mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                          placeholder="John Smith"
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-semibold mb-2">
                          Work Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                          placeholder="john@bank.com"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="company" className="block text-sm font-semibold mb-2">
                          Institution Name *
                        </label>
                        <input
                          type="text"
                          id="company"
                          required
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                          placeholder="First National Bank"
                        />
                      </div>

                      <div>
                        <label htmlFor="title" className="block text-sm font-semibold mb-2">
                          Job Title *
                        </label>
                        <input
                          type="text"
                          id="title"
                          required
                          value={formData.title}
                          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                          placeholder="CIO, VP Technology"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                        placeholder="(555) 123-4567"
                      />
                    </div>

                    <div>
                      <label htmlFor="interest" className="block text-sm font-semibold mb-2">
                        Primary Interest *
                      </label>
                      <select
                        id="interest"
                        required
                        value={formData.interest}
                        onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                      >
                        <option value="implementation">AI Implementation (4-8 weeks)</option>
                        <option value="intelligence">Intelligence Briefing Subscription</option>
                        <option value="research">Custom Research Project</option>
                        <option value="general">General Inquiry</option>
                      </select>
                    </div>

                    <div className="pt-4">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold text-lg hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-5 h-5" />
                            Schedule Call
                          </>
                        )}
                      </button>
                    </div>

                    <p className="text-xs text-text-muted text-center">
                      We'll reach out within 1 business day to schedule your implementation call.
                    </p>
                  </form>
                </>
              ) : (
                /* Success State */
                <div className="p-12 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", duration: 0.5 }}
                  >
                    <CheckCircle className="w-20 h-20 text-green-600 mx-auto mb-6" />
                  </motion.div>
                  <h2 className="text-3xl font-black mb-3">Thank You!</h2>
                  <p className="text-lg text-text-muted">
                    We'll be in touch within 1 business day to schedule your call.
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
