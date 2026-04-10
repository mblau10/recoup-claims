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
  dark: "bg-recoup-black text-[#F6F2EA] hover:bg-[#15151A]",
  ghost:
    "border border-[color:var(--color-recoup-ink)] text-recoup-black hover:bg-[color:var(--color-recoup-ink)] hover:text-[#F6F2EA]",
  white: "bg-[#F6F2EA] text-recoup-black hover:bg-white",
};

export default function Button({
  variant = "dark",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const base = `inline-flex items-center justify-center rounded-none px-7 py-3 font-medium text-[14px] transition-all duration-200 cursor-pointer tracking-[0.01em] ${variantClasses[variant]} ${className}`;

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
