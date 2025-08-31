import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Star, Video, Phone, Calendar } from 'lucide-react';

const DoctorSection = () => {
  const [activeTab, setActiveTab] = useState('doctors');
  const [selectedCategory, setSelectedCategory] = useState('psychiatrist');

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
        name: "Dr. Maria Rodriguez",
        title: "Child Psychiatrist",
        degree: "MD, FAACAP",
        experience: "10 years",
        rating: 4.9,
        reviews: 156,
        chargesPerMin: 38,
        avatar: "https://images.unsplash.com/photo-1594824475532-67f08db82598?w=150&h=150&fit=crop&crop=face",
        specialties: ["Child Psychology", "Autism Spectrum", "Behavioral Issues"],
        availability: "Available Now"
      },
      {
        id: 4,
        name: "Dr. James Wilson",
        title: "Psychiatrist",
        degree: "MD, MRCPsych",
        experience: "18 years",
        rating: 4.7,
        reviews: 278,
        chargesPerMin: 40,
        avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&h=150&fit=crop&crop=face",
        specialties: ["Addiction Medicine", "PTSD", "Personality Disorders"],
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
        id: 6,
        name: "Dr. Robert Kim",
        title: "Counseling Psychologist",
        degree: "PhD, LPC",
        experience: "14 years",
        rating: 4.9,
        reviews: 203,
        chargesPerMin: 25,
        avatar: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face",
        specialties: ["Marriage Counseling", "Family Therapy", "Stress Management"],
        availability: "Available Now"
      },
      {
        id: 7,
        name: "Dr. Lisa Anderson",
        title: "Health Psychologist",
        degree: "PhD, ABPP",
        experience: "11 years",
        rating: 4.7,
        reviews: 167,
        chargesPerMin: 30,
        avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&h=150&fit=crop&crop=face",
        specialties: ["Chronic Pain Management", "Health Behavior Change", "Mindfulness"],
        availability: "Available in 15 min"
      },
      {
        id: 8,
        name: "Dr. Michael Brown",
        title: "Sports Psychologist",
        degree: "PhD, CC-AASP",
        experience: "9 years",
        rating: 4.8,
        reviews: 124,
        chargesPerMin: 33,
        avatar: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=150&h=150&fit=crop&crop=face",
        specialties: ["Performance Enhancement", "Sports Psychology", "Mental Training"],
        availability: "Available Now"
      }
    ]
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      {/* Toggle Buttons */}
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

      {/* Content Container */}
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

            {/* Category Filter Buttons */}
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
                        <div className="relative">
                          <img
                            src={doctor.avatar}
                            alt={doctor.name}
                            className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
                          />
                          <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white ${
                            doctor.availability.includes('Now') ? 'bg-green-500' : 'bg-orange-500'
                          }`} />
                        </div>
                        
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
                            ${doctor.chargesPerMin}<span className="text-sm font-normal text-gray-500">/min</span>
                          </div>
                          <Badge className={`${
                            doctor.availability.includes('Now') ? 'bg-green-500' : 'bg-orange-500'
                          } text-white`}>
                            {doctor.availability}
                          </Badge>
                        </div>
                        
                        <div className="flex space-x-2">
                          <Button className="flex-1 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700">
                            <Video className="w-4 h-4 mr-2" />
                            Video Call
                          </Button>
                          <Button variant="outline" className="flex-1 border-purple-200 text-purple-600 hover:bg-purple-50">
                            <Phone className="w-4 h-4 mr-2" />
                            Audio Call
                          </Button>
                        </div>
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
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
              >
                <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:shadow-lg transition-all duration-300">
                  <CardHeader className="text-center">
                    <Video className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                    <CardTitle className="text-xl text-blue-800">Telemedicine</CardTitle>
                    <CardDescription>Connect with doctors remotely through video or audio calls</CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:shadow-lg transition-all duration-300">
                  <CardHeader className="text-center">
                    <Calendar className="w-12 h-12 text-green-600 mx-auto mb-3" />
                    <CardTitle className="text-xl text-green-800">Appointment Booking</CardTitle>
                    <CardDescription>Schedule appointments with your preferred healthcare providers</CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 hover:shadow-lg transition-all duration-300">
                  <CardHeader className="text-center">
                    <Star className="w-12 h-12 text-purple-600 mx-auto mb-3" />
                    <CardTitle className="text-xl text-purple-800">Specialist Care</CardTitle>
                    <CardDescription>Access to specialized medical care across multiple disciplines</CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            </div>
            
            <div className="mt-8">
              <Button size="lg" className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700">
                Explore All Services
              </Button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default DoctorSection;