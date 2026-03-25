"use client";

import { useEffect, useRef } from "react";

const items = [
  { label: "Projekt 1", gradient: "from-teal-400 to-emerald-500", span: true },
  { label: "Projekt 2", gradient: "from-emerald-500 to-teal-600" },
  { label: "Projekt 3", gradient: "from-teal-600 to-cyan-500" },
  { label: "Projekt 4", gradient: "from-cyan-400 to-teal-300" },
  { label: "Projekt 5", gradient: "from-teal-500 to-emerald-400" },
];

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    const els = sectionRef.current?.querySelectorAll(".reveal");
    els?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="galerie"
      className="py-24 md:py-36 px-6 md:px-12 bg-slate-50"
    >
      <div className="text-center mb-16 reveal">
        <p className="text-xs tracking-[0.3em] uppercase text-teal-600 mb-5 font-light">
          Galerie
        </p>
        <h2 className="font-display text-4xl md:text-5xl font-light text-slate-900">
          Unsere <em className="italic text-teal-600">Arbeiten</em>
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-5xl mx-auto">
        {items.map((item, i) => (
          <div
            key={item.label}
            className={`reveal group relative overflow-hidden cursor-pointer aspect-square ${
              item.span ? "col-span-2 row-span-2" : ""
            }`}
            style={{ transitionDelay: `${i * 100}ms` }}
          >
            <div
              className={`w-full h-full bg-gradient-to-br ${item.gradient} flex items-center justify-center transition-transform duration-700 group-hover:scale-110`}
            >
              <span className="font-display text-xl text-white/50 group-hover:text-white/70 transition-colors duration-300">
                {item.label}
              </span>
            </div>
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
          </div>
        ))}
      </div>
    </section>
  );
}
