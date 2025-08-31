import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { 
  Camera, 
  Smile, 
  BarChart3, 
  Menu, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Loader2, 
  Circle, 
  Image as ImageIcon, 
  RotateCcw,
  Flashlight,
  CameraIcon,
  Video,
  Aperture
} from "lucide-react";
import Webcam from "react-webcam";
import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from "recharts";

// --- UI Theme & Layout Constants ---
const theme = {
  bg: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
  sidebarBg: "#ffffff",
  cardBg: "#ffffff",
  primaryText: "#2d3748",
  secondaryText: "#718096",
  accentPurple: "#8b5cf6",
  accentPink: "#ec4899",
  accentBlue: "#3b82f6",
  accentGreen: "#10b981",
  shadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
  shadowMd: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
};

const SIDEBAR_EXPANDED_W = 280;
const SIDEBAR_COLLAPSED_W = 80;
const EMOJI_GRID_COLS_SM = 4;
const EMOJI_GRID_COLS_MD = 6;

// Emoji data with associated mood values
const emojis = [
  { mood: "Happy", emoji: "😊", values: { anxiety: 18, depression: 10, moodScore: 4.8 }, color: "#10b981" },
  { mood: "Sad", emoji: "😔", values: { anxiety: 48, depression: 62, moodScore: 2.0 }, color: "#3b82f6" },
  { mood: "Angry", emoji: "😡", values: { anxiety: 55, depression: 40, moodScore: 2.6 }, color: "#ef4444" },
  { mood: "Anxious", emoji: "😟", values: { anxiety: 72, depression: 45, moodScore: 1.9 }, color: "#f59e0b" },
  { mood: "Calm", emoji: "😌", values: { anxiety: 12, depression: 8, moodScore: 5.0 }, color: "#8b5cf6" },
  { mood: "Neutral", emoji: "😐", values: { anxiety: 32, depression: 28, moodScore: 3.5 }, color: "#6b7280" },
];

// Menu items for the sidebar
const menu = [
  { id: "mood", label: "Mood Tracker", icon: <Camera size={18} /> },
  { id: "reports", label: "Reports", icon: <BarChart3 size={18} /> },
  { id: "history", label: "History", icon: <ImageIcon size={18} /> },
];

// Webcam Capture Component with enhanced UI
const WebcamCapture = ({ onCapture, isLoading, isFrontCamera, onCameraFlip, flashOn, onFlashToggle }) => {
  const webcamRef = useRef(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  
  const capture = useCallback(() => {
    if (webcamRef.current && isCameraReady) {
      const imageSrc = webcamRef.current.getScreenshot();
      onCapture(imageSrc);
    }
  }, [webcamRef, onCapture, isCameraReady]);

  const handleCameraReady = useCallback(() => {
    setIsCameraReady(true);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center relative rounded-2xl overflow-hidden w-full h-[400px] mx-auto bg-gray-900 shadow-xl">
      {/* Camera viewfinder frame */}
      <div className="absolute inset-2 border-4 border-white/20 rounded-xl z-10 pointer-events-none"></div>
      
      {/* Camera status indicator */}
      {!isCameraReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900 z-20">
          <div className="flex flex-col items-center">
            <Loader2 className="h-8 w-8 animate-spin text-white mb-2" />
            <p className="text-white text-sm">Initializing camera...</p>
          </div>
        </div>
      )}
      
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        className="w-full h-full object-cover"
        videoConstraints={{ 
          width: 1280, 
          height: 720, 
          facingMode: isFrontCamera ? "user" : "environment"
        }}
        onUserMedia={handleCameraReady}
        onUserMediaError={() => console.error("Camera access denied")}
        mirrored={isFrontCamera}
      />
      
      {/* Camera controls */}
      <div className="absolute bottom-4 left-0 right-0 flex items-center justify-between px-6 z-20">
        {/* Flash toggle */}
        <button 
          onClick={onFlashToggle}
          className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
          aria-label={flashOn ? "Turn off flash" : "Turn on flash"}
        >
          <Flashlight className={`h-6 w-6 ${flashOn ? "text-yellow-300" : "text-white"}`} />
        </button>
        
        {/* Capture button */}
        <button 
          onClick={capture} 
          disabled={!isCameraReady || isLoading}
          className="w-16 h-16 rounded-full border-4 border-white bg-white/10 flex items-center justify-center group hover:bg-white/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Capture Mood"
        >
          <div className="w-12 h-12 rounded-full bg-white group-hover:scale-110 transition-transform"></div>
        </button>
        
        {/* Camera flip */}
        <button 
          onClick={onCameraFlip}
          className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
          aria-label="Switch camera"
        >
          <CameraIcon className="h-6 w-6" />
        </button>
      </div>
      
      {/* Camera info */}
      <div className="absolute top-4 left-0 right-0 flex justify-center z-20">
        <div className="bg-black/50 text-white px-3 py-1 rounded-full text-xs flex items-center">
          <Aperture className="h-3 w-3 mr-1" />
          <span>HD</span>
        </div>
      </div>
      
      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/70 z-30">
          <div className="flex flex-col items-center">
            <Loader2 className="h-12 w-12 animate-spin text-white mb-2" />
            <p className="text-white">Analyzing your mood...</p>
          </div>
        </div>
      )}
    </div>
  );
};

