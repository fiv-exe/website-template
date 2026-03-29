"use client";

import WarpShaderBg from "@/components/ui/warp-shader";

export default function Hero() {
  return (
    <WarpShaderBg className="min-h-screen">
      <div className="min-h-screen flex items-center justify-center px-6 md:px-8">
        <div className="max-w-4xl w-full text-center space-y-8">
          {/* Badge */}
          <p className="text-white text-xs tracking-[0.35em] uppercase font-light animate-fade-up drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]">
            &#10022; [Ihre Branche] in [Ihre Stadt] &#10022;
          </p>

          {/* Heading */}
          <h1 className="text-white text-5xl md:text-7xl lg:text-8xl font-display font-light leading-[1.05] animate-fade-up animation-delay-200 drop-shadow-[0_2px_6px_rgba(0,0,0,0.4)]">
            Qualitat
            <br />
            trifft <em className="italic text-emerald-200">Leidenschaft</em>
          </h1>

          {/* Subtext */}
          <p className="text-white text-lg md:text-xl font-light leading-relaxed max-w-xl mx-auto animate-fade-up animation-delay-400 drop-shadow-[0_1px_4px_rgba(0,0,0,0.4)]">
            Ihr Moment der Exzellenz. Erstklassiger Service, der Ihre
            Erwartungen ubertrifft &mdash; mit Liebe zum Detail.
          </p>

          {/* Single CTA */}
          <div className="pt-4 animate-fade-up animation-delay-600">
            <a
              href="#termin"
              className="group inline-block px-10 py-4 bg-white/20 backdrop-blur-sm border border-white/40 text-white text-sm uppercase tracking-[0.2em] font-light hover:bg-white/30 transition-all duration-500 hover:scale-105 drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]"
            >
              Termin vereinbaren
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-up animation-delay-800">
        <span className="text-white/40 text-[0.65rem] uppercase tracking-[0.2em]">
          Scroll
        </span>
        <div className="w-px h-10 bg-white/20 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-emerald-300 animate-scroll-line" />
        </div>
      </div>
    </WarpShaderBg>
  );
}
