"use client";

import React from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Info, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";
import resultsData from "@/data/results.json";

export type BenchmarkResult = typeof resultsData[0];

const columns: ColumnDef<BenchmarkResult>[] = [
  {
    accessorKey: "model",
    header: "Model",
    cell: ({ row }) => <span className="font-bold text-sm tracking-tight">{row.getValue("model")}</span>,
  },
  {
    accessorKey: "patterns.avg_steps_per_instance",
    header: "Avg. Steps ↓",
    cell: ({ row }) => {
      const val = row.original.patterns.avg_steps_per_instance;
      const isMin = val === Math.min(...resultsData.map(r => r.patterns.avg_steps_per_instance));
      return <span className={cn("font-mono text-xs tabular-nums", isMin && "text-primary font-bold")}>{val}</span>;
    },
  },
  {
    accessorKey: "patterns.avg_lines_per_step",
    header: "Lines / Step",
    cell: ({ row }) => <span className="font-mono text-xs tabular-nums">{row.original.patterns.avg_lines_per_step}</span>,
  },
  {
    accessorKey: "dynamics.efficiency",
    header: "Efficiency ↑",
    cell: ({ row }) => {
      const val = row.original.dynamics.efficiency;
      const isMax = val === Math.max(...resultsData.map(r => r.dynamics.efficiency));
      return (
        <span className={cn("font-mono text-xs tabular-nums", isMax ? "text-emerald-600 font-bold" : "text-foreground")}>
          {val.toFixed(3)}
        </span>
      );
    },
  },
  {
    accessorKey: "dynamics.redundancy",
    header: "Redundancy ↓",
    cell: ({ row }) => {
      const val = row.original.dynamics.redundancy;
      const isMin = val === Math.min(...resultsData.map(r => r.dynamics.redundancy));
      return (
        <span className={cn("font-mono text-xs tabular-nums", isMin ? "text-primary font-bold" : "text-red-500/80")}>
          {val.toFixed(3)}
        </span>
      );
    },
  },
  {
    accessorKey: "patterns.avg_cost_per_instance",
    header: "Avg. Cost ↓",
    cell: ({ row }) => {
      const val = row.original.patterns.avg_cost_per_instance;
      const isMin = val === Math.min(...resultsData.map(r => r.patterns.avg_cost_per_instance));
      return (
        <div className={cn("flex items-center gap-0.5 font-mono text-xs tabular-nums font-bold", isMin && "text-emerald-600")}>
          <DollarSign className="h-3 w-3" />
          {val.toFixed(2)}
        </div>
      );
    },
  },
];

export const RetrievalTable = () => {
  const table = useReactTable({
    data: resultsData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="w-full">
      <div className="rounded-lg border border-muted/30">
        <Table>
          <TableHeader className="bg-muted/5">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent border-b border-muted/30">
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="font-bold text-foreground py-3 px-4 text-[10px] uppercase tracking-widest">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} className="border-b border-muted/20 last:border-0 hover:bg-muted/5">
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="py-3 px-4">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="mt-4 p-3 bg-muted/20 rounded-lg border border-muted/30 text-[11px] text-muted-foreground flex gap-3 leading-relaxed">
        <Info className="h-4 w-4 shrink-0 text-primary opacity-60" />
        <p>
          <strong className="text-foreground">Efficiency</strong> measures useful context per step. 
          <strong className="text-foreground ml-2">Redundancy</strong> indicates retrieval overlap.
          Higher efficiency and lower redundancy optimize performance-to-cost ratios.
        </p>
      </div>
    </div>
  );
};
