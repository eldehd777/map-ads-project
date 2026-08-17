import { MapPin, Filter, Search } from "lucide-react";
import CampaignCard from "@/components/CampaignCard";

export default function Home() {
  const campaigns = [
    {
      id: 1,
      storeName: "카페 베를린",
      title: "신메뉴 '흑임자 라떼' 릴스/쇼츠 리뷰어 모집",
      distance: "도보 3분 거리 (150m)",
      reward: "음료 2잔 + 디저트 + 3만원",
      tags: ["카페", "신메뉴", "디저트", "릴스"],
      imageUrl: "/placeholder.jpg",
      isUrgent: true,
    },
    {
      id: 2,
      storeName: "근육공방 피트니스",
      title: "새로 오픈한 PT샵 시설 소개 영상 촬영",
      distance: "도보 5분 거리 (300m)",
      reward: "1개월 무료 이용권 + 5만원",
      tags: ["오운완", "헬스장", "다이어트"],
      imageUrl: "/placeholder.jpg",
    },
    {
      id: 3,
      storeName: "스시 오마카세 젠",
      title: "디너 오마카세 2인 식사권 협찬 (블로그/인스타)",
      distance: "차로 10분 거리 (2.5km)",
      reward: "디너 2인 식사권 (30만원 상당)",
      tags: ["맛집", "오마카세", "데이트코스"],
      imageUrl: "/placeholder.jpg",
    }
  ];

  return (
    <div className="flex flex-col md:flex-row h-full">
      {/* Sidebar / List View */}
      <div className="w-full md:w-[480px] lg:w-[600px] flex flex-col border-r border-slate-200 bg-white h-[calc(100vh-4rem)] overflow-hidden shrink-0">
        <div className="p-4 sm:p-6 border-b border-slate-100 shrink-0">
          <h1 className="text-2xl font-bold text-slate-900 mb-1">내 주변 캠페인</h1>
          <p className="text-slate-500 text-sm mb-5">현재 위치를 기반으로 협찬 가능한 업체를 찾아보세요.</p>
          
          <div className="flex gap-2">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-slate-400" />
              </div>
              <input 
                type="text" 
                placeholder="맛집, 카페, 뷰티 등 검색..." 
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>
            <button className="flex items-center justify-center p-2 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-colors">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-slate-900">거리순 추천 <span className="text-blue-600">12건</span></span>
          </div>
          {campaigns.map((campaign) => (
            <CampaignCard key={campaign.id} {...campaign} />
          ))}
        </div>
      </div>
      
      {/* Map View */}
      <div className="hidden md:flex flex-1 bg-slate-100 relative items-center justify-center">
        <div className="absolute inset-0 z-0">
          {/* We will embed the Naver map here. For now, a placeholder */}
          <div className="w-full h-full bg-[#E8EDF4] flex flex-col items-center justify-center">
            <MapPin className="w-12 h-12 text-slate-300 mb-4" />
            <p className="text-slate-500 font-medium">지도 API 연동 대기 중...</p>
            <p className="text-slate-400 text-sm mt-1">이전에 작업한 map_ads 코드가 여기에 들어갑니다.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
