"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Store, Tag, MapPin, Loader2, Calendar } from "lucide-react";
import { useCampaignStore } from "@/store/useCampaignStore";

declare global {
  interface Window {
    kakao: any;
  }
}

export default function CreateCampaignPage() {
  const router = useRouter();
  const { addCampaign } = useCampaignStore();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    storeName: "",
    title: "",
    reward: "",
    address: "",
    tags: "",
    budget: "",
    endDate: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!window.kakao || !window.kakao.maps || !window.kakao.maps.services) {
      alert("카카오맵 서비스가 아직 로드되지 않았습니다. 잠시 후 다시 시도해주세요.");
      setIsSubmitting(false);
      return;
    }

    const geocoder = new window.kakao.maps.services.Geocoder();
    
    geocoder.addressSearch(formData.address, function(result: any, status: any) {
      if (status === window.kakao.maps.services.Status.OK) {
        const lat = parseFloat(result[0].y);
        const lng = parseFloat(result[0].x);

        const tagsArray = formData.tags.split(",").map(tag => tag.trim()).filter(Boolean);

        const newCampaign = {
          id: Date.now().toString(),
          storeName: formData.storeName,
          title: formData.title,
          distance: "방금 등록됨",
          reward: formData.reward,
          tags: tagsArray.length > 0 ? tagsArray : ["신규"],
          imageUrl: `https://picsum.photos/600/400?random=${Date.now()}`,
          status: "active" as const,
          applicants: 0,
          views: "0",
          budget: formData.budget || "미정",
          endDate: formData.endDate || "2024-12-31",
          lat: lat,
          lng: lng,
        };

        addCampaign(newCampaign);
        alert("캠페인이 성공적으로 등록되었습니다!");
        router.push("/campaigns/manage");
      } else {
        alert("주소를 찾을 수 없습니다. 정확한 도로명/지번 주소를 입력해주세요.");
        setIsSubmitting(false);
      }
    });
  };

  return (
    <div className="flex-1 bg-slate-50 overflow-y-auto">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/campaigns/manage" className="p-2 bg-white border border-slate-200 rounded-full text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-colors shadow-sm">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">새 캠페인 등록하기</h1>
            <p className="text-slate-500 mt-1">크리에이터들에게 제공할 멋진 캠페인을 만들어보세요.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 pb-24">
          
          <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Store className="w-6 h-6 text-blue-600" />
              업체 및 캠페인 기본 정보
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="sm:col-span-2">
                <label className="block text-sm font-bold text-slate-700 mb-2">업체명 (가게 이름) *</label>
                <input 
                  type="text"
                  name="storeName"
                  value={formData.storeName}
                  onChange={handleChange}
                  placeholder="예: 홍대 맛집 마라탕"
                  required
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-bold text-slate-700 mb-2">캠페인 제목 *</label>
                <input 
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="예: 신메뉴 마라샹궈 리뷰어 대모집!"
                  required
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-slate-400" /> 실제 주소 *
                </label>
                <p className="text-xs text-slate-500 mb-2">카카오맵에서 핀(마커)을 꽂기 위해 정확한 도로명 주소나 지번 주소를 입력해주세요.</p>
                <input 
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="예: 서울 마포구 홍익로 10"
                  required
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">제공 내역 (리워드) *</label>
                <input 
                  type="text"
                  name="reward"
                  value={formData.reward}
                  onChange={handleChange}
                  placeholder="예: 3만원 식사권 + 음료"
                  required
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-1.5">
                  <Tag className="w-4 h-4 text-slate-400" /> 태그 (쉼표로 구분)
                </label>
                <input 
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  placeholder="예: 맛집, 마라탕, 홍대"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">예산 (선택)</label>
                <input 
                  type="text"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  placeholder="예: 총 30만원"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-slate-400" /> 마감일 (선택)
                </label>
                <input 
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                />
              </div>

            </div>
          </section>

          {/* Fixed Bottom Bar */}
          <div className="fixed bottom-0 left-0 lg:left-64 right-0 p-4 bg-white/80 backdrop-blur-lg border-t border-slate-200 flex justify-end gap-3 z-40">
            <Link 
              href="/campaigns/manage" 
              className="px-6 py-3 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
            >
              취소
            </Link>
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="px-8 py-3 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-lg shadow-blue-600/20 disabled:opacity-70"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  등록 중...
                </>
              ) : (
                "캠페인 등록하기"
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
