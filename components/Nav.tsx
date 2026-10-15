"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { profile } from "@/lib/portfolio";

const items = [
  { id: "inicio", label: "Inicio" },
  { id: "habilidades", label: "Habilidades" },
  { id: "proyectos", label: "Proyectos" },
  { id: "contacto", label: "Contacto" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("inicio");
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries.find((item) => item.isIntersecting);
        if (entry) setActive(entry.target.id);
      },
      { rootMargin: "-20% 0px -50% 0px" },
    );
    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);
  return (
    <header className="site-header">
      <nav className="nav-shell" aria-label="Navegación principal">
        <a
          href="#inicio"
          className="logo"
          aria-label="IanGL, inicio"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/icons/ianL.png"
            width={82}
            height={48}
            alt="IanGL"
            priority
          />
        </a>
        <div className="nav-actions">
          <div id="nav-links" className={`nav-links ${open ? "is-open" : ""}`}>
            {items.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                aria-current={active === item.id ? "location" : undefined}
                onClick={() => {
                  setActive(item.id);
                  setOpen(false);
                }}
              >
                {item.label}
              </a>
            ))}
          </div>
          {profile.cvUrl ? (
            <a
              className="button button-outline nav-cta"
              href={profile.cvUrl}
              download
            >
              Descargar CV ↓
            </a>
          ) : (
            <a
              className="button button-outline nav-cta"
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub ↗
            </a>
          )}
          <button
            ref={toggle}
            className="menu-toggle"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            aria-controls="nav-links"
            onClick={() => setOpen(!open)}
          >
            <span aria-hidden="true">{open ? "✕" : "☰"}</span>
          </button>
        </div>
      </nav>
    </header>
  );
}
