"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mic, Zap, ArrowRight, Sparkles } from "lucide-react";
import VoiceCloningDemo from "@/components/VoiceCloningDemo";
import LeadCaptureModal from "@/components/LeadCaptureModal";

export default function AIDemosPage() {
  const [showLeadCapture, setShowLeadCapture] = useState(false);
  const [hasCompletedDemo, setHasCompletedDemo] = useState(false);

  const handleDemoComplete = () => {
    setHasCompletedDemo(true);
    setShowLeadCapture(true);
  };

  return (
    <div className="min-h-screen bg-[#FAFAF9]">
      {/* Hero Section */}
      <section className="relative py-20 px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-transparent" />
        
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-sm font-semibold mb-6"
            >
              <Sparkles className="w-4 h-4" />
              Live AI Demo
            </motion.div>
            
            <h1 className="text-[clamp(2.5rem,6vw,5rem)] font-black uppercase leading-[0.9] tracking-tight mb-6">
              Clone Your Voice
              <br />
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                In 60 Seconds
              </span>
            </h1>
            <p className="text-xl text-text-muted max-w-2xl mx-auto">
              Experience real AI voice cloning technology. Record a short sample, 
              then hear your voice speak new content. No mockups—this is working code.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Demo Container */}
      <section className="py-12 px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-3xl shadow-xl p-8 md:p-12"
          >
            <VoiceCloningDemo onComplete={handleDemoComplete} />
          </motion.div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-black mb-4">Banking Use Cases</h2>
            <p className="text-lg text-text-muted">
              How financial institutions are using voice AI today
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Customer Service",
                description: "Natural-sounding IVR systems that handle routine inquiries",
                icon: "🎧",
              },
              {
                title: "Compliance Training",
                description: "Narrate training materials in consistent, professional voice",
                icon: "📚",
              },
              {
                title: "Account Notifications",
                description: "Personalized voice alerts for fraud, payments, and updates",
                icon: "🔔",
              },
              {
                title: "Executive Comms",
                description: "Scale leadership messages across branches and teams",
                icon: "💼",
              },
            ].map((useCase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="text-4xl mb-4">{useCase.icon}</div>
                <h3 className="font-bold text-lg mb-2">{useCase.title}</h3>
                <p className="text-sm text-text-muted">{useCase.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-gold/10 to-transparent rounded-3xl p-12 border border-gold/20"
          >
            <Zap className="w-12 h-12 text-gold mx-auto mb-6" />
            <h2 className="text-4xl font-black mb-4">Deploy This in Your Bank</h2>
            <p className="text-lg text-text-muted mb-8 max-w-2xl mx-auto">
              This isn't a mockup—it's real AI technology we can implement in your 
              institution in 4-8 weeks. Voice AI, document processing, fraud detection, and more.
            </p>
            <button
              onClick={() => setShowLeadCapture(true)}
              className="inline-flex items-center gap-2 px-8 py-4 bg-text-strong text-white rounded-full font-semibold hover:scale-105 transition-transform"
            >
              Schedule Implementation Call
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Lead Capture Modal */}
      <LeadCaptureModal 
        isOpen={showLeadCapture}
        onClose={() => setShowLeadCapture(false)}
        hasCompletedDemo={hasCompletedDemo}
      />
    </div>
  );
}
