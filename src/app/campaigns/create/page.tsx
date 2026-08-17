"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Image as ImageIcon, Plus, Trash2, Calendar, MapPin, Store, Tag, Loader2 } from "lucide-react";

export default function CreateCampaignPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      alert("캠페인이 성공적으로 등록되었습니다!");
      router.push("/campaigns/manage");
    }, 1000);
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
          
          {/* Section 1: Basic Info */}
          <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Store className="w-5 h-5 text-blue-600" /> 기본 정보
            </h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">캠페인 제목 <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  placeholder="예) 신메뉴 '흑임자 라떼' 릴스 리뷰어 모집" 
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">매장명 <span className="text-red-500">*</span></label>
                  <input 
                    type="text" 
                    placeholder="매장 이름을 입력하세요" 
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">카테고리 <span className="text-red-500">*</span></label>
                  <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all appearance-none">
                    <option value="">카테고리 선택</option>
                    <option value="food">맛집/카페</option>
                    <option value="beauty">뷰티/패션</option>
                    <option value="life">생활/가전</option>
                    <option value="culture">문화/공연</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">매장 주소 <span className="text-red-500">*</span></label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="주소를 검색하거나 입력하세요" 
                    className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                  <button type="button" className="px-6 py-3 bg-slate-100 text-slate-700 font-semibold rounded-xl border border-slate-200 hover:bg-slate-200 transition-colors">
                    주소 검색
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Reward & Mission */}
          <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Tag className="w-5 h-5 text-emerald-600" /> 제공 혜택 및 미션
            </h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">제공 혜택 (리워드) <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  placeholder="예) 시그니처 세트 메뉴 2인권 + 원고료 3만원" 
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">필수 해시태그</label>
                <input 
                  type="text" 
                  placeholder="#강남맛집 #데이트코스 (띄어쓰기로 구분)" 
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">상세 미션 및 가이드라인 <span className="text-red-500">*</span></label>
                <textarea 
                  rows={5}
                  placeholder="크리에이터가 수행해야 할 미션(사진 몇 장, 동영상 필수 여부 등)을 상세히 적어주세요." 
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none"
                />
              </div>
            </div>
          </section>

          {/* Section 3: Conditions */}
          <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-amber-500" /> 모집 조건
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">모집 인원 <span className="text-red-500">*</span></label>
                <div className="flex items-center gap-2">
                  <input 
                    type="number" 
                    placeholder="0" 
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-right"
                  />
                  <span className="text-slate-600 font-medium">명</span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">모집 마감일 <span className="text-red-500">*</span></label>
                <input 
                  type="date" 
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
              </div>
            </div>
          </section>

          {/* Section 4: Images */}
          <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-purple-600" /> 대표 이미지 등록
            </h2>
            
            <div className="w-full h-48 border-2 border-dashed border-slate-300 rounded-2xl bg-slate-50 flex flex-col items-center justify-center text-center hover:bg-slate-100 hover:border-blue-400 transition-all cursor-pointer">
              <ImageIcon className="w-10 h-10 text-slate-400 mb-3" />
              <p className="text-sm font-semibold text-slate-700">클릭하거나 이미지를 끌어다 놓으세요</p>
              <p className="text-xs text-slate-500 mt-1">권장 사이즈: 1200 x 800px (최대 5MB)</p>
            </div>
          </section>

        </form>

        {/* Fixed Bottom Bar */}
        <div className="fixed bottom-0 left-0 w-full bg-white border-t border-slate-200 p-4 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-40">
          <div className="max-w-4xl mx-auto flex items-center justify-between sm:justify-end gap-3 sm:gap-4">
            <button 
              type="button"
              disabled={isSubmitting}
              className="px-6 py-3 bg-slate-100 text-slate-700 font-semibold rounded-xl hover:bg-slate-200 transition-colors w-full sm:w-auto disabled:opacity-50"
            >
              임시저장
            </button>
            <button 
              type="submit"
              disabled={isSubmitting}
              className="flex items-center justify-center gap-2 px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-600/20 transition-all w-full sm:w-auto disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  등록 중...
                </>
              ) : (
                "등록 완료하기"
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
