import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

export default function SearchLoading() {
  return (
    <>
      <SiteHeader />
      <main
        className="min-h-[65vh] bg-slate-50 px-4 py-8 sm:px-8 sm:py-12"
        aria-busy="true"
        aria-label="Loading flight search results"
      >
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-teal-700">
            Flight search
          </p>
          <h1 className="mt-2 font-serif text-3xl leading-tight text-ink sm:text-4xl">
            Flight results
          </h1>
          <div className="mt-6 h-24 animate-pulse rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="h-3 w-32 rounded bg-slate-100" />
            <div className="mt-3 h-4 w-full max-w-3xl rounded bg-slate-200" />
          </div>
        </div>
        <span className="sr-only" role="status" aria-live="polite">
          Loading flight search results
        </span>
      </main>
      <SiteFooter />
    </>
  );
}
