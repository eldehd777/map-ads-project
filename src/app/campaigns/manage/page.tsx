"use client";

import { useState } from "react";

import Link from "next/link";
import { Plus, Search, Filter, MoreVertical, Users, Eye, TrendingUp, Calendar, X, Check, XCircle } from "lucide-react";
import { useCampaignStore } from "@/store/useCampaignStore";

const DUMMY_APPLICANTS = [
  { id: 1, name: "푸드트래블러", role: "맛집 전문 리뷰어", followers: "12.4k", message: "정말 기대되는 캠페인이네요! 제 유튜브와 인스타에 정성껏 리뷰하겠습니다.", status: "pending", avatar: "https://picsum.photos/200/200?random=11" },
  { id: 2, name: "뷰티여신", role: "뷰티/패션 크리에이터", followers: "8.2k", message: "평소 관심있던 브랜드라 꼭 참여하고 싶습니다. 고화질 사진 약속드려요.", status: "approved", avatar: "https://picsum.photos/200/200?random=12" },
  { id: 3, name: "동네카페탐방", role: "라이프스타일", followers: "3.1k", message: "집 근처라 방문하기 너무 좋습니다. 로컬 찐리뷰 남길게요!", status: "pending", avatar: "https://picsum.photos/200/200?random=14" },
];

export default function CampaignsManagePage() {
  const { campaigns, updateCampaign } = useCampaignStore();
  const [openMenuId, setOpenMenuId] = useState<number | string | null>(null);
  const [viewApplicantsFor, setViewApplicantsFor] = useState<number | string | null>(null);
  const [applicants, setApplicants] = useState(DUMMY_APPLICANTS);
  const [modalTab, setModalTab] = useState<"pending" | "approved">("pending");

  const handleApprove = (id: number) => {
    setApplicants(prev => prev.map(a => a.id === id ? { ...a, status: "approved" } : a));
  };

  const handleReject = (id: number) => {
    setApplicants(prev => prev.map(a => a.id === id ? { ...a, status: "rejected" } : a));
  };

  const handleCancel = (id: number) => {
    if (confirm("정말로 이 지원자의 승인을 취소하시겠습니까?")) {
      setApplicants(prev => prev.map(a => a.id === id ? { ...a, status: "canceled" } : a));
    }
  };

  const filteredApplicants = applicants.filter(a => a.status === modalTab);

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
                      <button 
                        onClick={() => setViewApplicantsFor(campaign.id)}
                        className="flex items-center gap-1.5 text-blue-600 font-bold hover:text-blue-700 hover:underline transition-all bg-blue-50 px-3 py-1.5 rounded-lg"
                      >
                        <Users className="w-4 h-4" />
                        {campaign.applicants}명 보기
                      </button>
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

      {/* Applicants Modal */}
      {viewApplicantsFor !== null && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-in slide-in-from-bottom-4 duration-300">
            {/* Modal Header */}
            <div className="flex flex-col border-b border-slate-100 bg-white shrink-0">
              <div className="flex items-center justify-between p-6 pb-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 mb-1">지원자 목록</h2>
                  <p className="text-sm text-slate-500">
                    총 {applicants.filter(a => a.status === "pending" || a.status === "approved").length}명의 크리에이터 관리
                  </p>
                </div>
                <button 
                  onClick={() => setViewApplicantsFor(null)}
                  className="p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Tabs */}
              <div className="flex items-center gap-6 px-6 mt-2">
                <button 
                  onClick={() => setModalTab("pending")}
                  className={`pb-3 text-sm font-bold relative transition-colors ${modalTab === "pending" ? "text-blue-600" : "text-slate-500 hover:text-slate-700"}`}
                >
                  신청 대기중 <span className="ml-1 px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded-md text-xs">{applicants.filter(a => a.status === "pending").length}</span>
                  {modalTab === "pending" && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-t-full" />}
                </button>
                <button 
                  onClick={() => setModalTab("approved")}
                  className={`pb-3 text-sm font-bold relative transition-colors ${modalTab === "approved" ? "text-blue-600" : "text-slate-500 hover:text-slate-700"}`}
                >
                  승인 완료 <span className="ml-1 px-1.5 py-0.5 bg-blue-50 text-blue-600 rounded-md text-xs">{applicants.filter(a => a.status === "approved").length}</span>
                  {modalTab === "approved" && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-t-full" />}
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-6 bg-slate-50">
              <div className="space-y-4">
                {filteredApplicants.length === 0 ? (
                  <div className="py-12 text-center text-slate-500">
                    {modalTab === "pending" ? "신청 대기중인 지원자가 없습니다." : "승인된 지원자가 없습니다."}
                  </div>
                ) : (
                  filteredApplicants.map(applicant => (
                  <div key={applicant.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col sm:flex-row gap-5 transition-all hover:border-blue-200 hover:shadow-md">
                    
                    {/* Profile Info */}
                    <div className="flex items-center gap-4 sm:w-1/3 shrink-0">
                      <img src={applicant.avatar} alt={applicant.name} className="w-14 h-14 rounded-full object-cover border border-slate-200" />
                      <div>
                        <h3 className="font-bold text-slate-900">{applicant.name}</h3>
                        <p className="text-xs text-slate-500 mb-1">{applicant.role}</p>
                        <span className="inline-flex items-center text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
                          팔로워 {applicant.followers}
                        </span>
                      </div>
                    </div>

                    {/* Message */}
                    <div className="flex-1 bg-slate-50 rounded-xl p-3 border border-slate-100">
                      <p className="text-sm text-slate-600 leading-relaxed">&quot;{applicant.message}&quot;</p>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-row sm:flex-col justify-end gap-2 sm:w-28 shrink-0">
                      {applicant.status === "pending" && (
                        <>
                          <button onClick={() => handleApprove(applicant.id)} className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 hover:text-emerald-800 font-bold text-sm rounded-xl transition-colors">
                            <Check className="w-4 h-4" /> 승인
                          </button>
                          <button onClick={() => handleReject(applicant.id)} className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-rose-50 text-rose-700 hover:bg-rose-100 hover:text-rose-800 font-bold text-sm rounded-xl transition-colors">
                            <XCircle className="w-4 h-4" /> 반려
                          </button>
                        </>
                      )}
                      {applicant.status === "approved" && (
                        <>
                          <div className="flex-1 flex items-center justify-center px-3 py-2 bg-emerald-500 text-white font-bold text-sm rounded-xl">
                            승인 완료
                          </div>
                          <button onClick={() => handleCancel(applicant.id)} className="flex-1 flex items-center justify-center px-3 py-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 font-bold text-sm rounded-xl transition-colors">
                            승인 취소
                          </button>
                        </>
                      )}
                    </div>

                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
