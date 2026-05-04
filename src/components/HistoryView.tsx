import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, Copy, Check, Trash2, Calendar, Filter, Zap } from "lucide-react";
import GlassCard from "./GlassCard";
import { GeneratedContent } from "../types";
import ReactMarkdown from "react-markdown";

interface HistoryViewProps {
  history: GeneratedContent[];
  onDelete: (id: string) => void;
}

export default function HistoryView({ history, onDelete }: HistoryViewProps) {
  const [search, setSearch] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredHistory = history.filter(item => 
    item.text.toLowerCase().includes(search.toLowerCase()) || 
    item.prompt.toLowerCase().includes(search.toLowerCase()) ||
    item.platform.toLowerCase().includes(search.toLowerCase())
  );

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <h2 className="text-3xl font-bold mb-2">Content Vault</h2>
          <p className="text-white/50">Your library of AI-generated masterpieces.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input 
              type="text" 
              placeholder="Search library..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-2xl pl-11 pr-5 py-3 text-sm w-full md:w-80 focus:outline-none focus:ring-2 focus:ring-cyan-400/30 transition-all font-sans"
            />
          </div>
          <button className="p-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 text-white/60 transition-all">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </header>

      {filteredHistory.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 text-white/20">
          <Calendar className="w-20 h-20 mb-6 opacity-10" />
          <p className="text-xl font-bold tracking-tight">Vault is empty</p>
          <p className="text-sm opacity-60">Generate some content to start your collection.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredHistory.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <GlassCard className="h-full flex flex-col group/card p-8 border-white/5 bg-white/5">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                       <span className="px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-[10px] font-bold uppercase tracking-widest text-cyan-400">
                         {item.platform}
                       </span>
                       <span className="px-3 py-1 rounded-full bg-purple-400/10 border border-purple-400/20 text-[10px] font-bold uppercase tracking-widest text-purple-400">
                         {item.tone}
                       </span>
                    </div>
                    <div className="flex gap-2 opacity-0 group-hover/card:opacity-100 transition-all duration-300 translate-x-2 group-hover/card:translate-x-0">
                      <button 
                        onClick={() => copyToClipboard(item.text, item.id)}
                        className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white transition-all"
                        title="Copy"
                      >
                        {copiedId === item.id ? <Check className="w-4 h-4 text-cyan-400" /> : <Copy className="w-4 h-4" />}
                      </button>
                      <button 
                        onClick={() => onDelete(item.id)}
                        className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-red-500/10 text-white/60 hover:text-red-400 transition-all"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="flex-1 line-clamp-6 text-sm text-white/70 leading-relaxed mb-8 prose prose-invert prose-p:my-0 prose-headings:text-white prose-strong:text-cyan-400 font-sans">
                    <ReactMarkdown>{item.text}</ReactMarkdown>
                  </div>

                  <div className="pt-6 border-t border-white/10 flex items-center justify-between text-[10px] text-white/30 font-bold uppercase tracking-widest">
                    <span className="flex items-center gap-1.5 font-sans">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                      Social Flow
                    </span>
                    <span className="font-mono">{new Date(item.timestamp).toLocaleDateString()}</span>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
