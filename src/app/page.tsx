"use client";
import { useEffect, useRef, useState } from "react";
import { MapPin, Filter, Search } from "lucide-react";
import CampaignCard from "@/components/CampaignCard";
import CampaignModal from "@/components/CampaignModal";
import { useCampaignStore } from "@/store/useCampaignStore";

export default function Home() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [selectedCampaign, setSelectedCampaign] = useState<any>(null);
  const { campaigns } = useCampaignStore();

  useEffect(() => {
    // Initialize Kakao Map
    const initMap = () => {
      // @ts-ignore
      if (window.kakao && window.kakao.maps && mapRef.current) {
        // @ts-ignore
        window.kakao.maps.load(() => {
          const mapOptions = {
            // @ts-ignore
            center: new window.kakao.maps.LatLng(37.3595704, 127.105399),
            level: 3
          };
          // @ts-ignore
          const map = new window.kakao.maps.Map(mapRef.current, mapOptions);

          // 지도타입 컨트롤(지도/스카이뷰) 생성 및 추가
          // @ts-ignore
          const mapTypeControl = new window.kakao.maps.MapTypeControl();
          // @ts-ignore
          map.addControl(mapTypeControl, window.kakao.maps.ControlPosition.TOPRIGHT);

          // 줌 컨트롤 생성 및 추가
          // @ts-ignore
          const zoomControl = new window.kakao.maps.ZoomControl();
          // @ts-ignore
          map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);

          // HTML5의 geolocation으로 사용할 수 있는지 확인합니다 
          if (navigator.geolocation) {
            // GeoLocation을 이용해서 접속 위치를 얻어옵니다
            navigator.geolocation.getCurrentPosition(function(position) {
              const lat = position.coords.latitude, // 위도
                    lon = position.coords.longitude; // 경도
              // @ts-ignore
              const locPosition = new window.kakao.maps.LatLng(lat, lon);
              
              // 파란색 내 위치 커스텀 마커 이미지
              const imageSrc = 'data:image/svg+xml;charset=utf-8,%3Csvg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"%3E%3Ccircle cx="16" cy="16" r="10" fill="%233b82f6" stroke="%23ffffff" stroke-width="4" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.3))"/%3E%3C/svg%3E';
              // @ts-ignore
              const imageSize = new window.kakao.maps.Size(32, 32);
              // @ts-ignore
              const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);
              
              // 마커를 생성합니다
              // @ts-ignore
              const marker = new window.kakao.maps.Marker({
                map: map,
                position: locPosition,
                image: markerImage
              });
              
              // 지도 중심좌표를 접속위치로 변경합니다
              map.setCenter(locPosition);
            }, function(error) {
              console.warn("Geolocation error:", error);
            });
          }
        });
      }
    };

    // @ts-ignore
    if (window.kakao && window.kakao.maps) {
      initMap();
    } else {
      const timer = setInterval(() => {
        // @ts-ignore
        if (window.kakao && window.kakao.maps) {
          initMap();
          clearInterval(timer);
        }
      }, 100);
      return () => clearInterval(timer);
    }
  }, []);

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
            <span className="text-sm font-semibold text-slate-900">거리순 추천 <span className="text-blue-600">{campaigns.length}건</span></span>
          </div>
          {campaigns.map((campaign) => (
            <CampaignCard 
              key={campaign.id} 
              {...campaign} 
              onViewDetail={() => setSelectedCampaign(campaign)}
            />
          ))}
        </div>
      </div>
      
      {/* Map View */}
      <div className="hidden md:flex flex-1 bg-slate-100 relative items-center justify-center">
        <div id="map" ref={mapRef} className="absolute inset-0 z-0 w-full h-full" />
      </div>

      {/* Campaign Detail Modal */}
      <CampaignModal 
        campaign={selectedCampaign} 
        isOpen={!!selectedCampaign} 
        onClose={() => setSelectedCampaign(null)} 
      />
    </div>
  );
}
