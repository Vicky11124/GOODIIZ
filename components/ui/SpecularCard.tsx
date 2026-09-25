'use client';

import React, { useRef, useState, MouseEventHandler, CSSProperties, ReactNode } from 'react';
import './SpecularCard.css';

export interface SpecularCardProps {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  radius?: number;
  thickness?: number;
  baseColor?: string;
  lineColor?: string;
  highlightColor?: string;
  accentColor?: string;
  duration?: number;
  enableTilt?: boolean;
  enableGlow?: boolean;
  onClick?: MouseEventHandler<HTMLDivElement>;
  style?: CSSProperties;
}

export const SpecularCard: React.FC<SpecularCardProps> = ({
  children,
  className = '',
  innerClassName = '',
  radius = 24,
  thickness = 2,
  baseColor = 'rgba(16, 185, 129, 0.25)',
  lineColor = '#6ee7b7',
  highlightColor = '#10b981',
  accentColor = '#059669',
  duration = 4.5,
  enableTilt = true,
  enableGlow = true,
  onClick,
  style,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transformStyle, setTransformStyle] = useState<string>('');

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (enableGlow) {
      cardRef.current.style.setProperty('--mouse-x', `${x}px`);
      cardRef.current.style.setProperty('--mouse-y', `${y}px`);
    }

    if (enableTilt && window.innerWidth >= 768) {
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;
      setTransformStyle(`perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`);
    }
  };

  const handleMouseLeave = () => {
    if (enableTilt) {
      setTransformStyle('');
    }
  };

  const customStyle: CSSProperties = {
    ['--sc-radius' as any]: `${radius}px`,
    ['--sc-thickness' as any]: `${thickness}px`,
    ['--sc-base-color' as any]: baseColor,
    ['--sc-line-color' as any]: lineColor,
    ['--sc-highlight-color' as any]: highlightColor,
    ['--sc-accent-color' as any]: accentColor,
    ['--sc-duration' as any]: `${duration}s`,
    transform: transformStyle || undefined,
    ...style,
  };

  return (
    <div
      ref={cardRef}
      className={`specular-card ${className}`}
      style={customStyle}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <div className="specular-card__beam" aria-hidden="true" />
      <div className={`specular-card__inner ${innerClassName}`}>
        {enableGlow && <div className="specular-card__glow-overlay" aria-hidden="true" />}
        {children}
      </div>
    </div>
  );
};

export default SpecularCard;
