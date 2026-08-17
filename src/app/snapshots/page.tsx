"use client";

import { useState } from "react";
import { Check, X, Search, Filter, Image as ImageIcon, Calendar } from "lucide-react";

const DUMMY_SNAPSHOTS = [
  { id: 1, creator: "푸드트래블러", campaign: "신메뉴 '흑임자 라떼' 리뷰", date: "2024-05-12", status: "pending", image: "https://picsum.photos/600/600?random=21" },
  { id: 2, creator: "동네카페탐방", campaign: "오픈 1주년 기념 이벤트", date: "2024-05-11", status: "pending", image: "https://picsum.photos/600/600?random=22" },
  { id: 3, creator: "뷰티여신", campaign: "뷰티 클래스 체험단", date: "2024-05-10", status: "approved", image: "https://picsum.photos/600/600?random=23" },
  { id: 4, creator: "IT리뷰봇", campaign: "무선 헤드셋 리뷰", date: "2024-05-09", status: "rejected", image: "https://picsum.photos/600/600?random=24" },
  { id: 5, creator: "운동하는 직장인", campaign: "PT샵 시설 소개", date: "2024-05-08", status: "approved", image: "https://picsum.photos/600/600?random=25" },
  { id: 6, creator: "데일리룩기록", campaign: "여름 신상 컬렉션", date: "2024-05-08", status: "pending", image: "https://picsum.photos/600/600?random=26" },
];

