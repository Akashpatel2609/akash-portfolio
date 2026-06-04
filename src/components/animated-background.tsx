export function AnimatedBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#050505]">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.055)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(circle_at_top,black,transparent_78%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-10%,rgba(255,255,255,0.18),transparent_30%),radial-gradient(circle_at_80%_10%,rgba(124,58,237,0.16),transparent_28%),linear-gradient(115deg,rgba(255,255,255,0.07),transparent_24%,rgba(124,58,237,0.1)_48%,transparent_70%)]" />
      <div className="absolute left-1/2 top-0 h-px w-[70rem] -translate-x-1/2 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,transparent_0,rgba(5,5,5,0.2)_42%,#050505_100%)]" />
    </div>
  );
}
