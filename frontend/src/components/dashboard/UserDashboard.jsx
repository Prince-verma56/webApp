import React, { useState, useEffect } from "react";
import {
  User,
  Calendar,
  Activity,
  FileText,
  MoreHorizontal,
  HeartPulse,
  Syringe,
  Weight,
  Ruler,
  Dumbbell,
  Brain,
  ChevronLeft,
  ChevronRight,
  BarChart3,
  TrendingUp,
  Clock,
  Star,
  Target,
  Award,
  Bell,
  Settings,
  LogOut,
  Search,
  Filter,
  Download,
  Plus,
  Edit,
  Trash2,
  Play,
  Pause,
  CheckCircle,
  XCircle,
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  
} from "lucide-react";

// Utility to join class names
const cn = (...classes) => classes.filter(Boolean).join(" ");

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
  success: "#10B981",       // Green for success
  warning: "#F59E0B",       // Amber for warning
  error: "#EF4444",         // Red for errors
};

// Component implementations
const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-2xl border bg-white/80 backdrop-blur-sm shadow-sm",
      className
    )}
    {...props}
  />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("font-semibold leading-none tracking-tight", className)}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-gray-500", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

// Button Component
const Button = React.forwardRef(({ 
  className, 
  variant = "default", 
  size = "default", 
  ...props 
}, ref) => {
  const variants = {
    default: "bg-indigo-600 text-white hover:bg-indigo-700",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
    outline: "border border-gray-300 bg-transparent hover:bg-gray-50",
    ghost: "bg-transparent hover:bg-gray-100",
    destructive: "bg-red-600 text-white hover:bg-red-700",
  };
  
  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-11 rounded-md px-8",
    icon: "h-10 w-10",
  };
  
  return (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  );
});
Button.displayName = "Button";

const Avatar = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className)}
    {...props}
  />
));
Avatar.displayName = "Avatar";

const AvatarImage = React.forwardRef(({ className, ...props }, ref) => (
  <img
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
));
AvatarImage.displayName = "AvatarImage";

const AvatarFallback = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-gray-100",
      className
    )}
    {...props}
  />
));
AvatarFallback.displayName = "AvatarFallback";

const Progress = React.forwardRef(({ value, className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("h-2 w-full overflow-hidden rounded-full bg-gray-200", className)}
    {...props}
  >
    <div
      className="h-full bg-indigo-600 transition-all"
      style={{ width: `${value}%` }}
    />
  </div>
));
Progress.displayName = "Progress";

// Sidebar items
const menuItems = [
  { id: "profile", label: "User", icon: User },
  { id: "sessions", label: "Therapy Sessions", icon: Calendar },
  { id: "progress", label: "Wellness Progress", icon: Activity },
  { id: "reports", label: "Reports", icon: FileText },
  { id: "fitme", label: "FitMe", icon: Dumbbell },
];

const mockUserData = {
  name: "Prince Verma",
  age: 32,
  Occupation: "Student",
  mentalHealth: "Single",
  avatarUrl: "/gitProfile.jpeg",
  email: "Student",
  // phone: "+1 (555) 123-4567",
  // location: "New York, NY",
  // joinDate: "January 15, 2023",
  healthMetrics: {
    bloodPressure: "120/80 mmHg",
    sugarLevel: "95 mg/dL",
    weight: "75 kg",
    height: "175 cm",
    bmi: "24.5",
    heartRate: "72 bpm",
  },
  goals: {
    steps: { current: 5342, target: 10000 },
    water: { current: 4, target: 8 },
    meditation: { current: 10, target: 15 },
    sleep: { current: 6, target: 8 },
  }
};

const progressData = [
  { month: "Jan", progress: 15 },
  { month: "Feb", progress: 20 },
  { month: "Mar", progress: 30 },
  { month: "Apr", progress: 25 },
  { month: "May", progress: 40 },
  { month: "Jun", progress: 35 },
  { month: "Jul", progress: 50 },
  { month: "Aug", progress: 45 },
  { month: "Sep", progress: 60 },
  { month: "Oct", progress: 65 },
  { month: "Nov", progress: 70 },
  { month: "Dec", progress: 75 },
];

