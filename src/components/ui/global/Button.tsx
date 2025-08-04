import { ButtonVariants } from "@/types";
import { ReactNode } from "react";

export default function Button({
  onClick,
  children,
  variant = "default",
  className = "",
  disabled = false,
}: {
  onClick: () => void;
  children: ReactNode;
  variant?: ButtonVariants;
  className?: string;
  disabled?: boolean;
}) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`${
        variant === "default" &&
        "border-neutral-800 hover:bg-neutral-800 text-white"
      }
        ${
          variant === "action" &&
          "border-neutral-200 hover:bg-neutral-100 bg-neutral-200"
        }
        ${
          variant === "danger" &&
          "border-danger hover:bg-danger-hover text-danger hover:text-white"
        }
      border-[1px] px-4 py-2 rounded-2xl flex gap-[4px] items-center justify-center  transition-all text-center ${className}`}
    >
      {children}
    </button>
  );
}
