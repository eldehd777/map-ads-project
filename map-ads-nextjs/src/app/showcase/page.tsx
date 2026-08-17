import { Search, Filter, Sparkles } from "lucide-react";
import CreatorCard from "@/components/CreatorCard";

export default function Showcase() {
  const creators = [
    {
      id: 1,
      name: "먹방의 신 제이콥",
      category: "푸드/먹방",
      subscribers: "15만명",
      tags: ["대식가", "로컬맛집", "ASMR"],
      imageUrl: "/placeholder.jpg",
      rating: 4.9,
    },
    {
      id: 2,
      name: "뷰티인사이드 소피아",
      category: "뷰티/패션",
      subscribers: "8만명",
      tags: ["스킨케어", "올리브영추천", "다이어트"],
      imageUrl: "/placeholder.jpg",
      rating: 4.7,
    },
    {
      id: 3,
      name: "근육맨 브이로그",
      category: "스포츠/피트니스",
      subscribers: "21만명",
      tags: ["헬린이", "오운완", "식단"],
      imageUrl: "/placeholder.jpg",
      rating: 5.0,
    },
    {
      id: 4,
      name: "핫플 탐험가 지니",
      category: "여행/일상",
      subscribers: "5만명",
      tags: ["신상카페", "데이트코스", "감성사진"],
      imageUrl: "/placeholder.jpg",
      rating: 4.8,
    }
  ];

  return (
    <div className="flex-1 bg-slate-50 min-h-[calc(100vh-4rem)] p-4 sm:p-8 lg:p-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-blue-600" />
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">크리에이터 쇼케이스</h1>
          </div>
          <p className="text-slate-500 text-lg">우리 브랜드에 딱 맞는 크리에이터를 자판기에서 고르듯 쉽게 찾아보세요.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1 max-w-2xl">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input 
              type="text" 
              placeholder="크리에이터 이름, 키워드, 카테고리 검색..." 
              className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>
          <button className="flex items-center justify-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-2xl text-slate-700 font-medium hover:bg-slate-50 transition-colors shadow-sm whitespace-nowrap">
            <Filter className="w-4 h-4" />
            필터 및 정렬
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {creators.map((creator) => (
            <CreatorCard key={creator.id} {...creator} />
          ))}
        </div>
      </div>
    </div>
  );
}
