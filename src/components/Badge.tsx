
import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  label: string;
  variant?: "skill" | "tool" | "role" | "location" | "job-type" | "seniority";
  size?: "sm" | "md" | "lg";
}

const Badge: React.FC<BadgeProps> = ({ 
  label, 
  variant = "skill",
  size = "sm" 
}) => {
  const baseClasses = "inline-flex items-center rounded-full font-medium leading-4";
  
  const variants = {
    "skill": "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
    "tool": "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
    "role": "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
    "location": "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    "job-type": "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-400",
    "seniority": "bg-slate-100 text-slate-800 dark:bg-slate-900/30 dark:text-slate-400",
  };
  
  const sizes = {
    "sm": "text-xs px-2 py-0.5",
    "md": "text-sm px-2.5 py-0.5",
    "lg": "text-sm px-3 py-1",
  };
  
  return (
    <span className={cn(
      baseClasses,
      variants[variant],
      sizes[size]
    )}>
      {label}
    </span>
  );
};

export default Badge;
