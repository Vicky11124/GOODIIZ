"use client";
import { cn } from "@/lib/utils";
import { IconMenu2, IconX } from "@tabler/icons-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import Link from "next/link";
import React, { useRef, useState } from "react";

interface NavbarProps {
  children: React.ReactNode;
  className?: string;
}

interface NavBodyProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface NavItemsProps {
  items: {
    name: string;
    link: string;
  }[];
  className?: string;
  onItemClick?: () => void;
}

interface MobileNavMenuProps {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const Navbar = ({ children, className }: NavbarProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState<boolean>(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  });

  return (
    <motion.div
      ref={ref}
      className={cn("fixed inset-x-0 top-3 z-50 w-full max-w-full transition-all duration-300 px-3 sm:px-6 pointer-events-none", className)}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(
              child as React.ReactElement<{ visible?: boolean }>,
              { visible },
            )
          : child,
      )}
    </motion.div>
  );
};

export const NavBody = ({ children, className, visible }: NavBodyProps) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(16px)" : "blur(10px)",
        boxShadow: visible
          ? "0 12px 32px -4px rgba(20, 61, 40, 0.18), 0 0 0 1px rgba(200, 142, 62, 0.3)"
          : "0 4px 20px -2px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(200, 142, 62, 0.2)",
        width: visible ? "76%" : "100%",
        y: visible ? 4 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 240,
        damping: 30,
      }}
      style={{
        minWidth: visible ? "min(96%, 880px)" : "100%",
      }}
      className={cn(
        "relative z-[60] mx-auto flex w-full max-w-7xl flex-row items-center justify-between rounded-full bg-white/95 px-4 sm:px-6 py-2 transition-colors pointer-events-auto border border-goodiiz-gold/25 shadow-sm",
        visible && "bg-white/92 shadow-xl",
        className,
      )}
    >
      {children}
    </motion.div>
  );
};

export const NavItems = ({ items, className, onItemClick }: NavItemsProps) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <motion.div
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "relative hidden md:flex flex-1 flex-row items-center justify-center space-x-0.5 lg:space-x-1 text-xs md:text-sm font-medium text-goodiiz-brown transition duration-200 pointer-events-auto",
        className,
      )}
    >
      {items.map((item, idx) => {
        const isAnchor = item.link.startsWith("#");
        const isExternal = item.link.startsWith("http");

        if (isAnchor || isExternal) {
          return (
            <a
              key={`link-${idx}`}
              href={item.link}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
              onMouseEnter={() => setHovered(idx)}
              onClick={onItemClick}
              className="relative px-2.5 lg:px-3.5 py-1.5 text-goodiiz-brown hover:text-goodiiz-green transition font-medium text-xs md:text-sm rounded-full z-20 cursor-pointer pointer-events-auto inline-block whitespace-nowrap"
            >
              {hovered === idx && (
                <motion.div
                  layoutId="hovered"
                  className="absolute inset-0 h-full w-full rounded-full bg-goodiiz-cream-dark/70 -z-10"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative z-20">{item.name}</span>
            </a>
          );
        }

        return (
          <Link
            key={`link-${idx}`}
            href={item.link}
            onMouseEnter={() => setHovered(idx)}
            onClick={onItemClick}
            className="relative px-2.5 lg:px-3.5 py-1.5 text-goodiiz-brown hover:text-goodiiz-green transition font-medium text-xs md:text-sm rounded-full z-20 cursor-pointer pointer-events-auto inline-block whitespace-nowrap"
          >
            {hovered === idx && (
              <motion.div
                layoutId="hovered"
                className="absolute inset-0 h-full w-full rounded-full bg-goodiiz-cream-dark/70 -z-10"
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
              />
            )}
            <span className="relative z-20">{item.name}</span>
          </Link>
        );
      })}
    </motion.div>
  );
};

export const MobileNavMenu = ({
  children,
  className,
  isOpen,
  onClose,
}: MobileNavMenuProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop overlay for outside clicks */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 pointer-events-auto md:hidden"
          />

          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.96 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={cn(
              "absolute inset-x-3 sm:inset-x-6 top-16 z-50 flex flex-col items-start justify-start gap-3 rounded-2xl bg-[#0f2d1e]/98 backdrop-blur-2xl p-4 sm:p-6 shadow-2xl border border-goodiiz-gold/40 pointer-events-auto max-w-md mx-auto md:hidden text-white",
              className,
            )}
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export const MobileNav = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={cn("md:hidden flex flex-col w-full", className)}>{children}</div>
);

