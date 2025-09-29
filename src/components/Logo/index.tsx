"use client";
import * as React from "react";
import Link from "next/link";

type Props = { className?: string; wordmark?: boolean };

export default function Logo({ className = "h-12", wordmark = true }: Props) {
  return (
    <div className="flex items-center gap-2 select-none">
      <Link href="/">
        <svg
          className={className}
          viewBox="0 0 48 48"
          role="img"
          aria-label="1-800-BackupCall logo"
        >
          <defs>
            <linearGradient id="bcGrad" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor="#477dff" />
              <stop offset="100%" stopColor="#2749ad" />
            </linearGradient>
          </defs>
          {/* Dial circle */}
          <circle cx="24" cy="24" r="22" fill="url(#bcGrad)" opacity=".15" />
          {/* Handset */}
          <path
            d="M16.5 14.8c1.3-1.3 3.4-1.3 4.7 0l1.6 1.6c.8.8 1 2 .4 3l-1.2 2a2.5 2.5 0 0 0 .3 2.9l3.4 3.4c.8.8 2.1 1 3 .3l2-1.2a3 3 0 0 1 3 .3l1.6 1.6c1.3 1.3 1.3 3.4 0 4.7l-1.1 1.1c-2.6 2.6-7.6 1.7-12.8-3.5S13 20.4 15.6 17.8l.9-.9Z"
            fill="url(#bcGrad)"
          />
          {/* 800 badge */}
          <rect x="21" y="7" rx="3" ry="3" width="18" height="10" fill="white" />
          <text
            x="30"
            y="15"
            textAnchor="middle"
            fontSize="7"
            fontWeight="700"
            fill="#2749ad"
            fontFamily="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto"
          >
            888
          </text>
        </svg>
      </Link>
      <Link href="/">
        {wordmark && (
          <span className="text-2xl font-semibold tracking-tight">
            Dial<span className="text-brand-600">Backup</span>
          </span>
        )}
      </Link>
    </div>
  );
}
