import { MapPin, Clock, ArrowRight } from "lucide-react";

interface CampaignCardProps {
  storeName: string;
  title: string;
  distance: string;
  reward: string;
  tags: string[];
  imageUrl: string;
  isUrgent?: boolean;
}

export default function CampaignCard({ storeName, title, distance, reward, tags, imageUrl, isUrgent }: CampaignCardProps) {
  return (
    <div className="group flex flex-col sm:flex-row bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg hover:border-slate-300 transition-all duration-300">
      <div className="sm:w-48 h-48 sm:h-auto bg-slate-100 relative shrink-0">
        <img src={imageUrl} alt={title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-slate-800/10 group-hover:bg-transparent transition-colors z-10" />
        {isUrgent && (
          <div className="absolute top-3 left-3 z-20">
            <span className="px-2.5 py-1 bg-red-500 text-white text-[10px] font-bold tracking-wider uppercase rounded-md shadow-sm">
              Urgent
            </span>
          </div>
        )}
      </div>
      
      <div className="p-5 sm:p-6 flex flex-col flex-1">
        <div className="flex flex-wrap items-center gap-2 mb-2 text-xs font-medium text-slate-500">
          <span className="text-blue-600 font-semibold">{storeName}</span>
          <span>•</span>
          <div className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" />
            <span>{distance}</span>
          </div>
        </div>
        
        <h3 className="font-bold text-lg text-slate-900 leading-tight mb-2 group-hover:text-blue-600 transition-colors">
          {title}
        </h3>
        
        <div className="flex flex-wrap gap-1.5 mb-4">
          {tags.map(tag => (
            <span key={tag} className="px-2 py-0.5 bg-slate-50 border border-slate-100 text-slate-600 text-xs rounded-md">
              {tag}
            </span>
          ))}
        </div>
        
        <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-100">
          <div className="flex flex-col">
            <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">제공 혜택</span>
            <span className="font-semibold text-slate-900">{reward}</span>
          </div>
          
          <button className="flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors">
            상세보기
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
