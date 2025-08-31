import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

// Mock Card components to replicate the shadcn/ui style
const Card = ({ children, className }) => (
  <div className={`bg-white rounded-lg shadow-sm border border-gray-200 ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children, className }) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>
    {children}
  </div>
);

const CardTitle = ({ children, className }) => (
  <h3 className={`text-2xl font-semibold leading-none tracking-tight ${className}`}>
    {children}
  </h3>
);

const CardDescription = ({ children, className }) => (
  <p className={`text-sm text-muted-foreground ${className}`}>
    {children}
  </p>
);

const CardContent = ({ children, className }) => (
  <div className={`p-6 pt-0 ${className}`}>
    {children}
  </div>
);

// Data for the wavy chart
const chartData = [
  { name: 'Jan', value1: 400, value2: 240 },
  { name: 'Feb', value1: 300, value2: 139 },
  { name: 'Mar', value1: 200, value2: 980 },
  { name: 'Apr', value1: 278, value2: 390 },
  { name: 'May', value1: 189, value2: 480 },
  { name: 'Jun', value1: 239, value2: 380 },
  { name: 'Jul', value1: 349, value2: 430 },
  { name: 'Aug', value1: 400, value2: 240 },
  { name: 'Sep', value1: 300, value2: 139 },
  { name: 'Oct', value1: 200, value2: 980 },
  { name: 'Nov', value1: 278, value2: 390 },
  { name: 'Dec', value1: 189, value2: 480 },
];

const lifecycleStages = [
  { name: 'Awareness', description: 'The user discovers the platform, seeking solutions for their mental health needs.', color: 'bg-blue-500' },
  { name: 'Engagement', description: 'They interact with content, try a guided meditation, or explore our resources.', color: 'bg-green-500' },
  { name: 'Adoption', description: 'The user finds a service or tool that works for them and begins to use it regularly.', color: 'bg-purple-500' },
  { name: 'Retention', description: 'They continue to use the platform as a trusted part of their mental wellness routine.', color: 'bg-yellow-500' },
  { name: 'Advocacy', description: 'The user feels empowered and shares their positive experience, helping others on their journey.', color: 'bg-pink-500' },
];

// The main component for the Product Lifecycle page
const ProductLifecycle = () => {
  return (
    <div className="p-8 space-y-8 font-sans">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Understanding the User Journey</CardTitle>
          <CardDescription>
            Visualize how users progress through our platform and the mental wellness benefits they gain at each stage.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <h3 className="text-lg font-semibold mb-4">Mental Wellness Progress</h3>
          <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="value1" stroke="#8884d8" fillOpacity={1} fill="url(#colorValue1)" />
                <Area type="monotone" dataKey="value2" stroke="#82ca9d" fillOpacity={1} fill="url(#colorValue2)" />
                <defs>
                  <linearGradient id="colorValue1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorValue2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>The User Lifecycle Journey</CardTitle>
          <CardDescription>
            A step-by-step visualization of the user's path to improved mental wellness.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative flex justify-between items-start my-8">
            {lifecycleStages.map((stage, index) => (
              <React.Fragment key={index}>
                <div className="flex flex-col items-center flex-1 text-center px-2 z-10">
                  <div className={`w-8 h-8 rounded-full ${stage.color} mb-2`}></div>
                  <h4 className="font-semibold text-gray-900 text-sm mb-1">{stage.name}</h4>
                  <p className="text-xs text-gray-600">{stage.description}</p>
                </div>
                {index < lifecycleStages.length - 1 && (
                  <div className="absolute top-4 left-1/2 right-1/2 w-full h-px bg-gray-300 transform -translate-x-1/2 -z-10"></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductLifecycle;
