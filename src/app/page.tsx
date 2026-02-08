

// // "use client";

// // import { useState, useEffect } from "react";
// // import { ApiKeyCheck } from "@/components/ApiKeyCheck";
// // import Image from "next/image";

// // export default function Home() {
// //   const [prompt, setPrompt] = useState("");
// //   const [loading, setLoading] = useState(false);
// //   const [generated, setGenerated] = useState(false);
// //   const [error, setError] = useState<string | null>(null);

// //   // full AI output
// //   const [fullChecklist, setFullChecklist] = useState<string[]>([]);
// //   const [fullTimeline, setFullTimeline] = useState<string[]>([]);
// //   const [fullRoles, setFullRoles] = useState<string[]>([]);

// //   // typed output
// //   const [checklist, setChecklist] = useState<string[]>([]);
// //   const [timeline, setTimeline] = useState<string[]>([]);
// //   const [roles, setRoles] = useState<string[]>([]);

// //   // cursor glow
// //   const [cursor, setCursor] = useState({ x: 0, y: 0 });

// //   /* ---------------- Cursor Reactive Glow ---------------- */
// //   useEffect(() => {
// //     const move = (e: MouseEvent) =>
// //       setCursor({ x: e.clientX, y: e.clientY });
// //     window.addEventListener("mousemove", move);
// //     return () => window.removeEventListener("mousemove", move);
// //   }, []);

// //   /* ---------------- Reset on typing ---------------- */
// //   useEffect(() => {
// //     setGenerated(false);
// //     setError(null);
// //   }, [prompt]);

// //   /* ---------------- Streaming Typing Effect ---------------- */
// //   const typeList = (
// //     full: string[],
// //     setter: React.Dispatch<React.SetStateAction<string[]>>,
// //     delay = 25
// //   ) => {
// //     setter([]);
// //     full.forEach((item, index) => {
// //       let i = 0;
// //       const interval = setInterval(() => {
// //         setter((prev) => {
// //           const copy = [...prev];
// //           copy[index] = (copy[index] || "") + item[i];
// //           return copy;
// //         });
// //         i++;
// //         if (i >= item.length) clearInterval(interval);
// //       }, delay);
// //     });
// //   };

// //   const generatePlan = async () => {
// //     if (!prompt.trim() || loading) return;

// //     setLoading(true);
// //     setGenerated(false);
// //     setError(null);

// //     try {
// //       const res = await fetch("/api/generate", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({ prompt }),
// //       });

// //       if (!res.ok) throw new Error("Generation failed");

// //       const data = await res.json();

// //       setFullChecklist(data.checklist ?? []);
// //       setFullTimeline(data.timeline ?? []);
// //       setFullRoles(data.roles ?? []);

// //       setGenerated(true);

// //       setTimeout(() => typeList(data.checklist ?? [], setChecklist), 200);
// //       setTimeout(() => typeList(data.timeline ?? [], setTimeline), 800);
// //       setTimeout(() => typeList(data.roles ?? [], setRoles), 1400);
// //     } catch (err) {
// //       setError("AI stumbled — try rephrasing ✨");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="relative min-h-screen overflow-hidden bg-black text-white">

// //       {/* Cursor Reactive Glow */}
// //       <div
// //         className="pointer-events-none fixed inset-0 z-0"
// //         style={{
// //           background: `radial-gradient(400px at ${cursor.x}px ${cursor.y}px, rgba(139,92,246,0.18), transparent 70%)`,
// //         }}
// //       />

// //       {/* Ambient Glow */}
// //       <div className="absolute inset-0">
// //         <div className="absolute -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-purple-600/30 blur-[140px]" />
// //         <div className="absolute bottom-0 right-0 h-[450px] w-[450px] rounded-full bg-pink-600/20 blur-[140px]" />
// //       </div>

// //       <main className="relative z-10 flex min-h-screen items-center justify-center px-6">
// //         <div className="w-full max-w-4xl space-y-16">

// //           {/* Header */}
// //           <div className="text-center space-y-6">
// //             <Image
// //               src="/Octo-Icon.svg"
// //               alt="Tambo AI"
// //               width={80}
// //               height={80}
// //               className="mx-auto drop-shadow-[0_0_30px_rgba(255,255,255,0.4)]"
// //             />
// //             <h1 className="text-6xl font-extrabold tracking-tight bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent">
// //               Hackathon Copilot
// //             </h1>
// //             <p className="text-gray-300 text-lg max-w-xl mx-auto">
// //               Watch your idea turn into a structured hackathon plan.
// //             </p>
// //           </div>

