"use client";

import { useState } from "react";
import Link from "next/link";
import { Store, User, MapPin } from "lucide-react";
import { clsx } from "clsx";

export default function Header() {
  const [mode, setMode] = useState<"creator" | "brand">("creator");

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-8">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold tracking-tight text-slate-900">Hell Ads</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            {mode === "creator" ? (
              <>
                <Link href="/campaigns" className="text-slate-600 hover:text-slate-900 transition-colors">내 주변 캠페인</Link>
                <Link href="/dashboard" className="text-slate-600 hover:text-slate-900 transition-colors">내 진행 상황</Link>
              </>
            ) : (
              <>
                <Link href="/showcase" className="text-slate-600 hover:text-slate-900 transition-colors">크리에이터 쇼케이스</Link>
                <Link href="/campaigns/manage" className="text-slate-600 hover:text-slate-900 transition-colors">캠페인 관리</Link>
              </>
            )}
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center bg-slate-100 rounded-full p-1 border border-slate-200">
            <button
              onClick={() => setMode("creator")}
              className={clsx(
                "flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition-all",
                mode === "creator" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
              )}
            >
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">크리에이터</span>
            </button>
            <button
              onClick={() => setMode("brand")}
              className={clsx(
                "flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition-all",
                mode === "brand" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
              )}
            >
              <Store className="w-4 h-4" />
              <span className="hidden sm:inline">광고주</span>
            </button>
          </div>
          
          <button className="hidden sm:flex items-center justify-center w-8 h-8 rounded-full bg-slate-900 text-white">
            <span className="text-xs font-semibold">C</span>
          </button>
        </div>
      </div>
    </header>
  );
}
