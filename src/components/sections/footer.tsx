"use client";

import WarpShaderBg from "@/components/ui/warp-shader";

const footerLinks = [
  { href: "#leistungen", label: "Leistungen" },
  { href: "#ueber-uns", label: "Uber uns" },
  { href: "#galerie", label: "Galerie" },
  { href: "#kontakt", label: "Kontakt" },
];

export default function Footer() {
  return (
    <WarpShaderBg as="footer" className="py-20 md:py-28 text-center">
      <div className="px-6 md:px-12 max-w-5xl mx-auto">
        {/* Logo */}
        <p className="font-display text-2xl md:text-3xl text-white tracking-wide mb-8">
          [Ihr <span className="text-emerald-200">Unternehmen</span>]
        </p>

        {/* Nav links */}
        <ul className="flex justify-center gap-8 list-none mb-10 flex-wrap">
          {footerLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-[0.72rem] uppercase tracking-[0.15em] text-white/60 hover:text-emerald-200 transition-colors duration-300"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Contact summary */}
        <div className="flex justify-center gap-8 md:gap-12 mb-10 flex-wrap">
          <span className="text-sm text-white/50 font-light">
            [Ihre Strasse], [Ihre PLZ] [Ihre Stadt]
          </span>
          <span className="text-sm text-white/50 font-light">
            [Ihre Telefonnummer]
          </span>
          <span className="text-sm text-white/50 font-light">
            [Ihre E-Mail]
          </span>
        </div>

        {/* Divider */}
        <div className="w-16 h-px bg-white/15 mx-auto mb-6" />

        {/* Copyright */}
        <p className="text-xs text-white/35">
          &copy; [Jahr] [Ihr Unternehmen] &mdash; [Ihre Branche] [Ihre Stadt].
          Alle Rechte vorbehalten.
        </p>
      </div>
    </WarpShaderBg>
  );
}