// //           {/* Input */}
// //           <div className="rounded-2xl border border-white/20 bg-black/50 backdrop-blur-xl p-6 space-y-5 shadow-[0_0_60px_rgba(139,92,246,0.15)]">
// //             <textarea
// //               rows={4}
// //               placeholder="24-hour AI hackathon · fintech · 4 members"
// //               value={prompt}
// //               disabled={loading}
// //               onChange={(e) => setPrompt(e.target.value)}
// //               className="w-full rounded-xl bg-black/60 border border-white/20 p-4 text-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/40"
// //             />

// //             <button
// //               onClick={generatePlan}
// //               disabled={loading}
// //               className="relative w-full overflow-hidden rounded-xl px-6 py-4 font-semibold text-black"
// //             >
// //               <span className="absolute inset-0 bg-gradient-to-r from-purple-400 via-cyan-400 to-pink-400 transition-all duration-500 hover:scale-110" />
// //               <span className="absolute inset-0 bg-black opacity-0 hover:opacity-20 transition" />
// //               <span className="relative z-10">
// //                 {loading ? "AI is thinking…" : "Generate Hackathon Plan"}
// //               </span>
// //             </button>

// //             {error && <p className="text-pink-400 text-sm">{error}</p>}
// //           </div>

// //           {/* Loading */}
// //           {loading && (
// //             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
// //               {[1, 2, 3].map((i) => (
// //                 <div
// //                   key={i}
// //                   className="h-44 rounded-xl border border-white/10 bg-white/5 shadow-[0_0_40px_rgba(139,92,246,0.25)]"
// //                 />
// //               ))}
// //             </div>
// //           )}

// //           {/* Streaming Output */}
// //           {generated && !loading && (
// //             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-8 duration-700">

// //               {[
// //                 { title: "✅ Checklist", data: checklist },
// //                 { title: "⏱️ Timeline", data: timeline },
// //                 { title: "👥 Roles", data: roles },
// //               ].map((section, idx) => (
// //                 <div
// //                   key={idx}
// //                   className="rounded-xl border border-white/20 bg-black/50 backdrop-blur-xl p-5 shadow-[0_0_40px_rgba(236,72,153,0.15)] hover:scale-[1.03] transition"
// //                 >
// //                   <h3 className="font-semibold text-lg mb-3">
// //                     {section.title}
// //                   </h3>
// //                   <ul className="list-disc pl-5 text-gray-300 space-y-1">
// //                     {section.data.map((item, i) => (
// //                       <li key={i}>{item}</li>
// //                     ))}
// //                   </ul>
// //                 </div>
// //               ))}

// //             </div>
// //           )}

// //           {/* Tambo */}
// //           <div className="text-center">
// //             <ApiKeyCheck>
// //               <a
// //                 href="/chat"
// //                 className="inline-block rounded-lg bg-[#7FFFC3] px-6 py-3 font-semibold text-black hover:scale-110 transition"
// //               >
// //                 Go to Chat →
// //               </a>
// //             </ApiKeyCheck>
// //           </div>

// //         </div>
// //       </main>
// //     </div>
// //   );
// // }

// "use client";

// import { useState, useEffect } from "react";
// import { ApiKeyCheck } from "@/components/ApiKeyCheck";
// import Image from "next/image";

// const thinkingMessages = [
//   "Analyzing hackathon constraints…",
//   "Structuring submission checklist…",
//   "Designing optimal timeline…",
//   "Assigning team roles…",
// ];

// export default function Home() {
//   const [prompt, setPrompt] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [generated, setGenerated] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [thinkingIndex, setThinkingIndex] = useState(0);

//   const [fullChecklist, setFullChecklist] = useState<string[]>([]);
//   const [fullTimeline, setFullTimeline] = useState<string[]>([]);
//   const [fullRoles, setFullRoles] = useState<string[]>([]);

//   const [checklist, setChecklist] = useState<string[]>([]);
//   const [timeline, setTimeline] = useState<string[]>([]);
//   const [roles, setRoles] = useState<string[]>([]);

//   const [cursor, setCursor] = useState({ x: 0, y: 0 });

