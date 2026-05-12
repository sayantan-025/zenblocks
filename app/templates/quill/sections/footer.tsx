"use client"

import React from "react"
import Link from "next/link"
import { Github, Twitter } from "lucide-react"
import { FOOTER_DATA } from "../data"

function QuillLogoFooter({ className }: { className?: string }) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="32" height="32" rx="8" fill="#09090B" />
      <path
        d="M10 24C10 24 8 18 12 14C14 12 18 10 22 8C22 8 20 12 18 16C16 20 14 24 14 24"
        fill="url(#quillGradientFooter)"
      />
      <path d="M22 8C22 8 24 10 24 14C24 18 22 22 20 24L22 8Z" fill="#FAFAFA" />
      <circle cx="10" cy="24" r="2" fill="#A1A1AA" />
      <defs>
        <linearGradient id="quillGradientFooter" x1="10" y1="24" x2="22" y2="8" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#52525B" />
          <stop offset="100%" stopColor="#FAFAFA" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export function Footer() {
  return (
    <footer className="px-6 py-16 border-t border-zinc-800/50">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Branding */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <QuillLogoFooter className="w-8 h-8" />
              <span className="text-xl font-bold tracking-wide text-zinc-100">
                Quill
              </span>
            </div>
            <p className="text-sm text-zinc-500 leading-relaxed">
              {FOOTER_DATA.description}
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-500 hover:text-zinc-100 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-500 hover:text-zinc-100 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links Columns */}
          <div className="md:col-span-3 grid grid-cols-3 gap-8">
            {FOOTER_DATA.columns.map((column) => (
              <div key={column.title}>
                <h4 className="font-heading font-semibold text-sm text-zinc-200 mb-4">
                  {column.title}
                </h4>
                <ul className="space-y-3 text-sm text-zinc-500">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="hover:text-zinc-100 transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-zinc-800/50 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-zinc-600">
            © {new Date().getFullYear()} Quill. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-xs text-zinc-600">
            <span>Built with</span>
            <span className="text-zinc-500">♥</span>
            <span>by</span>
            {FOOTER_DATA.builtBy ? (
              <a
                href={FOOTER_DATA.builtBy.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-zinc-100 transition-colors font-medium"
              >
                {FOOTER_DATA.builtBy.name}
              </a>
            ) : (
              <span className="text-zinc-400">ZenBlocks</span>
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}
