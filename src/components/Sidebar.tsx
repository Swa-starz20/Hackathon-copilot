"use client";

import { useState } from "react";

const historyMock = [
    { id: 1, title: "DeFi Solana Hackathon", date: "2 days ago", type: "Blockchain" },
    { id: 2, title: "HealthTech AI", date: "5 days ago", type: "AI/ML" },
    { id: 3, title: "EdTech Dashboard", date: "1 week ago", type: "Fullstack" },
];

export function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Sidebar Hover Trigger Area (Invisible strip on the left) */}
            <div
                onMouseEnter={() => setIsOpen(true)}
                className="fixed inset-y-0 left-0 z-50 w-4 bg-transparent"
            />

            {/* Sidebar Container */}
            <aside
                onMouseEnter={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}
                className={`fixed inset-y-0 left-0 z-40 w-64 transform border-r border-white/10 bg-black/90 backdrop-blur-xl transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                {/* Visual Cue for Hover (Vertical text or icon when collapsed) */}
                <div className={`absolute right-0 top-1/2 -translate-y-1/2 flex h-full w-4 items-center justify-center transition-opacity duration-300 ${isOpen ? "opacity-0" : "opacity-100"}`}>
                    <div className="h-12 w-1 rounded-full bg-white/20" />
                </div>

                <div className={`flex h-full flex-col p-6 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`}>
                    {/* Logo / Header */}
                    <div className="mb-8 flex items-center gap-3">
                        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500" />
                        <span className="text-xl font-bold tracking-tight text-white">History</span>
                    </div>

                    {/* History List */}
                    <div className="flex-1 space-y-4 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/10">
                        {historyMock.map((item) => (
                            <div
                                key={item.id}
                                className="group cursor-pointer rounded-xl border border-white/5 bg-white/5 p-3 transition hover:border-purple-500/30 hover:bg-white/10"
                            >
                                <h4 className="font-medium text-gray-200 group-hover:text-white">
                                    {item.title}
                                </h4>
                                <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
                                    <span>{item.type}</span>
                                    <span>{item.date}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Footer */}
                    <div className="mt-4 border-t border-white/10 pt-4">
                        <button className="w-full rounded-lg bg-white/5 py-2 text-sm font-medium text-gray-400 transition hover:bg-white/10 hover:text-white">
                            + New Hackathon
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
}
