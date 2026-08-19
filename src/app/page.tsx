"use client";
import { useEffect, useRef, useState } from "react";
import { MapPin, Filter, Search } from "lucide-react";
import CampaignCard from "@/components/CampaignCard";
import CampaignModal from "@/components/CampaignModal";
import { useCampaignStore } from "@/store/useCampaignStore";
import { ErrorBoundary } from "@/components/ErrorBoundary";

export default function Home() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [selectedCampaign, setSelectedCampaign] = useState<any>(null);
  const { campaigns } = useCampaignStore();

  const [sheetState, setSheetState] = useState<"minimized" | "half" | "full">("half");
  const touchStartY = useRef<number | null>(null);
  const touchEndY = useRef<number | null>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.targetTouches[0].clientY;
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndY.current = e.targetTouches[0].clientY;
  };

  const handleTouchEnd = () => {
    if (touchStartY.current === null || touchEndY.current === null) return;
    const delta = touchEndY.current - touchStartY.current;
    
    if (delta > 50) {
      if (sheetState === "full") setSheetState("half");
      else if (sheetState === "half") setSheetState("minimized");
    } 
    else if (delta < -50) {
      if (sheetState === "minimized") setSheetState("half");
      else if (sheetState === "half") setSheetState("full");
    }
    
    touchStartY.current = null;
    touchEndY.current = null;
  };

  useEffect(() => {
    const initMap = () => {
      // @ts-ignore
      if (window.kakao && window.kakao.maps && mapRef.current && !mapInstanceRef.current) {
        // @ts-ignore
        window.kakao.maps.load(() => {
          const mapOptions = {
            // @ts-ignore
            center: new window.kakao.maps.LatLng(37.3595704, 127.105399),
            level: 3
          };
          // @ts-ignore
          const map = new window.kakao.maps.Map(mapRef.current, mapOptions);
          
          // @ts-ignore
          const mapTypeControl = new window.kakao.maps.MapTypeControl();
          // @ts-ignore
          map.addControl(mapTypeControl, window.kakao.maps.ControlPosition.TOPRIGHT);

          // @ts-ignore
          const zoomControl = new window.kakao.maps.ZoomControl();
          // @ts-ignore
          map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);

          mapInstanceRef.current = map;
          setIsMapLoaded(true);

          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
              const lat = position.coords.latitude;
              const lon = position.coords.longitude;
              // @ts-ignore
              const locPosition = new window.kakao.maps.LatLng(lat, lon);
              
              const imageSrc = 'data:image/svg+xml;charset=utf-8,%3Csvg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"%3E%3Ccircle cx="16" cy="16" r="10" fill="%233b82f6" stroke="%23ffffff" stroke-width="4" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.3))"/%3E%3C/svg%3E';
              // @ts-ignore
              const imageSize = new window.kakao.maps.Size(32, 32);
              // @ts-ignore
              const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);
              
              // @ts-ignore
              new window.kakao.maps.Marker({
                map: map,
                position: locPosition,
                image: markerImage
              });
              
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

  useEffect(() => {
    if (!isMapLoaded || !mapInstanceRef.current) return;

    markersRef.current.forEach(m => m.setMap(null));
    markersRef.current = [];

    if (campaigns && campaigns.length > 0) {
      // @ts-ignore
      const bounds = new window.kakao.maps.LatLngBounds();
      let hasMarkers = false;

      campaigns.forEach(campaign => {
        if (campaign.lat && campaign.lng && campaign.status === "active") {
          // @ts-ignore
          const markerPos = new window.kakao.maps.LatLng(campaign.lat, campaign.lng);
          
          const campaignImgSrc = 'data:image/svg+xml;charset=utf-8,%3Csvg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="%23ef4444" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"%3E%3Cpath d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"%3E%3C/path%3E%3Ccircle cx="12" cy="10" r="3" fill="white"%3E%3C/circle%3E%3C/svg%3E';
          // @ts-ignore
          const campaignImgSize = new window.kakao.maps.Size(40, 40);
          // @ts-ignore
          const campaignMarkerImg = new window.kakao.maps.MarkerImage(campaignImgSrc, campaignImgSize);

          // @ts-ignore
          const marker = new window.kakao.maps.Marker({
            position: markerPos,
            title: campaign.storeName,
            image: campaignMarkerImg
          });

          marker.setMap(mapInstanceRef.current);
          
          // @ts-ignore
          window.kakao.maps.event.addListener(marker, 'click', function() {
            setSelectedCampaign(campaign);
          });

          bounds.extend(markerPos);
          markersRef.current.push(marker);
          hasMarkers = true;
        }
      });

      if (hasMarkers) {
        mapInstanceRef.current.setBounds(bounds);
      }
    }
  }, [campaigns, isMapLoaded]);

  return (
    <div className="relative h-[calc(100vh-4rem)] overflow-hidden md:flex md:flex-row">
      <div className="absolute inset-0 z-0 md:relative md:flex-1 bg-slate-100 md:order-2">
        <div id="map" ref={mapRef} className="absolute inset-0 w-full h-full" />
      </div>

      <div 
        className={`absolute bottom-0 left-0 right-0 z-10 bg-white shadow-[0_-10px_40px_rgba(0,0,0,0.15)] rounded-t-3xl md:rounded-none md:shadow-none transition-all duration-300 md:relative md:h-full md:w-[480px] lg:w-[600px] flex flex-col md:border-r border-slate-200 shrink-0 md:order-1 ${sheetState === 'full' ? 'h-[95vh] md:h-full' : sheetState === 'half' ? 'h-[60vh] md:h-full' : 'h-[14vh] md:h-full'}`}
      >
        <div 
          className="w-full flex justify-center pt-4 pb-2 md:hidden touch-pan-y cursor-grab active:cursor-grabbing"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="w-12 h-1.5 bg-slate-300 rounded-full" />
        </div>

        <div className="p-4 sm:p-6 border-b border-slate-100 shrink-0 pt-2 md:pt-6">
          <h1 className="text-2xl font-bold text-slate-900 mb-1">내 주변 캠페인</h1>
          <p className="text-slate-500 text-sm mb-5">내 위치에 딱 맞는 협찬을 찾아보세요.</p>
          
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
            <span className="text-sm font-semibold text-slate-900">검색된 주변 캠페인 <span className="text-blue-600">{campaigns.length}개</span></span>
          </div>
          {campaigns.map((campaign) => (
            <ErrorBoundary key={campaign.id}>
              <CampaignCard 
                {...campaign} 
                onViewDetail={() => setSelectedCampaign(campaign)}
              />
            </ErrorBoundary>
          ))}
        </div>
      </div>

      <ErrorBoundary>
        <CampaignModal 
          campaign={selectedCampaign} 
          isOpen={!!selectedCampaign} 
          onClose={() => setSelectedCampaign(null)} 
        />
      </ErrorBoundary>
    </div>
  );
}
