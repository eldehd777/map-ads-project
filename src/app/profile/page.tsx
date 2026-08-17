"use client";

import { useState } from "react";
import { Users, Star, Award, MapPin, ExternalLink, Settings } from "lucide-react";

const DUMMY_FRIENDS = [
  { id: 1, name: "푸드트래블러", role: "맛집 전문 리뷰어", followers: "12.4k", rating: 4.9, avatar: "https://picsum.photos/200/200?random=11" },
  { id: 2, name: "뷰티여신", role: "뷰티/패션 크리에이터", followers: "8.2k", rating: 4.8, avatar: "https://picsum.photos/200/200?random=12" },
  { id: 3, name: "운동하는 직장인", role: "헬스/다이어트", followers: "45.1k", rating: 5.0, avatar: "https://picsum.photos/200/200?random=13" },
  { id: 4, name: "동네카페탐방", role: "카페 투어", followers: "3.1k", rating: 4.7, avatar: "https://picsum.photos/200/200?random=14" },
  { id: 5, name: "IT리뷰봇", role: "테크/기기 리뷰", followers: "98.2k", rating: 4.9, avatar: "https://picsum.photos/200/200?random=15" },
  { id: 6, name: "데일리룩기록", role: "패션 인플루언서", followers: "15.7k", rating: 4.6, avatar: "https://picsum.photos/200/200?random=16" },
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<"friends" | "activity" | "insights">("insights");

  return (
    <div className="flex-1 bg-slate-50 overflow-y-auto">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        
        {/* Profile Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm mb-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-10" />
          
          <div className="relative flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8">
            {/* Avatar */}
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white shadow-lg overflow-hidden shrink-0 bg-slate-100">
              <img src="https://picsum.photos/400/400?random=99" alt="My Profile" className="w-full h-full object-cover" />
            </div>

            {/* Info */}
            <div className="flex-1 text-center sm:text-left">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">헬스애즈 마스터</h1>
                  <p className="text-slate-500 font-medium">@hell_ads_master</p>
                </div>
                <button className="flex items-center justify-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-medium transition-colors">
                  <Settings className="w-4 h-4" />
                  프로필 수정
                </button>
              </div>

              <p className="text-slate-600 mb-6 max-w-2xl">
                안녕하세요! 서울 지역의 맛집과 카페를 주로 리뷰하는 크리에이터입니다. 
                솔직하고 생생한 영상 리뷰를 통해 브랜드의 가치를 높여드립니다. ✨
              </p>

              {/* Stats */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-6 sm:gap-12">
                <div className="flex flex-col items-center sm:items-start">
                  <span className="text-slate-500 text-sm font-medium mb-1">완료한 캠페인</span>
                  <span className="text-2xl font-bold text-slate-900">42<span className="text-sm font-normal text-slate-500 ml-1">건</span></span>
                </div>
                <div className="w-px h-10 bg-slate-200 hidden sm:block" />
                <div className="flex flex-col items-center sm:items-start">
                  <span className="text-slate-500 text-sm font-medium mb-1">친구 크리에이터</span>
                  <span className="text-2xl font-bold text-slate-900">128<span className="text-sm font-normal text-slate-500 ml-1">명</span></span>
                </div>
                <div className="w-px h-10 bg-slate-200 hidden sm:block" />
                <div className="flex flex-col items-center sm:items-start">
                  <span className="text-slate-500 text-sm font-medium mb-1">평균 평점</span>
                  <div className="flex items-center gap-1">
                    <span className="text-2xl font-bold text-slate-900">4.9</span>
                    <Star className="w-5 h-5 text-amber-400 fill-amber-400 mb-1" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-8 border-b border-slate-200 mb-8 px-2 overflow-x-auto no-scrollbar">
          <button 
            onClick={() => setActiveTab("insights")}
            className={`pb-4 text-base font-semibold transition-colors relative whitespace-nowrap ${activeTab === "insights" ? "text-blue-600" : "text-slate-500 hover:text-slate-700"}`}
          >
            인사이트 대시보드
            {activeTab === "insights" && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-t-full" />}
          </button>
          <button 
            onClick={() => setActiveTab("friends")}
            className={`pb-4 text-base font-semibold transition-colors relative whitespace-nowrap ${activeTab === "friends" ? "text-blue-600" : "text-slate-500 hover:text-slate-700"}`}
          >
            내 친구 목록
            {activeTab === "friends" && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-t-full" />}
          </button>
          <button 
            onClick={() => setActiveTab("activity")}
            className={`pb-4 text-base font-semibold transition-colors relative whitespace-nowrap ${activeTab === "activity" ? "text-blue-600" : "text-slate-500 hover:text-slate-700"}`}
          >
            최근 활동
            {activeTab === "activity" && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-t-full" />}
          </button>
        </div>

        {activeTab === "insights" ? (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h4 className="text-slate-500 text-sm font-medium mb-2">이번 달 총 노출수 (Reach)</h4>
                <div className="flex items-end gap-3">
                  <span className="text-3xl font-black text-slate-900">845.2K</span>
                  <span className="text-sm font-bold text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-md mb-1">+12.5%</span>
                </div>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h4 className="text-slate-500 text-sm font-medium mb-2">평균 클릭 전환율 (CTR)</h4>
                <div className="flex items-end gap-3">
                  <span className="text-3xl font-black text-slate-900">4.8%</span>
                  <span className="text-sm font-bold text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-md mb-1">+0.8%</span>
                </div>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-full -z-10" />
                <h4 className="text-slate-500 text-sm font-medium mb-2">이번 달 예상 수익</h4>
                <div className="flex items-end gap-3">
                  <span className="text-3xl font-black text-blue-600">₩1,250,000</span>
                </div>
              </div>
            </div>

            {/* Chart Area */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-lg font-bold text-slate-900">주간 트래픽 추이</h3>
                <select className="bg-slate-50 border border-slate-200 text-slate-600 text-sm rounded-lg px-3 py-1.5 focus:outline-none">
                  <option>최근 7일</option>
                  <option>이번 달</option>
                </select>
              </div>
              <div className="h-64 flex items-end justify-between gap-2 sm:gap-4 px-2 sm:px-6">
                {/* Dummy Bar Chart */}
                {[40, 65, 45, 80, 55, 95, 70].map((height, i) => (
                  <div key={i} className="flex flex-col items-center flex-1 gap-3 group">
                    <div className="w-full bg-slate-100 rounded-t-lg relative h-full flex items-end group-hover:bg-slate-200 transition-colors">
                      <div 
                        className="w-full bg-blue-500 rounded-t-lg transition-all duration-1000 ease-out"
                        style={{ height: `${height}%` }}
                      >
                        <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs py-1 px-2 rounded font-medium transition-opacity">
                          {height * 123}
                        </div>
                      </div>
                    </div>
                    <span className="text-xs font-medium text-slate-400">{["월", "화", "수", "목", "금", "토", "일"][i]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : activeTab === "friends" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {DUMMY_FRIENDS.map(friend => (
              <div key={friend.id} className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-lg hover:border-blue-200 transition-all group cursor-pointer">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                    <img src={friend.avatar} alt={friend.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors">
                    <ExternalLink className="w-5 h-5" />
                  </button>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-900 group-hover:text-blue-600 transition-colors">{friend.name}</h3>
                  <p className="text-sm text-slate-500 mb-4">{friend.role}</p>
                  <div className="flex items-center gap-4 text-sm font-medium">
                    <div className="flex items-center gap-1.5 text-slate-600">
                      <Users className="w-4 h-4 text-slate-400" />
                      {friend.followers}
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-600">
                      <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                      {friend.rating}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">최근 활동이 없습니다</h3>
            <p className="text-slate-500">새로운 캠페인에 참여하고 활동 내역을 쌓아보세요!</p>
          </div>
        )}

      </div>
    </div>
  );
}
