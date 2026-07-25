import { ReactNode, HTMLAttributes } from "react";
import { cn } from "@/utils/cn";

interface SectionProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
}

export function Section({ children, className, ...props }: SectionProps) {
  return (
    <section className={cn("py-16 md:py-24 lg:py-32 overflow-hidden", className)} {...props}>
      {children}
    </section>
  );
}
