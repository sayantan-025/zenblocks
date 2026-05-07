export default function StatsRow() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-0 mt-16 max-w-4xl mx-auto w-full">
      <div className="flex-1 flex flex-col items-center justify-center border-r-0 md:border-r border-[var(--border)]">
        <span className="text-4xl font-bold text-[var(--text-primary)]">16+</span>
        <span className="text-[var(--text-muted)] text-sm mt-2">Templates</span>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center border-r-0 md:border-r border-[var(--border)]">
        <span className="text-4xl font-bold text-[var(--text-primary)]">420+</span>
        <span className="text-[var(--text-muted)] text-sm mt-2">Components</span>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center">
        <span className="text-4xl font-bold text-[var(--text-primary)]">100%</span>
        <span className="text-[var(--text-muted)] text-sm mt-2">Free</span>
      </div>
    </div>
  );
}
