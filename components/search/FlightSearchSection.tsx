import { Suspense } from "react";
import FlightRequestForm from "@/components/search/FlightRequestForm";

export default function FlightSearchSection() {
  return (
    <section id="flight-search" aria-labelledby="flight-search-title" className="relative z-[2] mx-auto -mt-8 w-[89%] max-w-[1200px] rounded-xl border border-[#e7e6dc] bg-[#fffefa] px-5 pt-7 pb-5 shadow-[0_18px_65px_#153a3010] sm:px-8 [&_input]:min-h-[49px] [&_input]:bg-[#fffefa] [&_select]:min-h-[49px] [&_select]:bg-[#fffefa] max-[600px]:w-[92%] max-[600px]:[&_[role=group]_button]:px-2.5 max-[600px]:[&_[role=group]_button]:text-xs">
      <div className="mb-6 flex items-center justify-between gap-6">
        <div>
          <p className="mb-2 text-[9px] font-semibold uppercase tracking-[0.19em] text-[#6b826f]">Where will you go next?</p>
          <h2 id="flight-search-title" className="font-serif text-[25px] leading-tight tracking-[-0.025em] text-[#183c38] sm:text-[28px]">Every great journey starts here.</h2>
        </div>
        <p className="hidden items-center gap-2 text-[11px] text-[#788479] md:flex"><span aria-hidden="true" className="text-[22px] text-[#ad8d55]">✧</span> Personal guidance, from the first step.</p>
      </div>
      <Suspense fallback={<p role="status" className="py-8 text-sm text-muted">Loading flight search...</p>}>
        <FlightRequestForm />
      </Suspense>
    </section>
  );
}
