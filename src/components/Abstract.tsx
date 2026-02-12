"use client";

import React from 'react';
import { motion } from "framer-motion";

export const Abstract = () => {
  return (
    <section className="py-20 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="space-y-8"
      >
        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/20 to-primary/40" />
          <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-primary/60">Abstract</h2>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent via-primary/20 to-primary/40" />
        </div>
        
        <div className="space-y-6 text-base md:text-lg leading-relaxed text-muted-foreground font-sans">
          <p>
            <span className="text-foreground font-bold">LLM-based coding agents</span> have shown strong performance on automated issue resolution benchmarks, yet existing evaluations largely focus on final task success, providing limited insight into how agents retrieve and use code context during problem solving.
          </p>
          <p>
            We introduce <span className="text-foreground font-semibold italic">ContextBench</span>, a process-oriented evaluation of context retrieval in coding agents. 
            ContextBench consists of 1,136 issue-resolution tasks from 66 repositories across eight programming languages, each augmented with human-annotated gold contexts. 
            We further implement an automated evaluation framework that tracks agent trajectories and measures context recall, precision, and efficiency throughout issue resolution.
          </p>
          <p>
            Using ContextBench, we evaluate four frontier LLMs and five coding agents. 
            Our results show that sophisticated agent scaffolding yields only marginal gains in context retrieval (<span className="text-primary font-medium italic">"The Bitter Lesson"</span> of coding agents), 
            LLMs consistently favor recall over precision, and substantial gaps exist between explored and utilized context. 
            ContextBench augments existing end-to-end benchmarks with intermediate gold-context metrics that unbox the issue-resolution process, offering valuable signals for guiding LLM reasoning in software tasks.
          </p>
        </div>
      </motion.div>
    </section>
  );
};
