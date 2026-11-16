"use client";

import { useState } from "react";
import Link from "next/link";

type UnitType = "Inches" | "MM" | "CM";

export function GsmCalculatorPageContent() {
  const [unit, setUnit] = useState<UnitType>("Inches");
  const [width, setWidth] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [sheets, setSheets] = useState<string>("");
  const [weightKg, setWeightKg] = useState<string>("");

  const [resultGsm, setResultGsm] = useState<string | null>(null);
  const [error, setError] = useState<string>("");

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const w = parseFloat(width);
    const h = parseFloat(height);
    const s = parseFloat(sheets);
    const wt = parseFloat(weightKg);

    if (isNaN(w) || isNaN(h) || isNaN(s) || isNaN(wt) || w <= 0 || h <= 0 || s <= 0 || wt <= 0) {
      setError("Please enter valid positive numbers for all fields.");
      setResultGsm(null);
      return;
    }

    // Printers Club exact formula:
    // Inches: GSM = (wt * 1550 * 1000) / (w * h * s)
    // CM:     GSM = (wt * 10000 * 1000) / (w * h * s)
    // MM:     GSM = (wt * 1000000 * 1000) / (w * h * s)
    let gsmValue = 0;
    if (unit === "Inches") {
      gsmValue = (wt * 1550 * 1000) / (w * h * s);
    } else if (unit === "CM") {
      gsmValue = (wt * 10000 * 1000) / (w * h * s);
    } else {
      gsmValue = (wt * 1000000 * 1000) / (w * h * s);
    }

    setResultGsm(gsmValue.toFixed(3));
  };

  return (
    <div className="min-h-screen bg-[#fafafa] pb-24 pt-28 sm:pt-32 font-sans">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        {/* Top Header matching reference screenshot */}
        <div className="pb-8 pt-2 text-center">
          <h1 className="text-[26px] sm:text-[32px] font-extrabold tracking-wide text-[#2b2b2b]">
            FREE PAPER GSM CALCULATOR TOOL
          </h1>
          <p className="mx-auto mt-2.5 max-w-2xl text-[13px] text-[#555] leading-relaxed">
            This is a free tool developed by PrintoSync. Can be freely used to calculate
            the Grammage or GSM of any paper. To measure GSM of paper by using our gsm (paper
            weight) calculator, put values in box given below.
          </p>
          <div className="mt-3.5 text-[12px] text-[#666]">
            <Link href="/" className="hover:underline text-[#444]">Home</Link>
            <span className="mx-2 text-gray-400">/</span>
            <span>Paper GSM Calculator</span>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-800 font-medium">Paper GSM Calculator</span>
          </div>
        </div>

        {/* Form Container matching reference image exactly */}
        <div className="mx-auto max-w-xl bg-white p-7 sm:p-9 shadow-sm border border-[#e5e5e5]">
          <form onSubmit={handleCalculate} className="space-y-4">
            {/* SELECT UNIT */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#333] mb-1">
                SELECT UNIT <span className="text-[#d9534f]">*</span>
              </label>
              <div className="relative">
                <select
                  value={unit}
                  onChange={(e) => setUnit(e.target.value as UnitType)}
                  className="w-full appearance-none rounded-none border border-[#ccc] bg-white px-3 py-1.5 text-[13px] text-[#333] outline-none focus:border-[#666] pr-8"
                >
                  <option value="Inches">Inches</option>
                  <option value="MM">MM</option>
                  <option value="CM">CM</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-gray-600">
                  <svg className="size-3.5 fill-current" viewBox="0 0 20 20">
                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* ENTER PAPER WIDTH */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#333] mb-1">
                ENTER PAPER WIDTH <span className="text-[#d9534f]">*</span>
              </label>
              <input
                type="number"
                step="any"
                required
                placeholder="Enter actual width"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                className="w-full rounded-none border border-[#ccc] bg-white px-3 py-1.5 text-[13px] text-[#333] placeholder:text-[#999] outline-none focus:border-[#666]"
              />
            </div>

            {/* ENTER PAPER HEIGHT */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#333] mb-1">
                ENTER PAPER HEIGHT <span className="text-[#d9534f]">*</span>
              </label>
              <input
                type="number"
                step="any"
                required
                placeholder="Enter actual height"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="w-full rounded-none border border-[#ccc] bg-white px-3 py-1.5 text-[13px] text-[#333] placeholder:text-[#999] outline-none focus:border-[#666]"
              />
            </div>

            {/* NUMBER OF SHEETS (TOTAL WEIGHED SHEETS) */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#333] mb-1">
                NUMBER OF SHEETS (TOTAL WEIGHED SHEETS) <span className="text-[#d9534f]">*</span>
              </label>
              <input
                type="number"
                step="any"
                required
                placeholder="Enter number of sheets"
                value={sheets}
                onChange={(e) => setSheets(e.target.value)}
                className="w-full rounded-none border border-[#ccc] bg-white px-3 py-1.5 text-[13px] text-[#333] placeholder:text-[#999] outline-none focus:border-[#666]"
              />
            </div>

            {/* WEIGHT (IN KGS) */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#333] mb-1">
                WEIGHT (IN KGS) <span className="text-[#d9534f]">*</span>
              </label>
              <input
                type="number"
                step="any"
                required
                placeholder="Enter sheets actual weight"
                value={weightKg}
                onChange={(e) => setWeightKg(e.target.value)}
                className="w-full rounded-none border border-[#ccc] bg-white px-3 py-1.5 text-[13px] text-[#333] placeholder:text-[#999] outline-none focus:border-[#666]"
              />
            </div>

            {error && (
              <p className="text-[12px] font-medium text-red-600">{error}</p>
            )}

            {/* Calculate Button matching screenshot: red button */}
            <div className="pt-3 text-center">
              <button
                type="submit"
                className="inline-block rounded-xs bg-[#c9302c] hover:bg-[#ac2925] px-6 py-2 text-[13px] font-medium text-white shadow-xs transition active:scale-[0.99]"
              >
                Calculate Paper GSM
              </button>
            </div>

            {/* Result Box matching reference screenshot */}
            {resultGsm !== null && (
              <div className="mt-5 border border-[#bce8f1] bg-[#d9edf7] py-2.5 px-4 text-center">
                <p className="text-[14px] text-[#31708f]">
                  The above paper is approx{" "}
                  <strong className="text-[#c9302c] font-bold">{resultGsm} GSM</strong>{" "}
                  (+/- 10 GSM)
                </p>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
