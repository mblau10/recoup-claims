export default function Footer() {
  return (
    <footer className="py-12 border-t border-black/[0.06]">
      <div className="max-w-[1120px] mx-auto px-6 sm:px-10 flex flex-col sm:flex-row justify-between items-start gap-8">
        <div>
          <p
            className="text-[18px] mb-2"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            recoup
          </p>
          <p className="text-[13px] text-recoup-gray max-w-[320px] leading-relaxed">
            Administrative preparation for IEEPA tariff refund recovery. Not a
            law firm. Not a customs broker.
          </p>
        </div>
        <p className="text-[11px] text-recoup-gray2 max-w-[400px] leading-relaxed sm:text-right">
          © 2026 Recoup LLC · recoup.claims
        </p>
      </div>
    </footer>
  );
}
