import React from 'react';
import { Link } from 'react-router-dom';

type ButtonVariant = 'primary' | 'secondary' | 'back' | 'icon';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonBaseProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
  disabled?: boolean;
}

interface ButtonProps extends ButtonBaseProps {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
}

interface LinkButtonProps extends ButtonBaseProps {
  to: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

const getVariantClasses = (variant: ButtonVariant = 'primary') => {
  switch (variant) {
    case 'primary':
      return 'bg-[#FFDD08] hover:bg-[#FFDD08]/90 text-[#1F322E]';
    case 'secondary':
      return 'bg-[#1F322E] hover:bg-[#2A433E] border-2 border-[#FFDD08]/60 hover:border-[#FFDD08] text-white';
    case 'back':
      return 'bg-[#FFDD08] hover:bg-[#FFDD08]/90 text-[#1F322E] w-full';
    case 'icon':
      return 'bg-[#1F322E]/90 rounded-full shadow-lg border border-[#FFDD08]/30 hover:border-[#FFDD08]/50';
    default:
      return 'bg-[#FFDD08] hover:bg-[#FFDD08]/90 text-[#1F322E]';
  }
};

const getSizeClasses = (size: ButtonSize = 'md') => {
  switch (size) {
    case 'sm':
      return 'px-4 py-2 text-sm';
    case 'md':
      return 'px-6 py-3';
    case 'lg':
      return 'px-8 py-4 text-lg';
    default:
      return 'px-6 py-3';
  }
};

const baseClasses = 'flex items-center justify-center font-medium rounded-lg transition-all duration-300 active:scale-95';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth,
  className = '',
  disabled,
  onClick,
  type = 'button',
}: ButtonProps) => {
  const classes = [
    baseClasses,
    getVariantClasses(variant),
    getSizeClasses(size),
    fullWidth ? 'w-full' : '',
    disabled ? 'opacity-50 cursor-not-allowed' : '',
    className
  ].join(' ');

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export const LinkButton = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth,
  className = '',
  to,
  onClick,
}: LinkButtonProps) => {
  const classes = [
    baseClasses,
    getVariantClasses(variant),
    getSizeClasses(size),
    fullWidth ? 'w-full' : '',
    className
  ].join(' ');

  return (
    <Link to={to} className={classes} onClick={onClick}>
      {children}
    </Link>
  );
};

export const BackButton = () => {
  return (
    <LinkButton to="/" variant="back" fullWidth>
      <svg 
        className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform duration-300" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
      <span>Volver al Inicio</span>
    </LinkButton>
  );
}; 