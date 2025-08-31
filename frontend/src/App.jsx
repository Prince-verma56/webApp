import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Dashboard from "./components/dashboard/Dashboard.jsx";
import MoodTracker from "./components/moodtracker/MoodTracker.jsx";
import AiRender from "./components/pages/AiRender.jsx";
import DoctorSection from "./components/DoctorSection/DoctorSection.jsx";
import MusicTherapyPage from "./components/MusicTherapyPage.jsx/MusdicTherapyPage.jsx";
import StepperForm from "./components/pages/StepperForm.jsx";

import SignUp from "./components/forms/SignUp.jsx";
import BlogPage from "./components/pages/BlogPage.jsx";
import LandingPage from "./components/sections/Home.jsx";
import Lenis from "lenis";
import SellerDashboard from "./components/sections/Seller/SellerPage.jsx";
import ECommercePage from "./components/pages/ECommercePage.jsx";
import Login from "./components/forms/Login.jsx";
import SellerDashboard2 from "./components/pages/ECommercePage.jsx";
import UserDashboard from "./components/dashboard/Dashboard.jsx";
import ProductSell from "./components/pages/ECommerce/ProductSell.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/music",
    element: <MusicTherapyPage />,
  },
  {
    path: "/doctor",
    element: <DoctorSection />,
  },
  {
    path: "/blogs",
    element: <BlogPage />,
  },

  { path: "music-therapy", element: <MusicTherapyPage /> },
  
  { path: "mood-tracker", element: <MoodTracker /> },

  { path: "ai-render", element: <AiRender /> },

  { path: "/seller-dashboard", element: <SellerDashboard/> },
  { path: "/seller-analysis", element: <SellerDashboard2/> },
  { path: "/user-dashboard", element: <UserDashboard/> },
  { path: "/product-sell", element: <ProductSell/> },

  {
    path: "/seller-dashboard",
    element: <SellerDashboard />,
  },

  {
    path: "*",
    element: <h1>404 - Page Not Found</h1>,
  },
]);




function App() {

  const lenis = new Lenis({
  duration:2,
  lerp:0.5,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

  return <RouterProvider router={router} />;
}

export default App;