export default function SnapshotsPage() {
  const [snapshots, setSnapshots] = useState(DUMMY_SNAPSHOTS);
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("all");
  const [selectedSnapshot, setSelectedSnapshot] = useState<any>(null);

  const filteredSnapshots = snapshots.filter(s => filter === "all" || s.status === filter);

  const handleStatusChange = (id: number, status: "approved" | "rejected") => {
    setSnapshots(prev => prev.map(s => s.id === id ? { ...s, status } : s));
    if (selectedSnapshot?.id === id) {
      setSelectedSnapshot((prev: any) => ({ ...prev, status }));
    }
    alert(status === "approved" ? "승인 처리되었습니다." : "반려 처리되었습니다.");
  };

  return (
    <div className="flex-1 bg-slate-50 overflow-y-auto relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header & Stats */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">스냅샷 관리</h1>
            <p className="text-slate-500">크리에이터들이 제출한 캠페인 결과물(스냅샷)을 확인하고 승인하세요.</p>
          </div>
          
          <div className="flex bg-white rounded-2xl shadow-sm border border-slate-200 p-2">
            <div className="px-6 py-2 border-r border-slate-100 flex flex-col items-center">
              <span className="text-xs font-semibold text-slate-500 uppercase mb-1">대기중</span>
              <span className="text-xl font-bold text-blue-600">{snapshots.filter(s => s.status === "pending").length}</span>
            </div>
            <div className="px-6 py-2 border-r border-slate-100 flex flex-col items-center">
              <span className="text-xs font-semibold text-slate-500 uppercase mb-1">승인완료</span>
              <span className="text-xl font-bold text-green-600">{snapshots.filter(s => s.status === "approved").length}</span>
            </div>
            <div className="px-6 py-2 flex flex-col items-center">
              <span className="text-xs font-semibold text-slate-500 uppercase mb-1">반려</span>
              <span className="text-xl font-bold text-red-600">{snapshots.filter(s => s.status === "rejected").length}</span>
            </div>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <div className="flex items-center bg-slate-100 p-1 rounded-xl w-full sm:w-auto overflow-x-auto">
            {["all", "pending", "approved", "rejected"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f as any)}
                className={`px-4 py-2 text-sm font-semibold rounded-lg whitespace-nowrap transition-all ${
                  filter === f ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
                }`}
              >
                {f === "all" && "전체보기"}
                {f === "pending" && "대기중"}
                {f === "approved" && "승인됨"}
                {f === "rejected" && "반려됨"}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="크리에이터, 캠페인명 검색..." 
                className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>
            <button className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-colors">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredSnapshots.map((snapshot) => (
            <div 
              key={snapshot.id} 
              onClick={() => setSelectedSnapshot(snapshot)}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl hover:shadow-slate-200/50 transition-all group cursor-pointer"
            >
              <div className="relative aspect-square bg-slate-100 overflow-hidden">
                <img 
                  src={snapshot.image} 
                  alt={snapshot.campaign} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {snapshot.status === "pending" && (
                  <div className="absolute top-3 left-3 px-2.5 py-1 bg-blue-500 text-white text-xs font-bold uppercase rounded-lg shadow-sm z-10">
                    대기중
                  </div>
                )}
                {snapshot.status === "approved" && (
                  <div className="absolute top-3 left-3 px-2.5 py-1 bg-green-500 text-white text-xs font-bold uppercase rounded-lg shadow-sm z-10">
                    승인됨
                  </div>
                )}
                {snapshot.status === "rejected" && (
                  <div className="absolute top-3 left-3 px-2.5 py-1 bg-red-500 text-white text-xs font-bold uppercase rounded-lg shadow-sm z-10">
                    반려됨
                  </div>
                )}
              </div>
              
              <div className="p-5">
                <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-2">
                  <span className="text-blue-600">{snapshot.creator}</span>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {snapshot.date}
                  </div>
                </div>
                <h3 className="font-bold text-slate-900 truncate" title={snapshot.campaign}>
                  {snapshot.campaign}
                </h3>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Snapshot Detail Modal */}
      {selectedSnapshot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={() => setSelectedSnapshot(null)} />
          
          <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
            <button onClick={() => setSelectedSnapshot(null)} className="absolute top-4 right-4 z-20 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full backdrop-blur-md transition-colors">
              <X className="w-5 h-5" />
            </button>

            {/* Left Full Image */}
            <div className="w-full md:w-3/5 h-[50vh] md:h-[80vh] bg-slate-100 relative shrink-0">
              <img src={selectedSnapshot.image} alt="Snapshot Original" className="absolute inset-0 w-full h-full object-contain bg-black" />
            </div>

            {/* Right Info & Actions */}
            <div className="p-6 sm:p-8 flex-1 overflow-y-auto bg-slate-50 flex flex-col">
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  {selectedSnapshot.status === "pending" && <span className="px-2.5 py-1 bg-blue-100 text-blue-700 text-xs font-bold uppercase rounded-lg">대기중</span>}
                  {selectedSnapshot.status === "approved" && <span className="px-2.5 py-1 bg-green-100 text-green-700 text-xs font-bold uppercase rounded-lg">승인됨</span>}
                  {selectedSnapshot.status === "rejected" && <span className="px-2.5 py-1 bg-red-100 text-red-700 text-xs font-bold uppercase rounded-lg">반려됨</span>}
                  <span className="text-sm font-medium text-slate-500">{selectedSnapshot.date}</span>
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">{selectedSnapshot.campaign}</h2>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-slate-200 overflow-hidden">
                    <img src={`https://picsum.photos/100/100?random=${selectedSnapshot.id}`} alt="creator" />
                  </div>
                  <span className="font-semibold text-slate-700">{selectedSnapshot.creator}</span>
                </div>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200 mb-6 flex-1">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">작성 내용</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  이번에 새로 나온 메뉴 진짜 미쳤어요ㅠㅠ 꼭 드셔보세요! 분위기도 완전 좋아서 데이트 코스로 강추합니다 ❤️
                </p>
                <div className="text-blue-600 text-sm font-medium space-x-1">
                  <span>#강남맛집</span>
                  <span>#데이트코스</span>
                  <span>#신메뉴출시</span>
                </div>
              </div>

              {selectedSnapshot.status === "pending" ? (
                <div className="flex gap-3 pt-6 border-t border-slate-200 shrink-0">
                  <button 
                    onClick={() => handleStatusChange(selectedSnapshot.id, "rejected")}
                    className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-red-50 hover:bg-red-100 text-red-600 font-bold rounded-xl transition-colors border border-red-200"
                  >
                    <X className="w-5 h-5" />
                    반려하기
                  </button>
                  <button 
                    onClick={() => handleStatusChange(selectedSnapshot.id, "approved")}
                    className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl shadow-lg shadow-green-600/20 transition-all border border-green-600"
                  >
                    <Check className="w-5 h-5" />
                    승인하기
                  </button>
                </div>
              ) : (
                <div className="pt-6 border-t border-slate-200 shrink-0">
                  <button onClick={() => setSelectedSnapshot(null)} className="w-full py-3.5 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-xl transition-colors">
                    닫기
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
