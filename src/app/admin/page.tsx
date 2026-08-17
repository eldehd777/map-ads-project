"use client";

import { useCampaignStore } from "@/store/useCampaignStore";
import { Users, Store, Activity, DollarSign, ShieldAlert, Zap } from "lucide-react";

export default function AdminDashboardPage() {
  const { campaigns } = useCampaignStore();

  const totalCampaigns = campaigns.length;
  const activeCampaigns = campaigns.filter(c => c.status === "active").length;
  
  return (
    <div className="flex-1 bg-slate-50 overflow-y-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-1 bg-red-100 text-red-700 text-xs font-bold uppercase tracking-wider rounded-lg">Admin Mode</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">통합 관리 대시보드</h1>
            <p className="text-slate-500 mt-2">Hell Ads 플랫폼의 전체 운영 상태를 한눈에 파악하세요.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2.5 bg-red-50 text-red-600 hover:bg-red-100 font-bold rounded-xl transition-colors border border-red-200">
              <ShieldAlert className="w-5 h-5" />
              시스템 점검 모드 켜기
            </button>
          </div>
        </div>

        {/* Top Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-50 rounded-full opacity-50 pointer-events-none" />
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-blue-100 text-blue-600 rounded-xl"><Users className="w-5 h-5" /></div>
              <span className="text-slate-500 font-medium">총 가입 크리에이터</span>
            </div>
            <div className="text-3xl font-bold text-slate-900">1,248<span className="text-base font-normal text-slate-500 ml-1">명</span></div>
            <div className="mt-2 text-sm text-blue-600 font-medium flex items-center gap-1">
              <Zap className="w-4 h-4" /> +12명 (오늘)
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-indigo-50 rounded-full opacity-50 pointer-events-none" />
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-indigo-100 text-indigo-600 rounded-xl"><Store className="w-5 h-5" /></div>
              <span className="text-slate-500 font-medium">입점 광고주</span>
            </div>
            <div className="text-3xl font-bold text-slate-900">342<span className="text-base font-normal text-slate-500 ml-1">곳</span></div>
            <div className="mt-2 text-sm text-indigo-600 font-medium flex items-center gap-1">
              <Zap className="w-4 h-4" /> +3곳 (오늘)
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-emerald-50 rounded-full opacity-50 pointer-events-none" />
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-emerald-100 text-emerald-600 rounded-xl"><Activity className="w-5 h-5" /></div>
              <span className="text-slate-500 font-medium">진행/전체 캠페인</span>
            </div>
            <div className="text-3xl font-bold text-slate-900">{activeCampaigns}<span className="text-base font-normal text-slate-400 mx-1">/</span><span className="text-2xl text-slate-500">{totalCampaigns}</span></div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-amber-50 rounded-full opacity-50 pointer-events-none" />
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-amber-100 text-amber-600 rounded-xl"><DollarSign className="w-5 h-5" /></div>
              <span className="text-slate-500 font-medium">월 누적 거래액</span>
            </div>
            <div className="text-3xl font-bold text-slate-900">4,250<span className="text-base font-normal text-slate-500 ml-1">만원</span></div>
          </div>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white border border-slate-200 p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-xl font-bold text-slate-900 mb-2">전체 캠페인 관리</h2>
            <p className="text-slate-500 mb-6">문제의 소지가 있는 캠페인을 강제로 정지하거나 완전 삭제할 수 있는 마스터 권한입니다.</p>
            <a href="/admin/campaigns" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-colors">
              전체 캠페인 관리 열기
            </a>
          </div>

          <div className="bg-white border border-slate-200 p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-xl font-bold text-slate-900 mb-2">스냅샷 통합 심사</h2>
            <p className="text-slate-500 mb-6">광고주가 놓친 스냅샷을 관리자가 대신 검토하거나 직권으로 승인/반려합니다.</p>
            <a href="/admin/snapshots" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-colors">
              스냅샷 통합 심사 열기
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
