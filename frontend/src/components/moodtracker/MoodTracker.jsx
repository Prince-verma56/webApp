// src/pages/MoodTracker.jsx
import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
    Camera,
    Smile,
    BarChart3,
    Menu,
    X,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    Legend,
} from "recharts";

/* =========================
   🔧 Size controls — edit these values to change layout sizes
   - SIDEBAR_EXPANDED_W / SIDEBAR_COLLAPSED_W: sidebar sizes (px)
   - MIDDLE_FLEX / RIGHT_FLEX: ratio between center and right columns (flex)
   - CAMERA_CARD_H: outer camera card height (px)
   - CAMERA_INNER_H: inner camera feed area height (px)
   - EMOJI_GRID_ROWS: how many columns on small screens
   ========================= */
const SIDEBAR_EXPANDED_W = 256; // px
const SIDEBAR_COLLAPSED_W = 64; // px
const MIDDLE_FLEX = 2.6; // larger = center column wider
const RIGHT_FLEX = 1.0; // smaller = right column narrower
const CAMERA_CARD_H = 520; // px (outer camera card)
const CAMERA_INNER_H = 380; // px (inner camera feed area)
const EMOJI_GRID_COLS_SM = 6; // small-screen emoji grid columns

/* ===== sample data ===== */
const initialHistory = [
    { day: "Mon", mood: 4.2, anxiety: 30, depression: 25 },
    { day: "Tue", mood: 3.8, anxiety: 35, depression: 30 },
    { day: "Wed", mood: 3.2, anxiety: 45, depression: 40 },
    { day: "Thu", mood: 4.5, anxiety: 25, depression: 20 },
    { day: "Fri", mood: 4.0, anxiety: 30, depression: 28 },
    { day: "Sat", mood: 4.6, anxiety: 22, depression: 18 },
    { day: "Sun", mood: 3.9, anxiety: 34, depression: 29 },
];

const emojis = [
    { mood: "Happy", emoji: "😊", values: { anxiety: 18, depression: 10, moodScore: 4.8 } },
    { mood: "Sad", emoji: "😔", values: { anxiety: 48, depression: 62, moodScore: 2.0 } },
    { mood: "Angry", emoji: "😡", values: { anxiety: 55, depression: 40, moodScore: 2.6 } },
    { mood: "Anxious", emoji: "😟", values: { anxiety: 72, depression: 45, moodScore: 1.9 } },
    { mood: "Calm", emoji: "😌", values: { anxiety: 12, depression: 8, moodScore: 5.0 } },
    { mood: "Neutral", emoji: "😐", values: { anxiety: 32, depression: 28, moodScore: 3.5 } },
];

const menu = [
    { id: "mood", label: "Mood Tracker", icon: <Camera size={18} /> },
    { id: "reports", label: "Reports", icon: <BarChart3 size={18} /> },
];

