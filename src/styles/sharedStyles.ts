// src/styles/sharedStyles.ts
// Shared styles for consistent look and feel across the application
export const sharedStyles = {
  // Background gradients
  pageBg: "bg-gradient-to-l from-[#1f322e]/90 via-[#2A433E]/85 to-[#3B544A]/80",
  panelBg: "bg-gradient-to-b from-[#1F322E]/95 via-[#2A433E]/90 to-[#3B544A]/90",
  cardBg: "bg-[#1F322E]/80 hover:bg-[#1F322E]",
  
  // Text styles
  titleText: "font-renogare text-[#FFDD08] font-bold",
  sectionTitle: "font-renogare text-[#FFDD08] font-bold tracking-wide",
  importantHeader: "font-renogare text-[#FFDD08] font-bold tracking-wider uppercase",
  bodyText: "font-caviardreams text-white/90",
  
  // Element styles
  divider: "bg-[#FFDD08] rounded-full",
  accentDivider: "bg-[#FFDD08] rounded-full shadow-sm shadow-[#FFDD08]/30",
  
  // Interactive elements
  button: "font-renogare text-[#FFDD08] hover:text-[#FFDD08]/90 transition-all duration-300 bg-[#1f322e]/50 hover:bg-[#1f322e]/70 border border-[#FFDD08]/30 hover:border-[#FFDD08]/50 shadow-lg hover:shadow-[#FFDD08]/20",
  
  // Common layout
  container: "max-w-7xl mx-auto",
  mobilePanel: "fixed bottom-0 left-0 w-full z-40 border-t border-[#FFDD08]/20 backdrop-blur-sm shadow-lg shadow-black/30",
  
  // Animations
  fadeIn: "animate-fade-in",
  hoverScale: "hover:scale-105 transition-transform duration-300",
  
  // Title emphasis effects
  titleGlow: "drop-shadow-[0_1px_4px_rgba(255,221,8,0.4)]",
  titleShadow: "drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]",
}; 