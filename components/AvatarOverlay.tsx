"use client";
import dynamic from "next/dynamic";
import Image from "next/image";
import {
  Component,
  type ReactNode,
  useCallback,
  useRef,
  useState,
} from "react";
import AvatarDirector from "@/components/AvatarDirector";

const Avatar3D = dynamic(() => import("@/components/Avatar3D"), { ssr: false });
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
    return this.state.failed ? null : this.props.children;
  }
}

export default function AvatarOverlay() {
  const home = useRef<HTMLDivElement>(null);
  const floating = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(true);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const onReady = useCallback(() => setReady(true), []);
  const onError = useCallback(() => {
    setReady(false);
    setFailed(true);
    setEnabled(false);
  }, []);
  const toggle = async () => {
    if (enabled) {
      setEnabled(false);
      setReady(false);
      return;
    }
    setFailed(false);
    try {
      const { resetAvatarModel } = await import("@/components/Avatar3D");
      resetAvatarModel();
      setEnabled(true);
    } catch {
      onError();
    }
  };
  return (
    <div className="avatar-stage" ref={home} data-avatar-anchor="inicio">
      <div className="avatar-floating" ref={floating}>
        <Image
          className={`avatar-static ${ready && enabled ? "avatar-is-ready" : ""}`}
          src="/avatar.png"
          width={1024}
          height={1024}
          sizes="(max-width: 480px) 310px, 380px"
          alt="Avatar ilustrado de Ian con una computadora"
          priority
        />
        {enabled && (
          <div className="avatar-canvas">
            <AvatarBoundary onError={onError}>
              <Avatar3D onReady={onReady} onError={onError} />
            </AvatarBoundary>
          </div>
        )}
      </div>
      <AvatarDirector home={home} floating={floating} />
      {enabled && !ready && (
        <p className="avatar-loading" role="status">
          Cargando avatar 3D…
        </p>
      )}
      {failed && (
        <p className="avatar-loading" role="status">
          La vista 3D no está disponible. Puedes reintentar.
        </p>
      )}
      <button
        type="button"
        className="avatar-toggle"
        aria-pressed={enabled}
        onClick={toggle}
      >
        {enabled
          ? "Usar imagen"
          : failed
            ? "Reintentar 3D"
            : "Activar avatar 3D"}
      </button>
    </div>
  );
}
