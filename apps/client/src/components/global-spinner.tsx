"use client";

import { useLoading } from "@/context/LoadingContext";
import { Bubbles, Loader2, Loader2Icon } from "lucide-react";
import { cn } from "@/lib/utils";

export const GlobalSpinner = () => {
  const { isLoading } = useLoading();

  return (
    <div
      className={cn(
        " fixed inset-0 z-[9999] flex  items-center justify-center bg-black/40 transition-opacity backdrop-blur-xs",
        isLoading ? "visible opacity-100" : "invisible opacity-0"
      )}
    >
      <Bubbles className="h-12 w-12 animate-spin text-primary" />
      {/* <span className="text-xl text-white/50">Loading ...</span> */}
    </div>
  );
};