//   /* Cursor glow */
//   useEffect(() => {
//     const move = (e: MouseEvent) =>
//       setCursor({ x: e.clientX, y: e.clientY });
//     window.addEventListener("mousemove", move);
//     return () => window.removeEventListener("mousemove", move);
//   }, []);

//   /* Thinking messages loop */
//   useEffect(() => {
//     if (!loading) return;
//     const interval = setInterval(
//       () => setThinkingIndex((i) => (i + 1) % thinkingMessages.length),
//       1200
//     );
//     return () => clearInterval(interval);
//   }, [loading]);

//   /* Reset on prompt change */
//   useEffect(() => {
//     setGenerated(false);
//     setError(null);
//   }, [prompt]);

//   /* Streaming typing */
//   const typeList = (
//     full: string[],
//     setter: React.Dispatch<React.SetStateAction<string[]>>,
//     delay = 20
//   ) => {
//     setter([]);
//     full.forEach((item, idx) => {
//       let i = 0;
//       const interval = setInterval(() => {
//         setter((prev) => {
//           const copy = [...prev];
//           copy[idx] = (copy[idx] || "") + item[i];
//           return copy;
//         });
//         i++;
//         if (i >= item.length) clearInterval(interval);
//       }, delay);
//     });
//   };

//   const generatePlan = async () => {
//     if (!prompt.trim() || loading) return;

//     setLoading(true);
//     setGenerated(false);
//     setError(null);

//     try {
//       const res = await fetch("/api/generate", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ prompt }),
//       });

//       if (!res.ok) throw new Error("Failed");

//       const data = await res.json();
//       setFullChecklist(data.checklist ?? []);
//       setFullTimeline(data.timeline ?? []);
//       setFullRoles(data.roles ?? []);

//       setGenerated(true);

//       setTimeout(() => typeList(data.checklist ?? [], setChecklist), 300);
//       setTimeout(() => typeList(data.timeline ?? [], setTimeline), 1100);
//       setTimeout(() => typeList(data.roles ?? [], setRoles), 1900);
//     } catch {
//       setError("AI couldn’t reason through this. Try a clearer prompt ✨");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="relative min-h-screen bg-black text-white overflow-hidden">

//       {/* Cursor Glow */}
//       <div
//         className="pointer-events-none fixed inset-0"
//         style={{
//           background: `radial-gradient(350px at ${cursor.x}px ${cursor.y}px, rgba(139,92,246,0.2), transparent 70%)`,
//         }}
//       />

//       {/* Ambient Motion */}
//       <div className="absolute inset-0">
//         <div className="absolute top-1/3 left-1/4 h-96 w-96 bg-purple-600/30 blur-[140px] animate-pulse" />
//         <div className="absolute bottom-0 right-0 h-96 w-96 bg-pink-600/20 blur-[140px] animate-pulse" />
//       </div>

//       <main className="relative z-10 flex min-h-screen items-center justify-center px-6">
//         <div className="max-w-4xl w-full space-y-20">

//           {/* Header */}
//           <div className="text-center space-y-6">
//             <Image src="/Octo-Icon.svg" alt="Tambo" width={80} height={80} className="mx-auto" />
//             <h1 className="text-6xl font-extrabold bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent">
//               Hackathon Copilot
//             </h1>
//             <p className="text-gray-400">
//               Floating generative UI powered by AI reasoning
//             </p>
//           </div>

//           {/* Input */}
//           <div className="rounded-2xl bg-black/60 border border-white/20 backdrop-blur-xl p-6 space-y-4 shadow-[0_0_80px_rgba(139,92,246,0.2)]">
//             <textarea
//               rows={4}
//               value={prompt}
//               disabled={loading}
//               onChange={(e) => setPrompt(e.target.value)}
//               placeholder="48-hour AI hackathon · healthcare · 5 members"
//               className="w-full bg-black/50 border border-white/20 rounded-xl p-4 text-lg focus:ring-2 focus:ring-purple-500/40"
//             />

//             <button
//               onClick={generatePlan}
//               disabled={loading}
//               className="relative w-full rounded-xl px-6 py-4 font-semibold text-black overflow-hidden"
//             >
//               <span className="absolute inset-0 bg-gradient-to-r from-purple-400 via-cyan-400 to-pink-400 transition-transform duration-500 hover:scale-110" />
//               <span className="relative z-10">
//                 {loading ? thinkingMessages[thinkingIndex] : "Generate Hackathon Plan"}
//               </span>
//             </button>