export const MobileNavHeader = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={cn("flex items-center justify-between w-full px-4 py-2", className)}>{children}</div>
);

export const MobileNavToggle = ({
  isOpen,
  onClick,
  className,
}: {
  isOpen: boolean;
  onClick: () => void;
  className?: string;
}) => {
  return (
    <button
      onClick={onClick}
      aria-label="Toggle Navigation Menu"
      type="button"
      className={cn(
        "p-2 rounded-xl hover:bg-goodiiz-cream transition text-goodiiz-green cursor-pointer pointer-events-auto z-30 flex items-center justify-center border border-goodiiz-gold/20",
        className
      )}
    >
      {isOpen ? <IconX className="w-5 h-5" /> : <IconMenu2 className="w-5 h-5" />}
    </button>
  );
};

export const NavbarLogo = () => {
  return (
    <Link
      href="/"
      className="relative z-30 flex items-center gap-2.5 py-1 text-sm font-normal group pointer-events-auto cursor-pointer shrink-0"
    >
      <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl overflow-hidden bg-white p-0.5 shadow-sm border border-goodiiz-gold/30 flex items-center justify-center group-hover:scale-105 transition">
        <img
          src="/images/logo.png"
          alt="GOODIIZ Logo"
          className="h-full w-full object-contain"
        />
      </div>
      <div className="flex flex-col">
        <span className="text-lg sm:text-xl font-bold font-serif leading-none tracking-tight">
          <span className="text-goodiiz-green">GOOD</span>
          <span className="text-goodiiz-gold">IIZ</span>
        </span>
        <span className="text-[9px] text-goodiiz-brown/70 font-bold uppercase tracking-widest mt-0.5">
          Nuts & Treats
        </span>
      </div>
    </Link>
  );
};

export const NavbarButton = ({
  href,
  as,
  children,
  className,
  variant = "primary",
  onClick,
  target,
  rel,
  ...props
}: {
  href?: string;
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "dark" | "gradient" | "agro";
  onClick?: (e: React.MouseEvent) => void;
  target?: string;
  rel?: string;
} & (
  | React.ComponentPropsWithoutRef<"a">
  | React.ComponentPropsWithoutRef<"button">
)) => {
  const baseStyles =
    "px-3.5 sm:px-4 py-2 rounded-xl text-xs md:text-sm font-bold relative cursor-pointer pointer-events-auto hover:-translate-y-0.5 transition duration-200 inline-flex items-center justify-center gap-1.5 text-center z-30 shrink-0";

  const variantStyles = {
    primary:
      "bg-goodiiz-gold hover:bg-goodiiz-gold-dark text-goodiiz-green-dark shadow-sm hover:shadow-md",
    agro:
      "bg-goodiiz-green hover:bg-goodiiz-green-dark text-white shadow-sm hover:shadow-md",
    secondary: "bg-transparent hover:bg-goodiiz-cream text-goodiiz-brown border border-goodiiz-gold/30",
    dark: "bg-goodiiz-green-dark text-white shadow-sm",
    gradient:
      "bg-gradient-to-r from-goodiiz-gold via-yellow-500 to-goodiiz-gold-dark text-goodiiz-green-dark shadow-sm",
  };

  const combinedClass = cn(baseStyles, variantStyles[variant], className);

  if (href) {
    const isInternal = href.startsWith("/") && !href.startsWith("//");
    if (isInternal && !target) {
      return (
        <Link href={href} onClick={onClick} className={combinedClass} {...(props as any)}>
          {children}
        </Link>
      );
    }
    return (
      <a
        href={href}
        target={target}
        rel={rel || (target === "_blank" ? "noopener noreferrer" : undefined)}
        onClick={onClick}
        className={combinedClass}
        {...(props as any)}
      >
        {children}
      </a>
    );
  }

  const Tag = as || "button";
  return (
    <Tag onClick={onClick} className={combinedClass} {...props}>
      {children}
    </Tag>
  );
};
