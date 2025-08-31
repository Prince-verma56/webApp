import React, { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
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
} from "lucide-react";

// === Color system (from your palette) ===
const COLORS = {
  bg: "#776982",
  card: "#C7B9D6",
  text: "#4B4155",
  highlight: "#9B6EB4",
  lightCard: "#F8F5FB",
  border: "#A597D4",
};

export default function PremiumLandingPage() {
  // refs for animations
  const heroRef = useRef(null);
  const heroTitleRef = useRef(null);
  const heroCtaRef = useRef(null);
  const featuresRef = useRef(null);
  const stepsRef = useRef(null);
  const testimonialsRef = useRef(null);
  const compareRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    // This function handles the smooth scroll when a nav link is clicked.
    const handleSmoothScroll = (event) => {
      event.preventDefault();
      const targetId = event.currentTarget.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 70, // Adjust for fixed header height
          behavior: "smooth",
        });
      }
    };

    // Attach the event listener to all nav links.
    const navLinks = document.querySelectorAll("nav a");
    navLinks.forEach((link) => {
      link.addEventListener("click", handleSmoothScroll);
    });

    // Clean up the event listener when the component unmounts.
    return () => {
      navLinks.forEach((link) => {
        link.removeEventListener("click", handleSmoothScroll);
      });
    };
  }, []);

  useEffect(() => {
    // We need to access GSAP and ScrollTrigger from the global window object
    // since we are loading them via CDN in the JSX.
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    
    if (!gsap || !ScrollTrigger) {
        console.error("GSAP or ScrollTrigger not loaded. Animations will not work.");
        return;
    }

    const ctx = gsap.context(() => {
      // Hero section: This is a static animation, so it doesn't need ScrollTrigger
      const tl = gsap.timeline();
      tl.from(heroRef.current, { opacity: 0, duration: 0.6, y: 20 });
      tl.from(heroTitleRef.current, { opacity: 0, y: 30, duration: 0.8 }, "-=0.15");
      tl.from(heroCtaRef.current, { opacity: 0, y: 20, duration: 0.6 }, "-=0.45");

      // Features section: Stagger animation on scroll
      gsap.from(featuresRef.current.children, {
        opacity: 0,
        y: 30,
        duration: 0.7,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: featuresRef.current,
          start: "top 85%",
        },
      });

      // How it works steps: Stagger reveal
      gsap.from(stepsRef.current.children, {
        opacity: 0,
        x: -30,
        duration: 0.7,
        stagger: 0.25,
        ease: "power3.out",
        scrollTrigger: {
          trigger: stepsRef.current,
          start: "top 85%",
        },
      });

      // Testimonials: Stagger animation
      gsap.from(testimonialsRef.current.children, {
        opacity: 0,
        y: 30,
        duration: 0.7,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: testimonialsRef.current,
          start: "top 85%",
        },
      });

      // Comparison section: Single element reveal
      gsap.from(compareRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: compareRef.current,
          start: "top 85%",
        },
      });

      // CTA section: Single element reveal
      gsap.from(ctaRef.current, {
        opacity: 0,
        scale: 0.98,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ctaRef.current,
          start: "top 90%",
        },
      });
    });

    return () => ctx.revert();
  }, []);

  // sample content
  const features = [
    {
      icon: <LineChart className="h-10 w-10" />,
      title: "Daily Mood Tracking",
      text: "Capture your mood and understand patterns over time.",
    },
    {
      icon: <BookOpen className="h-10 w-10" />,
      title: "Guided Practices",
      text: "Short practices to help you breathe, relax and refocus.",
    },
    {
      icon: <Users className="h-10 w-10" />,
      title: "Expert Support",
      text: "Access resources and community to support your journey.",
    },
  ];

  const steps = [
    "Answer a short questionnaire so we understand your needs",
    "Get personalized suggestions & short guided sessions",
    "Track progress and adapt with data-driven insights",
  ];

  const testimonials = [
    {
      quote: "MindSpace helped me be aware of my mood triggers — small practices made a big difference.",
      author: "Asha R.",
      role: "Designer",
    },
    {
      quote: "The daily check-ins are gentle and effective. Highly recommended.",
      author: "Rahul M.",
      role: "Engineer",
    },
    {
      quote: "Simple, practical, and real — the best stress helper I've tried.",
      author: "Neha P.",
      role: "Teacher",
    },
  ];

  return (
    <div style={{ backgroundColor: COLORS.bg, color: COLORS.text, minHeight: "100vh" }}>
      {/* small CSS variables for consistent usage */}
      <style>{`
        :root{
          --bg:${COLORS.bg};
          --card:${COLORS.card};
          --text:${COLORS.text};
          --highlight:${COLORS.highlight};
          --lightCard:${COLORS.lightCard};
          --border:${COLORS.border};
        }
      `}</style>
      
      {/*
        The GSAP libraries are loaded here via CDN links.
        This is necessary because the environment doesn't support npm imports.
      */}
      <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.4/gsap.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.4/ScrollTrigger.min.js"></script>

      {/* Navbar */}
      <header
        className="sticky top-0 z-50"
        style={{ background: COLORS.lightCard, borderBottom: `1px solid ${COLORS.border}` }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-3">
            <div style={{ color: COLORS.highlight }} className="text-2xl">
              <a href="#hero"><Leaf /></a>
            </div>
            <div className="font-semibold" style={{ color: COLORS.text }}>
              <h1 className="text-2xl font-semibold">Sahaj</h1>
            </div>
          </div>

          <nav className="flex items-center gap-3">
            <a className="text-sm text-slate-700 hover:underline" href="#features">Features</a>
            <a className="text-sm text-slate-700 hover:underline" href="#how">How it works</a>
            <a className="text-sm text-slate-700 hover:underline" href="#testimonials">Stories</a>
            <Button variant="outline" className="ml-3" style={{ borderColor: COLORS.border, color: COLORS.text }}>
              Sign Up
            </Button>
            <Button style={{ backgroundColor: COLORS.highlight, color: "white" }} className="ml-2">
              Get Started
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section ref={heroRef} id="hero" className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 ref={heroTitleRef} className="text-5xl md:text-6xl font-extrabold leading-tight" style={{ color: COLORS.lightCard }}>
              Start your <span style={{ color: COLORS.card }}>journey</span> to better mental wellbeing
            </h1>
            <p className="mt-6 max-w-xl text-lg" style={{ color: COLORS.lightCard }}>
              MindSpace brings short guided practices, daily tracking and actionable insights together in one safe place —
              built to help you feel calmer, clearer and more consistent.
            </p>

            <div ref={heroCtaRef} className="mt-8 flex gap-4 transition-colors duration-75">
              <Button style={{ backgroundColor: COLORS.highlight, color: "black" }} size="lg">Get Started</Button>
              <Button variant="ghost" style={{ borderColor: COLORS.border, color: COLORS.text }}>Learn More</Button>
            </div>
          </div>

          {/* illustration / decorative card */}
          <div className="relative">
            <div style={{
              background: `linear-gradient(180deg, ${COLORS.card}, rgba(255,255,255,0.06))`,
              border: `1px solid ${COLORS.border}`,
            }} className="rounded-3xl p-6 shadow-xl">
              <div className="flex flex-col gap-4">
                <div className="text-white font-semibold" style={{ color: COLORS.text }}>
                  Quick Snapshot
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Card style={{ background: COLORS.lightCard }}>
                    <CardContent>
                      <div className="text-sm">Daily Mood</div>
                      <div className="text-xl font-bold">Good</div>
                    </CardContent>
                  </Card>
                  <Card style={{ background: COLORS.lightCard }}>
                    <CardContent>
                      <div className="text-sm">Streak</div>
                      <div className="text-xl font-bold">6 days</div>
                    </CardContent>
                  </Card>
                </div>
                <Card style={{ background: COLORS.lightCard }}>
                  <CardContent>
                    <div className="text-sm text-slate-700">Tip of the day</div>
                    <div className="text-base">Take 3 mindful breaths before starting your day.</div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* subtle decorative shape */}
            <svg className="absolute -bottom-8 -right-8" width="240" height="140">
              <defs>
                <linearGradient id="g" x1="0" x2="1">
                  <stop offset="0%" stopColor={COLORS.highlight} stopOpacity="0.14" />
                  <stop offset="100%" stopColor={COLORS.card} stopOpacity="0.06" />
                </linearGradient>
              </defs>
              <rect width="240" height="140" rx="20" fill="url(#g)" />
            </svg>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-16">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold" style={{ color: COLORS.lightCard }}>Powerful tools, designed for habit</h2>
          <p className="max-w-2xl mx-auto mt-2" style={{ color: COLORS.lightCard }}>
            Small daily actions lead to big changes — we make them simple, measurable and kind.
          </p>
        </div>

        <div ref={featuresRef} className="grid md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <Card
              key={i}
              className="p-6 rounded-2xl hover:shadow-2xl transition transform hover:-translate-y-3"
              style={{
                background: "white",
                border: `1px solid ${COLORS.border}`,
              }}
            >
              <div style={{ color: COLORS.highlight }} className="mb-4">{f.icon}</div>
              <h3 className="text-xl font-semibold mb-2" style={{ color: COLORS.text }}>{f.title}</h3>
              <p style={{ color: COLORS.text }}>{f.text}</p>
              <div className="mt-4">
                <Button variant="ghost" style={{ color: COLORS.highlight }}>Explore</Button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="max-w-7xl mx-auto px-6 py-16" style={{ background: COLORS.lightCard }}>
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold" style={{ color: COLORS.text }}>How it works</h2>
          <p className="max-w-2xl mx-auto mt-2" style={{ color: COLORS.text }}>
            Simple, guided, science-aligned steps to help you build better mental habits.
          </p>
        </div>

        <div ref={stepsRef} className="grid md:grid-cols-3 gap-6">
          {steps.map((s, i) => (
            <div
              key={i}
              className="p-6 rounded-xl"
              style={{ background: COLORS.card, border: `1px solid ${COLORS.border}` }}
            >
              <div className="text-sm font-semibold mb-2" style={{ color: COLORS.highlight }}>Step {i + 1}</div>
              <div className="text-lg font-medium" style={{ color: COLORS.text }}>{s}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="max-w-7xl mx-auto px-6 py-16">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold" style={{ color: COLORS.lightCard }}>Trusted by users</h2>
          <p className="max-w-2xl mx-auto mt-2" style={{ color: COLORS.lightCard }}>
            Real stories from people who used small daily practices to get big results.
          </p>
        </div>

        <div ref={testimonialsRef} className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <Card
              key={i}
              className="p-6 rounded-2xl shadow"
              style={{ background: COLORS.lightCard, border: `1px solid ${COLORS.border}` }}
            >
              <CardContent>
                <div className="mb-4">
                  <Star style={{ color: COLORS.highlight }} />{" "}
                </div>
                <p className="italic mb-4" style={{ color: COLORS.text }}>{t.quote}</p>
                <div className="font-semibold" style={{ color: COLORS.text }}>{t.author}</div>
                <div className="text-xs text-muted-foreground">{t.role}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Comparison */}
      <section ref={compareRef} className="max-w-7xl mx-auto px-6 py-16" style={{ background: COLORS.lightCard }}>
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-bold" style={{ color: COLORS.text }}>MindSpace vs Traditional</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 items-start">
          <div className="p-6 rounded-xl" style={{ background: COLORS.card, border: `1px solid ${COLORS.border}` }}>
            <h3 style={{ color: COLORS.text }} className="font-semibold mb-4">MindSpace</h3>
            <ul className="space-y-3">
              {["Affordable", "Flexible", "Daily small practices", "On-demand resources"].map((p, i) => (
                <li key={i} className="flex gap-3 items-center">
                  <CheckCircle style={{ color: COLORS.highlight }} /> <span style={{ color: COLORS.text }}>{p}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-6 rounded-xl" style={{ background: "white", border: `1px solid ${COLORS.border}` }}>
            <h3 style={{ color: COLORS.text }} className="font-semibold mb-4">Traditional</h3>
            <ul className="space-y-3">
              {["Expensive", "Weekly only", "Limited access between sessions"].map((p, i) => (
                <li key={i} className="flex gap-3 items-center">
                  <XCircle style={{ color: "#e74c3c" }} /> <span style={{ color: COLORS.text }}>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section ref={ctaRef} className="max-w-7xl mx-auto px-6 py-16">
        <div className="rounded-2xl p-10 text-center" style={{ background: COLORS.highlight }}>
          <h2 className="text-3xl md:text-4xl font-bold text-white">Ready to try MindSpace?</h2>
          <p className="text-white/90 mt-4 max-w-2xl mx-auto">Start with a free 7-day trial and see how daily micro-practices can help your mood and focus.</p>
          <div className="mt-6 flex justify-center gap-4">
            <Button style={{ background: "white", color: COLORS.highlight }} size="lg">Start Free Trial</Button>
            <Button variant="outline" style={{ borderColor: "rgba(255,255,255,0.2)", color: "black" }}>Contact Sales</Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: COLORS.text, color: "white" }} className="py-10 mt-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between gap-6 items-center">
          <div>
            <div className="text-lg font-bold">MindSpace</div>
            <div className="text-sm mt-1">Better daily support for mental wellbeing</div>
          </div>

          <div className="flex items-center gap-4">
            <Facebook className="w-6 h-6 cursor-pointer" />
            <Twitter className="w-6 h-6 cursor-pointer" />
            <Instagram className="w-6 h-6 cursor-pointer" />
          </div>
        </div>

        <div className="text-center text-xs mt-6 text-slate-200/80">© {new Date().getFullYear()} MindSpace — All rights reserved</div>
      </footer>
    </div>
  );
}
