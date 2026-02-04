import React from 'react';

export const Hero = () => {
  return (
    <div className="relative pt-10 pb-6 overflow-hidden">
      <div className="container px-4 mx-auto relative z-10">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-bold tracking-tight mb-3 text-foreground">
            ContextBench
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            A comprehensive benchmark for evaluating multi-file context retrieval and utilization in LLM agents.
          </p>
        </div>
      </div>
      
      {/* Subtle decorative element */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-primary/[0.03] rounded-full blur-3xl -z-10" />
    </div>
  );
};
