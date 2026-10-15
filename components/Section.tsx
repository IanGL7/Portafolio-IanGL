import { PropsWithChildren } from "react";
export default function Section({
  id,
  children,
  className = "",
}: PropsWithChildren<{ id: string; className?: string }>) {
  return (
    <section id={id} className={`section-shell ${className}`}>
      {children}
    </section>
  );
}
