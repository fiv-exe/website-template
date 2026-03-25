"use client";

import { useState, useEffect } from "react";

const links = [
  { href: "#leistungen", label: "Leistungen" },
  { href: "#ueber-uns", label: "Uber uns" },
  { href: "#galerie", label: "Galerie" },
  { href: "#kontakt", label: "Kontakt" },
  { href: "#termin", label: "Termin buchen", highlight: true },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
    <nav
      className={`fixed top-0 left-0 w-full z-50 flex items-center justify-between transition-all duration-500 ${
        scrolled
          ? "py-4 px-6 md:px-12 bg-white/90 backdrop-blur-xl shadow-[0_1px_0_rgba(0,0,0,0.05)]"
          : "py-6 px-6 md:px-12"
      }`}
    >
      <a
        href="#"
        className={`font-display text-2xl tracking-wide transition-colors duration-300 ${
          scrolled ? "text-slate-900" : "text-white"
        }`}
      >
        [Ihr <span className="text-teal-400">Unternehmen</span>]
      </a>

      {/* Desktop links */}
      <ul className="hidden md:flex gap-9 list-none">
        {links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className={`text-[0.78rem] uppercase tracking-[0.18em] font-light relative pb-1 transition-colors duration-300 group ${
                link.highlight
                  ? scrolled
                    ? "text-teal-600 border border-teal-600 px-4 py-2 hover:bg-teal-600 hover:text-white"
                    : "text-white border border-white/40 px-4 py-2 hover:bg-white/15"
                  : scrolled
                  ? "text-slate-700"
                  : "text-white"
              }`}
            >
              {link.label}
              <span
                className={`absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-400 ${
                  scrolled ? "bg-teal-600" : "bg-teal-300"
                }`}
              />
            </a>
          </li>
        ))}
      </ul>

      {/* Mobile toggle */}
      <button
        className="md:hidden flex flex-col gap-1.5 p-2 z-[10000]"
        onClick={() => setOpen(!open)}
        aria-label="Menu"
      >
        <span
          className={`block w-6 h-[1.5px] transition-all duration-300 ${
            open
              ? "rotate-45 translate-y-[7.5px] bg-slate-800"
              : scrolled
              ? "bg-slate-800"
              : "bg-white"
          }`}
        />
        <span
          className={`block w-6 h-[1.5px] transition-all duration-300 ${
            open ? "opacity-0" : scrolled ? "bg-slate-800" : "bg-white"
          }`}
        />
        <span
          className={`block w-6 h-[1.5px] transition-all duration-300 ${
            open
              ? "-rotate-45 -translate-y-[4.5px] bg-slate-800"
              : scrolled
              ? "bg-slate-800"
              : "bg-white"
          }`}
        />
      </button>

    </nav>

    {/* Mobile menu - outside nav to avoid clipping */}
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-8 transition-all duration-500 md:hidden ${
        open
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
      style={{ background: "#f8fafb" }}
    >
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          onClick={() => setOpen(false)}
          className={`text-sm uppercase tracking-[0.2em] font-light ${
            link.highlight ? "text-teal-600" : "text-slate-700"
          }`}
        >
          {link.label}
        </a>
      ))}
    </div>
    </>
  );
}
