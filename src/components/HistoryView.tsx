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
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input 
              type="text" 
              placeholder="Search history..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-2xl pl-10 pr-4 py-2.5 text-sm w-full md:w-64 focus:outline-none focus:border-blue-500/50 transition-all"
            />
          </div>
          <button className="p-2.5 rounded-2xl glass hover:bg-white/10 text-white/60">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </header>

      {filteredHistory.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-white/20">
          <Calendar className="w-16 h-16 mb-4 opacity-30" />
          <p className="text-lg font-medium">No results found</p>
          <p className="text-sm">Try a different search or generate more content.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredHistory.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <GlassCard className="h-full flex flex-col group/card">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                       <span className="px-2 py-1 rounded-md bg-blue-500/10 text-blue-400 text-[10px] font-bold uppercase tracking-wider">
                         {item.platform}
                       </span>
                       <span className="px-2 py-1 rounded-md bg-purple-500/10 text-purple-400 text-[10px] font-bold uppercase tracking-wider">
                         {item.tone}
                       </span>
                    </div>
                    <div className="flex gap-1 opacity-0 group-hover/card:opacity-100 transition-opacity">
                      <button 
                        onClick={() => copyToClipboard(item.text, item.id)}
                        className="p-1.5 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-colors"
                      >
                        {copiedId === item.id ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </button>
                      <button 
                        onClick={() => onDelete(item.id)}
                        className="p-1.5 rounded-lg hover:bg-red-500/10 text-white/60 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="flex-1 line-clamp-6 text-sm text-white/80 leading-relaxed mb-6 italic">
                    <ReactMarkdown>{item.text}</ReactMarkdown>
                  </div>

                  <div className="pt-4 border-t border-white/5 flex items-center justify-between text-[10px] text-white/30">
                    <span className="flex items-center gap-1">
                      <Zap className="w-3 h-3" />
                      Social Flow AI
                    </span>
                    <span>{new Date(item.timestamp).toLocaleDateString()}</span>
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
