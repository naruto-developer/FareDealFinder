import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

export default function Loading() {
  return (
    <>
      <SiteHeader />
      <main
        className="min-h-[65vh] animate-pulse bg-white px-5 py-10 sm:px-8 sm:py-14"
        aria-busy="true"
        aria-label="Loading page"
      >
        <div className="mx-auto max-w-6xl">
          <div className="h-3 w-28 rounded bg-teal-100" />
          <div className="mt-4 h-9 w-2/3 max-w-lg rounded bg-slate-200" />
          <div className="mt-3 h-4 w-full max-w-xl rounded bg-slate-100" />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }, (_, index) => (
              <div
                key={index}
                className="h-24 rounded-xl border border-slate-100 bg-slate-50"
              />
            ))}
          </div>
        </div>
        <span className="sr-only" role="status" aria-live="polite">
          Loading page
        </span>
      </main>
      <SiteFooter />
    </>
  );
}
