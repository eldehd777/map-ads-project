"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { Mail, Lock, User as UserIcon, ArrowRight, ShieldCheck, UserCircle2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { login, register } = useAuthStore();
  
  const [isLoginView, setIsLoginView] = useState(true);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState<"creator" | "brand">("creator");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (isLoginView) {
      const success = login(email);
      if (success) {
        router.push("/");
      } else {
        setError("계정을 찾을 수 없거나 정지되었습니다. 가입을 먼저 진행해주세요.");
      }
    } else {
      if (!email || !name) {
        setError("모든 필드를 입력해주세요.");
        return;
      }
      // Register and auto-login
      register({
        email,
        name,
        role,
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=" + email,
      });
      login(email);
      router.push("/");
    }
  };

  const handleGoogleLogin = () => {
    const googleEmail = "google_tester_" + Math.floor(Math.random() * 1000) + "@gmail.com";
    const googleName = "구글 테스터";
    
    // Register mock Google account
    register({
      email: googleEmail,
      name: googleName,
      role: "creator", // default to creator for social login
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=" + googleEmail + "&backgroundColor=b6e3f4",
    });
    login(googleEmail);
    router.push("/");
  };

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        
        {/* Logo Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black tracking-tight text-slate-900 mb-2">Hell Ads</h1>
          <p className="text-slate-500 font-medium">크리에이터와 브랜드를 연결하는 가장 빠른 방법</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
          
          {/* Tabs */}
          <div className="flex border-b border-slate-100">
            <button 
              type="button"
              onClick={() => setIsLoginView(true)}
              className={`flex-1 py-4 text-sm font-bold transition-colors ${isLoginView ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
            >
              로그인
            </button>
            <button 
              type="button"
              onClick={() => setIsLoginView(false)}
              className={`flex-1 py-4 text-sm font-bold transition-colors ${!isLoginView ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
            >
              회원가입
            </button>
          </div>

          <div className="p-8">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              
              {!isLoginView && (
                <>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1.5">이름 (닉네임)</label>
                    <div className="relative">
                      <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input 
                        type="text" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="홍길동"
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1.5">회원 유형</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setRole("creator")}
                        className={`flex items-center justify-center gap-2 py-3 rounded-xl border-2 transition-colors ${role === "creator" ? 'border-blue-600 bg-blue-50 text-blue-700 font-bold' : 'border-slate-100 text-slate-500 font-medium hover:bg-slate-50'}`}
                      >
                        <UserCircle2 className="w-5 h-5" /> 크리에이터
                      </button>
                      <button
                        type="button"
                        onClick={() => setRole("brand")}
                        className={`flex items-center justify-center gap-2 py-3 rounded-xl border-2 transition-colors ${role === "brand" ? 'border-indigo-600 bg-indigo-50 text-indigo-700 font-bold' : 'border-slate-100 text-slate-500 font-medium hover:bg-slate-50'}`}
                      >
                        <ShieldCheck className="w-5 h-5" /> 광고주
                      </button>
                    </div>
                  </div>
                </>
              )}

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">이메일 주소</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-sm font-bold text-slate-700">비밀번호</label>
                  {isLoginView && <a href="#" className="text-xs font-bold text-blue-600 hover:underline">비밀번호 찾기</a>}
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input 
                    type="password" 
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                  />
                </div>
                <p className="mt-1.5 text-xs text-slate-400 font-medium">데모 버전이므로 비밀번호는 아무거나 입력해도 됩니다.</p>
              </div>

              {error && (
                <div className="p-3 bg-red-50 text-red-600 text-sm font-bold rounded-lg border border-red-100">
                  {error}
                </div>
              )}

              <button 
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl shadow-lg shadow-slate-900/20 transition-all active:scale-[0.98] mt-2"
              >
                {isLoginView ? '로그인' : '회원가입 완료'}
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-3 bg-white text-slate-400 font-medium">또는 다음으로 계속</span>
              </div>
            </div>

            <button 
              type="button"
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-3 py-3.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold rounded-xl transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                <path d="M1 1h22v22H1z" fill="none"/>
              </svg>
              Google 계정으로 로그인
            </button>

          </div>
        </div>
      </div>
    </main>
  );
}
