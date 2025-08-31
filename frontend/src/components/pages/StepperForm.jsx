import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { Check } from "lucide-react";
import { toast } from "sonner";

/**
 * OptionBox - clickable tile with GSAP animation
 */
function OptionBox({ id, title, selected, onClick }) {
  const ref = useRef(null);

  useEffect(() => {
    gsap.killTweensOf(ref.current);

    if (selected) {
      gsap.to(ref.current, {
        duration: 0.35,
        scale: 1.03,
        boxShadow: "0 12px 30px rgba(133, 60, 255, 0.26)",
        background:
          "linear-gradient(135deg, rgba(255,92,150,1) 0%, rgba(122,28,246,1) 100%)",
        color: "#fff",
        borderColor: "rgba(255,255,255,0.0)",
        ease: "power2.out",
      });
    } else {
      gsap.to(ref.current, {
        duration: 0.35,
        scale: 1,
        boxShadow: "0 6px 16px rgba(0,0,0,0.25)",
        background: "rgba(255,255,255,0.03)",
        color: "#ffffffcc",
        borderColor: "rgba(255,255,255,0.06)",
        ease: "power2.out",
      });
    }
  }, [selected]);

  return (
    <button
      ref={ref}
      onClick={() => onClick(id)}
      className="w-full text-left rounded-xl border px-6 py-5 cursor-pointer transition-all select-none"
      type="button"
      style={{pointerEvents:"auto"}}
      aria-pressed={selected ? "true" : "false"}
    >
      <div className="flex items-center gap-4">
        <div
          className="w-12 h-12 flex items-center justify-center rounded-full shrink-0 border"
          style={{
            borderColor: "rgba(255,255,255,0.06)",
            background: selected ? "rgba(255,255,255,0.06)" : "transparent",
          }}
        >
          <span style={{ fontSize: 18 }}>{title?.[0]?.toUpperCase()}</span>
        </div>
        <div className="grow text-white font-semibold text-lg">{title}</div>
        <div className="w-8 h-8 flex items-center justify-center">
          {selected ? (
            <div className="w-7 h-7 rounded-full flex items-center justify-center bg-white/20">
              <Check size={14} color="white" />
            </div>
          ) : (
            <div
              className="w-6 h-6 rounded-full border"
              style={{ borderColor: "rgba(255,255,255,0.06)" }}
            />
          )}
        </div>
      </div>
    </button>
  );
}

/**
 * StepperFormWithOptions - PHQ9
 */
export default function StepperFormWithOptions() {
  const phq9Steps = [
    { key: "q1", title: "Little interest or pleasure in doing things" },
    { key: "q2", title: "Feeling down, depressed, or hopeless" },
    { key: "q3", title: "Trouble falling or staying asleep, or sleeping too much" },
    { key: "q4", title: "Feeling tired or having little energy" },
    // { key: "q5", title: "Poor appetite or overeating" },
    // { key: "q6", title: "Feeling bad about yourself — or that you are a failure" },
    // { key: "q7", title: "Trouble concentrating on things" },
    // { key: "q8", title: "Moving or speaking slowly, or being fidgety/restless" },
    // { key: "q9", title: "Thoughts that you would be better off dead or hurting yourself" },
  ];

  const options = [
    { id: 0, title: "Not at all" },
    { id: 1, title: "Several days" },
    { id: 2, title: "More than half the days" },
    { id: 3, title: "Nearly every day" },
  ];

  const [formData, setFormData] = useState({});
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const canProceed = formData[phq9Steps[currentStep].key] !== undefined;


  const handleOptionSelect = (stepKey, value) => {
    setFormData((prev) => ({ ...prev, [stepKey]: value }));
  };

  const next = () => {
    if (currentStep < phq9Steps.length - 1 && canProceed) {
      setCurrentStep((s) => s + 1);
    }
  };
  const prev = () => {
    if (currentStep > 0) setCurrentStep((s) => s - 1);
  };

  const handleSubmit = async () => {
    console.log("Submit clicked ✅", formData); // <-- check if clicked
  
    setLoading(true);
    try {
      const userId = "64f9c1..."; // Replace with real user ID
      const questions = phq9Steps.map((step) => ({
        questionText: step.title,
        response: formData[step.key] ?? null,
      }));
  
      const payload = { userId, questions };
      console.log("Payload:", payload);
  
      const res = await fetch("http://localhost:7000/api/phq9", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
  
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Submission failed");
  
      toast.success(`PHQ-9 submitted successfully!`);
      console.log("Response from backend:", data);
    } catch (err) {
      toast.error("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };
  
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900 p-6">
      <div className="w-full max-w-2xl bg-black/30 backdrop-blur-xl rounded-3xl shadow-2xl p-8">
        <div className="mb-6">
          <h2 className="text-2xl md:text-3xl text-white font-bold">
            {phq9Steps[currentStep].title}
          </h2>
          <p className="text-white/70 mt-2">Over the last 2 weeks</p>
        </div>

        <div className="grid gap-4 mt-2">
          {options.map((opt) => {
            const selected = formData[phq9Steps[currentStep].key] === opt.id;
            return (
              <OptionBox
                key={opt.id}
                id={opt.id}
                title={opt.title}
                selected={selected}
                onClick={(id) => handleOptionSelect(phq9Steps[currentStep].key, id)}
              />
            );
          })}
        </div>

        {/* Footer nav */}
        <div className="flex items-center justify-between mt-8">
          <button
            onClick={prev}
            disabled={currentStep === 0}
            className="px-6 py-3 rounded-xl bg-white/10 text-white disabled:opacity-40"
          >
            Back
          </button>
          {currentStep === phq9Steps.length - 1 ? (
            <button
              onClick={()=>{
                console.log('clicked')
                handleSubmit()
              }}
              disabled={loading}
              className="px-8 py-3 rounded-xl z-10 font-semibold bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg hover:scale-[1.02] disabled:opacity-40"
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          ) : (
            <button
              onClick={next}
              disabled={!canProceed}
              className="px-8 py-3 rounded-xl font-semibold bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg hover:scale-[1.02] disabled:opacity-40"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
