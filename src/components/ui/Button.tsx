"use client";

import { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";

type Variant = "dark" | "ghost" | "white";

interface ButtonBaseProps {
  variant?: Variant;
  className?: string;
}

type ButtonAsButton = ButtonBaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLink = ButtonBaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantClasses: Record<Variant, string> = {
  dark: "bg-recoup-black text-white hover:bg-[#2D2D2F]",
  ghost: "border border-recoup-border text-recoup-black hover:bg-recoup-light",
  white: "bg-white text-recoup-black hover:bg-recoup-light",
};

export default function Button({
  variant = "dark",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const base = `inline-flex items-center justify-center rounded-lg px-7 py-3 font-semibold text-[15px] transition-all duration-200 cursor-pointer ${variantClasses[variant]} ${className}`;

  if ("href" in props && props.href) {
    return (
      <a className={base} {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    );
  }

  return (
    <button className={base} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
