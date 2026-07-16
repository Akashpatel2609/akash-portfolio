import { GridGlowBackground } from "./grid-glow-background";

export function AnimatedBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <GridGlowBackground />
      {/* Immersive overlay vignette & glow gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,transparent_20%,rgba(3,3,3,0.3)_60%,#030303_100%)]" />
      <div className="absolute left-1/2 top-0 h-px w-[70rem] -translate-x-1/2 bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />
    </div>
  );
}

