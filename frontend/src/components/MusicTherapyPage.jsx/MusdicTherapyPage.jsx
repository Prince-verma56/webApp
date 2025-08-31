import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
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
  List,
  Upload
} from 'lucide-react';

// Sample data for initial tracks. These should be in your public directory.
const initialTracks = [
  {
    id: '1',
    title: 'Calm Waves',
    artist: 'Ocean Sounds',
    image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=400&fit=crop',
    category: 'Anxiety Relief',
    bpm: '55 BPM',
    audioSrc: '/audio/calm_waves.mp3',
    lyrics: `Listen to the ocean's call
    Let the gentle waves wash over you
    Breathe in peace, breathe out fear
    You are safe and sound, right here.`,
  },
  {
    id: '2',
    title: 'Forest Meditation',
    artist: 'Nature Retreat',
    image: 'https://images.unsplash.com/photo-1499209974431-9a74c5d64478?w=400&h=400&fit=crop',
    category: 'Mindfulness',
    bpm: '70 BPM',
    audioSrc: '/audio/forest_meditation.mp3',
    lyrics: `Feel the earth beneath your feet
    The ancient trees stand strong and tall
    Birdsong in the gentle breeze
    A whisper of serenity for all.`,
  },
  {
    id: '3',
    title: 'Focus Rhythms',
    artist: 'Mind Boost',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop',
    category: 'Focus Enhancement',
    bpm: '120 BPM',
    audioSrc: '/audio/focus_rhythms.mp3',
    lyrics: `A steady beat to clear your mind
    Let thoughts align, let focus grow
    Dive deep into the task at hand
    And let your inner genius flow.`,
  },
];

