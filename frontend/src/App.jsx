import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import LandingPage from "./components/sections/Home.jsx";
import SignUp from "./components/forms/SignUp.jsx";
import Login from "./components/forms/Login.jsx";

// import BlogPage from "./components/pages/BlogPage.jsx";
import AiRender from "./components/AIInput/AiRender.jsx";
import StepperFormWithOptions from "./components/forms/StepperForm.jsx";
import ECommercePage from "./components/pages/ECommercePage.jsx";

import MoodTracker from "./components/moodtracker/MoodTracker.jsx";
import MusicTherapyPage from "./components/MusicTherapyPage.jsx/MusdicTherapyPage.jsx";
import DoctorSection from "./components/DoctorSection/DoctorSection.jsx";

import SellerDashboard from "./components/sections/Seller/SellerPage.jsx";
// import SellerAnalysis from "./components/pages/ECommercePage.jsx"; // renamed for clarity
import UserDashboard from "./components/dashboard/UserDashboard.jsx";
import ProductSell from "./components/pages/ECommerce/ProductSell.jsx";

import Lenis from "lenis";

const router = createBrowserRouter([
  { path: "/", element: <LandingPage /> },
  { path: "/signup", element: <SignUp /> },
  { path: "/login", element: <Login /> },
  { path: "/music", element: <MusicTherapyPage /> },
  { path: "/doctor", element: <DoctorSection /> },
  // { path: "/blogs", element: <BlogPage /> },
  { path: "/music-therapy", element: <MusicTherapyPage /> },
  { path: "/mood-tracker", element: <MoodTracker /> },
  { path: "/ai-chat", element: <AiRender /> },
  { path: "/stepper", element: <StepperFormWithOptions /> },
  // { path: "/ecommerce", element: <ECommercePage /> },
  { path: "/seller-dashboard", element: <SellerDashboard /> },
  // { path: "/seller-analysis", element: <SellerAnalysis /> },
  { path: "/user-dashboard", element: <UserDashboard /> },
  // { path: "/product-sell", element: <ProductSell /> },


  { path: "*", element: <h1>404 - Page Not Found</h1> },
]);

function App() {
 
  const lenis = new Lenis({ duration: 2, lerp: 0.5 });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  return <RouterProvider router={router} />;
}

export default App;
