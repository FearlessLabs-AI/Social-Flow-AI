import { motion } from "motion/react";
import { 
  Instagram, 
  Twitter, 
  Linkedin, 
  Facebook, 
  MessageCircle,
  Zap,
  CheckCircle2,
  BarChart3,
  Globe
} from "lucide-react";
import GlassCard from "./GlassCard";

export default function PlatformsView() {
  const platformStats = [
    {
      name: "Instagram",
      icon: Instagram,
      color: "from-pink-500 via-purple-500 to-orange-500",
      tips: [
        "First 3 lines are crucial for the hook.",
        "Use 3-5 relevant hashtags (mix of broad and niche).",
        "Aesthetic formatting with bullet points improves readability.",
        "Encourage saves and shares over likes."
      ],
      bestTime: "Monday & Thursday @ 11 AM - 1 PM"
    },
    {
      name: "X (Twitter)",
      icon: Twitter,
      color: "from-blue-400 to-blue-600",
      tips: [
        "Threads get 4x more engagement than single posts.",
        "Tag relevant creators to increase visibility.",
        "Use visually punchy charts or memes.",
        "Reply to your own best tweets to bump them."
      ],
      bestTime: "Tue & Wed @ 9 AM - 10 AM"
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      color: "from-blue-600 to-blue-800",
      tips: [
        "Focus on professional storytelling or 'hot takes'.",
        "Avoid external links in the main post (put in comments).",
        "Tag companies mentioned in your post.",
        "Longer, well-structured text performs best here."
      ],
      bestTime: "Tue, Wed, Thu @ 10 AM - 12 PM"
    },
    {
      name: "TikTok & Reels",
      icon: Zap,
      color: "from-cyan-400 to-blue-500",
      tips: [
        "Hook within the first 1.5 seconds.",
        "Use trending audio but keep it at low volume.",
        "Visual variety every 2-3 seconds keeps tension.",
        "Captions should be short and direct."
      ],
      bestTime: "Friday @ 7 PM - 9 PM"
    },
    {
      name: "Facebook",
      icon: Facebook,
      color: "from-blue-500 to-blue-700",
      tips: [
        "Shareable, relatable family/community content.",
        "Video content (1-3 mins) performs best.",
        "Include a clear call to action in every post.",
        "Groups are local goldmines for engagement."
      ],
      bestTime: "Weekend @ 9 AM - 11 AM"
    },
    {
      name: "WhatsApp Status",
      icon: MessageCircle,
      color: "from-green-400 to-green-600",
      tips: [
        "Keep it highly personal and informal.",
        "Use status as a 'behind the scenes' feed.",
        "Direct CTA to reply for high conversion.",
        "Limit to 3-5 statuses per 24 hours."
      ],
      bestTime: "Daily @ 8 AM & 8 PM"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-20">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-bold mb-2 flex items-center gap-3 justify-center md:justify-start font-sans">
            <Globe className="w-8 h-8 text-cyan-400" />
            Platform Optimization
          </h2>
          <p className="text-white/50">Maximize your reach with platform-specific strategies.</p>
        </div>
        
        <div className="flex items-center gap-4 bg-white/5 px-4 py-2 rounded-2xl border border-white/10">
          <BarChart3 className="w-5 h-5 text-cyan-400" />
          <div>
            <p className="text-[10px] text-white/40 uppercase font-black">Global Traffic</p>
            <p className="text-xs font-bold font-mono">PEAK: 14:00 - 21:00 UTC</p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {platformStats.map((platform, i) => (
          <motion.div
            key={platform.name}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
          >
            <GlassCard className="h-full flex flex-col p-8 border-white/5 bg-white/5">
              <div className="flex items-center gap-4 mb-8">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${platform.color} flex items-center justify-center shadow-lg shadow-black/20`}>
                  <platform.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold tracking-tight">{platform.name}</h3>
                  <p className="text-[10px] text-white/40 uppercase font-black tracking-widest">Growth Guide</p>
                </div>
              </div>

              <div className="flex-1 space-y-4 mb-8">
                {platform.tips.map((tip, idx) => (
                  <div key={idx} className="flex gap-3 text-sm text-white/70">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <p>{tip}</p>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-white/5">
                <div className="flex justify-between items-center bg-white/5 p-3 rounded-xl border border-white/5">
                  <span className="text-[10px] text-white/30 uppercase font-bold">Best Time to Post:</span>
                  <span className="text-xs font-bold text-cyan-400">{platform.bestTime}</span>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