//             {error && <p className="text-pink-400">{error}</p>}
//           </div>

//           {/* Floating Cards */}
//           {generated && (
//             <div className="grid md:grid-cols-3 gap-6">
//               {[checklist, timeline, roles].map((data, i) => (
//                 <div
//                   key={i}
//                   className="rounded-xl bg-black/50 border border-white/20 backdrop-blur-xl p-5 animate-[float_6s_ease-in-out_infinite]"
//                   style={{ animationDelay: `${i * 0.8}s` }}
//                 >
//                   <ul className="list-disc pl-5 text-gray-300 space-y-1">
//                     {data.map((item, idx) => (
//                       <li key={idx}>{item}</li>
//                     ))}
//                   </ul>
//                 </div>
//               ))}
//             </div>
//           )}

//           <ApiKeyCheck>
//             <a href="/chat" className="block text-center bg-[#7FFFC3] text-black rounded-lg px-6 py-3 font-semibold hover:scale-110 transition">
//               Go to Chat →
//             </a>
//           </ApiKeyCheck>

//         </div>
//       </main>
//     </div>
//   );
// }

"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Sidebar } from "@/components/Sidebar";

const thinkingMessages = [
  "Analyzing hackathon constraints…",
  "Structuring submission checklist…",
  "Designing optimal timeline…",
  "Assigning team roles…",
];