/* ===== page ===== */
export default function MoodTracker() {
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [page, setPage] = useState("mood"); // 'mood' | 'reports'
    const [history, setHistory] = useState(initialHistory);
    const [selectedMood, setSelectedMood] = useState(null);
    const [anxiety, setAnxiety] = useState(35);
    const [depression, setDepression] = useState(30);
    const [moodScore, setMoodScore] = useState(3.9);

    const sidebarRef = useRef(null);

    /* update today's values when user selects an emoji */
    function handleSelectEmoji(emo) {
        setSelectedMood(emo.mood);
        setAnxiety(emo.values.anxiety);
        setDepression(emo.values.depression);
        setMoodScore(emo.values.moodScore);

        setHistory(prev => {
            const copy = [...prev];
            const lastIndex = copy.length - 1;
            copy[lastIndex] = {
                ...copy[lastIndex],
                mood: Number(emo.values.moodScore),
                anxiety: Number(emo.values.anxiety),
                depression: Number(emo.values.depression),
            };
            return copy;
        });

        // small visual feedback (scale) using CSS class + short timeout
        const el = document.querySelector(`.emoji-${CSS.escape(emo.mood)}`);
        if (el) {
            el.classList.add("scale-feedback");
            window.setTimeout(() => el.classList.remove("scale-feedback"), 220);
        }
    }

    function handleReset() {
        setSelectedMood(null);
        setAnxiety(35);
        setDepression(30);
        setMoodScore(3.9);
        setHistory(initialHistory);
    }

    useEffect(() => {
        function onResize() {
            if (window.innerWidth >= 768) setMobileOpen(false);
        }
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    /* small helper to compute style for sidebar width animation for Framer */
    const sidebarWidth = collapsed ? SIDEBAR_COLLAPSED_W : SIDEBAR_EXPANDED_W;

    return (
        <div
            className="flex h-screen text-black"
            style={{ background: "linear-gradient(180deg,#e9d7ff 0%, #ffd7e6 100%)" }} // lavender -> baby pink
        >
            {/* ======================
          Desktop Sidebar (animated width + label fade/slide)
          ====================== */}
            <motion.aside
                ref={sidebarRef}
                animate={{ width: sidebarWidth }}
                transition={{ duration: 0.28, ease: "easeOut" }}
                className="hidden md:flex flex-col border-r border-black/6 bg-white/40 backdrop-blur"
                style={{ minWidth: SIDEBAR_COLLAPSED_W }}
            >
                {/* header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-black/6">
                    <div className="flex items-center gap-3">
                        <div
                            className="w-9 h-9 rounded-md flex items-center justify-center"
                            style={{ background: "linear-gradient(135deg,#cbb4ff,#ffc1e3)" }}
                        >
                            <Smile />
                        </div>

                        {/* label animates: hide when collapsed */}
                        <motion.span
                            initial={false}
                            animate={{ opacity: collapsed ? 0 : 1, x: collapsed ? -8 : 0 }}
                            transition={{ duration: 0.22 }}
                            className="text-lg font-semibold"
                            aria-hidden={collapsed}
                        >
                            MoodTracker
                        </motion.span>
                    </div>

                    <button
                        onClick={() => setCollapsed(s => !s)}
                        className="p-2 rounded-md hover:bg-black/6"
                        aria-label="Toggle sidebar"
                    >
                        {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
                    </button>
                </div>

                {/* menu */}
                <nav className="flex-1 p-3 space-y-2">
                    {menu.map(m => {
                        const active = page === m.id;
                        return (
                            <button
                                key={m.id}
                                onClick={() => setPage(m.id)}
                                className={`w-full flex items-center gap-3 px-3 py-2 rounded-md transition-all ${active
                                        ? "bg-gradient-to-r from-[#cbb4ff] to-[#ffc1e3] text-black shadow-sm"
                                        : "hover:bg-black/6 text-black/80"
                                    }`}
                                aria-pressed={active}
                            >
                                <div className="w-6 h-6 flex items-center justify-center">{m.icon}</div>

                                <motion.span
                                    initial={false}
                                    animate={{ opacity: collapsed ? 0 : 1, x: collapsed ? -8 : 0 }}
                                    transition={{ duration: 0.18 }}
                                    className="truncate"
                                    aria-hidden={collapsed}
                                >
                                    {m.label}
                                </motion.span>
                            </button>
                        );
                    })}

                    <hr className="border-black/6 my-2" />

                    <button
                        onClick={() => alert("Open More")}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-black/6 text-black/80"
                    >
                        <div className="w-6 h-6 flex items-center justify-center"><Menu size={16} /></div>
                        <motion.span
                            initial={false}
                            animate={{ opacity: collapsed ? 0 : 1, x: collapsed ? -8 : 0 }}
                            transition={{ duration: 0.18 }}
                            aria-hidden={collapsed}
                        >
                            More
                        </motion.span>
                    </button>
                </nav>

                {/* user */}
                <div className="p-3 border-t border-black/6">
                    <div className="flex items-center gap-3">
                        <img src="https://i.pravatar.cc/40?img=12" alt="avatar" className="w-9 h-9 rounded-full" />
                        <div className="overflow-hidden">
                            <motion.div
                                initial={false}
                                animate={{ opacity: collapsed ? 0 : 1, x: collapsed ? -8 : 0 }}
                                transition={{ duration: 0.18 }}
                                aria-hidden={collapsed}
                            >
                                <div className="text-sm font-medium">Prince</div>
                                <div className="text-xs text-black/60">you@domain.com</div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </motion.aside>

            {/* ======================
          Mobile: topbar button + overlay sidebar
          ====================== */}
            <div className="md:hidden fixed top-4 left-4 z-40">
                <button
                    onClick={() => setMobileOpen(s => !s)}
                    className="p-2 rounded-md bg-white/70 shadow"
                    aria-label="open menu"
                >
                    {mobileOpen ? <X size={18} /> : <Menu size={18} />}
                </button>
            </div>

            {mobileOpen && (
                <div className="md:hidden fixed inset-0 z-50">
                    <div className="absolute inset-0 bg-black/30" onClick={() => setMobileOpen(false)} />
                    <div className="absolute left-0 top-0 bottom-0 w-72 bg-white p-4">
                        <div className="flex items-center justify-between mb-4">
                            <div className="font-semibold text-lg">MoodTracker</div>
                            <button onClick={() => setMobileOpen(false)} className="p-2 rounded">
                                <X size={18} />
                            </button>
                        </div>

                        <nav className="space-y-2">
                            {menu.map(m => (
                                <button
                                    key={m.id}
                                    onClick={() => {
                                        setPage(m.id);
                                        setMobileOpen(false);
                                    }}
                                    className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-black/6"
                                >
                                    <div className="w-6 h-6 flex items-center justify-center">{m.icon}</div>
                                    <span>{m.label}</span>
                                </button>
                            ))}
                        </nav>
                    </div>
                </div>
            )}

            {/* ======================
          Main content (center + right)
          - MIDDLE_FLEX and RIGHT_FLEX at the top control widths
          - RIGHT cards are flex-1 so they fill vertical space equally
          ====================== */}
            <div className="flex-1 flex flex-col overflow-auto">
                {/* Topbar */}
                <header className="h-16 flex items-center justify-between px-4 md:px-8 border-b border-black/6">
                    <div>
                        <h2 className="text-2xl font-semibold">{page === "mood" ? "Mood Tracker" : "Reports"}</h2>
                    </div>

                    <div className="flex items-center gap-3">
                        <Button variant="outline" className="text-black/90 border-black/20 bg-white/90">
                            <Smile size={14} /> Today
                        </Button>
                        <Button variant="ghost" onClick={handleReset} className="text-black/80">
                            Reset
                        </Button>
                    </div>
                </header>

                <main className="p-6">
                    {page === "mood" && (
                        <div className="flex gap-6 h-[calc(100vh-120px)]"> {/* main area height respects header */}
                            {/* Middle column (center) */}
                            <div style={{ flex: MIDDLE_FLEX }} className="flex flex-col gap-6 overflow-auto">
                                {/* Camera card (outer height control: CAMERA_CARD_H) */}
                                <Card className="bg-white/90" style={{ minHeight: CAMERA_CARD_H }}>
                                    <CardHeader>
                                        <CardTitle className="text-black flex items-center gap-2">
                                            <Camera size={16} /> Camera Mood Tracker
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        {/* inner camera area (CAMERA_INNER_H) */}
                                        <div
                                            className="bg-black/6 rounded-lg flex flex-col items-center justify-center w-full mx-auto"
                                            style={{ height: CAMERA_INNER_H }}
                                        >
                                            <div className="text-center">
                                                <div className="mb-3 text-xl">Camera Feed Placeholder</div>
                                                <div className="text-sm text-black/50 mb-3">
                                                    (Integrate <code>getUserMedia</code> for webcam capture)
                                                </div>
                                                <div className="flex gap-2 justify-center">
                                                    <Button onClick={() => alert("Capture (demo)")} className="bg-gradient-to-br from-[#cbb4ff] to-[#ffc1e3] text-black">
                                                        Capture Mood
                                                    </Button>
                                                    <Button variant="ghost" onClick={() => alert("Analyze (demo)")}>Analyze</Button>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Emoji section - increase height by editing CAMPAIGN_CARD_H or set h-[...] on Card */}
                                <Card className="bg-white/90">
                                    <CardHeader>

                                    </CardHeader>
                                    <CardContent>
                                        <div
                                            className={`grid grid-cols-3 sm:grid-cols-${EMOJI_GRID_COLS_SM} gap-4`}
                                        // note: EMOJI_GRID_COLS_SM controls small-screen columns
                                        >
                                            {emojis.map(e => {
                                                const active = selectedMood === e.mood;
                                                return (
                                                    <button
                                                        key={e.mood}
                                                        onClick={() => handleSelectEmoji(e)}
                                                        className={`emoji-${e.mood} flex flex-col items-center gap-2 p-3 rounded-lg transition-transform ${active
                                                                ? "bg-gradient-to-br from-[#cbb4ff] to-[#ffc1e3] text-black scale-105 shadow"
                                                                : "bg-white/70 text-black/80 hover:scale-105"
                                                            }`}
                                                        aria-pressed={active}
                                                        title={e.mood}
                                                    >
                                                        <div className="text-3xl">{e.emoji}</div>
                                                        <div className="text-xs">{e.mood}</div>
                                                    </button>
                                                );
                                            })}
                                        </div>

                                        
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Right column */}
                            <div style={{ flex: RIGHT_FLEX }} className="flex flex-col gap-6">
                                {/* The two cards are flex-1 so they expand vertically equally */}
                                <Card className="bg-white/90 flex-1">
                                    <CardHeader>
                                        <CardTitle className="text-black">Anxiety Level</CardTitle>
                                    </CardHeader>
                                    <CardContent className="flex flex-col justify-between">
                                        

                                        <Button>Chat about you</Button>
                                        <div className="mt-4 text-xs text-black/60">
                                            Tip: Breathing exercises for 2 minutes can lower anxiety.
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="bg-white/90 flex-1">
                                    <CardHeader>
                                        <CardTitle className="text-black">Depression Level</CardTitle>
                                    </CardHeader>
                                    <CardContent className="flex flex-col justify-between">
                          
                                            <Button>Chat about you</Button>
                                        <div className="mt-4 text-xs text-black/60">
                                            Tip: Try short walks, sunlight exposure and journaling.
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    )}

                    {page === "reports" && (
                        <div className="space-y-6">
                            <Card className="bg-white/90">
                                <CardHeader>
                                    <CardTitle className="text-black">Mood Trend (Last 7 days)</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div style={{ width: "100%", height: 360 }}>
                                        <ResponsiveContainer width="100%" height="100%">
                                            <LineChart data={history}>
                                                <CartesianGrid strokeDasharray="3 3" stroke="#e6e6e6" />
                                                <XAxis dataKey="day" stroke="#333" />
                                                <YAxis domain={[0, 5]} stroke="#333" />
                                                <Tooltip />
                                                <Legend />
                                                <Line type="monotone" dataKey="mood" name="Mood (1-5)" stroke="#7c3aed" strokeWidth={3} dot={{ r: 4 }} />
                                            </LineChart>
                                        </ResponsiveContainer>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="bg-white/90">
                                <CardHeader>
                                    <CardTitle className="text-black">Anxiety & Depression (Last 7 days)</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div style={{ width: "100%", height: 360 }}>
                                        <ResponsiveContainer width="100%" height="100%">
                                            <LineChart data={history}>
                                                <CartesianGrid strokeDasharray="3 3" stroke="#e6e6e6" />
                                                <XAxis dataKey="day" stroke="#333" />
                                                <YAxis stroke="#333" />
                                                <Tooltip />
                                                <Legend />
                                                <Line type="monotone" dataKey="anxiety" name="Anxiety (%)" stroke="#fb7185" strokeWidth={2} dot={false} />
                                                <Line type="monotone" dataKey="depression" name="Depression (%)" stroke="#f472b6" strokeWidth={2} dot={false} />
                                            </LineChart>
                                        </ResponsiveContainer>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )}
                </main>
            </div>

            {/* ======================
          tiny CSS for scale feedback and helper
          ====================== */}
            <style>{`
        .scale-feedback {
          transform-origin: center;
          animation: sb-scale 220ms ease-in-out;
        }
        @keyframes sb-scale {
          0% { transform: scale(0.95); }
          50% { transform: scale(1.06); }
          100% { transform: scale(1); }
        }
      `}</style>
        </div>
    );
}
