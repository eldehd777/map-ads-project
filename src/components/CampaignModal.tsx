import { useState } from "react";
import { X, MapPin, Clock, ArrowRight, Loader2 } from "lucide-react";

interface CampaignModalProps {
  campaign: any;
  isOpen: boolean;
  onClose: () => void;
}

export default function CampaignModal({ campaign, isOpen, onClose }: CampaignModalProps) {
  const [isApplying, setIsApplying] = useState(false);

  if (!isOpen || !campaign) return null;

  const handleApply = () => {
    setIsApplying(true);
    setTimeout(() => {
      alert("성공적으로 캠페인에 신청되었습니다!");
      setIsApplying(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full backdrop-blur-md transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Image */}
        <div className="w-full h-64 sm:h-80 relative shrink-0">
          <img 
            src={campaign.imageUrl} 
            alt={campaign.title} 
            className="absolute inset-0 w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
          
          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex flex-wrap gap-2 mb-3">
              {campaign.tags.map((tag: string) => (
                <span key={tag} className="px-2.5 py-1 bg-white/20 backdrop-blur-md text-white text-xs font-medium rounded-lg border border-white/20">
                  {tag}
                </span>
              ))}
              {campaign.isUrgent && (
                <span className="px-2.5 py-1 bg-red-500 text-white text-xs font-bold uppercase tracking-wider rounded-lg shadow-sm">
                  Urgent
                </span>
              )}
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
              {campaign.title}
            </h2>
          </div>
        </div>

        {/* Body Content */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 bg-slate-50">
          <div className="flex items-center justify-between pb-6 border-b border-slate-200 mb-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">{campaign.storeName}</h3>
              <div className="flex items-center gap-1.5 text-sm font-medium text-slate-500">
                <MapPin className="w-4 h-4" />
                <span>{campaign.distance}</span>
              </div>
            </div>
            <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-blue-50 text-blue-600">
              <Clock className="w-6 h-6" />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">제공 혜택</h4>
              <div className="p-4 bg-white border border-slate-200 rounded-2xl">
                <p className="font-bold text-slate-900 text-lg">{campaign.reward}</p>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">상세 정보</h4>
              <div className="p-4 bg-white border border-slate-200 rounded-2xl text-slate-600 text-sm leading-relaxed space-y-3">
                <p>이번에 새롭게 준비한 메뉴/서비스를 직접 체험하시고 솔직한 리뷰를 남겨주실 크리에이터님을 찾습니다!</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>방문 가능 시간: 평일 11:00 ~ 17:00 (주말 불가)</li>
                  <li>리뷰 업로드 기한: 방문 후 3일 이내</li>
                  <li>필수 포함 해시태그: 안내된 가이드라인 참고</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-6 bg-white border-t border-slate-100 flex items-center justify-between shrink-0">
          <button 
            onClick={onClose}
            className="px-6 py-3 text-sm font-semibold text-slate-500 hover:text-slate-700 transition-colors"
          >
            닫기
          </button>
          <button 
            onClick={handleApply}
            disabled={isApplying}
            className="flex items-center justify-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl shadow-lg shadow-blue-600/20 transition-all disabled:opacity-50"
          >
            {isApplying ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                신청 중...
              </>
            ) : (
              <>
                캠페인 신청하기
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
