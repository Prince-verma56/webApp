import React, { useState, useEffect } from "react";
import {
  User,
  Calendar,
  Activity,
  FileText,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  LineChart,
  BookOpen,
  Users,
  CheckCircle,
  XCircle,
  Star,
  Facebook,
  Twitter,
  Instagram,
  Leaf,
  Mail,
  Home as HomeIcon,
  Heart,
  Brain,
  Shield,
  Clock,
  ArrowRight,
  ChevronDown,
  Menu,
  X,
  Cloud,
  Sun,
  Moon
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

// Mental health-friendly color palette
const COLORS = {
  primary: "#5B6BF0",       // Calming blue
  primaryLight: "#8B9AF8",  // Lighter blue
  secondary: "#7C3AED",     // Soothing purple
  accent: "#10B981",        // Renewing green
  background: "#F9FAFB",    // Light background
  text: "#1F2937",          // Dark gray for text
  textLight: "#6B7280",     // Light gray for secondary text
  card: "#FFFFFF",          // White for cards
  border: "#E5E7EB",        // Light border
  highlight: "#8B5CF6",     // Highlight purple
};

const HeroSection = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-purple-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-20 left-10 animate-float">
          <Cloud className="w-20 h-20 text-blue-300" />
        </div>
        <div className="absolute top-40 right-20 animate-float" style={{ animationDelay: '1s' }}>
          <Sun className="w-16 h-16 text-yellow-200" />
        </div>
        <div className="absolute bottom-20 left-1/4 animate-float" style={{ animationDelay: '2s' }}>
          <Moon className="w-14 h-14 text-purple-200" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
        <div className={`transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900">
            Start your <span className="text-purple-600">journey</span> to better mental wellbeing
          </h1>
          
          <p className="mt-6 text-lg text-gray-600 max-w-xl">
            MindSpace brings short guided practices, daily tracking and actionable insights together in one safe place — built to help you feel calmer, clearer and more consistent.
          </p>
          
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Button 
              className="px-8 py-3 text-lg font-medium transition-all hover:shadow-lg"
              style={{ backgroundColor: COLORS.primary, color: 'white' }}
              size="lg"
              onClick={() => navigate("/stepper")}
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <Button
              variant="outline"
              className="px-8 py-3 text-lg font-medium border-2"
              style={{ borderColor: COLORS.primary, color: COLORS.primary }}
            >
              Learn More
            </Button>
          </div>
        </div>
        
        <div className={`transition-all duration-700 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
            <div className="flex items-center mb-6">
              <div className="p-2 rounded-full bg-blue-100 mr-3">
                <Activity className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">Quick Snapshot</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <Card className="bg-blue-50 border-blue-100">
                <CardContent className="p-4">
                  <div className="text-sm text-blue-600">Daily Mood</div>
                  <div className="text-xl font-bold text-gray-800">Good</div>
                </CardContent>
              </Card>
              
              <Card className="bg-purple-50 border-purple-100">
                <CardContent className="p-4">
                  <div className="text-sm text-purple-600">Streak</div>
                  <div className="text-xl font-bold text-gray-800">6 days</div>
                </CardContent>
              </Card>
            </div>
            
            <Card className="bg-green-50 border-green-100">
              <CardContent className="p-4">
                <div className="flex items-center mb-2">
                  <Heart className="h-4 w-4 text-green-600 mr-2" />
                  <div className="text-sm font-medium text-green-600">Tip of the day</div>
                </div>
                <div className="text-base text-gray-700">
                  Take 3 mindful breaths before starting your day.
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

const FeaturesSection = () => {
  const features = [
    {
      icon: <LineChart className="h-10 w-10" />,
      title: "Daily Mood Tracking",
      text: "Capture your mood and understand patterns over time.",
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: <BookOpen className="h-10 w-10" />,
      title: "Guided Practices",
      text: "Short practices to help you breathe, relax and refocus.",
      color: "bg-purple-100 text-purple-600"
    },
    {
      icon: <Users className="h-10 w-10" />,
      title: "Expert Support",
      text: "Access resources and community to support your journey.",
      color: "bg-green-100 text-green-600"
    },
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Powerful tools, designed for habit
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Small daily actions lead to big changes — we make them simple, measurable and kind.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-2"
            >
              <div className={`inline-flex p-3 rounded-xl mb-6 ${feature.color}`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 mb-6">
                {feature.text}
              </p>
              <Button variant="ghost" className="p-0 text-blue-600 hover:text-blue-700 hover:bg-transparent">
                Explore
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const HowItWorksSection = () => {
  const steps = [
    {
      title: "Step 1",
      description: "Answer a short questionnaire so we understand your needs",
      icon: <FileText className="h-6 w-6" />
    },
    {
      title: "Step 2",
      description: "Get personalized suggestions & short guided sessions",
      icon: <Brain className="h-6 w-6" />
    },
    {
      title: "Step 3",
      description: "Track progress and adapt with data-driven insights",
      icon: <LineChart className="h-6 w-6" />
    },
  ];

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How it works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Simple, guided, science-aligned steps to help you build better mental habits.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-2/3 w-full h-0.5 bg-blue-200"></div>
              )}
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center relative z-10">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-6">
                  {step.icon}
                </div>
                <div className="text-sm font-semibold text-blue-600 mb-2">
                  {step.title}
                </div>
                <div className="text-lg font-medium text-gray-800">
                  {step.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "MindSpace helped me be aware of my mood triggers — small practices made a big difference.",
      author: "Asha R.",
      role: "Designer",
      rating: 5
    },
    {
      quote: "The daily check-ins are gentle and effective. Highly recommended.",
      author: "Rahul M.",
      role: "Engineer",
      rating: 5
    },
    {
      quote: "Simple, practical, and real — the best stress helper I've tried.",
      author: "Neha P.",
      role: "Teacher",
      rating: 4
    },
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star 
        key={i} 
        className={`h-4 w-4 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} 
      />
    ));
  };

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Trusted by users
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Real stories from people who used small daily practices to get big results.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
              <div className="flex mb-4">
                {renderStars(testimonial.rating)}
              </div>
              <p className="text-gray-600 italic mb-6">
                "{testimonial.quote}"
              </p>
              <div>
                <div className="font-semibold text-gray-900">{testimonial.author}</div>
                <div className="text-sm text-gray-500">{testimonial.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ComparisonSection = () => {
  const mindspaceBenefits = [
    "Affordable",
    "Flexible",
    "Daily small practices",
    "On-demand resources",
  ];

  const traditionalCons = [
    "Expensive",
    "Weekly only",
    "Limited access between sessions",
  ];

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            MindSpace vs Traditional
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-2xl border border-green-100 shadow-sm">
            <div className="flex items-center mb-6">
              <div className="p-2 rounded-full bg-green-100 mr-4">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">MindSpace</h3>
            </div>
            <ul className="space-y-4">
              {mindspaceBenefits.map((benefit, index) => (
                <li key={index} className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-white p-8 rounded-2xl border border-red-100 shadow-sm">
            <div className="flex items-center mb-6">
              <div className="p-2 rounded-full bg-red-100 mr-4">
                <XCircle className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Traditional</h3>
            </div>
            <ul className="space-y-4">
              {traditionalCons.map((point, index) => (
                <li key={index} className="flex items-center">
                  <XCircle className="h-5 w-5 text-red-500 mr-3" />
                  <span className="text-gray-700">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

const CTASection = () => {
  return (
    <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Ready to try MindSpace?
        </h2>
        <p className="text-lg text-blue-100 max-w-2xl mx-auto mb-8">
          Start with a free 7-day trial and see how daily micro-practices can help your mood and focus.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            className="px-8 py-3 text-lg font-medium bg-white text-blue-600 hover:bg-gray-100"
            size="lg"
          >
            Start Free Trial
          </Button>
          <Button 
            variant="outline" 
            className="px-8 py-3 text-lg font-medium border-2 border-white text-white hover:bg-white hover:text-blue-600"
            size="lg"
          >
            Contact Sales
          </Button>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center mb-4">
            <Leaf className="h-6 w-6 text-green-400 mr-2" />
            <span className="text-xl font-bold">MindSpace</span>
          </div>
          <p className="text-gray-400">
            Better daily support for mental wellbeing
          </p>
        </div>
        
        <div>
          <h3 className="font-semibold mb-4">Product</h3>
          <ul className="space-y-2 text-gray-400">
            <li>Features</li>
            <li>Pricing</li>
            <li>Testimonials</li>
          </ul>
        </div>
        
        <div>
          <h3 className="font-semibold mb-4">Resources</h3>
          <ul className="space-y-2 text-gray-400">
            <li>Blog</li>
            <li>Guides</li>
            <li>Support</li>
          </ul>
        </div>
        
        <div>
          <h3 className="font-semibold mb-4">Connect</h3>
          <div className="flex space-x-4">
            <Facebook className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
            <Twitter className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
            <Instagram className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} MindSpace — All rights reserved
      </div>
    </footer>
  );
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Leaf className="h-8 w-8 text-blue-600 mr-2" />
            <span className="text-xl font-bold text-gray-900">MindSpace</span>
          </div>
          
          <div className="hidden md:flex space-x-8">
            <a href="#features" className="text-gray-700 hover:text-blue-600">Features</a>
            <a href="#how-it-works" className="text-gray-700 hover:text-blue-600">How It Works</a>
            <a href="#testimonials" className="text-gray-700 hover:text-blue-600">Testimonials</a>
            <a href="#pricing" className="text-gray-700 hover:text-blue-600">Pricing</a>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" className="text-gray-700">Login</Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">Sign Up</Button>
          </div>
          
          <div className="md:hidden">
            <Button variant="ghost" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <a href="#features" className="text-gray-700 hover:text-blue-600">Features</a>
              <a href="#how-it-works" className="text-gray-700 hover:text-blue-600">How It Works</a>
              <a href="#testimonials" className="text-gray-700 hover:text-blue-600">Testimonials</a>
              <a href="#pricing" className="text-gray-700 hover:text-blue-600">Pricing</a>
              <div className="pt-4 flex flex-col space-y-3">
                <Button variant="outline" className="w-full">Login</Button>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Sign Up</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <ComparisonSection />
      <CTASection />
      <Footer />
      
      <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}