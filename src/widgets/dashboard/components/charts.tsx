"use client";

import { motion } from "framer-motion";

interface AnimatedBarChartProps {
  data: number[];
  color?: string;
  height?: number;
  animate?: boolean;
}

export function AnimatedBarChart({
  data,
  color = "from-indigo-600 to-indigo-400",
  height = 120,
  animate = true,
}: AnimatedBarChartProps) {
  const max = Math.max(...data);

  return (
    <div className="flex items-end gap-1" style={{ height }}>
      {data.map((value, i) => (
        <motion.div
          key={i}
          initial={animate ? { height: 0 } : false}
          animate={{ height: `${(value / max) * 100}%` }}
          transition={{ delay: i * 0.04, duration: 0.5, ease: "easeOut" }}
          className={`min-h-[4px] flex-1 rounded-sm bg-gradient-to-t ${color} opacity-90`}
        />
      ))}
    </div>
  );
}

interface AnimatedLineChartProps {
  data: number[];
  color?: string;
  height?: number;
}

export function AnimatedLineChart({
  data,
  color = "#6366f1",
  height = 100,
}: AnimatedLineChartProps) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const width = 100;
  const step = width / (data.length - 1);

  const points = data
    .map((v, i) => {
      const x = i * step;
      const y = height - ((v - min) / range) * (height - 8) - 4;
      return `${x},${y}`;
    })
    .join(" ");

  const areaPoints = `0,${height} ${points} ${width},${height}`;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.polygon
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        points={areaPoints}
        fill="url(#lineGrad)"
      />
      <motion.polyline
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

interface DonutChartProps {
  segments: { value: number; color: string; label: string }[];
  size?: number;
}

export function DonutChart({ segments, size = 80 }: DonutChartProps) {
  const total = segments.reduce((s, seg) => s + seg.value, 0);
  let offset = 0;
  const radius = 16;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} viewBox="0 0 36 36" className="-rotate-90">
        {segments.map((seg) => {
          const pct = seg.value / total;
          const dash = pct * circumference;
          const el = (
            <circle
              key={seg.label}
              cx="18"
              cy="18"
              r={radius}
              fill="none"
              stroke={seg.color}
              strokeWidth="4"
              strokeDasharray={`${dash} ${circumference - dash}`}
              strokeDashoffset={-offset}
              strokeLinecap="round"
            />
          );
          offset += dash;
          return el;
        })}
      </svg>
      <span className="absolute text-[10px] font-semibold text-white/70">{total}</span>
    </div>
  );
}
