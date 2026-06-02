import Link from "next/link";

const LINKS = [
  { href: "/about", label: "About" },
  { href: "/statement-of-faith", label: "Statement of Faith" },
  { href: "/resources", label: "Resources" },
  { href: "/reid-shepherd", label: "Reid Shepherd" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-cream bg-parchment">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          {/* Brand + verse */}
          <div className="max-w-sm">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/40 bg-ivory font-serif text-lg font-semibold text-gold-deep">
                R
              </span>
              <span className="font-serif text-xl font-semibold text-ink">
                Reid One
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-ink-soft">
              A Christian ministry dedicated to glorifying the God of the Bible
              and helping believers faithfully steward what He has entrusted to
              them.
            </p>
            <p className="mt-5 font-serif text-base italic text-gold-deep">
              “Well done, good and faithful servant.”
            </p>
            <p className="text-xs uppercase tracking-[0.2em] text-muted">
              Matthew 25:23
            </p>
          </div>

          {/* Nav */}
          <nav className="md:text-right">
            <p className="eyebrow mb-4">Explore</p>
            <ul className="space-y-2.5">
              {LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-ink-soft transition-colors hover:text-gold-deep"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-cream pt-6 text-xs text-muted sm:flex-row">
          <p>© {new Date().getFullYear()} Reid One. All rights reserved.</p>
          <p>Soli Deo Gloria — To God alone be the glory.</p>
        </div>
      </div>
    </footer>
  );
}
