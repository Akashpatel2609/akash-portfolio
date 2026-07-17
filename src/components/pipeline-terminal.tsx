"use client";

import { useEffect, useState, useRef } from "react";
import { RotateCcw, AlertTriangle, CheckCircle, Terminal as TerminalIcon } from "lucide-react";

interface LogLine {
  text: string;
  type: "info" | "success" | "warn" | "accent";
}

const pipelineLogs: LogLine[] = [
  { text: "akashpatel.tech ~ % ./run-analytics-pipeline.sh --verbose", type: "info" },
  { text: "[SYSTEM] Booting Applied AI & BI automation agent...", type: "accent" },
  { text: "[BRONZE] Ingesting raw operational files...", type: "info" },
  { text: "[BRONZE] Connected to Vena, MySQL database, and SharePoint site.", type: "info" },
  { text: "[BRONZE] Downloaded 34,710,298 raw transactional records.", type: "success" },
  { text: "[SILVER] Executing ETL transformation schema...", type: "info" },
  { text: "[SILVER] Resolving relationships using Star Schema data modeling...", type: "accent" },
  { text: "[SILVER] Compiling Power Query & SSIS automation routines...", type: "info" },
  { text: "[SILVER] Operational reporting latency reduced by 6-8 hrs/week.", type: "success" },
  { text: "[GOLD] Running Applied AI Forecasting & Risk models...", type: "info" },
  { text: "[GOLD] Loading neural networks for project scope & sensor analytics...", type: "accent" },
  { text: "[GOLD] Detected sensor anomaly -> averted 7-day project delay risk.", type: "warn" },
  { text: "[SUCCESS] Power BI Executive Dashboard populated successfully.", type: "success" },
  { text: "[SUCCESS] FP&A reporting cycle reduced from 4 hours to 15 minutes.", type: "success" },
  { text: "System idle. Ready for queries.", type: "info" }
];

export function PipelineTerminal() {
  const [logs, setLogs] = useState<LogLine[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    if (!isRunning) return;

    if (currentStep < pipelineLogs.length) {
      const delay = currentStep === 0 ? 500 : Math.random() * 800 + 400;
      const timer = setTimeout(() => {
        setLogs((prev) => [...prev, pipelineLogs[currentStep]]);
        setCurrentStep((prev) => prev + 1);
      }, delay);
      return () => clearTimeout(timer);
    } else {
      setIsRunning(false);
    }
  }, [currentStep, isRunning]);

  const terminalContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalContainerRef.current) {
      terminalContainerRef.current.scrollTop = terminalContainerRef.current.scrollHeight;
    }
  }, [logs]);

  const handleRestart = () => {
    setLogs([]);
    setCurrentStep(0);
    setIsRunning(true);
  };

  return (
    <div className="flex flex-col rounded-2xl border border-white/10 bg-zinc-950/80 shadow-2xl backdrop-blur-md overflow-hidden h-[340px]">
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-zinc-900/50">
        <div className="flex items-center gap-2">
          <div className="size-3 rounded-full bg-red-500/80" />
          <div className="size-3 rounded-full bg-yellow-500/80" />
          <div className="size-3 rounded-full bg-green-500/80" />
          <span className="ml-2 font-mono text-[11px] text-zinc-400 flex items-center gap-1.5">
            <TerminalIcon size={12} />
            akash-data-pipeline.sh
          </span>
        </div>
        <div className="flex items-center gap-2">
          {!isRunning && currentStep >= pipelineLogs.length && (
            <button
              onClick={handleRestart}
              className="flex items-center gap-1 rounded bg-violet-600/20 border border-violet-500/30 px-2 py-0.5 text-[10px] font-mono text-violet-300 hover:bg-violet-600/40 transition"
            >
              <RotateCcw size={10} />
              Re-run
            </button>
          )}
          {isRunning && (
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
            </span>
          )}
        </div>
      </div>

      {/* Terminal Content */}
      <div ref={terminalContainerRef} className="flex-1 overflow-y-auto p-4 font-mono text-xs leading-6 text-zinc-300 space-y-2 select-text">
        {logs.map((log, idx) => {
          let colorClass = "text-zinc-300";
          if (log.type === "success") colorClass = "text-emerald-400";
          if (log.type === "warn") colorClass = "text-amber-400";
          if (log.type === "accent") colorClass = "text-violet-400";
          if (idx === 0) colorClass = "text-white font-semibold";

          return (
            <div key={idx} className="flex gap-2 items-start break-all">
              {log.type === "success" && <CheckCircle size={12} className="text-emerald-400 mt-1 shrink-0" />}
              {log.type === "warn" && <AlertTriangle size={12} className="text-amber-400 mt-1 shrink-0" />}
              <span className={colorClass}>{log.text}</span>
            </div>
          );
        })}
        {isRunning && (
          <div className="flex gap-1 items-center">
            <span className="h-4 w-2 bg-white/70 animate-pulse inline-block" />
          </div>
        )}
      </div>

      {/* Mini Progress Indicator */}
      <div className="px-4 py-2 border-t border-white/5 bg-zinc-900/30 flex items-center justify-between text-[10px] font-mono text-zinc-500">
        <span>STAGES: Bronze ➔ Silver ➔ Gold</span>
        <span>
          {Math.round((currentStep / pipelineLogs.length) * 100)}% Complete
        </span>
      </div>
    </div>
  );
}
