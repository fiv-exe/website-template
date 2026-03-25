"use client";

import { useEffect, useRef } from "react";

export default function Testimonial() {
  const ref = useRef<HTMLElement>(null);

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
      { threshold: 0.2 }
    );
    const el = ref.current?.querySelector(".reveal");
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="py-20 md:py-28 px-6 md:px-12 bg-slate-900 text-center relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(20,184,166,0.08),transparent_70%)]" />
      <div className="reveal relative z-10 max-w-2xl mx-auto">
        <blockquote className="font-display text-2xl md:text-3xl font-light italic text-slate-200 leading-relaxed mb-6">
          &bdquo;Der beste Service, den ich je erlebt habe. Das Team versteht
          genau, was man sich vorstellt &mdash; und macht es noch
          besser.&ldquo;
        </blockquote>
        <cite className="text-xs not-italic uppercase tracking-[0.2em] text-teal-400 font-light">
          &mdash; [Kundenname], Stammkunde
        </cite>
      </div>
    </section>
  );
}
