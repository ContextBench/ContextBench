"use client";

import React, { useState } from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
  getFilteredRowModel,
  ColumnFiltersState,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { 
  ChevronDown, 
  Info, 
  ArrowUpDown, 
  Search,
  CheckCircle2,
  TrendingUp,
  HelpCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import resultsData from "@/data/results.json";

export type BenchmarkResult = typeof resultsData[0];

const PerformanceBar = ({ value, max }: { value: number; max: number }) => {
  const percentage = (value / max) * 100;
  return (
    <div className="absolute inset-0 -z-10 opacity-[0.05] pointer-events-none">
      <div 
        className="h-full bg-primary transition-all duration-700 ease-out" 
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};

const HeaderWithTooltip = ({ label, tooltip, column }: { label: string; tooltip: string; column: any }) => (
  <TooltipProvider>
    <Tooltip delayDuration={300}>
      <TooltipTrigger asChild>
        <button
          className="flex items-center gap-1.5 hover:text-foreground transition-colors group"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          {label}
          <HelpCircle className="h-3 w-3 text-muted-foreground/50 group-hover:text-muted-foreground transition-colors" />
        </button>
      </TooltipTrigger>
      <TooltipContent className="max-w-xs p-3 text-xs leading-relaxed">
        {tooltip}
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

export const LeaderboardTable = () => {
  const [sorting, setSorting] = useState<SortingState>([
    { id: "performance_pass_at_1", desc: true }
  ]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});

  const maxPass = Math.max(...resultsData.map(r => r.performance.pass_at_1));
  const maxLineF1 = Math.max(...resultsData.map(r => r.performance.line.f1));
  const maxBlockF1 = Math.max(...resultsData.map(r => r.performance.block.f1));
  const maxFileF1 = Math.max(...resultsData.map(r => r.performance.file.f1));

  const columns: ColumnDef<BenchmarkResult>[] = [
    {
      accessorKey: "rank",
      header: "Rank",
      cell: ({ row }) => <span className="font-mono text-muted-foreground/70 font-medium text-xs tabular-nums">#{row.index + 1}</span>,
    },
    {
      accessorKey: "model",
      header: ({ column }) => (
        <button
          className="flex items-center gap-1 hover:text-foreground transition-colors"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Model
          <ArrowUpDown className="h-3 w-3 opacity-30" />
        </button>
      ),
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="font-bold text-foreground tracking-tight text-sm">{row.getValue("model")}</span>
        </div>
      ),
    },
    {
      id: "performance_pass_at_1",
      accessorKey: "performance.pass_at_1",
      header: ({ column }) => (
        <HeaderWithTooltip 
          label="Pass@1" 
          tooltip="Percentage of issues successfully resolved (Pass@1 rate). Higher is better." 
          column={column} 
        />
      ),
      cell: ({ row }) => {
        const val = row.original.performance.pass_at_1;
        const isMax = val === maxPass;
        return (
          <div className="relative flex items-center gap-2 h-full py-2">
            <PerformanceBar value={val} max={maxPass} />
            <span className={cn("font-mono font-bold text-sm tabular-nums", isMax ? "text-primary" : "text-foreground")}>
              {(val * 100).toFixed(1)}%
            </span>
            {isMax && <CheckCircle2 className="h-3 w-3 text-primary opacity-80" />}
          </div>
        );
      },
    },
    {
      id: "performance_line_f1",
      accessorKey: "performance.line.f1",
      header: ({ column }) => (
        <HeaderWithTooltip 
          label="Line F1" 
          tooltip="F1 score at the line level, measuring precise context retrieval accuracy. Primary metric for fine-grained retrieval." 
          column={column} 
        />
      ),
      cell: ({ row }) => {
        const val = row.original.performance.line.f1;
        const isMax = val === maxLineF1;
        return (
          <div className="relative h-full flex items-center px-2">
             <PerformanceBar value={val} max={maxLineF1} />
             <span className={cn("font-mono text-sm tabular-nums", isMax && "font-bold text-primary")}>
               {val.toFixed(3)}
             </span>
          </div>
        );
      },
    },
    {
      id: "performance_block_f1",
      accessorKey: "performance.block.f1",
      header: ({ column }) => (
        <HeaderWithTooltip 
          label="Block F1" 
          tooltip="F1 score at the block level, assessing the ability to retrieve relevant code blocks." 
          column={column} 
        />
      ),
      cell: ({ row }) => {
        const val = row.original.performance.block.f1;
        const isMax = val === maxBlockF1;
        return (
          <div className="relative h-full flex items-center px-2">
            <PerformanceBar value={val} max={maxBlockF1} />
            <span className={cn("font-mono text-sm tabular-nums text-muted-foreground/80", isMax && "font-bold text-foreground")}>
              {val.toFixed(3)}
            </span>
          </div>
        );
      },
    },
    {
      id: "performance_file_f1",
      accessorKey: "performance.file.f1",
      header: ({ column }) => (
        <HeaderWithTooltip 
          label="File F1" 
          tooltip="F1 score at the file level, indicating correct identification of files containing the bug." 
          column={column} 
        />
      ),
      cell: ({ row }) => {
        const val = row.original.performance.file.f1;
        const isMax = val === maxFileF1;
        return (
          <div className="relative h-full flex items-center px-2">
            <PerformanceBar value={val} max={maxFileF1} />
            <span className={cn("font-mono text-sm tabular-nums text-muted-foreground/80", isMax && "font-bold text-foreground")}>
              {val.toFixed(3)}
            </span>
          </div>
        );
      },
    },
  ];

  const toggleRow = (id: string) => {
    setExpandedRows(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const table = useReactTable({
    data: resultsData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center relative max-w-[240px]">
        <Search className="absolute left-3 h-3.5 w-3.5 text-muted-foreground/50" />
        <Input
          placeholder="Filter models..."
          value={(table.getColumn("model")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("model")?.setFilterValue(event.target.value)
          }
          className="pl-9 h-9 text-sm bg-background border-muted/50 shadow-none focus-visible:ring-1 focus-visible:ring-primary/20 transition-all placeholder:text-muted-foreground/40"
        />
      </div>

      <div className="rounded-lg border border-muted/40 bg-card overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/10">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent border-b border-muted/40">
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="font-bold text-foreground py-3 px-4 text-[10px] uppercase tracking-[0.1em]">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
                <TableHead className="w-[40px]"></TableHead>
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <React.Fragment key={row.id}>
                  <TableRow
                    data-state={row.getIsSelected() && "selected"}
                    className={cn(
                      "cursor-pointer transition-all duration-200 border-b border-muted/30 last:border-0",
                      expandedRows[row.id] ? "bg-primary/[0.01]" : "hover:bg-muted/10"
                    )}
                    onClick={() => toggleRow(row.id)}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="py-3 px-4">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                    <TableCell className="px-4">
                      <motion.div
                        animate={{ rotate: expandedRows[row.id] ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="h-3 w-3 text-muted-foreground/30" />
                      </motion.div>
                    </TableCell>
                  </TableRow>
                  
                  <AnimatePresence>
                    {expandedRows[row.id] && (
                      <TableRow className="hover:bg-transparent border-b-0">
                        <TableCell colSpan={columns.length + 1} className="p-0 border-t-0">
                          <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="px-8 pb-8 pt-2">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-muted/5 p-6 rounded-xl border border-muted/30">
                                <div>
                                  <div className="flex items-center gap-2 mb-4 text-primary/80">
                                    <TrendingUp className="h-4 w-4" />
                                    <h4 className="text-[10px] font-bold uppercase tracking-widest">Retrieval Patterns</h4>
                                  </div>
                                  <div className="space-y-3">
                                    {[
                                      { label: "Avg. Steps Per Instance", value: row.original.patterns.avg_steps_per_instance },
                                      { label: "Avg. Lines Per Step", value: row.original.patterns.avg_lines_per_step },
                                      { label: "Avg. Cost Per Instance", value: `$${row.original.patterns.avg_cost_per_instance}`, highlight: true }
                                    ].map((item, i) => (
                                      <div key={i} className="flex justify-between items-center py-2 border-b border-muted/20 last:border-0">
                                        <span className="text-xs text-muted-foreground">{item.label}</span>
                                        <span className={cn("font-mono font-bold text-xs tabular-nums", item.highlight && "text-primary")}>
                                          {item.value}
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                                <div>
                                  <div className="flex items-center gap-2 mb-4 text-indigo-500/80">
                                    <Info className="h-4 w-4" />
                                    <h4 className="text-[10px] font-bold uppercase tracking-widest">Retrieval Dynamics</h4>
                                  </div>
                                  <div className="space-y-3">
                                    {[
                                      { label: "Efficiency", value: row.original.dynamics.efficiency.toFixed(3) },
                                      { label: "Redundancy", value: row.original.dynamics.redundancy.toFixed(3), color: "text-red-500/80" },
                                      { label: "Usage Drop", value: row.original.dynamics.usage_drop.toFixed(3), color: "text-amber-500/80" }
                                    ].map((item, i) => (
                                      <div key={i} className="flex justify-between items-center py-2 border-b border-muted/20 last:border-0">
                                        <span className="text-xs text-muted-foreground">{item.label}</span>
                                        <span className={cn("font-mono font-bold text-xs tabular-nums", item.color)}>
                                          {item.value}
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        </TableCell>
                      </TableRow>
                    )}
                  </AnimatePresence>
                </React.Fragment>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length + 1} className="h-32 text-center text-muted-foreground text-xs italic">
                  No matching models found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
