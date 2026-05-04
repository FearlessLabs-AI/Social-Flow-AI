import { motion } from "motion/react";
import { cn } from "../lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  hover?: boolean;
  onClick?: () => void;
}

export default function GlassCard({ children, className, delay = 0, hover = true, onClick }: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={hover ? { y: -5, transition: { duration: 0.2 } } : {}}
      onClick={onClick}
      className={cn(
        "glass-card p-6 shimmer group transition-all duration-500",
        hover && "hover:border-white/20 hover:bg-white/[0.05] hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]",
        className
      )}
    >
      {/* Subtle background glow */}
      <div className="absolute -top-32 -left-32 w-64 h-64 bg-cyan-500/[0.03] blur-[100px] rounded-full group-hover:bg-cyan-500/[0.08] transition-colors duration-700" />
      <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-purple-500/[0.03] blur-[100px] rounded-full group-hover:bg-purple-500/[0.08] transition-colors duration-700" />
      
      <div className="relative z-10 h-full flex flex-col">{children}</div>
    </motion.div>
  );
}