const galleryImages = [
  { id: 1, src: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80", title: "FinTech 2024" },
  { id: 2, src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80", title: "AI Summit" },
  { id: 3, src: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80", title: "GameJam" },
  { id: 4, src: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80", title: "EcoHack" },
];

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [thinkingIndex, setThinkingIndex] = useState(0);

  // AI output
  const [checklist, setChecklist] = useState<string[]>([]);
  const [timeline, setTimeline] = useState<string[]>([]);
  const [roles, setRoles] = useState<string[]>([]);

  // Cursor + focus
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [focused, setFocused] = useState(false);

  // Magnetic button
  const buttonRef = useRef<HTMLButtonElement>(null);

  /* ---------------- CURSOR TRACKING ---------------- */
  useEffect(() => {
    const move = (e: MouseEvent) =>
      setCursor({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  /* ---------------- THINKING LOOP ---------------- */
  useEffect(() => {
    if (!loading) return;
    const interval = setInterval(
      () => setThinkingIndex((i) => (i + 1) % thinkingMessages.length),
      1200
    );
    return () => clearInterval(interval);
  }, [loading]);

  /* ---------------- RESET ON INPUT ---------------- */
  useEffect(() => {
    setGenerated(false);
    setError(null);
  }, [prompt]);



  /* ---------------- MAGNETIC BUTTON ---------------- */
  const handleMagnet = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    buttonRef.current.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
  };

  const resetMagnet = () => {
    if (buttonRef.current) {
      buttonRef.current.style.transform = "translate(0,0)";
    }
  };

  /* ---------------- GENERATE ---------------- */
  const generatePlan = async () => {
    if (!prompt.trim() || loading) return;

    setLoading(true);
    setGenerated(false);
    setError(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) throw new Error("Failed");

      const data = await res.json();

      setChecklist(data.checklist ?? []);
      setTimeline(data.timeline ?? []);
      setRoles(data.roles ?? []);

      setGenerated(true);
    } catch {
      setError("AI couldn’t reason through this. Try a clearer prompt.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden flex">
      <Sidebar />

      {/* CURSOR-REACTIVE GLOW */}
      <div
        className="pointer-events-none fixed inset-0 transition-opacity duration-300 z-0"
        style={{
          background: `radial-gradient(
            360px at ${cursor.x}px ${cursor.y}px,
            rgba(139,92,246,${focused ? 0.28 : 0.18}),
            transparent 70%
          )`,
        }}
      />

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 relative z-10 transition-all duration-300">

        {/* Ambient Breathes */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/4 h-[420px] w-[420px] bg-purple-600/20 blur-[150px] animate-pulse" />
          <div className="absolute bottom-0 right-0 h-[420px] w-[420px] bg-pink-600/10 blur-[150px] animate-pulse" />
        </div>

        <main className="flex min-h-screen flex-col items-center px-6 py-20 md:px-12 lg:px-24">
          <div className="max-w-4xl w-full space-y-24">

            {/* HEADER */}
            <div className={`text-center space-y-8 animate-in fade-in slide-in-from-top-4 duration-1000 transition-opacity duration-500 ${focused ? "opacity-20 blur-sm" : "opacity-100"}`}>
              <img src="/icon.svg" alt="Hackathon Copilot" width={90} height={90} className="mx-auto" />
              <div className="space-y-4">
                <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-br from-white via-white to-gray-500 bg-clip-text text-transparent tracking-tight">
                  Hackathon Copilot
                </h1>
                <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
                  A calm plan in a chaotic Hackathon!                </p>
              </div>
            </div>

            {/* INPUT (FOCUS MODE) */}
            <div className="relative group">
              <div className={`absolute -inset-1 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 opacity-20 blur transition duration-500 ${focused ? "opacity-60 scale-[1.02]" : "group-hover:opacity-40"}`} />
              <div className={`relative rounded-2xl bg-black/90 border transition-colors duration-500 backdrop-blur-xl p-8 space-y-6 shadow-2xl ${focused ? "border-purple-500/50" : "border-white/10"}`}>
                <textarea
                  rows={3}
                  value={prompt}
                  disabled={loading}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe your hackathon idea... (e.g. '48-hour AI hackathon regarding healthcare')"
                  className="w-full bg-transparent border-none p-0 text-xl placeholder-gray-600 focus:ring-0 resize-none leading-relaxed"
                />

                <div className="flex justify-between items-center pt-4 border-t border-white/5">
                  <div className="text-sm text-gray-500 font-medium">Use AI to plan everything</div>
                  <button
                    ref={buttonRef}
                    onMouseMove={handleMagnet}
                    onMouseLeave={resetMagnet}
                    onClick={generatePlan}
                    disabled={loading}
                    className="relative rounded-xl px-8 py-3 font-semibold text-black overflow-hidden transition-transform duration-200 active:scale-95"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-purple-400 via-cyan-400 to-pink-400 transition-transform duration-500 hover:scale-110" />
                    <span className="relative z-10 flex items-center gap-2">
                      {loading && <span className="animate-spin text-lg">⟳</span>}
                      {loading ? thinkingMessages[thinkingIndex] : "Generate Plan"}
                    </span>
                  </button>
                </div>

                {error && <p className="text-pink-400 absolute bottom-4 left-8 text-sm">{error}</p>}
              </div>
            </div>

            {/* PHASED OUTPUT */}
            {generated && (
              <div className={`grid md:grid-cols-3 gap-6 transition-opacity duration-500 ${focused ? "opacity-20 blur-sm" : "opacity-100"}`}>
                {[
                  { title: "Checklist", items: checklist, icon: "✅", color: "text-green-400" },
                  { title: "Timeline", items: timeline, icon: "⏱️", color: "text-blue-400" },
                  { title: "Roles", items: roles, icon: "👥", color: "text-purple-400" }
                ].map((section, i) => (
                  <div
                    key={i}
                    className="group rounded-xl bg-white/5 border border-white/10 backdrop-blur-xl p-6 transition-all hover:bg-white/10 hover:border-white/20 duration-300 animate-in fade-in slide-in-from-bottom-8 fill-mode-backwards"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  >
                    <h3 className={`text-xl font-bold mb-6 flex items-center gap-3 ${section.color}`}>
                      <span className="text-2xl">{section.icon}</span> {section.title}
                    </h3>
                    <ul className="space-y-4">
                      {section.items.map((item, idx) => (
                        <li key={idx} className="flex gap-3 text-sm text-gray-300 leading-relaxed group-hover:text-white transition-colors">
                          <span className="text-gray-600 mt-1">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {/* Previous Hackathons Gallery */}
            <div className="space-y-8 pt-12 border-t border-white/10">
              <h2 className="text-3xl font-bold text-center">Previous Hackathons</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {galleryImages.map((img) => (
                  <div key={img.id} className="group relative aspect-square overflow-hidden rounded-2xl cursor-pointer">
                    <img
                      src={img.src}
                      alt={img.title}
                      className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                    />

                    {/* Overlay Content */}
                    <div className="absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
                      <span className="font-bold text-lg text-white">{img.title}</span>
                      <span className="text-xs text-purple-300 uppercase tracking-widest font-semibold">Winning Project</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
