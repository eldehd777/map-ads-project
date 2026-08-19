"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Store, User, Shield, ChevronDown, Menu } from "lucide-react";
import { clsx } from "clsx";

export default function Header() {
  const pathname = usePathname();
  const [mode, setMode] = useState<"creator" | "brand" | "admin">("creator");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Sync mode based on current URL path
  useEffect(() => {
    if (pathname.startsWith("/admin")) {
      setMode("admin");
    } else if (pathname.startsWith("/showcase") || pathname.startsWith("/campaigns/manage") || pathname.startsWith("/snapshots")) {
      setMode("brand");
    } else if (pathname.startsWith("/dashboard") || pathname.startsWith("/profile")) {
      setMode("creator");
    }
    // Note: pathname === "/" is intentionally omitted so the user keeps their current role when viewing the map.
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-8">
        <div className="flex items-center gap-4 sm:gap-8">
          
          {/* Logo & Workspace Switcher */}
          <div className="relative flex items-center gap-2 sm:gap-3">
            <Link href="/" className="hover:opacity-80 transition-opacity">
              <span className="text-xl font-black tracking-tight text-slate-900">Hell Ads</span>
            </Link>
            <span className="text-xl font-light text-slate-300 hidden sm:inline">/</span>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className="flex items-center gap-1.5 text-slate-600 hover:text-slate-900 transition-colors"
            >
              {mode === "creator" && <span className="text-sm font-bold">크리에이터</span>}
              {mode === "brand" && <span className="text-sm font-bold">광고주</span>}
              {mode === "admin" && <span className="text-sm font-bold text-red-600">어드민</span>}
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </button>

            {/* Dropdown Menu */}
            {isMenuOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setIsMenuOpen(false)} />
                <div className="absolute top-full left-0 mt-2 w-48 bg-white shadow-xl rounded-2xl border border-slate-100 py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                  <div className="px-4 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">모드 전환</div>
                  <Link href="/" onClick={() => { setIsMenuOpen(false); setMode("creator"); }} className="flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 transition-colors">
                    <div className="p-1.5 bg-blue-50 text-blue-600 rounded-md"><User className="w-4 h-4" /></div>
                    <span className="text-sm font-bold text-slate-700">크리에이터</span>
                  </Link>
                  <Link href="/campaigns/manage" onClick={() => { setIsMenuOpen(false); setMode("brand"); }} className="flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 transition-colors">
                    <div className="p-1.5 bg-indigo-50 text-indigo-600 rounded-md"><Store className="w-4 h-4" /></div>
                    <span className="text-sm font-bold text-slate-700">광고주</span>
                  </Link>
                  <Link href="/admin" onClick={() => { setIsMenuOpen(false); setMode("admin"); }} className="flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 transition-colors">
                    <div className="p-1.5 bg-red-50 text-red-600 rounded-md"><Shield className="w-4 h-4" /></div>
                    <span className="text-sm font-bold text-slate-700">어드민 (마스터)</span>
                  </Link>
                </div>
              </>
            )}
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            {mode === "creator" ? (
              <>
                <Link href="/" className={clsx("transition-colors", pathname === "/" ? "text-blue-600 font-bold" : "text-slate-600 hover:text-slate-900")}>내 주변 캠페인</Link>
                <Link href="/dashboard" className={clsx("transition-colors", pathname.startsWith("/dashboard") ? "text-blue-600 font-bold" : "text-slate-600 hover:text-slate-900")}>내 진행 상황</Link>
                <Link href="/profile" className={clsx("transition-colors", pathname.startsWith("/profile") ? "text-blue-600 font-bold" : "text-slate-600 hover:text-slate-900")}>내 친구 프로필</Link>
              </>
            ) : mode === "admin" ? (
              <>
                <Link href="/admin" className={clsx("transition-colors", pathname === "/admin" ? "text-red-600 font-bold" : "text-slate-600 hover:text-slate-900")}>통합 대시보드</Link>
                <Link href="/admin/campaigns" className={clsx("transition-colors", pathname.startsWith("/admin/campaigns") ? "text-red-600 font-bold" : "text-slate-600 hover:text-slate-900")}>전체 캠페인 관리</Link>
                <Link href="/admin/snapshots" className={clsx("transition-colors", pathname.startsWith("/admin/snapshots") ? "text-red-600 font-bold" : "text-slate-600 hover:text-slate-900")}>스냅샷 통합 심사</Link>
              </>
            ) : (
              <>
                <Link href="/showcase" className={clsx("transition-colors", pathname.startsWith("/showcase") ? "text-blue-600 font-bold" : "text-slate-600 hover:text-slate-900")}>크리에이터 쇼케이스</Link>
                <Link href="/campaigns/manage" className={clsx("transition-colors", pathname.startsWith("/campaigns/manage") ? "text-blue-600 font-bold" : "text-slate-600 hover:text-slate-900")}>캠페인 관리</Link>
                <Link href="/snapshots" className={clsx("transition-colors", pathname.startsWith("/snapshots") ? "text-blue-600 font-bold" : "text-slate-600 hover:text-slate-900")}>스냅샷 관리</Link>
              </>
            )}
          </nav>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Profile Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setIsProfileOpen(!isProfileOpen)} 
              className="flex items-center justify-center w-9 h-9 rounded-full bg-slate-900 text-white font-bold shadow-sm hover:scale-105 transition-transform"
            >
              C
            </button>
            {isProfileOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setIsProfileOpen(false)} />
                <div className="absolute top-full right-0 mt-2 w-48 bg-white shadow-xl rounded-2xl border border-slate-100 py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                  <div className="px-4 py-3 border-b border-slate-50 mb-1">
                    <p className="text-sm font-bold text-slate-900">Charles</p>
                    <p className="text-xs text-slate-500">charles@example.com</p>
                  </div>
                  <Link href="/profile" onClick={() => setIsProfileOpen(false)} className="flex items-center gap-3 px-4 py-2 hover:bg-slate-50 transition-colors text-sm font-medium text-slate-700">프로필 및 인사이트</Link>
                  <Link href="/dashboard" onClick={() => setIsProfileOpen(false)} className="flex items-center gap-3 px-4 py-2 hover:bg-slate-50 transition-colors text-sm font-medium text-slate-700">내 진행 상황</Link>
                  <div className="h-px bg-slate-100 my-1" />
                  <button onClick={() => setIsProfileOpen(false)} className="w-full text-left px-4 py-2 hover:bg-slate-50 transition-colors text-sm font-medium text-red-600">로그아웃</button>
                </div>
              </>
            )}
          </div>

          <button className="flex sm:hidden p-2 text-slate-600" onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}>
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileNavOpen && (
        <div className="sm:hidden border-t border-slate-100 bg-white py-2 px-4 flex flex-col gap-2 shadow-inner">
            {mode === "creator" ? (
              <>
                <Link href="/" onClick={() => setIsMobileNavOpen(false)} className={clsx("px-4 py-3 rounded-xl transition-colors font-semibold", pathname === "/" ? "bg-blue-50 text-blue-700" : "text-slate-600")}>내 주변 캠페인</Link>
                <Link href="/dashboard" onClick={() => setIsMobileNavOpen(false)} className={clsx("px-4 py-3 rounded-xl transition-colors font-semibold", pathname.startsWith("/dashboard") ? "bg-blue-50 text-blue-700" : "text-slate-600")}>내 진행 상황</Link>
                <Link href="/profile" onClick={() => setIsMobileNavOpen(false)} className={clsx("px-4 py-3 rounded-xl transition-colors font-semibold", pathname.startsWith("/profile") ? "bg-blue-50 text-blue-700" : "text-slate-600")}>내 친구 프로필</Link>
              </>
            ) : mode === "admin" ? (
              <>
                <Link href="/admin" onClick={() => setIsMobileNavOpen(false)} className={clsx("px-4 py-3 rounded-xl transition-colors font-semibold", pathname === "/admin" ? "bg-red-50 text-red-700" : "text-slate-600")}>통합 대시보드</Link>
                <Link href="/admin/campaigns" onClick={() => setIsMobileNavOpen(false)} className={clsx("px-4 py-3 rounded-xl transition-colors font-semibold", pathname.startsWith("/admin/campaigns") ? "bg-red-50 text-red-700" : "text-slate-600")}>전체 캠페인 관리</Link>
                <Link href="/admin/snapshots" onClick={() => setIsMobileNavOpen(false)} className={clsx("px-4 py-3 rounded-xl transition-colors font-semibold", pathname.startsWith("/admin/snapshots") ? "bg-red-50 text-red-700" : "text-slate-600")}>스냅샷 통합 심사</Link>
              </>
            ) : (
              <>
                <Link href="/showcase" onClick={() => setIsMobileNavOpen(false)} className={clsx("px-4 py-3 rounded-xl transition-colors font-semibold", pathname.startsWith("/showcase") ? "bg-indigo-50 text-indigo-700" : "text-slate-600")}>크리에이터 쇼케이스</Link>
                <Link href="/campaigns/manage" onClick={() => setIsMobileNavOpen(false)} className={clsx("px-4 py-3 rounded-xl transition-colors font-semibold", pathname.startsWith("/campaigns/manage") ? "bg-indigo-50 text-indigo-700" : "text-slate-600")}>캠페인 관리</Link>
                <Link href="/snapshots" onClick={() => setIsMobileNavOpen(false)} className={clsx("px-4 py-3 rounded-xl transition-colors font-semibold", pathname.startsWith("/snapshots") ? "bg-indigo-50 text-indigo-700" : "text-slate-600")}>스냅샷 관리</Link>
              </>
            )}
        </div>
      )}
    </header>
  );
}
