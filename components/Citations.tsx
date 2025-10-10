"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function Citations() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative py-16 border-t border-border-subtle/20">
      <div className="section-shell">
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-text-strong mb-6">
            Sources & References
          </h3>
          
          <div className="space-y-3 text-xs text-text-muted/70 leading-relaxed">
            <div>
              <span className="text-gold font-semibold">[1]</span> JPMorgan Chase COiN: <a href="https://digitaldefynd.com/IQ/jp-morgan-using-ai-case-study/" target="_blank" rel="noopener noreferrer" className="underline hover:text-text-strong transition-colors">360,000 hours saved annually</a> on legal document review. Processes 12,000 commercial credit agreements in seconds vs. months of manual work. Reduces contract analysis from 90+ minutes to under 30 minutes per document.
            </div>
            
            <div>
              <span className="text-gold font-semibold">[2]</span> Banking AI Adoption: <a href="https://www.glassbox.com/blog/ai-in-banking-statistics/" target="_blank" rel="noopener noreferrer" className="underline hover:text-text-strong transition-colors">91% of bank boards have officially endorsed generative AI projects</a>. Market urgency is real—AI adoption at the board level is now mainstream across financial institutions.
            </div>
            
            <div>
              <span className="text-gold font-semibold">[3]</span> Bank of America Erica: <a href="https://newsroom.bankofamerica.com/content/newsroom/press-releases/2025/08/a-decade-of-ai-innovation--bofa-s-virtual-assistant-erica-surpas.html" target="_blank" rel="noopener noreferrer" className="underline hover:text-text-strong transition-colors">58 million interactions per month</a>. 3 billion total client interactions since 2018, 50 million users served, 98% accuracy rate in responding to customer queries.
            </div>
            
            <div>
              <span className="text-gold font-semibold">[4]</span> HSBC Dynamic Risk Assessment: <a href="https://www.hsbc.com/news-and-views/views/hsbc-views/harnessing-the-power-of-ai-to-fight-financial-crime" target="_blank" rel="noopener noreferrer" className="underline hover:text-text-strong transition-colors">60% reduction in false positive alerts</a>, 2-4x more financial crime detected than previous systems (co-developed with Google Cloud).
            </div>
            
            <div>
              <span className="text-gold font-semibold">[5]</span> JPMorgan Chase Fraud Prevention: <a href="https://www.financealliance.io/ai-in-risk-management-how-banks-can-mitigate-fraud-and-financial-crimes/" target="_blank" rel="noopener noreferrer" className="underline hover:text-text-strong transition-colors">20% reduction in false positive cases</a> for fraud detection. Significantly reduced fraudulent activities including account takeovers and card-not-present fraud.
            </div>
            
            <div className="pt-4 text-text-muted/50 italic border-t border-border-subtle/10 mt-4">
              <strong className="text-text-muted/60 not-italic">Additional verified case studies:</strong> Wells Fargo Fargo (245M autonomous customer interactions), DBS Bank (17% increase in funds saved from scams, 90% reduction in false positives), Capital One Eno (30% faster issue resolution). Full research citations and detailed case studies available upon request.
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