const therapySessionsData = [
  { date: "2023-10-01", time: "10:00 AM", therapist: "Dr. Smith", notes: "Discussed stress management techniques.", status: "Completed" },
  { date: "2023-09-15", time: "02:30 PM", therapist: "Dr. Jones", notes: "Explored childhood memories and their impact.", status: "Completed" },
  { date: "2023-09-01", time: "09:00 AM", therapist: "Dr. Smith", notes: "Reviewed progress and set new goals.", status: "Completed" },
  { date: "2023-08-15", time: "11:00 AM", therapist: "Dr. Lee", notes: "Focused on mindfulness and meditation practices.", status: "Completed" },
  { date: "2023-08-01", time: "01:00 PM", therapist: "Dr. Smith", notes: "Initial consultation and mental health assessment.", status: "Completed" },
];

const upcomingSessions = [
  { date: "2023-11-05", time: "10:00 AM", therapist: "Dr. Smith", type: "Regular Session" },
  { date: "2023-11-12", time: "02:00 PM", therapist: "Dr. Johnson", type: "Group Therapy" },
];

const physicalExercises = [
  {
    title: "Morning Stretch Routine",
    description: "5–10 mins of full-body stretching improves blood flow, reduces stiffness, and boosts energy.",
    image: "https://images.unsplash.com/photo-1544367527-d0e513a968a3?auto=format&fit=crop&q=80&w=2670",
    duration: "10 min",
    difficulty: "Easy",
    completed: true,
  },
  {
    title: "Brisk Walking",
    description: "A 20–30 min walk outdoors helps improve cardiovascular health and reduces anxiety.",
    image: "https://images.unsplash.com/photo-1571019613-43454-1cb3f90b78ae?auto=format&fit=crop&q=80&w=2670",
    duration: "25 min",
    difficulty: "Easy",
    completed: false,
  },
  {
    title: "Yoga (Sun Salutation)",
    description: "Combines stretching, controlled breathing, and mindfulness—great for both body and mind.",
    image: "https://images.unsplash.com/photo-1558021212-bc0884242663?auto=format&fit=crop&q=80&w=2670",
    duration: "15 min",
    difficulty: "Medium",
    completed: true,
  },
  {
    title: "Strength Training (Bodyweight)",
    description: "Simple push-ups, squats, and planks help build strength and release endorphins.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb3f90b78ae?auto=format&fit=crop&q=80&w=2670",
    duration: "20 min",
    difficulty: "Medium",
    completed: false,
  },
];

const mentalExercises = [
  {
    title: "Deep Breathing (Box Breathing)",
    description: "Inhale for 4 sec → Hold for 4 sec → Exhale for 4 sec → Hold for 4 sec. Reduces stress instantly.",
    image: "https://images.unsplash.com/photo-1594967399434-d02161f38e07?auto=format&fit=crop&q=80&w=2670",
    duration: "5 min",
    difficulty: "Easy",
    completed: true,
  },
  {
    title: "Mindful Journaling",
    description: "Spend 10 mins writing down thoughts/feelings. Improves clarity and reduces overthinking.",
    image: "https://images.unsplash.com/photo-1549424888-00e704812328?auto=format&fit=crop&q=80&w=2670",
    duration: "10 min",
    difficulty: "Easy",
    completed: false,
  },
  {
    title: "Guided Meditation",
    description: "Short 10–15 min meditation sessions enhance focus and calm the nervous system.",
    image: "https://images.unsplash.com/photo-1538356230-043-41c3046f82c4?auto=format&fit=crop&q=80&w=2670",
    duration: "15 min",
    difficulty: "Medium",
    completed: true,
  },
  {
    title: "Gratitude Practice",
    description: "Write down 3 things you're grateful for daily. Helps shift focus from stress to positivity.",
    image: "https://images.unsplash.com/photo-1541781774459-bb2af2f6e914?auto=format&fit=crop&q=80&w=2670",
    duration: "5 min",
    difficulty: "Easy",
    completed: false,
  },
];

