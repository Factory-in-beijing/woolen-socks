import { useId, type ReactNode } from "react";

export interface CardProps {
  title?: string;
  children: ReactNode;
}

export function Card({ title, children }: CardProps) {
  const headingId = useId();
  return (
    <section className="dn-card" aria-labelledby={title ? headingId : undefined}>
      {title ? (
        <h2 id={headingId} className="dn-card__title">
          {title}
        </h2>
      ) : null}
      {children}
    </section>
  );
}
