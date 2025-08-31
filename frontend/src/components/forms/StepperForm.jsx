import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { Check } from "lucide-react";

/**
 * OptionBox
 * - single selectable tile. Animates with GSAP on select/unselect and on hover.
 */
function OptionBox({ id, title, subtitle, selected, onClick }) {
    const ref = useRef(null);

    useEffect(() => {
        // kill any running tweens to avoid conflicts
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

    const handleMouseEnter = () => {
        if (!selected) {
            gsap.to(ref.current, { scale: 1.02, duration: 0.18, ease: "power2.out" });
        }
    };

    const handleMouseLeave = () => {
        if (!selected) {
            gsap.to(ref.current, { scale: 1, duration: 0.18, ease: "power2.out" });
        }
    };

    return (
        <button
            ref={ref}
            onClick={() => onClick(id)}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="w-full text-left rounded-xl border px-6 py-5 cursor-pointer transition-all select-none"
            type="button"
            aria-pressed={selected ? "true" : "false"}
        >
            <div className="flex items-center gap-4">
                <div
                    className={`w-12 h-12 flex items-center justify-center rounded-full shrink-0 border`}
                    style={{
                        borderColor: "rgba(255,255,255,0.06)",
                        background: selected ? "rgba(255,255,255,0.06)" : "transparent",
                    }}
                >
                    {/* Icon placeholder - can replace with real icons */}
                    <span style={{ fontSize: 18 }}>{title?.[0]?.toUpperCase()}</span>
                </div>
                <div className="grow">
                    <div className="text-white font-semibold text-lg leading-tight">
                        {title}
                    </div>
                    {subtitle && (
                        <div className="text-white/70 text-sm mt-1">{subtitle}</div>
                    )}
                </div>

                {/* check / indicator */}
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
 * StepperFormWithOptions
 * - Multi-step wizard with stepper header.
 * - Steps show inputs OR option tiles depending on configuration.
 */
export default function StepperFormWithOptions() {
    const steps = [
        {
            key: "name",
            title: "Your Name",
            subtitle: "Tell us who you are",
            type: "input",
            fields: [{ key: "fullName", label: "Full name", placeholder: "John Doe" }],
        },
        {
            key: "story",
            title: "Your Story",
            subtitle: "A short line about you",
            type: "input",
            fields: [
                { key: "story", label: "Story", placeholder: "A short about your journey" },
            ],
        },
        {
            key: "services",
            title: "Services",
            subtitle: "What services do you provide?",
            type: "options",
            multi: true, // allow selecting multiple services
            options: [
                { id: "uiux", title: "UI / UX Design", subtitle: "Design, prototypes, brand" },
                { id: "frontend", title: "Frontend Dev", subtitle: "React, Next.js, Tailwind" },
                { id: "backend", title: "Backend Dev", subtitle: "Node, Django, APIs" },
                { id: "marketing", title: "Marketing", subtitle: "SEO, Ads, Growth" },
            ],
        },
        {
            key: "businessType",
            title: "Business Type",
            subtitle: "Are you a new or existing business?",
            type: "options",
            multi: false, // single-select (like your screenshot)
            options: [
                { id: "new", title: "New Business", subtitle: "Planning to create now" },
                { id: "existing", title: "Existing Business", subtitle: "Already established" },
            ],
        },
        {
            key: "upload",
            title: "Upload",
            subtitle: "Attach files if needed",
            type: "input",
            fields: [{ key: "files", label: "Files", placeholder: "Upload (optional)", inputType: "file" }],
        },
    ];

    // form data container
    const [formData, setFormData] = useState({
        fullName: "",
        story: "",
        services: [], // for multi-select
        businessType: null, // for single select
        files: null,
    });

    const [currentStep, setCurrentStep] = useState(0);

    // validation / minimal check for steps with options
    const canProceed = () => {
        const step = steps[currentStep];
        if (!step) return false;
        if (step.type === "options") {
            if (step.multi) return formData[step.key] && formData[step.key].length > 0;
            return !!formData[step.key];
        }
        // for inputs allow empty but you can add validation if needed
        return true;
    };

    // helper to toggle options
    const handleOptionToggle = (stepKey, optionId, multi = false) => {
        setFormData((prev) => {
            if (multi) {
                const arr = prev[stepKey] ?? [];
                if (arr.includes(optionId)) {
                    return { ...prev, [stepKey]: arr.filter((a) => a !== optionId) };
                } else {
                    return { ...prev, [stepKey]: [...arr, optionId] };
                }
            } else {
                // single select
                return { ...prev, [stepKey]: optionId };
            }
        });
    };

    // generic field change (for inputs)
    const handleFieldChange = (key, value) => {
        setFormData((p) => ({ ...p, [key]: value }));
    };

    // move next / prev
    const next = () => {
        if (currentStep < steps.length - 1 && canProceed()) setCurrentStep((s) => s + 1);
    };
    const prev = () => {
        if (currentStep > 0) setCurrentStep((s) => s - 1);
    };

    // mark completed steps for header (a step is completed if it has any value)
    const isCompleted = (index) => {
        const step = steps[index];
        if (!step) return false;
        if (step.type === "options") {
            if (step.multi) return (formData[step.key] || []).length > 0;
            return !!formData[step.key];
        } else {
            // input fields: consider completed if any field has value
            return step.fields.some((f) => {
                const v = formData[f.key];
                return v !== undefined && v !== null && v !== "";
            });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900 p-6">
            <div className="w-full max-w-4xl bg-black/30 backdrop-blur-xl rounded-3xl shadow-2xl p-8">
                {/* Header: Stepper */}
                <div className="flex items-center justify-between mb-8 gap-4">
                    {steps.map((s, idx) => {
                        const completed = isCompleted(idx);
                        const active = idx === currentStep;
                        return (
                            <div key={s.key} className="flex-1 flex flex-col items-center relative px-2">
                                {/* connecting line */}
                                {idx < steps.length - 1 && (
                                    <div
                                        className={`absolute top-4 left-1/2 right-[-50%] h-[3px] transform -translate-x-1/2 ${idx < currentStep ? "bg-green-400" : "bg-white/10"
                                            }`}
                                        style={{ width: "100%" }}
                                    />
                                )}

                                <div
                                    className={`w-10 h-10 rounded-full z-10 flex items-center justify-center transition-all ${completed ? "bg-green-400 text-white" : active ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white" : "bg-white/10 text-white/80"
                                        }`}
                                >
                                    {completed ? <Check size={16} /> : idx + 1}
                                </div>
                                <div className="mt-2 text-sm text-white/70 text-center">{s.title}</div>
                            </div>
                        );
                    })}
                </div>

                <div className="border border-white/6 rounded-2xl p-8 bg-gradient-to-br from-white/3 to-transparent">
                    {/* Step meta */}
                    <div className="mb-6">
                        <div className="text-sm text-white/60">Step {currentStep + 1}/{steps.length}</div>
                        <h2 className="text-2xl md:text-3xl text-white font-bold mt-2">
                            {steps[currentStep].title}
                        </h2>
                        <p className="text-white/70 mt-2">{steps[currentStep].subtitle}</p>
                    </div>

                    {/* Step Content (animated) */}
                    <div className="min-h-[220px]">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={steps[currentStep].key}
                                initial={{ opacity: 0, x: 40 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -40 }}
                                transition={{ duration: 0.35 }}
                                className="w-full"
                            >
                                {/* INPUT TYPE */}
                                {steps[currentStep].type === "input" && (
                                    <div className="space-y-4 max-w-2xl">
                                        {steps[currentStep].fields.map((f) => {
                                            if (f.inputType === "file") {
                                                return (
                                                    <label
                                                        key={f.key}
                                                        className="flex items-center gap-4 p-4 border border-white/6 rounded-xl bg-white/3 cursor-pointer"
                                                    >
                                                        <div className="text-white/80">{f.label}</div>
                                                        <input
                                                            type="file"
                                                            onChange={(e) => handleFieldChange(f.key, e.target.files)}
                                                            className="ml-auto text-sm text-white/70"
                                                        />
                                                    </label>
                                                );
                                            }
                                            return (
                                                <div key={f.key}>
                                                    <label className="block text-white/70 mb-2">{f.label}</label>
                                                    <input
                                                        value={formData[f.key] || ""}
                                                        onChange={(e) => handleFieldChange(f.key, e.target.value)}
                                                        placeholder={f.placeholder}
                                                        className="w-full px-4 py-3 rounded-xl bg-white/6 text-white outline-none border border-white/6"
                                                    />
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}

                                {/* OPTIONS TYPE */}
                                {steps[currentStep].type === "options" && (
                                    <div className="grid gap-4 md:grid-cols-2 mt-2">
                                        {steps[currentStep].options.map((opt) => {
                                            const stepKey = steps[currentStep].key;
                                            const multi = !!steps[currentStep].multi;
                                            const selected = multi
                                                ? (formData[stepKey] || []).includes(opt.id)
                                                : formData[stepKey] === opt.id;

                                            return (
                                                <OptionBox
                                                    key={opt.id}
                                                    id={opt.id}
                                                    title={opt.title}
                                                    subtitle={opt.subtitle}
                                                    selected={selected}
                                                    onClick={(id) => handleOptionToggle(stepKey, id, multi)}
                                                />
                                            );
                                        })}
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Footer nav */}
                    <div className="flex items-center justify-between mt-8">
                        <button
                            onClick={prev}
                            disabled={currentStep === 0}
                            className={`px-6 py-3 rounded-xl font-medium transition ${currentStep === 0
                                    ? "bg-white/6 text-white/40 cursor-not-allowed"
                                    : "bg-white/10 text-white hover:bg-white/20"
                                }`}
                        >
                            Back
                        </button>

                        <div className="flex items-center gap-4">
                            {/* Progress Text with Percentage */}
                            <div className="text-white/70 mr-4">
                                Progress:{" "}
                                <span className="font-semibold text-white">
                                    {Math.round(((currentStep + 1) / steps.length) * 100)}%
                                </span>
                            </div>

                            {/* Next / Finish Button */}
                            <button
                                onClick={next}
                                disabled={currentStep === steps.length - 1 || !canProceed()}
                                className={`px-8 py-3 rounded-xl font-semibold transition ${currentStep === steps.length - 1 || !canProceed()
                                        ? "bg-white/10 text-white/40 cursor-not-allowed"
                                        : "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg hover:scale-[1.02]"
                                    }`}
                            >
                                {currentStep === steps.length - 1 ? "Finish" : "Next"}
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