const renderContent = (activePage, healthType, setHealthType) => {
  const fallbackImage = 'https://via.placeholder.com/600x400.png?text=Image+Not+Found';

  switch (activePage) {
    case "profile":
      return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* User Profile Card */}
          <Card className="md:col-span-2 lg:col-span-3">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-2xl font-bold text-gray-800">
                  Welcome, {mockUserData.name}!
                </CardTitle>
                <CardDescription className="text-gray-500">
                  Your personal wellness overview
                </CardDescription>
              </div>
              <Avatar className="h-16 w-16 border-2 border-white shadow-md">
                <AvatarImage
                  src={mockUserData.avatarUrl}
                  alt={mockUserData.name}
                  className="object-cover"
                />
                <AvatarFallback className="bg-indigo-100 text-indigo-600">
                  {mockUserData.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </CardHeader>
            <CardContent className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <h3 className="font-medium text-gray-700">Personal Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
            
                  </div>
                  <div className="flex items-center gap-3">

                  </div>

                  <div className="flex items-center gap-3">
                    {/* <BirthdayCake className="h-4 w-4 text-gray-500" /> */}
                    <span className="text-gray-700">{mockUserData.age} years old</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <User className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-700">{mockUserData.Occupation}</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-medium text-gray-700">Account Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Member since</span>
                    <span className="font-medium">{mockUserData.joinDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status</span>
                    <span className="font-medium text-green-600">Active</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Plan</span>
                    <span className="font-medium">Premium</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Therapy sessions</span>
                    <span className="font-medium">12 completed</span>
                  </div>
                </div>
                <Button className="w-full">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Health Metrics Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-indigo-600" />
                Health Metrics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <HeartPulse className="h-5 w-5 text-red-500" />
                  <span className="font-medium">Blood Pressure</span>
                </div>
                <span className="font-semibold">{mockUserData.healthMetrics.bloodPressure}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Syringe className="h-5 w-5 text-blue-500" />
                  <span className="font-medium">Sugar Level</span>
                </div>
                <span className="font-semibold">{mockUserData.healthMetrics.sugarLevel}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Weight className="h-5 w-5 text-green-500" />
                  <span className="font-medium">Weight</span>
                </div>
                <span className="font-semibold">{mockUserData.healthMetrics.weight}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Ruler className="h-5 w-5 text-indigo-500" />
                  <span className="font-medium">Height</span>
                </div>
                <span className="font-semibold">{mockUserData.healthMetrics.height}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Activity className="h-5 w-5 text-purple-500" />
                  <span className="font-medium">BMI</span>
                </div>
                <span className="font-semibold">{mockUserData.healthMetrics.bmi}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <HeartPulse className="h-5 w-5 text-pink-500" />
                  <span className="font-medium">Heart Rate</span>
                </div>
                <span className="font-semibold">{mockUserData.healthMetrics.heartRate}</span>
              </div>
            </CardContent>
          </Card>

          {/* Wellness Progress Card */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-indigo-600" />
                Wellness Progress
              </CardTitle>
              <CardDescription>
                Your mental wellness journey over the past year
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 w-full bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg flex items-center justify-center">
                <div className="text-center p-6">
                  <BarChart3 className="h-12 w-12 text-indigo-300 mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-700">Progress Tracking</h3>
                  <p className="text-gray-500 text-sm mt-2">
                    Visualization of your monthly wellness scores
                  </p>
                  <div className="mt-4 flex justify-center">
                    <div className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm">
                      View Detailed Report
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-green-800 font-semibold">Best Month</div>
                  <div className="text-2xl font-bold text-green-600">December</div>
                  <div className="text-green-700">75% wellness score</div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-blue-800 font-semibold">Consistency</div>
                  <div className="text-2xl font-bold text-blue-600">85%</div>
                  <div className="text-blue-700">Monthly participation</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Daily Goals Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-indigo-600" />
                Daily Goals
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Steps</span>
                  <span className="text-sm font-medium">{mockUserData.goals.steps.current}/{mockUserData.goals.steps.target}</span>
                </div>
                <Progress value={(mockUserData.goals.steps.current / mockUserData.goals.steps.target) * 100} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Water</span>
                  <span className="text-sm font-medium">{mockUserData.goals.water.current}/{mockUserData.goals.water.target} glasses</span>
                </div>
                <Progress value={(mockUserData.goals.water.current / mockUserData.goals.water.target) * 100} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Meditation</span>
                  <span className="text-sm font-medium">{mockUserData.goals.meditation.current}/{mockUserData.goals.meditation.target} min</span>
                </div>
                <Progress value={(mockUserData.goals.meditation.current / mockUserData.goals.meditation.target) * 100} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Sleep</span>
                  <span className="text-sm font-medium">{mockUserData.goals.sleep.current}/{mockUserData.goals.sleep.target} hours</span>
                </div>
                <Progress value={(mockUserData.goals.sleep.current / mockUserData.goals.sleep.target) * 100} className="h-2" />
              </div>
              <Button className="w-full mt-2">
                <Plus className="h-4 w-4 mr-2" />
                Add Goal
              </Button>
            </CardContent>
          </Card>
        </div>
      );
    case "sessions":
      return (
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="md:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Therapy Session History</CardTitle>
                <CardDescription>
                  A record of your past therapy sessions.
                </CardDescription>
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Session
              </Button>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden">
                <div className="grid grid-cols-4 bg-gray-50 p-4 font-medium text-gray-700">
                  <div>Date</div>
                  <div>Therapist</div>
                  <div>Time</div>
                  <div>Status</div>
                </div>
                {therapySessionsData.map((session, index) => (
                  <div key={index} className="grid grid-cols-4 p-4 border-t hover:bg-gray-50">
                    <div className="font-medium">{session.date}</div>
                    <div>{session.therapist}</div>
                    <div>{session.time}</div>
                    <div>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {session.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Sessions</CardTitle>
              <CardDescription>
                Your scheduled therapy sessions.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingSessions.map((session, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold">{session.therapist}</h4>
                      <p className="text-sm text-gray-600">{session.type}</p>
                    </div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      Upcoming
                    </span>
                  </div>
                  <div className="mt-3 flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    {session.date} at {session.time}
                  </div>
                  <div className="mt-3 flex space-x-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      Reschedule
                    </Button>
                    <Button size="sm" className="flex-1">
                      Join
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Therapy Progress</CardTitle>
              <CardDescription>
                Your consistency in therapy sessions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-700">Attendance Rate</div>
                    <div className="text-xs text-gray-500">Last 3 months</div>
                  </div>
                  <div className="text-2xl font-bold text-indigo-600">92%</div>
                </div>
                <Progress value={92} className="h-2" />
                
                <div className="flex items-center mt-6">
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-700">Session Completion</div>
                    <div className="text-xs text-gray-500">Overall</div>
                  </div>
                  <div className="text-2xl font-bold text-green-600">100%</div>
                </div>
                <Progress value={100} className="h-2" />
                
                <div className="mt-6 bg-indigo-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-indigo-800">Next Session</h4>
                  <p className="text-indigo-700 text-sm mt-1">November 5, 2023 at 10:00 AM with Dr. Smith</p>
                  <Button size="sm" className="mt-3 bg-indigo-600 hover:bg-indigo-700">
                    View Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    case "progress":
      return (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-indigo-600" />
              Your Wellness Progress
            </CardTitle>
            <CardDescription>
              This chart reflects your progress based on your completed exercises and feedback.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-96 w-full bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg flex items-center justify-center">
              <div className="text-center p-6 max-w-md">
                <BarChart3 className="h-16 w-16 text-indigo-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800">Progress Visualization</h3>
                <p className="text-gray-600 mt-2">
                  Your wellness progress chart would be displayed here with interactive features to track your journey over time.
                </p>
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="text-2xl font-bold text-indigo-600">75%</div>
                    <div className="text-sm text-gray-600">Current Score</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="text-2xl font-bold text-green-600">+35%</div>
                    <div className="text-sm text-gray-600">Since January</div>
                  </div>
                </div>
                <Button className="mt-6">
                  <Download className="h-4 w-4 mr-2" />
                  Download Report
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      );
    case "reports":
      return (
        <Card>
          <CardHeader>
            <CardTitle>Health Reports</CardTitle>
            <CardDescription>
              Access and download your health reports.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900">No reports available yet</h3>
              <p className="text-gray-500 mt-2">
                Your health reports will appear here after your next therapy session.
              </p>
              <Button className="mt-4">
                <Plus className="h-4 w-4 mr-2" />
                Request Report
              </Button>
            </div>
          </CardContent>
        </Card>
      );
    case "fitme":
      const exercises = healthType === "physical" ? physicalExercises : mentalExercises;
      
      return (
        <div className="flex flex-col items-center space-y-8">
          <div className="w-full flex justify-center">
            <div className="bg-white/70 backdrop-blur-sm rounded-full p-1 border">
              <button
                onClick={() => setHealthType("physical")}
                className={`px-6 py-2 rounded-full transition-colors duration-200 ${
                  healthType === "physical"
                    ? "bg-indigo-600 text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Dumbbell className="inline h-4 w-4 mr-2" />
                Physical Health
              </button>
              <button
                onClick={() => setHealthType("mental")}
                className={`px-6 py-2 rounded-full transition-colors duration-200 ${
                  healthType === "mental"
                    ? "bg-indigo-600 text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Brain className="inline h-4 w-4 mr-2" />
                Mental Health
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            {exercises.map((item, index) => (
              <Card key={index} className="overflow-hidden group">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-4">
                    <div className="text-white">
                      <h3 className="font-bold text-lg">{item.title}</h3>
                      <div className="flex items-center mt-2">
                        <Clock className="h-4 w-4 mr-1" />
                        <span className="text-sm">{item.duration}</span>
                        <span className="mx-2">•</span>
                        <span className={`text-sm px-2 py-0.5 rounded-full ${
                          item.difficulty === "Easy" 
                            ? "bg-green-100 text-green-800" 
                            : "bg-yellow-100 text-yellow-800"
                        }`}>
                          {item.difficulty}
                        </span>
                      </div>
                    </div>
                  </div>
                  {item.completed && (
                    <div className="absolute top-4 right-4 bg-green-500 text-white p-1 rounded-full">
                      <CheckCircle className="h-5 w-5" />
                    </div>
                  )}
                </div>
                <CardContent className="p-4">
                  <p className="text-gray-600 text-sm">{item.description}</p>
                  <div className="mt-4 flex space-x-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Play className="h-4 w-4 mr-1" />
                      Start
                    </Button>
                    <Button size="sm" className="flex-1">
                      <Plus className="h-4 w-4 mr-1" />
                      Add to Plan
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      );
    default:
      return null;
  }
};

export default function UserDashboard() {
  const [activePage, setActivePage] = useState("profile");
  const [healthType, setHealthType] = useState("physical");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Load state from localStorage on component mount
  useEffect(() => {
    const savedPage = localStorage.getItem("activePage");
    if (savedPage) {
      setActivePage(savedPage);
    }
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("activePage", activePage);
  }, [activePage]);

  // Update active page and save to localStorage
  const handlePageChange = (pageId) => {
    setActivePage(pageId);
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-indigo-50 to-purple-50 font-sans">
      {/* Sidebar */}
      <div className={`bg-white/90 backdrop-blur-sm shadow-xl h-full border-r border-gray-200 transition-all duration-300 ${
        sidebarCollapsed ? "w-16" : "w-64"
      } flex flex-col fixed z-50`}>
        <div className="flex items-center justify-between p-4 h-16 border-b border-gray-200">
          {!sidebarCollapsed && (
            <h2 className="font-bold text-xl text-gray-800 flex items-center">
              <Activity className="h-6 w-6 text-indigo-600 mr-2" />
              MindSpace
            </h2>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          >
            {sidebarCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
          </Button>
        </div>

        <nav className="flex-1 px-2 py-4 space-y-1">
          {menuItems.map((item) => (
            <Button
              key={item.id}
              variant={activePage === item.id ? "default" : "ghost"}
              className={`w-full justify-start text-gray-700 hover:bg-indigo-100 hover:text-indigo-700 transition-colors duration-200 ${
                activePage === item.id ? "bg-indigo-100 text-indigo-700" : ""
              }`}
              onClick={() => handlePageChange(item.id)}
            >
              <item.icon className="h-5 w-5" />
              {!sidebarCollapsed && <span className="ml-2">{item.label}</span>}
            </Button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <Button
            variant="ghost"
            className="w-full justify-start text-gray-700 hover:bg-gray-100"
          >
            <Settings className="h-5 w-5" />
            {!sidebarCollapsed && <span className="ml-2">Settings</span>}
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-gray-700 hover:bg-gray-100 mt-2"
          >
            <LogOut className="h-5 w-5" />
            {!sidebarCollapsed && <span className="ml-2">Logout</span>}
          </Button>
        </div>
      </div>

      {/* Main content area */}
      <div className={`flex-1 flex flex-col p-6 transition-all duration-300 ${
        sidebarCollapsed ? "ml-16" : "ml-64"
      }`}>
        <header className="flex justify-between items-center pb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {menuItems.find(item => item.id === activePage)?.label || "Dashboard"}
            </h1>
            <p className="text-gray-600 mt-1">
              {activePage === "profile" 
                ? "Your personal wellness dashboard" 
                : `Manage your ${menuItems.find(item => item.id === activePage)?.label.toLowerCase()}`}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Avatar>
              <AvatarImage
                src={mockUserData.avatarUrl}
                alt={mockUserData.name}
              />
              <AvatarFallback className="bg-indigo-100 text-indigo-600">
                {mockUserData.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </div>
        </header>
        
        <main className="flex-1 overflow-y-auto">
          {renderContent(activePage, healthType, setHealthType)}
        </main>
      </div>
    </div>
  );
}