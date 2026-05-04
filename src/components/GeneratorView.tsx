import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Instagram, 
  Twitter, 
  Linkedin, 
  Zap, 
  Sparkles, 
  Copy, 
  Check, 
  RotateCcw,
  Send,
  Loader2
} from "lucide-react";
import GlassCard from "./GlassCard";
import { Platform, Tone, GeneratedContent } from "../types";
import { generateSocialContent } from "../services/geminiService";
import { db, auth } from "../lib/firebase";
import { setDoc, doc } from "firebase/firestore";
import { handleFirestoreError, OperationType } from "../lib/firestoreUtils";
import ReactMarkdown from "react-markdown";
import { cn } from "../lib/utils";

interface GeneratorViewProps {
  onGenerated: (content: GeneratedContent) => void;
}

export default function GeneratorView({ onGenerated }: GeneratorViewProps) {
  const [prompt, setPrompt] = useState("");
  const [platform, setPlatform] = useState<Platform>('instagram');
  const [tone, setTone] = useState<Tone>('funny');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<GeneratedContent | null>(null);
  const [copied, setCopied] = useState(false);

  const platforms: { id: Platform; icon: React.ElementType; label: string }[] = [
    { id: 'instagram', icon: Instagram, label: 'Instagram' },
    { id: 'twitter', icon: Twitter, label: 'X (Twitter)' },
    { id: 'tiktok', icon: Zap, label: 'TikTok' },
    { id: 'linkedin', icon: Linkedin, label: 'LinkedIn' },
    { id: 'ads', icon: Send, label: 'Ad Copy' },
  ];

  const tones: { id: Tone; label: string }[] = [
    { id: 'funny', label: 'Funny' },
    { id: 'professional', label: 'Professional' },
    { id: 'viral', label: 'Viral' },
    { id: 'luxury', label: 'Luxury' },
    { id: 'gen-z', label: 'Gen Z' },
  ];

  const handleGenerate = async () => {
    if (!prompt.trim() || !auth.currentUser) return;
    
    setIsGenerating(true);
    setResult(null);
    
    try {
      const generatedText = await generateSocialContent(prompt, platform, tone);
      const contentId = Math.random().toString(36).substr(2, 9);
      const newContent: GeneratedContent = {
        id: contentId,
        text: generatedText,
        platform,
        tone,
        prompt,
        timestamp: Date.now(),
        userId: auth.currentUser.uid,
      };

      // Save to Firestore
      await setDoc(doc(db, "generated_content", contentId), newContent);
      
      setResult(newContent);
      onGenerated(newContent);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, "generated_content");
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    if (!result) return;
    navigator.clipboard.writeText(result.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <header className="mb-10 text-center md:text-left">
        <h2 className="text-3xl font-bold mb-2">Create Something Viral</h2>
        <p className="text-white/50">Describe what you want to create and let SocialFlow handle the rest.</p>
      </header>

      {/* Input Section */}
      <GlassCard className="p-0 border-white/5 bg-white/5 backdrop-blur-3xl rounded-[32px]" hover={false}>
        <div className="flex flex-col gap-4 p-6">
          <div className="flex flex-wrap gap-2 mb-4">
            {platforms.map((p) => (
              <button
                key={p.id}
                onClick={() => setPlatform(p.id)}
                className={cn(
                  "flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300",
                  platform === p.id 
                    ? "bg-cyan-400/20 text-cyan-300 border border-cyan-400/30 shadow-[0_0_15px_rgba(34,211,238,0.2)]" 
                    : "bg-white/5 text-white/50 border border-white/10 hover:bg-white/10 hover:text-white"
                )}
              >
                <p.icon className="w-4 h-4" />
                {p.label}
              </button>
            ))}
          </div>

          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe your content idea... (e.g. A thread about the future of remote work for developers)"
            className="w-full h-40 bg-white/5 border border-white/10 rounded-2xl p-5 text-lg placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-cyan-400/30 transition-all resize-none"
          />

          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-6 -mx-2">
            <div className="flex items-center gap-2 p-2 bg-white/5 rounded-xl border border-white/5">
              <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest pl-2">Tone:</span>
              <div className="flex gap-1.5">
                {tones.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTone(t.id)}
                    className={cn(
                      "px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-300",
                      tone === t.id 
                        ? "bg-cyan-400/10 text-cyan-400 border border-cyan-400/20 shadow-sm" 
                        : "text-white/40 hover:text-white/60"
                    )}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={isGenerating || !prompt.trim()}
              className="w-full md:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 font-bold flex items-center justify-center gap-2 hover:scale-[1.03] transition-all disabled:opacity-50 disabled:scale-100 shadow-[0_0_20px_rgba(34,211,238,0.3)] active:scale-95"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 text-glow" />
                  Generate Content
                </>
              )}
            </button>
          </div>
        </div>
      </GlassCard>

      {/* Result Section */}
      <AnimatePresence mode="wait">
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
          >
            <GlassCard className="relative group overflow-visible" hover={false}>
              <div className="absolute -top-3 -right-3 flex gap-2">
                <button 
                  onClick={copyToClipboard}
                  className="w-10 h-10 rounded-xl bg-white text-black flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                  title="Copy to clipboard"
                >
                  {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                </button>
                <button 
                  onClick={handleGenerate}
                  className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                  title="Regenerate"
                >
                  <RotateCcw className="w-5 h-5" />
                </button>
              </div>

              <div className="prose prose-invert max-w-none prose-p:leading-relaxed prose-pre:bg-black/40 prose-pre:p-4 prose-pre:rounded-xl">
                <ReactMarkdown>{result.text}</ReactMarkdown>
              </div>

              <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-white/30">
                <span className="flex items-center gap-1.5 capitalize">
                  <Zap className="w-3 h-3 text-blue-400" />
                  {result.platform} • {result.tone}
                </span>
                <span>{new Date(result.timestamp).toLocaleTimeString()}</span>
              </div>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>

      {!result && !isGenerating && (
        <div className="flex flex-col items-center justify-center py-20 text-white/20">
          <Zap className="w-16 h-16 mb-4 opacity-50" />
          <p className="text-lg">Your magic content will appear here</p>
        </div>
      )}
    </div>
  );
}
