"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Filter, MoreVertical, Users, Eye, ShieldAlert, Trash2 } from "lucide-react";
import { useCampaignStore } from "@/store/useCampaignStore";

export default function AdminCampaignsPage() {
  const { campaigns, updateCampaign, deleteCampaign } = useCampaignStore();
  const [openMenuId, setOpenMenuId] = useState<number | string | null>(null);

  const handleDelete = (id: number | string) => {
    if (confirm("정말로 이 캠페인을 강제 삭제하시겠습니까? (이 작업은 되돌릴 수 없습니다)")) {
      deleteCampaign(id);
      setOpenMenuId(null);
      alert("성공적으로 강제 삭제되었습니다.");
    }
  };

  return (
    <div className="flex-1 bg-slate-50 overflow-y-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-1 bg-red-100 text-red-700 text-xs font-bold uppercase tracking-wider rounded-lg">Admin Mode</span>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">전체 캠페인 관리 (어드민)</h1>
            <p className="text-slate-500">모든 광고주의 캠페인을 감독하고 문제 발생 시 조치할 수 있습니다.</p>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-slate-900">모든 캠페인 목록</h2>
            <span className="px-2.5 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">{campaigns.length}</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="광고주 또는 캠페인 검색..." 
                className="w-full pl-9 pr-4 py-2.5 bg-white border border-red-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
              />
            </div>
            <button className="p-2.5 bg-white border border-red-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-colors">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Campaigns Table / List */}
        <div className="bg-white border border-red-200 rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-red-50/50 border-b border-red-100 text-sm font-semibold text-slate-500">
                  <th className="px-6 py-4 whitespace-nowrap">광고주(매장명)</th>
                  <th className="px-6 py-4 whitespace-nowrap">캠페인명</th>
                  <th className="px-6 py-4 whitespace-nowrap">상태</th>
                  <th className="px-6 py-4 whitespace-nowrap">총 예산</th>
                  <th className="px-6 py-4 whitespace-nowrap">마감일</th>
                  <th className="px-6 py-4 whitespace-nowrap text-right">마스터 관리</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {campaigns.length === 0 ? (
                   <tr><td colSpan={6} className="text-center py-10 text-slate-500">등록된 캠페인이 없습니다.</td></tr>
                ) : campaigns.map((campaign) => (
                  <tr key={campaign.id} className="hover:bg-red-50/30 transition-colors">
                    <td className="px-6 py-4">
                      <span className="font-bold text-slate-900">{campaign.storeName}</span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-slate-700 max-w-xs truncate">{campaign.title}</p>
                    </td>
                    <td className="px-6 py-4">
                      {campaign.status === "active" && <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">진행중</span>}
                      {campaign.status === "completed" && <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600">완료됨</span>}
                      {campaign.status === "paused" && <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-700">일시정지</span>}
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
                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <MoreVertical className="w-5 h-5" />
                      </button>

                      {openMenuId === campaign.id && (
                        <div className="absolute right-12 top-10 w-40 bg-white border border-red-200 rounded-xl shadow-xl z-50 py-1 overflow-hidden animate-in fade-in zoom-in-95 duration-100">
                          {campaign.status !== "active" && (
                            <button onClick={() => { updateCampaign(campaign.id, { status: "active" }); setOpenMenuId(null); }} className="w-full text-left px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                              상태 변경: 활성화
                            </button>
                          )}
                          {campaign.status !== "paused" && (
                            <button onClick={() => { updateCampaign(campaign.id, { status: "paused" }); setOpenMenuId(null); }} className="w-full text-left px-4 py-2.5 text-sm font-medium text-amber-600 hover:bg-amber-50 transition-colors">
                              상태 변경: 정지
                            </button>
                          )}
                          <div className="h-px bg-slate-100 my-1" />
                          <button onClick={() => handleDelete(campaign.id)} className="flex items-center gap-2 w-full text-left px-4 py-2.5 text-sm font-bold text-red-600 hover:bg-red-50 transition-colors">
                            <Trash2 className="w-4 h-4" />
                            강제 삭제
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
