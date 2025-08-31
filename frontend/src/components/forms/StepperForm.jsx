import React, { useState } from "react";
import { BrowserRouter, useNavigate } from "react-router-dom";
import { Check, ArrowLeft, User, Calendar, Briefcase, Moon, Heart } from "lucide-react";
import Cookies from "js-cookie"; 

function OptionBox({ id, title, selected, onClick }) {
  const baseClasses = "w-full text-left rounded-xl border px-6 py-5 cursor-pointer transition-all duration-300 ease-in-out select-none";
  const selectedClasses = "scale-103 shadow-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white border-transparent";
  const unselectedClasses = "bg-white text-gray-900 border-gray-200 hover:scale-[1.01] hover:shadow-md";

  return (
    <button
      onClick={() => onClick(id)}
      className={`${baseClasses} ${selected ? selectedClasses : unselectedClasses}`}
      type="button"
      aria-pressed={selected ? "true" : "false"}
    >
      <div className="flex items-center justify-between">
        <div className="text-lg font-semibold">{title}</div>
        <div>
          {selected ? (
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center border-2 border-white/20 text-white"
              style={{
                background: "linear-gradient(135deg, #a855f7, #ec4899)",
              }}
            >
              <Check className="w-4 h-4" />
            </div>
          ) : (
            <div className="w-6 h-6 rounded-full border border-gray-300" />
          )}
        </div>
      </div>
    </button>
  );
}

