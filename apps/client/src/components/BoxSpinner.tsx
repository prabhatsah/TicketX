// components/ui/DotSpinner.tsx
import React from "react";
import "./ui/box-spinner.css";
import { cn } from "@/lib/utils";

export const BoxSpinner = () => {
  return (
    <div
      className={cn(
        " fixed inset-0 z-[9999] flex  items-center justify-center bg-black/40 transition-opacity backdrop-blur-xs visible opacity-100"
      )}
    >
      <div className="dot-spinner" aria-label="Loading" role="status">
        <div className="loader">
          <div className="loader-square"></div>
          <div className="loader-square"></div>
          <div className="loader-square"></div>
          <div className="loader-square"></div>
          <div className="loader-square"></div>
          <div className="loader-square"></div>
          <div className="loader-square"></div>
        </div>
      </div>
    </div>
  );
};
