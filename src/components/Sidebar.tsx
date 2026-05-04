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
      className="hidden md:flex flex-col w-64 bg-white/5 backdrop-blur-2xl border border-white/10 m-4 rounded-[28px] p-6"
    >
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-cyan-400 to-purple-600 flex items-center justify-center shadow-[0_0_15px_rgba(34,211,238,0.4)]">
          <Zap className="w-5 h-5 text-white text-glow" />
        </div>
        <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
          SocialFlow
        </h1>
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group",
              activeTab === item.id 
                ? "bg-white/10 text-cyan-400 border border-white/10 font-medium" 
                : "text-white/50 hover:text-white hover:bg-white/5"
            )}
          >
            <item.icon className={cn(
              "w-5 h-5 transition-transform duration-300",
              activeTab === item.id ? "scale-110" : "group-hover:scale-110"
            )} />
            <span>{item.label}</span>
            {activeTab === item.id && (
              <motion.div 
                layoutId="active-indicator"
                className="ml-auto w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]"
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
