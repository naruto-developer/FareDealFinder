import { contactDetails } from "@/lib/contactDetails";

export default function MobileCallBar() {
  return (
    <a
      href={contactDetails.phoneHref}
      aria-label={`Call us at ${contactDetails.phone}`}
      className="fixed inset-x-0 bottom-0 z-[55] hidden min-h-12 items-center justify-center gap-2 border-t border-white/10 bg-[#0c2925] px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] text-[13px] font-bold text-[#f4f0e4] shadow-[0_-4px_20px_#0c292526] max-[600px]:flex"
    >
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="size-4 shrink-0 text-[#dfc89d]">
        <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.24c1.1.36 2.3.55 3.6.55a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.6 21 3 13.4 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.3.2 2.5.55 3.6a1 1 0 0 1-.24 1l-2.2 2.2Z" />
      </svg>
      <span>Call Us: {contactDetails.phone.replace(/[()]/g, "").replaceAll(" ", "-")}</span>
    </a>
  );
}
