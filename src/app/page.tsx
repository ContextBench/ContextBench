"use client";

import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { LeaderboardTable } from "@/components/LeaderboardTable";
import { RetrievalTable } from "@/components/RetrievalTable";
import { StatsCards } from "@/components/StatsCards";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <div className="container px-4 mx-auto flex-1">
        <Hero />
        <StatsCards />

        <Tabs defaultValue="performance" className="w-full">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div className="space-y-0.5">
              <h2 className="text-xl font-bold tracking-tight">Benchmark Results</h2>
              <p className="text-xs text-muted-foreground">Comparative evaluation across multiple metrics.</p>
            </div>
            <TabsList className="h-9 p-1 bg-muted/30 border border-muted/50">
              <TabsTrigger value="performance" className="text-xs px-6 data-[state=active]:bg-background">Performance</TabsTrigger>
              <TabsTrigger value="retrieval" className="text-xs px-6 data-[state=active]:bg-background">Retrieval Analysis</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="performance" className="mt-0 outline-none">
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <LeaderboardTable />
            </motion.div>
          </TabsContent>

          <TabsContent value="retrieval" className="mt-0 outline-none">
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-card rounded-lg border border-muted/40 overflow-hidden shadow-sm">
                <div className="p-4 border-b border-muted/40 bg-muted/5">
                  <h3 className="text-sm font-bold tracking-tight">Retrieval Efficiency & Dynamics</h3>
                </div>
                <div className="p-4">
                  <RetrievalTable />
                </div>
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>

      <footer className="mt-20 py-8 border-t bg-muted/5">
        <div className="container px-4 mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-widest text-muted-foreground/60 font-bold">
          <p>© 2026 ContextBench Research Group</p>
          <div className="flex gap-8">
            <a href="https://github.com/anonymousUser2026/ContextBench" className="hover:text-foreground transition-colors">Documentation</a>
            <a href="https://huggingface.co/datasets/Contextbench/ContextBench" className="hover:text-foreground transition-colors">Data</a>
            <a href="mailto:contact@contextbench.org" className="hover:text-foreground transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
