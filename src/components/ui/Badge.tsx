interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export default function Badge({ children, className = "" }: BadgeProps) {
  return (
    <span
      className={`text-[11px] font-bold tracking-[1.5px] uppercase px-3 py-1 rounded-md ${className}`}
    >
      {children}
    </span>
  );
}
