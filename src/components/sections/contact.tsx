"use client";

import { useEffect, useRef, useState } from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const contactDetails = [
  {
    icon: MapPin,
    label: "Adresse",
    value: "[Ihre Strasse]\n[Ihre PLZ] [Ihre Stadt]",
  },
  { icon: Phone, label: "Telefon", value: "[Ihre Telefonnummer]" },
  { icon: Mail, label: "E-Mail", value: "[Ihre E-Mail]" },
  {
    icon: Clock,
    label: "Offnungszeiten",
    value: "Mo \u2014 Fr: [Uhrzeit] \u2014 [Uhrzeit]\nSa: [Uhrzeit] \u2014 [Uhrzeit]\nSo: Geschlossen",
  },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [sent, setSent] = useState(false);

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

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 2500);
  }

  return (
    <section
      ref={sectionRef}
      id="kontakt"
      className="py-24 md:py-36 px-6 md:px-12 bg-white"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 max-w-5xl mx-auto">
        {/* Info */}
        <div className="reveal">
          <p className="text-xs tracking-[0.3em] uppercase text-teal-600 mb-5 font-light">
            Kontakt
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-light text-slate-900 mb-6">
            Schreib <em className="italic text-teal-600">uns</em>
          </h2>
          <div className="w-12 h-px bg-teal-300 mb-10" />

          <div className="space-y-7">
            {contactDetails.map((detail) => (
              <div key={detail.label} className="flex items-start gap-4">
                <div className="w-10 h-10 bg-teal-50 flex items-center justify-center shrink-0">
                  <detail.icon className="w-4 h-4 text-teal-600" />
                </div>
                <div>
                  <p className="text-[0.7rem] uppercase tracking-[0.18em] text-teal-600 mb-1 font-light">
                    {detail.label}
                  </p>
                  <p className="text-sm text-slate-700 whitespace-pre-line leading-relaxed">
                    {detail.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="reveal flex flex-col gap-5">
          <input
            type="text"
            placeholder="Ihr Name"
            required
            className="w-full py-4 bg-transparent border-b border-slate-200 text-sm font-light text-slate-800 placeholder:text-slate-300 outline-none focus:border-teal-500 transition-colors duration-300"
          />
          <input
            type="email"
            placeholder="Ihre E-Mail"
            required
            className="w-full py-4 bg-transparent border-b border-slate-200 text-sm font-light text-slate-800 placeholder:text-slate-300 outline-none focus:border-teal-500 transition-colors duration-300"
          />
          <input
            type="tel"
            placeholder="Ihre Telefonnummer"
            className="w-full py-4 bg-transparent border-b border-slate-200 text-sm font-light text-slate-800 placeholder:text-slate-300 outline-none focus:border-teal-500 transition-colors duration-300"
          />
          <textarea
            placeholder="Ihre Nachricht — z.B. Wunschtermin, gewunschte Behandlung..."
            required
            rows={4}
            className="w-full py-4 bg-transparent border-b border-slate-200 text-sm font-light text-slate-800 placeholder:text-slate-300 outline-none focus:border-teal-500 transition-colors duration-300 resize-y"
          />
          <button
            type="submit"
            className="self-start mt-2 px-10 py-4 bg-slate-900 text-white text-sm uppercase tracking-[0.2em] font-light hover:bg-teal-700 transition-colors duration-500 relative overflow-hidden"
          >
            {sent ? "Gesendet \u2713" : "Nachricht senden"}
          </button>
        </form>
      </div>
    </section>
  );
}