// Custom Slider Component - Reused
const CustomSlider = ({ value, onValueChange, max, step, className }) => {
  const handleSliderChange = (e) => onValueChange([parseInt(e.target.value)]);
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

const MusicTherapyPage = () => {
  const [allTracks, setAllTracks] = useState(initialTracks);
  const [currentTrack, setCurrentTrack] = useState(initialTracks[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState([75]);
  const [isLiked, setIsLiked] = useState(false);

  const audioRef = useRef(null);
  const fileInputRef = useRef(null);

  // Audio player control effect
  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play().catch(e => console.error("Playback failed:", e));
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentTrack]);

  const handleTimeUpdate = () => setCurrentTime(audioRef.current.currentTime);
  const handleLoadedMetadata = () => setDuration(audioRef.current.duration);
  const handleEnded = () => setIsPlaying(false);

  const handleTrackSelect = (track) => {
    if (track.id !== currentTrack.id) {
      setCurrentTrack(track);
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Create a URL for the uploaded file
      const fileUrl = URL.createObjectURL(file);
      const newTrack = {
        id: Date.now().toString(), // Use a unique ID
        title: file.name.split('.').slice(0, -1).join('.'),
        artist: 'User Upload',
        image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=400&fit=crop', // A default image
        category: 'Personal',
        bpm: 'N/A',
        audioSrc: fileUrl,
        lyrics: `This is a personal upload. No lyrics available.`,
      };
      setAllTracks(prev => [...prev, newTrack]);
      setCurrentTrack(newTrack);
      setIsPlaying(true);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <audio
        ref={audioRef}
        src={currentTrack?.audioSrc}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
      />
      
      <div className="flex h-screen">
        {/* Sidebar */}
        <motion.div 
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="w-64 bg-black/40 backdrop-blur-sm p-4 border-r border-white/10 overflow-y-auto"
        >
          <div className="mb-8">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">MindTunes</h1>
            <p className="text-gray-400 text-sm">Mental Health Music</p>
          </div>
          
          <Button 
            onClick={() => fileInputRef.current.click()}
            className="w-full mb-4 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
          >
            <Upload className="w-4 h-4 mr-2" /> Upload Music
          </Button>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileUpload} 
            accept="audio/*" 
            className="hidden" 
          />
          
          <div className="space-y-2">
            {allTracks.map((track, index) => (
              <motion.button
                key={track.id}
                onClick={() => handleTrackSelect(track)}
                className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 ${
                  currentTrack?.id === track.id ? 'bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-400/30' : 'hover:bg-white/10'
                }`}
                whileHover={{ x: 5 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <img src={track.image} alt={track.title} className="w-8 h-8 rounded-full object-cover"/>
                <span className={`text-sm text-left truncate ${currentTrack?.id === track.id ? 'text-white' : 'text-gray-400'}`}>
                  {track.title}
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="flex-1 flex">
          <div className="flex-1 p-8 overflow-y-auto">
            <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="flex items-center justify-between mb-8">
              <input type="text" placeholder="Search for therapy sessions..." className="bg-white/10 border border-white/20 rounded-full px-4 py-2 text-white placeholder-gray-400 w-96" />
              <Button variant="ghost" size="sm"><MoreHorizontal className="w-4 h-4" /></Button>
            </motion.div>
            
            {currentTrack && (
              <motion.div
                key={currentTrack.id}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/20 mb-8"
              >
                <div className="flex items-center justify-center mb-6">
                  <motion.div className="relative" animate={{ rotate: isPlaying ? 360 : 0 }} transition={{ duration: 20, repeat: isPlaying ? Infinity : 0, ease: "linear" }}>
                    <img src={currentTrack.image} alt={currentTrack.title} className="w-64 h-64 rounded-full object-cover shadow-2xl border-4 border-white/20" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-full" />
                  </motion.div>
                </div>
                <div className="text-center mb-6">
                  <h2 className="text-3xl font-bold mb-2">{currentTrack.title}</h2>
                  <p className="text-gray-300 text-lg mb-2">{currentTrack.artist}</p>
                  <div className="flex items-center justify-center space-x-4">
                    <Badge className="bg-purple-500/20 text-purple-300 border-purple-400/30">{currentTrack.category}</Badge>
                    <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-400/30">{currentTrack.bpm}</Badge>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <CustomSlider value={[currentTime]} onValueChange={([value]) => { setCurrentTime(value); if (audioRef.current) audioRef.current.currentTime = value; }} max={duration} step={1} className="w-full" />
                    <div className="flex justify-between text-sm text-gray-400">
                      <span>{formatTime(currentTime)}</span>
                      <span>{formatTime(duration)}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-center space-x-6">
                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white"><Shuffle className="w-5 h-5" /></Button>
                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white"><SkipBack className="w-6 h-6" /></Button>
                    <motion.button onClick={() => setIsPlaying(!isPlaying)} className="bg-gradient-to-r from-purple-500 to-cyan-500 p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                      {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8" />}
                    </motion.button>
                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white"><SkipForward className="w-6 h-6" /></Button>
                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white"><Repeat className="w-5 h-5" /></Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <motion.button onClick={() => setIsLiked(!isLiked)} className={`p-2 rounded-full transition-all duration-300 ${isLiked ? 'text-red-400' : 'text-gray-400 hover:text-red-400'}`} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                      <Heart className={`w-6 h-6 ${isLiked ? 'fill-current' : ''}`} />
                    </motion.button>
                    <div className="flex items-center space-x-2 flex-1 max-w-xs mx-4">
                      <Volume2 className="w-4 h-4 text-gray-400" />
                      <CustomSlider value={volume} onValueChange={(val) => { setVolume(val); if (audioRef.current) audioRef.current.volume = val[0] / 100; }} max={100} step={1} className="flex-1" />
                    </div>
                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white"><List className="w-5 h-5" /></Button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar 2 (Session Guide) */}
          <motion.div 
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="w-80 bg-black/40 backdrop-blur-sm p-6 border-l border-white/10 overflow-y-auto"
          >
            <h3 className="text-xl font-bold mb-4 flex items-center"><Music className="w-5 h-5 mr-2 text-cyan-400" />Session Guide</h3>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 mb-6">
              <h4 className="font-semibold mb-2 text-cyan-400">Now Playing</h4>
              <p className="text-sm text-gray-300 mb-1">{currentTrack?.title}</p>
              <p className="text-xs text-gray-400">{currentTrack?.artist}</p>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-purple-400">Guided Words</h4>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 max-h-96 overflow-y-auto">
                <pre className="text-sm text-gray-300 leading-relaxed whitespace-pre-wrap font-sans">{currentTrack?.lyrics || 'No lyrics available.'}</pre>
              </div>
            </div>
            <div className="mt-6 space-y-3">
              <Button className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600">Save Session</Button>
              <Button variant="outline" className="w-full border-white/20 text-gray-300 hover:bg-white/10">Share Progress</Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MusicTherapyPage;