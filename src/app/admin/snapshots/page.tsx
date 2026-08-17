"use client";

import { useState } from "react";
import { Check, X, Search, Filter, Image as ImageIcon, Calendar, ShieldAlert } from "lucide-react";

const DUMMY_SNAPSHOTS = [
  { id: 1, creator: "푸드트래블러", campaign: "신메뉴 '흑임자 라떼' 리뷰", date: "2024-05-12", status: "pending", image: "https://picsum.photos/600/600?random=21" },
  { id: 2, creator: "동네카페탐방", campaign: "오픈 1주년 기념 이벤트", date: "2024-05-11", status: "pending", image: "https://picsum.photos/600/600?random=22" },
  { id: 3, creator: "뷰티여신", campaign: "뷰티 클래스 체험단", date: "2024-05-10", status: "approved", image: "https://picsum.photos/600/600?random=23" },
  { id: 4, creator: "IT리뷰봇", campaign: "무선 헤드셋 리뷰", date: "2024-05-09", status: "rejected", image: "https://picsum.photos/600/600?random=24" },
];

export default function AdminSnapshotsPage() {
  const [snapshots, setSnapshots] = useState(DUMMY_SNAPSHOTS);
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("all");
  const [selectedSnapshot, setSelectedSnapshot] = useState<any>(null);

  const filteredSnapshots = snapshots.filter(s => filter === "all" || s.status === filter);

  const handleStatusChange = (id: number, status: "approved" | "rejected") => {
    if (confirm(`정말로 이 스냅샷을 ${status === 'approved' ? '강제 승인' : '강제 반려'} 하시겠습니까?`)) {
      setSnapshots(prev => prev.map(s => s.id === id ? { ...s, status } : s));
      alert(status === "approved" ? "강제 승인 완료되었습니다." : "강제 반려 완료되었습니다.");
      setSelectedSnapshot(null);
    }
  };

  return (
    <div className="flex-1 bg-slate-50 overflow-y-auto relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-1 bg-red-100 text-red-700 text-xs font-bold uppercase tracking-wider rounded-lg">Admin Mode</span>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">스냅샷 통합 관리 (어드민)</h1>
            <p className="text-slate-500">모든 스냅샷 제출 현황을 모니터링하고 직권으로 승인/반려할 수 있습니다.</p>
          </div>
          
          <div className="flex bg-white rounded-2xl shadow-sm border border-red-200 p-2">
            <div className="px-6 py-2 border-r border-slate-100 flex flex-col items-center">
              <span className="text-xs font-semibold text-slate-500 uppercase mb-1">대기중 전체</span>
              <span className="text-xl font-bold text-red-600">{snapshots.filter(s => s.status === "pending").length}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2 bg-slate-200/50 p-1.5 rounded-xl border border-slate-200 overflow-x-auto w-full sm:w-auto">
            <button onClick={() => setFilter("all")} className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all whitespace-nowrap ${filter === "all" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}>전체</button>
            <button onClick={() => setFilter("pending")} className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all whitespace-nowrap ${filter === "pending" ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}>대기중</button>
            <button onClick={() => setFilter("approved")} className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all whitespace-nowrap ${filter === "approved" ? "bg-white text-green-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}>승인완료</button>
            <button onClick={() => setFilter("rejected")} className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all whitespace-nowrap ${filter === "rejected" ? "bg-white text-red-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}>반려됨</button>
          </div>
          
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input type="text" placeholder="크리에이터 검색..." className="w-full pl-9 pr-4 py-2.5 bg-white border border-red-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500" />
            </div>
            <button className="p-2.5 bg-white border border-red-200 rounded-xl text-slate-600 hover:bg-slate-50"><Filter className="w-4 h-4" /></button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredSnapshots.map((snapshot) => (
            <div key={snapshot.id} onClick={() => setSelectedSnapshot(snapshot)} className="bg-white border border-red-100 rounded-2xl overflow-hidden hover:shadow-xl hover:border-red-300 transition-all cursor-pointer group">
              <div className="aspect-square relative overflow-hidden bg-slate-100">
                <img src={snapshot.image} alt={snapshot.campaign} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-3 right-3">
                  {snapshot.status === "pending" && <span className="px-2.5 py-1 bg-blue-500/90 backdrop-blur-md text-white text-xs font-bold rounded-lg">대기중</span>}
                  {snapshot.status === "approved" && <span className="px-2.5 py-1 bg-green-500/90 backdrop-blur-md text-white text-xs font-bold rounded-lg">승인됨</span>}
                  {snapshot.status === "rejected" && <span className="px-2.5 py-1 bg-red-500/90 backdrop-blur-md text-white text-xs font-bold rounded-lg">반려됨</span>}
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-slate-900 mb-1 line-clamp-1 group-hover:text-red-600 transition-colors">{snapshot.campaign}</h3>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-slate-600">{snapshot.creator}</span>
                  <div className="flex items-center gap-1 text-slate-400 font-medium">
                    <Calendar className="w-3.5 h-3.5" />
                    {snapshot.date}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedSnapshot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setSelectedSnapshot(null)} />
          <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh] animate-in fade-in zoom-in-95 duration-200 border-2 border-red-500">
            <button onClick={() => setSelectedSnapshot(null)} className="absolute top-4 right-4 z-20 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full backdrop-blur-md">
              <X className="w-5 h-5" />
            </button>
            <div className="w-full md:w-3/5 bg-slate-100 flex items-center justify-center shrink-0">
              <img src={selectedSnapshot.image} alt={selectedSnapshot.campaign} className="w-full h-full object-contain max-h-[50vh] md:max-h-[90vh]" />
            </div>
            <div className="w-full md:w-2/5 flex flex-col bg-white">
              <div className="p-6 md:p-8 flex-1 overflow-y-auto">
                <div className="flex items-center gap-2 mb-4">
                  <ShieldAlert className="w-5 h-5 text-red-500" />
                  <span className="text-sm font-bold text-red-500 uppercase tracking-wider">어드민 심사 모드</span>
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">{selectedSnapshot.campaign}</h2>
                <p className="text-lg font-medium text-slate-600 mb-8">{selectedSnapshot.creator}</p>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">포스팅 내용 (원본)</h4>
                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-600 text-sm leading-relaxed">
                      안녕하세요! 오늘은 정말 기대했던 신메뉴 리뷰를 가져왔어요. 😋 너무 예쁘게 생겼고 맛도 최고였어요! 여러분도 꼭 방문해보세요! #협찬 #맛집 #리뷰
                    </div>
                  </div>
                </div>
              </div>

              {selectedSnapshot.status === "pending" ? (
                <div className="flex gap-3 p-6 border-t border-red-100 bg-red-50/30 shrink-0">
                  <button onClick={() => handleStatusChange(selectedSnapshot.id, "rejected")} className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-white text-red-600 font-bold rounded-xl transition-colors border-2 border-red-200 hover:border-red-400 hover:bg-red-50">
                    <X className="w-5 h-5" />
                    직권 반려
                  </button>
                  <button onClick={() => handleStatusChange(selectedSnapshot.id, "approved")} className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-lg shadow-red-600/20 transition-all">
                    <Check className="w-5 h-5" />
                    직권 승인
                  </button>
                </div>
              ) : (
                <div className="p-6 border-t border-slate-200 shrink-0 text-center text-sm font-medium text-slate-500 bg-slate-50">
                  어드민에 의해 {selectedSnapshot.status === "approved" ? "승인" : "반려"} 처리된 스냅샷입니다.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
