import { 
  LayoutDashboard, 
  History, 
  Settings, 
  PlusCircle, 
  LogOut,
  Zap
} from "lucide-react";
import { motion } from "motion/react";
import { cn } from "../lib/utils";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
}

export default function Sidebar({ activeTab, setActiveTab, onLogout }: SidebarProps) {
  const menuItems = [
    { id: 'create', label: 'Create', icon: PlusCircle },
    { id: 'history', label: 'History', icon: History },
    { id: 'templates', label: 'Templates', icon: LayoutDashboard },
    { id: 'platforms', label: 'Platforms', icon: Zap },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="hidden md:flex flex-col w-64 glass-dark m-4 rounded-[32px] p-6 relative z-50 shimmer"
    >
      <div className="flex items-center gap-3 mb-10 px-2 relative z-10">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-400 to-purple-600 flex items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-transform hover:rotate-12">
          <Zap className="w-6 h-6 text-white text-glow fill-white/20" />
        </div>
        <h1 className="text-xl font-bold tracking-tighter bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
          SocialFlow
        </h1>
      </div>

      <nav className="flex-1 space-y-2 relative z-10">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-500 group relative overflow-hidden",
              activeTab === item.id 
                ? "bg-white/10 text-cyan-400 border border-white/10 font-bold shadow-[0_4px_12px_rgba(0,0,0,0.1)]" 
                : "text-white/40 hover:text-white hover:bg-white/5"
            )}
          >
            <item.icon className={cn(
              "w-5 h-5 transition-transform duration-500",
              activeTab === item.id ? "scale-110 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]" : "group-hover:scale-110"
            )} />
            <span className="tracking-tight">{item.label}</span>
            {activeTab === item.id && (
              <motion.div 
                layoutId="active-indicator"
                className="ml-auto w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,1)]"
              />
            )}
          </button>
        ))}
      </nav>

      <div className="mt-8 mb-8 p-4 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl border border-white/10">
        <p className="text-[10px] text-white/50 mb-1 font-bold tracking-widest uppercase">Tokens Left</p>
        <p className="text-sm font-bold tracking-tight">12,400 <span className="text-white/30 font-normal">/ 20k</span></p>
        <div className="w-full h-1 bg-white/10 rounded-full mt-3 overflow-hidden">
          <div className="w-2/3 h-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.5)]" />
        </div>
      </div>

      <div className="pt-6 border-t border-white/10 mt-auto">
        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-white/50 hover:text-red-400 hover:bg-red-500/10 transition-all duration-300"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </motion.aside>
  );
}
