"use client";

import { useState } from "react";
import { Star, Users, MapPin, ExternalLink, X, Instagram, MessageCircle } from "lucide-react";

const DUMMY_CREATORS = [
  { id: 1, name: "푸드트래블러", role: "맛집 전문 리뷰어", followers: "12.4k", rating: 4.9, avatar: "https://picsum.photos/400/400?random=31", tags: ["맛집", "카페", "신상투어"] },
  { id: 2, name: "뷰티여신", role: "뷰티/패션 크리에이터", followers: "8.2k", rating: 4.8, avatar: "https://picsum.photos/400/400?random=32", tags: ["뷰티", "패션", "화장품"] },
  { id: 3, name: "운동하는 직장인", role: "헬스/다이어트", followers: "45.1k", rating: 5.0, avatar: "https://picsum.photos/400/400?random=33", tags: ["오운완", "다이어트", "바디프로필"] },
  { id: 4, name: "동네카페탐방", role: "카페 투어", followers: "3.1k", rating: 4.7, avatar: "https://picsum.photos/400/400?random=34", tags: ["카페투어", "디저트", "감성사진"] },
  { id: 5, name: "IT리뷰봇", role: "테크/기기 리뷰", followers: "98.2k", rating: 4.9, avatar: "https://picsum.photos/400/400?random=35", tags: ["전자기기", "언박싱", "꿀팁"] },
  { id: 6, name: "데일리룩기록", role: "패션 인플루언서", followers: "15.7k", rating: 4.6, avatar: "https://picsum.photos/400/400?random=36", tags: ["데일리룩", "오오티디", "코디"] },
];

export default function ShowcasePage() {
  const [selectedCreator, setSelectedCreator] = useState<any>(null);

  return (
    <div className="flex-1 bg-slate-50 overflow-y-auto relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">크리에이터 쇼케이스</h1>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">
            헬스애즈에서 활발하게 활동 중인 검증된 우수 크리에이터들을 만나보세요.
            우리 브랜드에 딱 맞는 크리에이터에게 직접 캠페인을 제안할 수 있습니다.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {DUMMY_CREATORS.map(creator => (
            <div 
              key={creator.id} 
              onClick={() => setSelectedCreator(creator)}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
            >
              <div className="aspect-[4/3] bg-slate-100 relative overflow-hidden">
                <img src={creator.avatar} alt={creator.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="font-bold text-xl mb-1">{creator.name}</h3>
                  <p className="text-sm text-white/80">{creator.role}</p>
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-4 text-sm font-medium mb-4">
                  <div className="flex items-center gap-1.5 text-slate-600">
                    <Users className="w-4 h-4 text-slate-400" />
                    {creator.followers}
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-600">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    {creator.rating}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {creator.tags.map(tag => (
                    <span key={tag} className="px-2.5 py-1 bg-slate-50 border border-slate-100 text-slate-600 text-xs rounded-lg">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Showcase Detail Modal */}
      {selectedCreator && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={() => setSelectedCreator(null)} />
          
          <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
            <button onClick={() => setSelectedCreator(null)} className="absolute top-4 right-4 z-20 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full backdrop-blur-md transition-colors">
              <X className="w-5 h-5" />
            </button>

            {/* Left Image */}
            <div className="w-full md:w-2/5 h-64 md:h-auto relative shrink-0">
              <img src={selectedCreator.avatar} alt={selectedCreator.name} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent md:hidden" />
            </div>

            {/* Right Content */}
            <div className="p-6 sm:p-8 flex-1 overflow-y-auto bg-slate-50 flex flex-col">
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <h2 className="text-2xl font-bold text-slate-900">{selectedCreator.name}</h2>
                  <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                  <span className="font-bold text-slate-900">{selectedCreator.rating}</span>
                </div>
                <p className="text-slate-500 font-medium">{selectedCreator.role}</p>
              </div>

              <div className="flex gap-4 mb-8">
                <div className="flex-1 p-4 bg-white border border-slate-200 rounded-2xl text-center">
                  <div className="text-sm font-semibold text-slate-400 mb-1">팔로워</div>
                  <div className="text-xl font-bold text-slate-900">{selectedCreator.followers}</div>
                </div>
                <div className="flex-1 p-4 bg-white border border-slate-200 rounded-2xl text-center">
                  <div className="text-sm font-semibold text-slate-400 mb-1">완료 캠페인</div>
                  <div className="text-xl font-bold text-slate-900">42건</div>
                </div>
              </div>

              <div className="space-y-6 flex-1">
                <div>
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">관심 태그</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedCreator.tags.map((tag: string) => (
                      <span key={tag} className="px-3 py-1.5 bg-blue-50 text-blue-700 text-sm font-medium rounded-lg">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">소개</h3>
                  <p className="text-slate-600 text-sm leading-relaxed bg-white p-4 rounded-2xl border border-slate-200">
                    안녕하세요! 꼼꼼하고 정성스러운 리뷰로 브랜드의 매력을 120% 끌어올려 드립니다. 
                    특히 사진 촬영과 영상 릴스 편집에 자신 있습니다. 잘 부탁드립니다! 📸✨
                  </p>
                </div>
              </div>

              <div className="mt-8 flex gap-3 pt-6 border-t border-slate-200 shrink-0">
                <button className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-colors">
                  <Instagram className="w-5 h-5" />
                  SNS 보기
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-600/20 transition-all">
                  <MessageCircle className="w-5 h-5" />
                  제안하기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
