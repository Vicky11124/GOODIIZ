'use client';

import React, { ReactNode, CSSProperties, MouseEventHandler } from 'react';
import { useRouter } from 'next/navigation';
import './SpecularButton.css';

export interface SpecularButtonProps {
  children?: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  radius?: number;
  tint?: string;
  tintOpacity?: number;
  blur?: number;
  textColor?: string;
  lineColor?: string;
  baseColor?: string;
  intensity?: number;
  shineSize?: number;
  shineFade?: number;
  thickness?: number;
  speed?: number;
  followMouse?: boolean;
  proximity?: number;
  autoAnimate?: boolean;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  style?: CSSProperties;
  href?: string;
}

export const SpecularButton: React.FC<SpecularButtonProps> = ({
  children = 'Get Started',
  size = 'lg',
  radius = 16,
  tint = '#103623',
  tintOpacity = 1,
  blur = 0,
  textColor = '#ffffff',
  lineColor = '#fff59d',
  baseColor = '#e6a13b',
  thickness = 1.5,
  speed = 3.5,
  disabled = false,
  onClick,
  className = '',
  type = 'button',
  style,
  href
}) => {
  const router = useRouter();

  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    if (disabled) return;
    if (onClick) onClick(e);
    if (href) {
      if (href.startsWith('#')) {
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        router.push(href);
      }
    }
  };

  const customStyle: CSSProperties = {
    ['--sb-radius' as any]: `${radius}px`,
    ['--sb-tint' as any]: tint,
    ['--sb-tint-opacity' as any]: tintOpacity,
    ['--sb-blur' as any]: `${blur}px`,
    ['--sb-text-color' as any]: textColor,
    ['--sb-line-color' as any]: lineColor,
    ['--sb-base-color' as any]: baseColor,
    ['--sb-thickness' as any]: `${thickness}px`,
    ['--sb-duration' as any]: `${typeof speed === 'number' && speed > 0 ? (speed < 1 ? 4 / speed : speed) : 3.5}s`,
    ...style
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={handleClick}
      className={`specular-button specular-button--${size}${className ? ` ${className}` : ''}`}
      style={customStyle}
    >
      <div className="specular-button__beam" aria-hidden="true" />
      <span className="specular-button__inner">{children}</span>
    </button>
  );
};

export default SpecularButton;
