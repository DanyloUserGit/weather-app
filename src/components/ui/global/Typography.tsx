import { TypographyVariants } from "@/types";
import { ReactNode } from "react";

export default function Typography({
  children,
  variant,
  className = "",
}: {
  children: ReactNode;
  variant: TypographyVariants;
  className?: string;
}) {
  const size = variant === "title" ? 22 : variant === "text" && 16;
  return (
    <span
      className={`  ${variant === "title" ? "font-[600]" : "font-normal"} ${
        variant === "link" ? "text-primary" : "text-white"
      } ${variant === "light" ? "font-light" : ""} ${className}`}
      style={size ? { fontSize: `${size}px` } : {}}
    >
      {children}
    </span>
  );
}
