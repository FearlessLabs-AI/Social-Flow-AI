import { motion, AnimatePresence } from "motion/react";
import { Zap, ArrowRight, Shield, Sparkles, Globe, BarChart3, AlertCircle } from "lucide-react";
import GlassCard from "./GlassCard";

interface LandingPageProps {
  onStart: () => void;
  error?: string | null;
}

export default function LandingPage({ onStart, error }: LandingPageProps) {
  const features = [
    { icon: Sparkles, title: "AI Magic", description: "Generate viral content in seconds using advanced LLMs." },
    { icon: Globe, title: "Multi-Platform", description: "Optimized for Instagram, X, TikTok, and LinkedIn." },
    { icon: BarChart3, title: "Engagement Focus", description: "Hooks and headlines designed to stop the scroll." },
    { icon: Shield, title: "Saved History", description: "Keep track of all your performing assets in one place." },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col">
      {/* Background blobs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-600/20 blur-[120px] rounded-full animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-600/20 blur-[120px] rounded-full animate-pulse delay-700" />

      {/* Navbar */}
      <nav className="relative z-20 flex items-center justify-between px-6 md:px-12 py-8">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">SocialFlow</span>
        </div>
        <button 
          onClick={onStart}
          className="px-6 py-2 rounded-full glass hover:bg-white/20 transition-all font-medium text-sm"
        >
          Login
        </button>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 max-w-5xl mx-auto py-20">
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="mb-8 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-200 text-sm flex items-start gap-3 max-w-md"
            >
              <AlertCircle className="w-5 h-5 shrink-0 text-red-500" />
              <div className="text-left">
                <p className="font-bold mb-1 tracking-tight">Authentication Issue</p>
                <p>{error}</p>
                <p className="mt-2 text-[10px] opacity-70">
                  Tip: Look for a "Pop-up blocked" icon in your browser's address bar and click "Always allow".
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border-white/10 text-xs font-semibold tracking-wider uppercase text-blue-400 text-glow"
        >
          <Sparkles className="w-3.5 h-3.5" />
          Next-Gen AI Content
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold mb-8 leading-[1.1] tracking-tight"
        >
          Create viral content <br />
          <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            at the speed of thought.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-white/60 text-lg md:text-xl mb-12 max-w-2xl"
        >
          The all-in-one AI engine for creators, marketers, and businesses. 
          Stop staring at blank screens and start winning the feed.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 mb-24"
        >
          <button 
            onClick={onStart}
            className="group px-8 py-4 rounded-2xl bg-white text-black font-bold flex items-center gap-2 hover:bg-white/90 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)]"
          >
            Start Creating Free
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button 
            onClick={() => {
              const features = document.getElementById('features');
              features?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-8 py-4 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 font-bold hover:bg-white/10 transition-all"
          >
            See Examples
          </button>
        </motion.div>

        {/* Example Showcase */}
        <div id="features" className="w-full mt-32 space-y-20">
          <div className="text-left max-w-2xl">
            <h2 className="text-4xl font-bold tracking-tight mb-4">Crafted for every creator</h2>
            <p className="text-white/50 text-lg">Whether you're a developer, entrepreneur, or influencer, SocialFlow scales with your goals.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full text-left">
            {features.map((f, i) => (
              <GlassCard key={i} delay={0.8 + i * 0.1} className="border-white/5">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-4 group-hover:bg-cyan-500/20 transition-colors">
                  <f.icon className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="text-lg font-bold mb-2 tracking-tight">{f.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{f.description}</p>
              </GlassCard>
            ))}
          </div>

          {/* Social Preview Example */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-20">
            <div className="lg:col-span-2">
              <GlassCard className="p-8 border-cyan-400/20" hover={false}>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-cyan-400 to-purple-600" />
                  <div>
                    <h4 className="font-bold">SocialFlow AI</h4>
                    <p className="text-xs text-white/40">Generated 2 minutes ago</p>
                  </div>
                  <div className="ml-auto px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-[10px] font-bold text-cyan-400 uppercase tracking-widest">
                    Twitter Thread
                  </div>
                </div>
                <div className="space-y-4 text-white/90 leading-relaxed font-sans">
                  <p>1/ The future of work isn't "remote" or "office" — it's choice. 🧵</p>
                  <p>2/ We've spent 4 years transitioning. The tools are here. The culture is lagging. Here's how we fix it...</p>
                  <p>3/ Focus on outcomes, not hours. If the work is done by 2 PM, why force 5 PM?</p>
                </div>
                <div className="mt-8 flex gap-4">
                  <div className="h-2 flex-1 bg-white/5 rounded-full overflow-hidden">
                    <div className="w-3/4 h-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
                  </div>
                  <span className="text-[10px] text-white/30 font-bold uppercase">Viral Potential: 88%</span>
                </div>
              </GlassCard>
            </div>
            <div className="flex flex-col gap-6">
              <div className="p-6 rounded-[28px] bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border border-cyan-400/20 flex flex-col justify-center items-center text-center">
                <TrendingUp className="w-8 h-8 text-cyan-400 mb-4" />
                <h4 className="font-bold mb-2">Algorithm Ready</h4>
                <p className="text-xs text-white/50">Every post is tuned for maximum reach based on 2024 social data.</p>
              </div>
              <div className="p-6 rounded-[28px] bg-gradient-to-br from-purple-500/10 to-indigo-600/10 border border-purple-400/20 flex flex-col justify-center items-center text-center">
                <Shield className="w-8 h-8 text-purple-400 mb-4" />
                <h4 className="font-bold mb-2">Safe & Reliable</h4>
                <p className="text-xs text-white/50">Brand-safe content filters ensure you always stay professional.</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="relative z-10 py-12 border-t border-white/5 text-white/30 text-sm text-center">
        &copy; 2026 SocialFlow AI. Made for the next generation of creators.
      </footer>
    </div>
  );
}
