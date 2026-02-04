import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Users, Target, Zap, TrendingUp } from "lucide-react";
import resultsData from "@/data/results.json";

export const StatsCards = () => {
  const totalModels = resultsData.length;
  const bestPassAt1 = Math.max(...resultsData.map(r => r.performance.pass_at_1));
  const avgEfficiency = resultsData.reduce((acc, r) => acc + r.dynamics.efficiency, 0) / totalModels;
  const avgLineF1 = resultsData.reduce((acc, r) => acc + r.performance.line.f1, 0) / totalModels;

  const stats = [
    {
      label: "Total Models",
      value: totalModels,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50/50"
    },
    {
      label: "Best Pass@1",
      value: `${(bestPassAt1 * 100).toFixed(1)}%`,
      icon: Target,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50/50"
    },
    {
      label: "Avg. Efficiency",
      value: avgEfficiency.toFixed(3),
      icon: Zap,
      color: "text-amber-600",
      bgColor: "bg-amber-50/50"
    },
    {
      label: "Avg. Line F1",
      value: avgLineF1.toFixed(3),
      icon: TrendingUp,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50/50"
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
      {stats.map((stat, index) => (
        <Card key={index} className="border-none shadow-none bg-muted/20">
          <CardContent className="p-4 flex items-center gap-4">
            <div className={`p-2 rounded-lg ${stat.bgColor} shrink-0`}>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/80">{stat.label}</p>
              <h3 className="text-lg font-bold tracking-tight">{stat.value}</h3>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
