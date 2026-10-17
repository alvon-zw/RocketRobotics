"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useCart } from "./CartProvider";
import Logo from "./Logo";

const links = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact Us" },
  { href: "/testimonials", label: "Testimonials" },
];

export default function Header() {
  const pathname = usePathname();
  const { count } = useCart();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const linkClass = (href: string) =>
    isActive(href)
      ? "text-indigo-600 font-semibold border-b-2 border-indigo-600 pb-1 transition-colors"
      : "text-gray-700 hover:text-indigo-600 border-b-2 border-transparent hover:border-indigo-300 pb-1 transition-all duration-200";

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white/85 backdrop-blur-md shadow-sm pt-[env(safe-area-inset-top)]">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center">
            <Logo />
          </Link>

          <div className="hidden lg:flex space-x-8">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className={linkClass(l.href)}>
                {l.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <Link
              href="/cart"
              aria-label={`Cart, ${count} items`}
              className="p-2 rounded-full bg-gray-100 hover:bg-indigo-100 hover:scale-110 active:scale-95 transition duration-200 relative"
            >
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span key={count} className="animate-pop absolute -top-1 -right-1 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {count}
              </span>
            </Link>
            <button
              type="button"
              aria-label="Toggle menu"
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
              className="lg:hidden p-2 rounded-lg bg-gray-100 hover:bg-gray-200 active:scale-95 transition"
            >
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {open && (
          <div className="animate-fade-up lg:hidden flex flex-col gap-3 pb-4 max-h-[calc(100dvh-5rem)] overflow-y-auto border-t border-gray-200 pt-4">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={linkClass(l.href)}
              >
                {l.label}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}
