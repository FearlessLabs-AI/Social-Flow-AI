import { motion } from "motion/react";
import { cn } from "../lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  hover?: boolean;
}

export default function GlassCard({ children, className, delay = 0, hover = true }: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={hover ? { y: -5, transition: { duration: 0.2 } } : {}}
      className={cn(
        "bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[28px] p-6 relative overflow-hidden group",
        hover && "hover:border-white/20 transition-all duration-300",
        className
      )}
    >
      {/* Subtle glow effect */}
      <div className="absolute -top-24 -left-24 w-48 h-48 bg-cyan-500/5 blur-[100px] rounded-full group-hover:bg-cyan-500/10 transition-colors duration-500" />
      <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-purple-500/5 blur-[100px] rounded-full group-hover:bg-purple-500/10 transition-colors duration-500" />
      
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
