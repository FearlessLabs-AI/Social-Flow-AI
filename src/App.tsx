import { useState, useEffect } from "react";
import LandingPage from "./components/LandingPage";
import Sidebar from "./components/Sidebar";
import GeneratorView from "./components/GeneratorView";
import HistoryView from "./components/HistoryView";
import TemplatesView from "./components/TemplatesView";
import PlatformsView from "./components/PlatformsView";
import { motion, AnimatePresence } from "motion/react";
import { Search, User, Menu, ArrowRight } from "lucide-react";
import { GeneratedContent } from "./types";
import { auth, db } from "./lib/firebase";
import { 
  onAuthStateChanged, 
  signInWithPopup, 
  GoogleAuthProvider,
  signOut,
  User as FirebaseUser
} from "firebase/auth";
import { 
  collection, 
  query, 
  where, 
  orderBy, 
  onSnapshot, 
  deleteDoc, 
  doc,
  getDocFromServer
} from "firebase/firestore";
import { handleFirestoreError, OperationType } from "./lib/firestoreUtils";

export default function App() {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("create");
  const [initialPrompt, setInitialPrompt] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [history, setHistory] = useState<GeneratedContent[]>([]);

  // Mock loading state
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Test connection on boot
    const testConnection = async () => {
      try {
        await getDocFromServer(doc(db, 'test', 'connection'));
      } catch (error) {
        if(error instanceof Error && error.message.includes('the client is offline')) {
          console.error("Please check your Firebase configuration.");
        }
      }
    };
    testConnection();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) {
      setHistory([]);
      return;
    }

    const q = query(
      collection(db, "generated_content"),
      where("userId", "==", user.uid),
      orderBy("timestamp", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({
        ...doc.data()
      })) as GeneratedContent[];
      setHistory(docs);
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, "generated_content");
    });

    return () => unsubscribe();
  }, [user]);

  const handleLogin = async () => {
    setLoginError(null);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error: unknown) {
      console.error("Login failed:", error);
      if (error && typeof error === 'object' && 'code' in error) {
        const errorCode = (error as { code: string }).code;
        if (errorCode === 'auth/popup-blocked') {
          setLoginError("Popup was blocked by your browser. Please allow popups for this site.");
        } else if (errorCode === 'auth/popup-closed-by-user') {
          setLoginError("Login window was closed before completion.");
        } else if (errorCode === 'auth/cancelled-popup-request') {
          setLoginError("A login request is already in progress. Please check your open windows.");
        } else {
          setLoginError("An unexpected error occurred during login. Please try again.");
        }
      } else {
        setLoginError("An unexpected error occurred during login. Please try again.");
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const deleteFromHistory = async (id: string) => {
    try {
      await deleteDoc(doc(db, "generated_content", id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `generated_content/${id}`);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#030712] flex items-center justify-center">
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="relative"
        >
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-[0_0_40px_rgba(59,130,246,0.3)]" />
          <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full" />
        </motion.div>
      </div>
    );
  }

  if (!user) {
    return <LandingPage onStart={handleLogin} error={loginError} />;
  }

  return (
    <div className="flex h-screen bg-mesh overflow-hidden font-sans text-white">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            />
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              className="fixed inset-y-0 left-0 w-64 z-50 md:hidden"
            >
              <Sidebar 
                activeTab={activeTab} 
                setActiveTab={(tab) => {
                  setActiveTab(tab);
                  setIsMobileMenuOpen(false);
                }} 
                onLogout={handleLogout}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout} />

      <main className="flex-1 flex flex-col min-w-0 h-full overflow-hidden relative">
        {/* Header */}
        <header className="h-20 flex items-center justify-between px-6 md:px-10 shrink-0">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 rounded-xl glass hover:bg-white/10"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input 
                type="text" 
                placeholder="Search resources..."
                className="bg-white/5 border border-white/10 rounded-2xl pl-10 pr-4 py-2 text-sm w-64 focus:outline-none focus:border-white/20 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col items-end mr-2">
              <span className="text-sm font-semibold">User</span>
              <span className="text-xs text-white/40">Free Plan</span>
            </div>
            <button className="w-10 h-10 rounded-full border border-white/10 p-0.5 bg-gradient-to-br from-blue-500/20 to-purple-500/20 overflow-hidden">
              <div className="w-full h-full rounded-full bg-white/10 flex items-center justify-center">
                <User className="w-6 h-6 text-white/60" />
              </div>
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto px-6 md:px-10 pb-10 scrollbar-thin scrollbar-thumb-white/10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              {activeTab === "create" && (
                <GeneratorView 
                  onGenerated={() => {}} 
                  initialPrompt={initialPrompt}
                />
              )}
              {activeTab === "history" && (
                <HistoryView history={history} onDelete={deleteFromHistory} />
              )}
              {activeTab === "templates" && (
                <TemplatesView 
                  onSelectTemplate={(prompt) => {
                    setInitialPrompt(prompt);
                    setActiveTab("create");
                  }} 
                />
              )}
              {activeTab === "platforms" && <PlatformsView />}
              {activeTab === "settings" && (
                <div className="max-w-xl mx-auto space-y-6">
                  <h2 className="text-3xl font-bold mb-6">Settings</h2>
                  <div className="glass-dark rounded-3xl p-6 space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold">Dark Mode</h4>
                        <p className="text-xs text-white/40">Keep the premium energy</p>
                      </div>
                      <div className="w-12 h-6 rounded-full bg-blue-500 relative flex items-center px-1">
                        <div className="w-4 h-4 rounded-full bg-white ml-auto shadow-sm" />
                      </div>
                    </div>
                    <div className="pt-6 border-t border-white/5">
                      <h4 className="font-semibold mb-4">Account</h4>
                      <button className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-left hover:bg-white/10 transition-all flex items-center justify-between">
                        <span>Profile Details</span>
                        <ArrowRight className="w-4 h-4 text-white/30" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

