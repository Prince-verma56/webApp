import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  Heart, 
  Home, 
  Music, 
  Star,
  Headphones,
  Brain,
  Smile,
  Wind,
  Moon,
  Sun,
  Search,
  MoreHorizontal,
  Repeat,
  Shuffle,
  List
} from 'lucide-react';

const MusicTherapyPage = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(41);
  const [duration, setDuration] = useState(227);
  const [volume, setVolume] = useState([75]);
  const [isLiked, setIsLiked] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Custom Slider Component
  const CustomSlider = ({ value, onValueChange, max, step, className }) => {
    const handleSliderChange = (e) => {
      const newValue = parseInt(e.target.value);
      onValueChange([newValue]);
    };

    const percentage = Array.isArray(value) ? (value[0] / max) * 100 : (value / max) * 100;

    return (
      <div className={`relative ${className}`}>
        <div className="w-full h-1 bg-white/20 rounded-full">
          <div 
            className="h-1 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full transition-all duration-300"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <input
          type="range"
          min="0"
          max={max}
          step={step}
          value={Array.isArray(value) ? value[0] : value}
          onChange={handleSliderChange}
          className="absolute inset-0 w-full h-1 opacity-0 cursor-pointer"
        />
        <div 
          className="absolute top-1/2 w-3 h-3 bg-white rounded-full shadow-lg transform -translate-y-1/2 transition-all duration-300 hover:scale-110"
          style={{ left: `calc(${percentage}% - 6px)` }}
        />
      </div>
    );
  };

  // Sample music data for mental health
  const currentTrack = {
    title: "Peaceful Mind",
    artist: "Dr. Sarah Wellness, Meditation Masters",
    album: "Healing Frequencies Vol. 1",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop",
    category: "Anxiety Relief",
    duration: "3:47",
    bpm: "60 BPM"
  };

  const recentTracks = [
    {
      id: 1,
      title: "Deep Breathing Session",
      artist: "Calm Collective",
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=200&h=200&fit=crop",
      category: "Breathing Exercises"
    },
    {
      id: 2,
      title: "Sleep Therapy Sounds",
      artist: "Night Healers",
      image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=200&h=200&fit=crop",
      category: "Sleep Aid"
    },
    {
      id: 3,
      title: "Focus & Concentration",
      artist: "Mind Boost",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
      category: "ADHD Support"
    },
    {
      id: 4,
      title: "Stress Release Meditation",
      artist: "Zen Masters",
      image: "https://images.unsplash.com/photo-1545389336-cf090694435e?w=200&h=200&fit=crop",
      category: "Stress Relief"
    }
  ];

  const therapyCategories = [
    {
      title: "Anxiety Relief",
      description: "Calming sounds to reduce anxiety and promote relaxation",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop",
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Sleep Therapy",
      description: "Gentle melodies for better sleep and rest",
      image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=300&h=200&fit=crop",
      color: "from-purple-500 to-indigo-500"
    },
    {
      title: "Mindfulness",
      description: "Guided sessions for present moment awareness",
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=200&fit=crop",
      color: "from-green-500 to-teal-500"
    },
    {
      title: "Focus Enhancement",
      description: "Binaural beats to improve concentration",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop",
      color: "from-orange-500 to-red-500"
    }
  ];

  const lyrics = `Welcome to this peaceful moment
Let your mind begin to rest
Breathe in calm, breathe out tension
Feel your body at its best

Close your eyes and drift away
To a place of inner peace
Where worries fade and stress dissolves
And all your troubles cease

Gentle waves of healing sound
Wash over your weary soul
Every note a healing touch
Making broken spirits whole

This is your time to heal and grow
To find the strength within
Let the music guide your heart
To where peace and hope begin`;

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Simulate time progression
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentTime(prev => (prev < duration ? prev + 1 : prev));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, duration]);

  const sidebarItems = [
    { icon: Home, label: 'Home', id: 'home' },
    { icon: Heart, label: 'Liked Sessions', id: 'liked' },
    { icon: Star, label: 'Favorites', id: 'favorites' },
    { icon: Brain, label: 'My Therapy', id: 'therapy' },
    { icon: Headphones, label: 'Recent Listens', id: 'recent' },
    { icon: Smile, label: 'Mood Tracker', id: 'mood' },
    { icon: Wind, label: 'Breathing', id: 'breathing' },
    { icon: Moon, label: 'Sleep Sounds', id: 'sleep' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Main Container */}
      <div className="flex h-screen">
        {/* Sidebar */}
        <motion.div 
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="w-64 bg-black/40 backdrop-blur-sm p-4 border-r border-white/10"
        >
          <div className="mb-8">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              MindTunes
            </h1>
            <p className="text-gray-400 text-sm">Mental Health Music</p>
          </div>

          <div className="space-y-2">
            {sidebarItems.map((item, index) => (
              <motion.button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 ${
                  activeSection === item.id 
                    ? 'bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-400/30' 
                    : 'hover:bg-white/10'
                }`}
                whileHover={{ x: 5 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <item.icon className={`w-5 h-5 ${activeSection === item.id ? 'text-cyan-400' : 'text-gray-400'}`} />
                <span className={`text-sm ${activeSection === item.id ? 'text-white' : 'text-gray-400'}`}>
                  {item.label}
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="flex-1 flex">
          {/* Center Content */}
          <div className="flex-1 p-8">
            {/* Header */}
            <motion.div 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="flex items-center justify-between mb-8"
            >
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm" className="text-gray-400">
                  <Search className="w-4 h-4" />
                </Button>
                <input 
                  type="text" 
                  placeholder="Search for therapy sessions..."
                  className="bg-white/10 border border-white/20 rounded-full px-4 py-2 text-white placeholder-gray-400 w-96"
                />
              </div>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </motion.div>

            {/* Now Playing Card */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/20 mb-8"
            >
              <div className="flex items-center justify-center mb-6">
                <motion.div 
                  className="relative"
                  animate={{ rotate: isPlaying ? 360 : 0 }}
                  transition={{ duration: 20, repeat: isPlaying ? Infinity : 0, ease: "linear" }}
                >
                  <img 
                    src={currentTrack.image} 
                    alt={currentTrack.title}
                    className="w-64 h-64 rounded-full object-cover shadow-2xl border-4 border-white/20"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-full" />
                </motion.div>
              </div>

              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold mb-2">{currentTrack.title}</h2>
                <p className="text-gray-300 text-lg mb-2">{currentTrack.artist}</p>
                <div className="flex items-center justify-center space-x-4">
                  <Badge className="bg-purple-500/20 text-purple-300 border-purple-400/30">
                    {currentTrack.category}
                  </Badge>
                  <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-400/30">
                    {currentTrack.bpm}
                  </Badge>
                </div>
              </div>

              {/* Controls */}
              <div className="space-y-4">
                {/* Progress Bar */}
                <div className="space-y-2">
                  <CustomSlider
                    value={[currentTime]}
                    onValueChange={([value]) => setCurrentTime(value)}
                    max={duration}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>

                {/* Main Controls */}
                <div className="flex items-center justify-center space-x-6">
                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                    <Shuffle className="w-5 h-5" />
                  </Button>
                  
                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                    <SkipBack className="w-6 h-6" />
                  </Button>
                  
                  <motion.button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="bg-gradient-to-r from-purple-500 to-cyan-500 p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8" />}
                  </motion.button>
                  
                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                    <SkipForward className="w-6 h-6" />
                  </Button>
                  
                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                    <Repeat className="w-5 h-5" />
                  </Button>
                </div>

                {/* Secondary Controls */}
                <div className="flex items-center justify-between">
                  <motion.button
                    onClick={() => setIsLiked(!isLiked)}
                    className={`p-2 rounded-full transition-all duration-300 ${
                      isLiked ? 'text-red-400' : 'text-gray-400 hover:text-red-400'
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Heart className={`w-6 h-6 ${isLiked ? 'fill-current' : ''}`} />
                  </motion.button>

                  <div className="flex items-center space-x-2 flex-1 max-w-xs mx-4">
                    <Volume2 className="w-4 h-4 text-gray-400" />
                    <CustomSlider
                      value={volume}
                      onValueChange={setVolume}
                      max={100}
                      step={1}
                      className="flex-1"
                    />
                  </div>

                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                    <List className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </motion.div>

          </div>

          <motion.div 
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="w-80 bg-black/40 backdrop-blur-sm p-6 border-l border-white/10"
          >
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <Music className="w-5 h-5 mr-2 text-cyan-400" />
              Session Guide
            </h3>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 mb-6">
              <h4 className="font-semibold mb-2 text-cyan-400">Now Playing</h4>
              <p className="text-sm text-gray-300 mb-1">{currentTrack.title}</p>
              <p className="text-xs text-gray-400">{currentTrack.artist}</p>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-purple-400">Guided Words</h4>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 max-h-96 overflow-y-auto">
                <pre className="text-sm text-gray-300 leading-relaxed whitespace-pre-wrap font-sans">
                  {lyrics}
                </pre>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <Button className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600">
                Save Session
              </Button>
              <Button variant="outline" className="w-full border-white/20 text-gray-300 hover:bg-white/10">
                Share Progress
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MusicTherapyPage;