const whatsappHref =
  "https://wa.me/2250545476305?text=Besoin%20d%27aide%20%3F";

export function WhatsAppFloatingButton() {
  return (
    <a
      href={whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Ouvrir WhatsApp pour obtenir de l'aide"
      className="fixed bottom-4 right-4 z-[80] inline-flex items-center gap-2 rounded-full bg-[var(--wn-green-500)] px-4 py-3 text-sm font-bold text-white shadow-[0_16px_40px_rgba(14,138,107,0.28)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[var(--wn-green-700)] hover:shadow-[0_20px_48px_rgba(14,138,107,0.34)] focus:outline-none focus-visible:ring-4 focus-visible:ring-[var(--wn-green-500)]/30 sm:bottom-6 sm:right-6 sm:px-5 sm:py-3.5"
      style={{ fontFamily: "var(--wn-font-display)" }}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 32 32"
        className="h-5 w-5 shrink-0"
        fill="currentColor"
      >
        <path d="M16.04 4C9.41 4 4.02 9.36 4.02 15.95c0 2.1.55 4.15 1.6 5.96L4 28l6.25-1.63a12.1 12.1 0 0 0 5.79 1.47h.01C22.68 27.84 28 22.48 28 15.89 28 9.32 22.66 4 16.04 4Zm0 21.82h-.01a10.04 10.04 0 0 1-5.1-1.39l-.37-.22-3.7.97.99-3.6-.24-.38a9.88 9.88 0 0 1-1.52-5.25c0-5.46 4.47-9.91 9.97-9.91 2.66 0 5.16 1.03 7.04 2.9a9.84 9.84 0 0 1 2.91 6.96c-.02 5.47-4.48 9.92-9.97 9.92Zm5.47-7.42c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.29-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48a8.92 8.92 0 0 1-1.66-2.06c-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35Z" />
      </svg>
      <span>Besoin d&apos;aide ?</span>
    </a>
  );
}
