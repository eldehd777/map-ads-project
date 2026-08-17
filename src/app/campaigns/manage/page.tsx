"use client";

import { useState } from "react";

import Link from "next/link";
import { Plus, Search, Filter, MoreVertical, Users, Eye, TrendingUp, Calendar } from "lucide-react";
import { useCampaignStore } from "@/store/useCampaignStore";

export default function CampaignsManagePage() {
  const { campaigns, updateCampaign } = useCampaignStore();
  const [openMenuId, setOpenMenuId] = useState<number | string | null>(null);
  return (
    <div className="flex-1 bg-slate-50 overflow-y-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">캠페인 관리</h1>
            <p className="text-slate-500">진행 중인 캠페인의 성과를 확인하고 신청자를 관리하세요.</p>
          </div>
          <Link href="/campaigns/create" className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-600/20 transition-all shrink-0">
            <Plus className="w-5 h-5" />
            새 캠페인 등록
          </Link>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-4 text-slate-500 font-medium">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><TrendingUp className="w-5 h-5" /></div>
              진행중인 캠페인
            </div>
            <div className="text-3xl font-bold text-slate-900">{campaigns.filter(c => c.status === "active").length}<span className="text-base font-normal text-slate-500 ml-1">건</span></div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-4 text-slate-500 font-medium">
              <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg"><Users className="w-5 h-5" /></div>
              총 누적 신청자
            </div>
            <div className="text-3xl font-bold text-slate-900">{campaigns.reduce((sum, c) => sum + (c.applicants || 0), 0)}<span className="text-base font-normal text-slate-500 ml-1">명</span></div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-4 text-slate-500 font-medium">
              <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg"><Eye className="w-5 h-5" /></div>
              캠페인 총 조회수
            </div>
            <div className="text-3xl font-bold text-slate-900">63.8<span className="text-base font-normal text-slate-500 ml-1">k</span></div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-4 text-slate-500 font-medium">
              <div className="p-2 bg-amber-50 text-amber-600 rounded-lg"><Calendar className="w-5 h-5" /></div>
              마감 임박
            </div>
            <div className="text-3xl font-bold text-slate-900">1<span className="text-base font-normal text-slate-500 ml-1">건</span></div>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-slate-900">전체 캠페인 목록</h2>
            <span className="px-2.5 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">4</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="캠페인명 검색..." 
                className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>
            <button className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-colors">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Campaigns Table / List */}
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-sm font-semibold text-slate-500">
                  <th className="px-6 py-4 whitespace-nowrap">캠페인명</th>
                  <th className="px-6 py-4 whitespace-nowrap">상태</th>
                  <th className="px-6 py-4 whitespace-nowrap">신청자</th>
                  <th className="px-6 py-4 whitespace-nowrap">조회수</th>
                  <th className="px-6 py-4 whitespace-nowrap">총 예산</th>
                  <th className="px-6 py-4 whitespace-nowrap">마감일</th>
                  <th className="px-6 py-4 whitespace-nowrap text-right">관리</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {campaigns.map((campaign) => (
                  <tr key={campaign.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-bold text-slate-900 max-w-xs truncate">{campaign.title}</p>
                    </td>
                    <td className="px-6 py-4">
                      {campaign.status === "active" && <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">진행중</span>}
                      {campaign.status === "completed" && <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600">완료됨</span>}
                      {campaign.status === "paused" && <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-700">일시정지</span>}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-slate-600 font-medium">
                        <Users className="w-4 h-4 text-slate-400" />
                        {campaign.applicants}명
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-slate-600 font-medium">
                        <Eye className="w-4 h-4 text-slate-400" />
                        {campaign.views}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-semibold text-slate-900">{campaign.budget}원</span>
                    </td>
                    <td className="px-6 py-4 text-slate-500 font-medium">
                      {campaign.endDate}
                    </td>
                    <td className="px-6 py-4 text-right relative">
                      <button 
                        onClick={() => setOpenMenuId(openMenuId === campaign.id ? null : campaign.id)}
                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <MoreVertical className="w-5 h-5" />
                      </button>

                      {openMenuId === campaign.id && (
                        <div className="absolute right-12 top-10 w-36 bg-white border border-slate-200 rounded-xl shadow-xl z-50 py-1 overflow-hidden animate-in fade-in zoom-in-95 duration-100">
                          {campaign.status !== "active" && (
                            <button onClick={() => { updateCampaign(campaign.id, { status: "active" }); setOpenMenuId(null); }} className="w-full text-left px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                              활성화 (재개)
                            </button>
                          )}
                          {campaign.status !== "paused" && (
                            <button onClick={() => { updateCampaign(campaign.id, { status: "paused" }); setOpenMenuId(null); }} className="w-full text-left px-4 py-2.5 text-sm font-medium text-amber-600 hover:bg-amber-50 transition-colors">
                              일시정지
                            </button>
                          )}
                          {campaign.status !== "completed" && (
                            <button onClick={() => { updateCampaign(campaign.id, { status: "completed" }); setOpenMenuId(null); }} className="w-full text-left px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                              완료 처리
                            </button>
                          )}
                          <div className="h-px bg-slate-100 my-1" />
                          <button onClick={() => {
                            const newDate = prompt("새로운 마감일을 입력하세요 (YYYY-MM-DD)", campaign.endDate);
                            if (newDate) { updateCampaign(campaign.id, { endDate: newDate }); }
                            setOpenMenuId(null);
                          }} className="w-full text-left px-4 py-2.5 text-sm font-medium text-blue-600 hover:bg-blue-50 transition-colors">
                            기간 연장 / 설정
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
