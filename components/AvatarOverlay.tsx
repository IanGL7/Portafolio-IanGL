"use client";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Component, type ReactNode, useCallback, useState } from "react";

const Avatar3D = dynamic(() => import("@/components/Avatar3D"), {
  ssr: false,
  loading: () => (
    <p className="avatar-notice" role="status">
      Cargando vista 3D…
    </p>
  ),
});

function StaticAvatar() {
  return (
    <Image
      className="avatar-static"
      src="/avatar.png"
      width={1024}
      height={1024}
      sizes="(max-width: 480px) 310px, 360px"
      alt="Avatar ilustrado de Ian con una computadora"
      priority
    />
  );
}

class AvatarBoundary extends Component<
  { children: ReactNode; onError: () => void },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onError();
  }
  render() {
    if (this.state.failed)
      return (
        <p className="avatar-notice" role="status">
          La vista 3D no está disponible en este dispositivo.
        </p>
      );
    return this.props.children;
  }
}

export default function AvatarOverlay() {
  const [enabled, setEnabled] = useState(false);
  const [ready, setReady] = useState(false);
  const onReady = useCallback(() => setReady(true), []);
  const onError = useCallback(() => setReady(false), []);
  return (
    <div className="avatar-stage">
      {(!enabled || !ready) && <StaticAvatar />}
      {enabled && (
        <div className="avatar-canvas">
          <AvatarBoundary onError={onError}>
            <Avatar3D onReady={onReady} />
          </AvatarBoundary>
        </div>
      )}
      <button
        type="button"
        className="avatar-toggle"
        aria-pressed={enabled}
        onClick={() => {
          setEnabled(!enabled);
          setReady(false);
        }}
      >
        {enabled ? "Volver a imagen" : "Activar avatar 3D · 21 MB"}
      </button>
    </div>
  );
}
