/**
 * Global Typography Manager
 * 
 * Edit this file to globally scale and manage text sizes across the application.
 * All headings and paragraphs reference this single source of truth.
 */

export const typography = {
  // Headings
  h1: "text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] font-extrabold tracking-tight leading-[1.05]",
  h2: "text-3xl sm:text-4xl md:text-[2.75rem] font-bold tracking-tight leading-[1.15]",
  h3: "text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight leading-[1.2]",
  h4: "text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight",
  h5: "text-lg sm:text-xl md:text-2xl font-semibold",
  h6: "text-base sm:text-lg md:text-xl font-semibold",

  // Paragraphs & Text
  pLarge: "text-lg md:text-xl lg:text-[1.20rem] leading-relaxed font-medium",
  pBase: "text-base md:text-lg leading-relaxed font-medium",
  pSmall: "text-[0.95rem] md:text-[1.05rem] leading-relaxed font-medium",
  pTiny: "text-xs md:text-sm font-medium",
};