function StepperForm() {
  const navigate = useNavigate();
  const steps = [
    { key: "age", title: "Your Age", icon: <Calendar size={24} />, type: "number_input" },
    { key: "gender", title: "Your Gender", icon: <User size={24} />, type: "options", options: [
      { id: "male", title: "Male" },
      { id: "female", title: "Female" },
      { id: "prefer-not-to-say", title: "Prefer not to say" },
    ]},
    { key: "occupation", title: "Your Occupation", icon: <Briefcase size={24} />, type: "options", options: [
      { id: "student", title: "Student" },
      { id: "professional", title: "Professional" },
      { id: "homemaker", title: "Homemaker" },
      { id: "retired", title: "Retired" },
      { id: "other", title: "Other" },
    ]},
    { key: "sleep_cycle", title: "Sleep Cycle (in hours)", icon: <Moon size={24} />, type: "options", options: [
      { id: "<6", title: "Less than 6 hours" },
      { id: "6-8", title: "6-8 hours" },
      { id: ">8", title: "More than 8 hours" },
    ]},
    { key: "relationship_status", title: "Relationship Status", icon: <Heart size={24} />, type: "options", options: [
      { id: "single", title: "Single" },
      { id: "in-a-relationship", title: "In a relationship" },
      { id: "married", title: "Married" },
      { id: "divorced", title: "Divorced / Separated" },
    ]},
  ];

  const [formData, setFormData] = useState({});
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const canProceed = () => {
    const step = steps[currentStep];
    const value = formData[step.key];
    if (step.type === "number_input") {
      const parsedValue = parseInt(value, 10);
      return !isNaN(parsedValue) && parsedValue > 0 && parsedValue <= 120;
    }
    return !!value;
  };

  const handleOptionChange = (stepKey, value) => {
    setFormData((prev) => ({ ...prev, [stepKey]: value }));
  };

  const next = () => {
    if (currentStep < steps.length - 1 && canProceed()) {
      setCurrentStep((s) => s + 1);
    }
  };

  const prev = () => {
    if (currentStep > 0) {
      setCurrentStep((s) => s - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      const token = Cookies.get("token"); 
      console.log(token)
  
      if (!token) {
        setError("Authentication token not found. Please log in.");
        return;
      }
    
      const response = await fetch("http://localhost:7000/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
    
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit form.");
      }
    
      const result = await response.json();
      console.log("Form submitted successfully:", result);
    
      navigate("/user-dashboard");
    
    } catch (err) {
      console.error("Error submitting form:", err);
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentStepData = steps[currentStep];

  return (
    <div className="font-sans bg-gradient-to-br from-[#f5f7ff] to-[#eef2ff] text-gray-900 min-h-screen flex flex-col items-center justify-center p-4 sm:p-8">
      
      <div className="absolute top-4 left-4">
        <button
          onClick={prev}
          disabled={currentStep === 0}
          className="flex items-center cursor-pointer text-base gap-2 text-gray-500 hover:text-gray-700 font-semibold transition"
        >
          <ArrowLeft size={20} className="w-5 h-5" />
          <span className="hidden sm:inline">Back</span>
        </button>
      </div>

      <div className="w-full max-w-2xl flex justify-between items-center relative mb-12 mt-12">
        {steps.map((s, idx) => {
          const completed = formData.hasOwnProperty(s.key) && (s.type === "number_input" ? !isNaN(parseInt(formData[s.key])) : !!formData[s.key]);
          const active = idx === currentStep;
          return (
            <React.Fragment key={s.key}>
              {idx > 0 && (
                <div
                  className={`absolute h-[3px] transition-all duration-500 ease-in-out z-10 ${
                    idx <= currentStep ? "bg-gradient-to-r from-purple-500 to-pink-500" : "bg-gray-200"
                  }`}
                  style={{ width: `${(100 / (steps.length - 1)) * (idx - 1) + 10}%`, left: "10%" }}
                />
              )}
              <div className="flex flex-col items-center z-20">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all shadow-md ${
                    completed
                      ? "bg-green-500 text-white"
                      : active
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {completed ? <Check className="w-6 h-6" /> : s.icon}
                </div>
                <div className="text-sm mt-2 text-gray-500">
                  {s.title}
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-2xl text-center">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-wide text-gray-400">
            Step {currentStep + 1}/{steps.length}
          </p>
          <h2 className="text-2xl md:text-3xl font-bold mt-2 mb-2">
            {currentStepData.title}
          </h2>
          <p className="text-gray-600">Please select the most appropriate option.</p>
        </div>

        <div key={currentStepData.key} className="transition-all duration-300 ease-in-out">
          {currentStepData.type === "number_input" ? (
            <div className="w-full">
              <input
                type="number"
                min="1"
                max="120"
                value={formData[currentStepData.key] || ""}
                onChange={(e) => handleOptionChange(currentStepData.key, e.target.value)}
                placeholder="Enter your age"
                className="w-full text-center rounded-xl border px-6 py-5 transition-all duration-300 ease-in-out bg-white text-gray-900 border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          ) : (
            <div className="space-y-4">
              {currentStepData.options.map((opt) => {
                const selected = formData[currentStepData.key] === opt.id;
                return (
                  <OptionBox
                    key={opt.id}
                    id={opt.id}
                    title={opt.title}
                    selected={selected}
                    onClick={(id) => handleOptionChange(currentStepData.key, id)}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className="w-full max-w-2xl flex justify-between items-center mt-8">
        <button
          onClick={prev}
          disabled={currentStep === 0}
          className={`px-6 py-3 rounded-xl font-medium transition-all ${
            currentStep === 0
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Back
        </button>
        <div className="flex-1 text-center hidden sm:block">
          <span className="text-gray-500">Progress: </span>
          <span className="font-medium text-gray-800">
            {Math.round(((currentStep + 1) / steps.length) * 100)}%
          </span>
        </div>
        {currentStep === steps.length - 1 ? (
          <button
            onClick={handleSubmit}
            disabled={!canProceed() || isSubmitting}
            className={`px-8 py-3 rounded-xl font-semibold transition-all ${
              !canProceed() || isSubmitting
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-green-500 to-emerald-400 text-white shadow-lg hover:scale-[1.02]"
            }`}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        ) : (
          <button
            onClick={next}
            disabled={!canProceed()}
            className={`px-8 py-3 rounded-xl font-semibold transition-all ${
              !canProceed()
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:scale-[1.02]"
            }`}
          >
            Next
          </button>
        )}
      </div>

      {error && (
        <div className="mt-4 p-3 bg-red-100 text-red-600 rounded-md w-full max-w-2xl text-sm">
          {error}
        </div>
      )}
    </div>
  );
}

export default StepperForm;