// Gallery component to show captured images
const CapturedImagesGallery = ({ images, onRemoveImage }) => {
  if (images.length === 0) {
    return (
      <Card className="rounded-2xl" style={{ backgroundColor: theme.cardBg, boxShadow: theme.shadowMd }}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2" style={{ color: theme.primaryText }}>
            <ImageIcon size={16} /> Captured Moments
          </CardTitle>
          <CardDescription style={{ color: theme.secondaryText }}>
            Your mood captures will appear here
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-400">
            <ImageIcon className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p>No images captured yet</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="rounded-2xl" style={{ backgroundColor: theme.cardBg, boxShadow: theme.shadowMd }}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2" style={{ color: theme.primaryText }}>
          <ImageIcon size={16} /> Captured Moments
        </CardTitle>
        <CardDescription style={{ color: theme.secondaryText }}>
          {images.length} photo{images.length !== 1 ? 's' : ''}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {images.map((img, index) => (
            <div key={index} className="relative group rounded-lg overflow-hidden shadow-md">
              <img 
                src={img} 
                alt={`Captured emotion ${index + 1}`} 
                className="w-full h-32 object-cover"
              />
              <button
                onClick={() => onRemoveImage(index)}
                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Remove image"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-xs p-1 text-center">
                {new Date().toLocaleTimeString()}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// Stats card component
const StatsCard = ({ title, value, change, icon, color }) => {
  return (
    <Card className="rounded-2xl" style={{ backgroundColor: theme.cardBg, boxShadow: theme.shadowMd }}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium" style={{ color: theme.secondaryText }}>{title}</p>
            <h3 className="text-2xl font-bold mt-1" style={{ color: theme.primaryText }}>{value}</h3>
            <p className={`text-xs mt-1 flex items-center ${change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {change >= 0 ? '↑' : '↓'} {Math.abs(change)}% from last week
            </p>
          </div>
          <div className={`p-3 rounded-full`} style={{ backgroundColor: `${color}20` }}>
            {React.cloneElement(icon, { size: 24, color: color })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default function MoodTracker() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [page, setPage] = useState("mood");
  const [history, setHistory] = useState(() => {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    return days.map(day => ({
      day,
      moodScore: parseFloat((Math.random() * 3 + 2).toFixed(1)),
      anxiety: Math.floor(Math.random() * 60) + 10,
      depression: Math.floor(Math.random() * 50) + 5,
    }));
  });
  const [selectedMood, setSelectedMood] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [capturedImages, setCapturedImages] = useState([]);
  const [isFrontCamera, setIsFrontCamera] = useState(true);
  const [flashOn, setFlashOn] = useState(false);
  const sidebarRef = useRef(null);

  const simulateMoodAnalysis = (imageSrc) => {
    setAnalyzing(true);
    return new Promise(resolve => {
      setTimeout(() => {
        const detectedMood = emojis[Math.floor(Math.random() * emojis.length)];
        resolve(detectedMood.mood);
      }, 2000);
    }).finally(() => {
      setAnalyzing(false);
    });
  };

  const handleCaptureAndAnalyze = async (imageSrc) => {
    setCapturedImages(prev => [imageSrc, ...prev.slice(0, 7)]); // Keep only 8 recent images
    try {
      const detectedMoodName = await simulateMoodAnalysis(imageSrc);
      const detectedEmoji = emojis.find(e => e.mood === detectedMoodName);
      if (detectedEmoji) {
        handleSelectEmoji(detectedEmoji);
        setShowResults(true);
      }
    } catch (error) {
      console.error("Analysis failed:", error);
    }
  };

  const handleSelectEmoji = (emo) => {
    setSelectedMood(emo.mood);
    setHistory(prev => {
      const today = new Date().toLocaleString('en-us', { weekday: 'short' });
      const newHistory = prev.map(entry => ({ ...entry }));
      const todayIndex = newHistory.findIndex(entry => entry.day === today);
      if (todayIndex !== -1) {
        newHistory[todayIndex] = {
          ...newHistory[todayIndex],
          moodScore: emo.values.moodScore,
          anxiety: emo.values.anxiety,
          depression: emo.values.depression,
        };
      } else {
        newHistory.push({
          day: today,
          moodScore: emo.values.moodScore,
          anxiety: emo.values.anxiety,
          depression: emo.values.depression,
        });
        if (newHistory.length > 7) {
            newHistory.shift();
        }
      }
      return newHistory;
    });
  };

  const handleReset = () => {
    setShowResults(false);
    setCapturedImages([]);
    setSelectedMood(null);
    setHistory(() => {
      const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
      return days.map(day => ({
        day,
        moodScore: parseFloat((Math.random() * 3 + 2).toFixed(1)),
        anxiety: Math.floor(Math.random() * 60) + 10,
        depression: Math.floor(Math.random() * 50) + 5,
      }));
    });
  };

  const handleRemoveImage = (index) => {
    setCapturedImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleCameraFlip = () => {
    setIsFrontCamera(prev => !prev);
  };

  const handleFlashToggle = () => {
    setFlashOn(prev => !prev);
    // In a real app, you would control the flash here
  };

  const latestData = history[history.length - 1];

  useEffect(() => {
    function onResize() {
      if (window.innerWidth >= 768) setMobileOpen(false);
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const sidebarWidth = collapsed ? SIDEBAR_COLLAPSED_W : SIDEBAR_EXPANDED_W;

  // Data for charts
  const moodChartData = history.map(entry => ({
    day: entry.day,
    score: entry.moodScore
  }));

  const anxietyDepressionData = history.map(entry => ({
    day: entry.day,
    anxiety: entry.anxiety,
    depression: entry.depression
  }));

  const moodDistributionData = emojis.map(emoji => ({
    name: emoji.mood,
    value: Math.floor(Math.random() * 20) + 5,
    color: emoji.color
  }));

  return (
    <div className="flex h-screen bg-gray-100" style={{ color: theme.primaryText }}>
      {/* Sidebar (desktop) */}
      <motion.aside
        ref={sidebarRef}
        animate={{ width: sidebarWidth }}
        transition={{ duration: 0.28, ease: "easeOut" }}
        className="hidden md:flex flex-col border-r border-gray-200 shrink-0"
        style={{ minWidth: SIDEBAR_COLLAPSED_W, background: theme.sidebarBg, boxShadow: theme.shadowMd }}
      >
        <div className="flex items-center justify-between px-4 py-5 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-md flex items-center justify-center" style={{ background: theme.accentPurple }}>
              <Smile color="#FFFFFF" size={20} />
            </div>
            <motion.span
              initial={false}
              animate={{ opacity: collapsed ? 0 : 1, x: collapsed ? -8 : 0 }}
              transition={{ duration: 0.22 }}
              className="text-lg font-semibold"
              aria-hidden={collapsed}
              style={{ color: theme.primaryText }}
            >
              MoodTracker
            </motion.span>
          </div>
          <button onClick={() => setCollapsed(s => !s)} className="p-2 rounded-md hover:bg-gray-100" aria-label="Toggle sidebar">
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {menu.map(m => {
            const active = page === m.id;
            return (
              <button
                key={m.id}
                onClick={() => setPage(m.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${active ? "text-white shadow-md" : "hover:bg-gray-100"}`}
                style={active ? { background: theme.accentPurple, color: "#FFFFFF" } : { color: theme.secondaryText }}
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
        </nav>
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3 px-3 py-2 text-sm rounded-lg bg-purple-50 text-purple-700">
            <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
              <Smile size={16} className="text-purple-600" />
            </div>
            <motion.div
              initial={false}
              animate={{ opacity: collapsed ? 0 : 1 }}
              transition={{ duration: 0.18 }}
              aria-hidden={collapsed}
            >
              <p className="font-medium">Your mood today</p>
              <p className="text-xs">{selectedMood || "Not recorded"}</p>
            </motion.div>
          </div>
        </div>
      </motion.aside>

      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-4 left-4 z-40">
        <button onClick={() => setMobileOpen(s => !s)} className="p-2 rounded-full shadow-md bg-white" aria-label="open menu">
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }} transition={{ duration: 0.3 }} className="md:hidden fixed inset-0 z-50">
            <div className="absolute inset-0 bg-black/30" onClick={() => setMobileOpen(false)} />
            <div className="absolute left-0 top-0 bottom-0 w-72 p-4 bg-white">
              <div className="flex items-center justify-between mb-6">
                <div className="font-semibold text-lg flex items-center gap-2">
                  <div className="w-8 h-8 rounded-md flex items-center justify-center bg-purple-600">
                    <Smile color="#FFFFFF" size={16} />
                  </div>
                  MoodTracker
                </div>
                <button onClick={() => setMobileOpen(false)} className="p-2 rounded"><X size={18} /></button>
              </div>
              <nav className="space-y-2">
                {menu.map(m => (
                  <button 
                    key={m.id} 
                    onClick={() => { setPage(m.id); setMobileOpen(false); }} 
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl ${page === m.id ? "text-white bg-purple-600" : "hover:bg-gray-100"}`}
                  >
                    <div className="w-6 h-6 flex items-center justify-center">{m.icon}</div>
                    <span>{m.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 flex items-center justify-between px-4 md:px-6 border-b border-gray-200 shrink-0 bg-white">
          <div>
            <h2 className="text-xl font-semibold" style={{ color: theme.primaryText }}>
              {page === "mood" ? "Mood Tracker" : page === "reports" ? "Reports & Analytics" : "History"}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              onClick={handleReset} 
              variant="outline" 
              className="rounded-full flex items-center gap-1"
              size="sm"
            >
              <RotateCcw size={14} />
              <span>Reset</span>
            </Button>
          </div>
        </header>

        <main className="p-4 md:p-6 flex-1 overflow-y-auto">
          {page === "mood" && (
            <div className="flex flex-col lg:flex-row gap-6 h-full">
              {/* Left Column: Camera, Emojis, Gallery */}
              <div className="flex-1 flex flex-col gap-6">
                <Card className="rounded-2xl w-full shadow-md border-0">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Camera size={18} /> 
                      <span>Mood Camera</span>
                    </CardTitle>
                    <CardDescription>
                      Capture your current mood with your camera
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <WebcamCapture 
                      onCapture={handleCaptureAndAnalyze} 
                      isLoading={analyzing}
                      isFrontCamera={isFrontCamera}
                      onCameraFlip={handleCameraFlip}
                      flashOn={flashOn}
                      onFlashToggle={handleFlashToggle}
                    />
                  </CardContent>
                </Card>

                <AnimatePresence>
                  {showResults && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.5 }}
                      className="flex flex-col gap-6"
                    >
                      <Card className="rounded-2xl shadow-md border-0">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Smile size={16} /> Your Mood Analysis
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                            {emojis.map(e => {
                              const active = selectedMood === e.mood;
                              return (
                                <motion.button
                                  key={e.mood}
                                  onClick={() => handleSelectEmoji(e)}
                                  className={`flex flex-col items-center gap-2 p-3 rounded-xl transition-all ${active ? "shadow-lg scale-105 ring-2 ring-offset-2" : "hover:scale-105"}`}
                                  style={active ? { 
                                    background: e.color, 
                                    color: "#FFFFFF",
                                    ringColor: e.color
                                  } : { backgroundColor: "#f8f9fa", color: theme.secondaryText }}
                                  aria-pressed={active}
                                  title={e.mood}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  <div className="text-3xl">{e.emoji}</div>
                                  <div className="text-xs font-medium">{e.mood}</div>
                                </motion.button>
                              );
                            })}
                          </div>
                        </CardContent>
                      </Card>

                      <CapturedImagesGallery 
                        images={capturedImages} 
                        onRemoveImage={handleRemoveImage}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Right Column: Stats and Graphs */}
              <AnimatePresence>
                {showResults && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.5 }}
                    className="flex-1 flex flex-col gap-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <StatsCard 
                        title="Mood Score" 
                        value={latestData.moodScore.toFixed(1)} 
                        change={12} 
                        icon={<Smile />}
                        color={theme.accentGreen}
                      />
                      <StatsCard 
                        title="Anxiety Level" 
                        value={`${latestData.anxiety}%`} 
                        change={-5} 
                        icon={<BarChart3 />}
                        color={theme.accentBlue}
                      />
                    </div>

                    <Card className="rounded-2xl flex-1 shadow-md border-0">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-base">Weekly Mood Trend</CardTitle>
                      </CardHeader>
                      <CardContent className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <RechartsLineChart data={moodChartData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                            <XAxis dataKey="day" stroke={theme.secondaryText} fontSize={12} />
                            <YAxis domain={[0, 5]} stroke={theme.secondaryText} fontSize={12} />
                            <Tooltip 
                              contentStyle={{ 
                                backgroundColor: theme.cardBg, 
                                border: `1px solid #e2e8f0`, 
                                borderRadius: '8px',
                                boxShadow: theme.shadowMd
                              }} 
                            />
                            <Line 
                              type="monotone" 
                              dataKey="score" 
                              name="Mood Score" 
                              stroke={theme.accentPurple} 
                              strokeWidth={2} 
                              dot={{ r: 4, fill: theme.accentPurple }} 
                              activeDot={{ r: 6, fill: theme.accentPurple }} 
                            />
                          </RechartsLineChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>

                    <Card className="rounded-2xl flex-1 shadow-md border-0">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-base">Anxiety & Depression Levels</CardTitle>
                      </CardHeader>
                      <CardContent className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={anxietyDepressionData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                            <XAxis dataKey="day" stroke={theme.secondaryText} fontSize={12} />
                            <YAxis stroke={theme.secondaryText} fontSize={12} />
                            <Tooltip 
                              contentStyle={{ 
                                backgroundColor: theme.cardBg, 
                                border: `1px solid #e2e8f0`, 
                                borderRadius: '8px',
                                boxShadow: theme.shadowMd
                              }} 
                            />
                            <Legend />
                            <Bar dataKey="anxiety" name="Anxiety (%)" fill={theme.accentPink} radius={[4, 4, 0, 0]} />
                            <Bar dataKey="depression" name="Depression (%)" fill={theme.accentBlue} radius={[4, 4, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {page === "reports" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="rounded-2xl shadow-md border-0">
                <CardHeader>
                  <CardTitle>Mood Distribution</CardTitle>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={moodDistributionData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                      >
                        {moodDistributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: theme.cardBg, 
                          border: `1px solid #e2e8f0`, 
                          borderRadius: '8px',
                          boxShadow: theme.shadowMd
                        }} 
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="rounded-2xl shadow-md border-0">
                <CardHeader>
                  <CardTitle>Weekly Progress</CardTitle>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsLineChart data={history}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="day" stroke={theme.secondaryText} fontSize={12} />
                      <YAxis stroke={theme.secondaryText} fontSize={12} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: theme.cardBg, 
                          border: `1px solid #e2e8f0`, 
                          borderRadius: '8px',
                          boxShadow: theme.shadowMd
                        }} 
                      />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="moodScore" 
                        name="Mood Score" 
                        stroke={theme.accentPurple} 
                        strokeWidth={2} 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="anxiety" 
                        name="Anxiety (%)" 
                        stroke={theme.accentPink} 
                        strokeWidth={2} 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="depression" 
                        name="Depression (%)" 
                        stroke={theme.accentBlue} 
                        strokeWidth={2} 
                      />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          )}

          {page === "history" && (
            <Card className="rounded-2xl shadow-md border-0">
              <CardHeader>
                <CardTitle>Your Mood History</CardTitle>
                <CardDescription>
                  Track your mood changes over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsLineChart data={history}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="day" stroke={theme.secondaryText} fontSize={12} />
                      <YAxis stroke={theme.secondaryText} fontSize={12} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: theme.cardBg, 
                          border: `1px solid #e2e8f0`, 
                          borderRadius: '8px',
                          boxShadow: theme.shadowMd
                        }} 
                      />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="moodScore" 
                        name="Mood Score" 
                        stroke={theme.accentPurple} 
                        strokeWidth={2} 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="anxiety" 
                        name="Anxiety (%)" 
                        stroke={theme.accentPink} 
                        strokeWidth={2} 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="depression" 
                        name="Depression (%)" 
                        stroke={theme.accentBlue} 
                        strokeWidth={2} 
                      />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          )}
        </main>
      </div>
    </div>
  );
}