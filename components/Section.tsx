import { PropsWithChildren } from "react";
export default function Section({
  id,
  children,
  className = "",
}: PropsWithChildren<{ id: string; className?: string }>) {
  return (
    <section id={id} className={`section-shell has-avatar-rail ${className}`}>
      {children}
      <div
        className="avatar-section-anchor"
        data-avatar-anchor={id}
        aria-hidden="true"
      />
    </section>
  );
}
