import { PropsWithChildren } from 'react';

export default function Section({
  id,
  children,
  className = '',
}: PropsWithChildren<{ id: string; className?: string }>) {
  return (
    <section id={id} className={`px-6 py-24 max-w-6xl mx-auto ${className}`}>
      {children}
    </section>
  );
}
