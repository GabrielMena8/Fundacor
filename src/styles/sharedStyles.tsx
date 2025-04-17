import { StyleSheet } from '../Types/styles';

export const sharedStyles: StyleSheet = {
  // Page backgrounds
  pageBg: 'bg-gradient-to-b from-[#1f322e] via-[#2A433E] to-[#3B544A]',
  
  // Containers
  container: 'max-w-7xl mx-auto',
  
  // Typography
  titleText: 'font-renogare text-white',
  bodyText: 'font-caviardreams text-white/90',
  importantHeader: 'font-renogare tracking-wide',
  sectionTitle: 'font-renogare text-white',
  
  // Buttons
  button: 'text-white bg-[#1F322E]/50 hover:bg-[#FFDD08]/90 hover:text-[#1F322E] transition-colors duration-300 font-medium',
  
  // Colors
  accentColor: 'text-[#FFDD08]',
  accentBg: 'bg-[#FFDD08]',
  
  // Dividers
  divider: 'bg-white/30 rounded-full',
  accentDivider: 'bg-gradient-to-r from-[#FFDD08] to-[#FAAE2B] rounded-full',
  
  // Glow effects
  titleGlow: 'drop-shadow-[0_0_8px_rgba(255,221,8,0.3)]',
  
  // Animations
  fadeIn: 'animate-fadeIn',
  hoverScale: 'hover:scale-105 transition-transform duration-300',
};

// CSS Animations
const style = document.createElement('style');
style.innerHTML = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .animate-fadeIn {
    animation: fadeIn 1s ease-out forwards;
  }
`;
document.head.appendChild(style);

export default sharedStyles; 