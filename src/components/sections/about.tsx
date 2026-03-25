"use client";

import { useEffect, useRef } from "react";

const stats = [
  { value: "[X]+", label: "Zufriedene Kunden" },
  { value: "[X]+", label: "Jahre Erfahrung" },
  { value: "100%", label: "Leidenschaft" },
];

export default function About() {
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
      { threshold: 0.15 }
    );
    const els = sectionRef.current?.querySelectorAll(".reveal");
    els?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="ueber-uns"
      className="py-24 md:py-36 px-6 md:px-12 bg-teal-900 relative overflow-hidden"
    >
      {/* Decorative quote */}
      <span className="absolute -top-10 right-10 text-[20rem] leading-none font-display text-white/[0.03] select-none pointer-events-none">
        &ldquo;
      </span>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center max-w-5xl mx-auto">
        {/* Image placeholder */}
        <div className="reveal aspect-[3/4] relative overflow-hidden bg-gradient-to-br from-teal-700 to-teal-500">
          <div className="absolute inset-4 border border-white/20" />
          <div className="w-full h-full flex items-center justify-center">
            <span className="font-display text-6xl text-white/30">Bild</span>
          </div>
        </div>

        {/* Text */}
        <div className="reveal">
          <p className="text-xs tracking-[0.3em] uppercase text-emerald-300 mb-5 font-light">
            Uber uns
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-light text-white mb-6 leading-tight">
            Wo Eleganz
            <br />
            auf <em className="italic text-emerald-300">Handwerk</em> trifft
          </h2>
          <div className="w-12 h-px bg-emerald-400/50 mb-6" />
          <p className="text-teal-200/70 font-light leading-relaxed mb-4">
            [Ihr Unternehmen] steht fur Qualitat, Leidenschaft und personliche
            Beratung. In unserem Studio in [Ihre Stadt] erwartet Sie eine
            entspannte Atmosphare, in der wir uns ganz Ihren Wunschen widmen.
          </p>
          <p className="text-teal-200/70 font-light leading-relaxed mb-10">
            Mit jahrelanger Erfahrung und einem Auge fur aktuelle Trends
            schaffen wir Ergebnisse, die so einzigartig sind wie Sie selbst.
          </p>

          {/* Stats */}
          <div className="flex gap-10 md:gap-14">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-3xl text-emerald-300 font-light">
                  {stat.value}
                </p>
                <p className="text-xs uppercase tracking-[0.12em] text-teal-300/60 mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
