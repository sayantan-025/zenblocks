"use client";

export default function CtaBanner() {
  return (
    <div className="w-full bg-[var(--bg-surface)] border border-[var(--border)] rounded-[24px] p-8 md:p-12 mt-24 mb-10 flex flex-col md:flex-row items-center justify-between gap-8 max-w-7xl mx-auto">
      <div className="flex flex-col max-w-xl text-center md:text-left">
        <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-3">
          Get new templates weekly
        </h2>
        <p className="text-[var(--text-muted)] text-sm md:text-base">
          Join 10,000+ developers building with ZenBlocks. We'll send you a new high-quality template every week. No spam.
        </p>
      </div>
      <form 
        className="flex w-full md:w-auto items-center gap-3 flex-col sm:flex-row"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="email"
          placeholder="Enter your email..."
          className="w-full sm:w-64 bg-[var(--bg-card)] border border-[var(--border)] focus:border-[var(--text-primary)] outline-none rounded-full px-5 py-3 text-sm text-[var(--text-primary)] transition-colors placeholder:text-[var(--text-muted)]"
          required
        />
        <button
          type="submit"
          className="w-full sm:w-auto bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] px-6 py-3 rounded-full text-sm font-medium transition-opacity hover:opacity-90 whitespace-nowrap"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
}
