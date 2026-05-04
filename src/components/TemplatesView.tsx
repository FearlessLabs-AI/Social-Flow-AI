import { motion } from "motion/react";
import { 
  Sparkles, 
  TrendingUp, 
  Users, 
  ShoppingBag, 
  Mic2, 
  MessageSquare,
  ArrowRight,
  Zap
} from "lucide-react";
import GlassCard from "./GlassCard";

interface Template {
  title: string;
  description: string;
  prompt: string;
  icon: React.ElementType;
  color: string;
}

interface TemplatesViewProps {
  onSelectTemplate: (prompt: string) => void;
}

export default function TemplatesView({ onSelectTemplate }: TemplatesViewProps) {
  const templates: Template[] = [
    {
      title: "Viral Hook",
      description: "A punchy opening dedicated to stopping the scroll.",
      prompt: "Create a viral hook for a video about [topic] that creates immediate curiosity.",
      icon: TrendingUp,
      color: "from-blue-500 to-cyan-400"
    },
    {
      title: "Educational Thread",
      description: "Break down complex topics into easy-to-read threads.",
      prompt: "Write a 5-part educational thread explaining [topic] to beginners with actionable tips.",
      icon: Sparkles,
      color: "from-purple-500 to-indigo-400"
    },
    {
      title: "Product Launch",
      description: "Build hype for your new product or service.",
      prompt: "Generate a hype-building launch post for [product name] that solves [problem] for [target audience].",
      icon: ShoppingBag,
      color: "from-pink-500 to-rose-400"
    },
    {
      title: "Community Story",
      description: "Share a relatable story to connect with your followers.",
      prompt: "Write a relatable, vulnerable story about my journey in [industry] and how I overcame [challenge].",
      icon: Users,
      color: "from-orange-500 to-amber-400"
    },
    {
      title: "Podcast Summary",
      description: "Turn audio content into engaging written posts.",
      prompt: "Summarize a podcast episode about [topic] into 3 key takeaways with a call to listen.",
      icon: Mic2,
      color: "from-emerald-500 to-teal-400"
    },
    {
      title: "Weekly Newsletter",
      description: "Short, punchy summary of your weekly updates.",
      prompt: "Create a 'Week in Review' post highlighting 3 interesting things that happened in [niche] this week.",
      icon: MessageSquare,
      color: "from-cyan-500 to-blue-400"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      <header className="text-center md:text-left">
        <h2 className="text-3xl font-bold mb-2 flex items-center gap-3 justify-center md:justify-start">
          <Zap className="w-8 h-8 text-cyan-400 fill-cyan-400/20" />
          Content Blueprints
        </h2>
        <p className="text-white/50">Start with a high-converting template and customize it to your needs.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template, i) => (
          <motion.div
            key={template.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <GlassCard 
              className="h-full flex flex-col p-8 group cursor-pointer hover:border-cyan-400/30 transition-all border-white/5 bg-white/5"
              onClick={() => onSelectTemplate(template.prompt)}
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${template.color} p-0.5 mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                <div className="w-full h-full rounded-[14px] bg-black/40 backdrop-blur-xl flex items-center justify-center">
                  <template.icon className="w-7 h-7 text-white" />
                </div>
              </div>
              
              <h3 className="text-xl font-bold mb-3 tracking-tight group-hover:text-cyan-400 transition-colors">
                {template.title}
              </h3>
              <p className="text-white/50 text-sm leading-relaxed mb-8 flex-1">
                {template.description}
              </p>

              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-cyan-400 group-hover:gap-4 transition-all">
                Use Template
                <ArrowRight className="w-4 h-4" />
              </div>

              {/* Decorative background element */}
              <div className={`absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-to-br ${template.color} rounded-full blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity`} />
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
