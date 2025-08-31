import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Star, Calendar } from 'lucide-react';
import { ArrowLeft, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Heart } from 'lucide-react';
import { Activity } from 'lucide-react';

const DoctorSection = () => {
  const [activeTab, setActiveTab] = useState('doctors');
  const [selectedCategory, setSelectedCategory] = useState('psychiatrist');
  const [loadingId, setLoadingId] = useState(null);
  const [successId, setSuccessId] = useState(null);

  const navigate = useNavigate();

  // Sample doctor data categorized by specialty
  const doctorsData = {
    psychiatrist: [
      {
        id: 1,
        name: "Dr. Sarah Mitchell",
        title: "Psychiatrist",
        degree: "MD, MRCPsych",
        experience: "15 years",
        rating: 4.9,
        reviews: 234,
        chargesPerMin: 35,
        avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face",
        specialties: ["Depression", "Anxiety Disorders", "Bipolar Disorder"],
        availability: "Available Now"
      },
      {
        id: 2,
        name: "Dr. David Chen",
        title: "Psychiatrist",
        degree: "MD, PhD",
        experience: "12 years",
        rating: 4.8,
        reviews: 189,
        chargesPerMin: 32,
        avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face",
        specialties: ["ADHD", "Schizophrenia", "Mood Disorders"],
        availability: "Available in 20 min"
      },
      {
        id: 3,
        name: "Dr. Priya Nair",
        title: "Psychiatrist",
        degree: "MD, DPM",
        experience: "10 years",
        rating: 4.7,
        reviews: 162,
        chargesPerMin: 28,
        avatar: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=150&h=150&fit=crop&crop=face",
        specialties: ["Postpartum Depression", "Panic Disorders", "Sleep Disorders"],
        availability: "Available Now"
      },
      {
        id: 4,
        name: "Dr. Arjun Mehta",
        title: "Psychiatrist",
        degree: "MD, DM (Neuropsychiatry)",
        experience: "18 years",
        rating: 4.9,
        reviews: 278,
        chargesPerMin: 40,
        avatar: "https://images.unsplash.com/photo-1628157588553-5dcf2c20ae58?w=150&h=150&fit=crop&crop=face",
        specialties: ["Obsessive Compulsive Disorder", "Generalized Anxiety", "Addiction Psychiatry"],
        availability: "Available in 10 min"
      },
      {
        id: 5,
        name: "Dr. Ananya Gupta",
        title: "Psychiatrist",
        degree: "MBBS, MD (Psychiatry)",
        experience: "8 years",
        rating: 4.6,
        reviews: 145,
        chargesPerMin: 25,
        avatar: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=150&h=150&fit=crop&crop=face",
        specialties: ["Child Psychiatry", "Autism Spectrum Disorders", "Behavioral Issues"],
        availability: "Available Tomorrow"
      },
      {
        id: 6,
        name: "Dr. Rajesh Kumar",
        title: "Psychiatrist",
        degree: "MD, FRCP",
        experience: "20 years",
        rating: 5.0,
        reviews: 321,
        chargesPerMin: 50,
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        specialties: ["Severe Depression", "Psychotic Disorders", "Geriatric Psychiatry"],
        availability: "Available in 30 min"
      }
      
    ],
    psychologist: [
      {
        id: 5,
        name: "Dr. Emily Thompson",
        title: "Clinical Psychologist",
        degree: "PhD, PsyD",
        experience: "8 years",
        rating: 4.8,
        reviews: 145,
        chargesPerMin: 28,
        avatar: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=150&h=150&fit=crop&crop=face",
        specialties: ["Cognitive Behavioral Therapy", "Trauma Therapy", "Couples Counseling"],
        availability: "Available Now"
      },
      {
        id: 5,
        name: "Dr. Emily Thompson",
        title: "Clinical Psychologist",
        degree: "PhD, PsyD",
        experience: "8 years",
        rating: 4.8,
        reviews: 145,
        chargesPerMin: 28,
        avatar: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=150&h=150&fit=crop&crop=face",
        specialties: ["Cognitive Behavioral Therapy", "Trauma Therapy", "Couples Counseling"],
        availability: "Available Now"
      },
      {
        id: 5,
        name: "Dr. Emily Thompson",
        title: "Clinical Psychologist",
        degree: "PhD, PsyD",
        experience: "8 years",
        rating: 4.8,
        reviews: 145,
        chargesPerMin: 28,
        avatar: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=150&h=150&fit=crop&crop=face",
        specialties: ["Cognitive Behavioral Therapy", "Trauma Therapy", "Couples Counseling"],
        availability: "Available Now"
      },

      {
        id: 6,
        name: "Dr. Michael Rivera",
        title: "Clinical Psychologist",
        degree: "PsyD",
        experience: "10 years",
        rating: 4.7,
        reviews: 178,
        chargesPerMin: 30,
        avatar: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=150&h=150&fit=crop&crop=face",
        specialties: ["Behavioral Therapy", "Stress Management", "Family Counseling"],
        availability: "Available Now"
      },
      {
        id: 7,
        name: "Dr. Sophia Patel",
        title: "Child Psychologist",
        degree: "PhD, PsyD",
        experience: "9 years",
        rating: 4.9,
        reviews: 210,
        chargesPerMin: 34,
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
        specialties: ["Child Therapy", "Learning Disorders", "Parent-Child Counseling"],
        availability: "Available in 30 min"
      },
      {
        id: 8,
        name: "Dr. James Anderson",
        title: "Clinical Psychologist",
        degree: "PhD",
        experience: "14 years",
        rating: 4.6,
        reviews: 199,
        chargesPerMin: 36,
        avatar: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=150&h=150&fit=crop&crop=face",
        specialties: ["Addiction Recovery", "Anger Management", "Trauma Therapy"],
        availability: "Available Tomorrow"
      },
      {
        id: 9,
        name: "Dr. Olivia Martinez",
        title: "Counseling Psychologist",
        degree: "PhD, MS",
        experience: "11 years",
        rating: 4.8,
        reviews: 162,
        chargesPerMin: 29,
        avatar: "https://images.unsplash.com/photo-1550525811-e5869dd03032?w=150&h=150&fit=crop&crop=face",
        specialties: ["Relationship Counseling", "Workplace Stress", "Life Coaching"],
        availability: "Available Now"
      },
      {
        id: 10,
        name: "Dr. Daniel Hughes",
        title: "Forensic Psychologist",
        degree: "PhD",
        experience: "13 years",
        rating: 4.7,
        reviews: 175,
        chargesPerMin: 40,
        avatar: "https://images.unsplash.com/photo-1603415526960-f7e0328a1d5d?w=150&h=150&fit=crop&crop=face",
        specialties: ["Forensic Assessment", "Criminal Behavior", "Court Testimonies"],
        availability: "Available in 2 hours"
      },
      {
        id: 11,
        name: "Dr. Isabella Rossi",
        title: "Clinical Psychologist",
        degree: "PsyD",
        experience: "7 years",
        rating: 4.9,
        reviews: 138,
        chargesPerMin: 27,
        avatar: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=150&h=150&fit=crop&crop=face",
        specialties: ["Anxiety Disorders", "Depression", "Teen Counseling"],
        availability: "Available Now"
      },
      {
        id: 12,
        name: "Dr. Ethan Walker",
        title: "Health Psychologist",
        degree: "PhD",
        experience: "16 years",
        rating: 4.8,
        reviews: 225,
        chargesPerMin: 38,
        avatar: "https://images.unsplash.com/photo-1603415527086-4e56d6d95a3c?w=150&h=150&fit=crop&crop=face",
        specialties: ["Chronic Illness Support", "Pain Management", "Lifestyle Therapy"],
        availability: "Available in 1 hour"
      }
      
    ]
  };

  const handleAppointment = (id) => {
    setLoadingId(id);
    setSuccessId(null);

    setTimeout(() => {
      setLoadingId(null);
      setSuccessId(id);
      toast.success("Appointment Added Successfully!");
      setTimeout(() => setSuccessId(null), 1500);
    }, 1200);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen relative">
      {/* 🔹 Top Left Home Button */}
      <div className="absolute top-4 left-4">
        <button
          onClick={() => navigate("/stepper")}
          className="flex items-center cursor-pointer text-2xl gap-2 text-blue-600 hover:text-blue-800 font-semibold transition"
        >
          <ArrowLeft size={20} className="text-[#E83FAF]" />
          <span className="hidden sm:block text-[#E83FAF]">Back</span>
        </button>
      </div>

      {/* Toggle Tabs */}
      <div className="flex justify-center mb-8">
        <div className="relative bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-lg border border-white/20">
          <div className="flex space-x-2">
            <motion.button
              onClick={() => setActiveTab('doctors')}
              className={`relative px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeTab === 'doctors'
                  ? 'text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {activeTab === 'doctors' && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"
                  layoutId="activeTab"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">Find Doctors</span>
            </motion.button>
            
            <motion.button
              onClick={() => setActiveTab('services')}
              className={`relative px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeTab === 'services'
                  ? 'text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {activeTab === 'services' && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"
                  layoutId="activeTab"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">Our Services</span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/30"
      >
        {activeTab === 'doctors' ? (
          <>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Meet Our Expert Mental Health Professionals</h2>
              <p className="text-gray-600">Connect with qualified psychiatrists and psychologists instantly</p>
            </div>

            {/* Category Filter */}
            <div className="flex justify-center mb-8">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-3 shadow-lg border border-white/20">
                <div className="flex space-x-3">
                  <motion.button
                    onClick={() => setSelectedCategory('psychiatrist')}
                    className={`relative px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                      selectedCategory === 'psychiatrist'
                        ? 'text-white shadow-lg'
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {selectedCategory === 'psychiatrist' && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl"
                        layoutId="categoryTab"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <span className="relative z-10">Psychiatrists</span>
                  </motion.button>
                  
                  <motion.button
                    onClick={() => setSelectedCategory('psychologist')}
                    className={`relative px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                      selectedCategory === 'psychologist'
                        ? 'text-white shadow-lg'
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {selectedCategory === 'psychologist' && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl"
                        layoutId="categoryTab"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <span className="relative z-10">Psychologists</span>
                  </motion.button>
                </div>
              </div>
            </div>
            
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {doctorsData[selectedCategory].map((doctor, index) => (
                <motion.div
                  key={doctor.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <Card className="bg-white/80 backdrop-blur-sm border-white/50 hover:shadow-xl transition-all duration-300 group">
                    <CardHeader className="pb-4">
                      <div className="flex items-start space-x-4">
                        <img
                          src={doctor.avatar}
                          alt={doctor.name}
                          className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
                        />
                        <div className="flex-1">
                          <CardTitle className="text-xl font-bold text-gray-800 group-hover:text-purple-600 transition-colors">
                            {doctor.name}
                          </CardTitle>
                          <CardDescription className="text-gray-600 mb-2">
                            {doctor.title} • {doctor.degree}
                          </CardDescription>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span>{doctor.experience}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span>{doctor.rating} ({doctor.reviews})</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="pt-0">
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-2 mb-3">
                          {doctor.specialties.map((specialty) => (
                            <Badge key={specialty} variant="secondary" className="bg-purple-50 text-purple-700 hover:bg-purple-100">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="flex items-center justify-between mb-4">
                          <div className="text-2xl font-bold text-green-600">
                          ₹{doctor.chargesPerMin}<span className="text-sm font-normal text-gray-500">/min</span>
                          </div>
                          <Badge className={`${doctor.availability.includes('Now') ? 'bg-green-500' : 'bg-orange-500'} text-white`}>
                            {doctor.availability}
                          </Badge>
                        </div>

                        {/* 🔹 Add Appointment Button */}
                        <motion.div whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.05 }}>
                          <Button
                            onClick={() => handleAppointment(doctor.id)}
                            disabled={loadingId === doctor.id}
                            className="w-full rounded-xl px-5 py-2 flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
                          >
                            {loadingId === doctor.id ? (
                              "Adding..."
                            ) : successId === doctor.id ? (
                              <>
                                <Check className="w-4 h-4" /> Added
                              </>
                            ) : (
                              "Add Appointment"
                            )}
                          </Button>
                        </motion.div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </>
        ) : (
          <div className="text-center">
  <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Healthcare Services</h2>
  
  {/* Example Services */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    
    {/* Appointment Booking */}
    <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:shadow-lg transition-all duration-300">
      <CardHeader className="text-center">
        <Calendar className="w-12 h-12 text-blue-600 mx-auto mb-3" />
        <CardTitle className="text-xl text-blue-800">Appointment Booking</CardTitle>
        <CardDescription>Schedule appointments with your preferred healthcare providers</CardDescription>
      </CardHeader>
    </Card>

    {/* Mental Health Counseling */}
    <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:shadow-lg transition-all duration-300">
      <CardHeader className="text-center">
        <Heart className="w-12 h-12 text-green-600 mx-auto mb-3" />
        <CardTitle className="text-xl text-green-800">Mental Health Counseling</CardTitle>
        <CardDescription>Get expert guidance for stress, anxiety, and emotional well-being</CardDescription>
      </CardHeader>
    </Card>

    {/* Health Monitoring */}
    <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 hover:shadow-lg transition-all duration-300">
      <CardHeader className="text-center">
        <Activity className="w-12 h-12 text-purple-600 mx-auto mb-3" />
        <CardTitle className="text-xl text-purple-800">Health Monitoring</CardTitle>
        <CardDescription>Track your progress and stay updated with personalized health reports</CardDescription>
      </CardHeader>
    </Card>

  </div>
</div>

        )}
      </motion.div>
    </div>
  );
};

export default DoctorSection;
