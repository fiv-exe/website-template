"use client";

import { useEffect, useRef } from "react";

const services = [
  {
    icon: "\u2726",
    name: "Leistung 1",
    description:
      "Beschreibung Ihrer ersten Leistung. Passen Sie diesen Text an Ihr Angebot an.",
    price: "ab XX \u20AC",
  },
  {
    icon: "\u2756",
    name: "Leistung 2",
    description:
      "Beschreibung Ihrer zweiten Leistung. Passen Sie diesen Text an Ihr Angebot an.",
    price: "ab XX \u20AC",
  },
  {
    icon: "\u25C8",
    name: "Leistung 3",
    description:
      "Beschreibung Ihrer dritten Leistung. Passen Sie diesen Text an Ihr Angebot an.",
    price: "ab XX \u20AC",
  },
  {
    icon: "\u2727",
    name: "Leistung 4",
    description:
      "Beschreibung Ihrer vierten Leistung. Passen Sie diesen Text an Ihr Angebot an.",
    price: "ab XX \u20AC",
  },
  {
    icon: "\u2661",
    name: "Leistung 5",
    description:
      "Beschreibung Ihrer funften Leistung. Passen Sie diesen Text an Ihr Angebot an.",
    price: "ab XX \u20AC",
  },
  {
    icon: "\u25C7",
    name: "Leistung 6",
    description:
      "Beschreibung Ihrer sechsten Leistung. Passen Sie diesen Text an Ihr Angebot an.",
    price: "ab XX \u20AC",
  },
];

export default function Services() {
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
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    const els = sectionRef.current?.querySelectorAll(".reveal");
    els?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="leistungen"
      className="py-24 md:py-36 px-6 md:px-12 bg-slate-50"
    >
      <div className="text-center mb-16 md:mb-20 reveal">
        <p className="text-xs tracking-[0.3em] uppercase text-teal-600 mb-5 font-light">
          Leistungen
        </p>
        <h2 className="font-display text-4xl md:text-5xl font-light text-slate-900 mb-6">
          Unsere <em className="italic text-teal-600">Treatments</em>
        </h2>
        <p className="text-slate-500 max-w-lg mx-auto font-light leading-relaxed">
          Jede Behandlung wird mit hochster Sorgfalt und erstklassigen Produkten
          durchgefuhrt &mdash; fur ein Ergebnis, das begeistert.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px max-w-5xl mx-auto bg-slate-200">
        {services.map((service, i) => (
          <div
            key={service.name}
            className="reveal bg-white p-12 text-center group hover:bg-teal-50/50 transition-colors duration-500 relative overflow-hidden"
            style={{ transitionDelay: `${i * 80}ms` }}
          >
            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-teal-500 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-600 origin-center" />
            <span className="text-2xl mb-6 block group-hover:scale-110 transition-transform duration-500">
              {service.icon}
            </span>
            <h3 className="font-display text-xl text-slate-900 mb-3">
              {service.name}
            </h3>
            <p className="text-sm text-slate-500 leading-relaxed mb-5 font-light">
              {service.description}
            </p>
            <span className="font-display text-lg text-teal-600">
              {service.price}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
