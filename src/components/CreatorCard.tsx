import Link from "next/link";
import { MapPin, Users, PlaySquare, Star } from "lucide-react";

interface CreatorCardProps {
  name: string;
  category: string;
  subscribers: string;
  tags: string[];
  imageUrl: string;
  rating: number;
}

export default function CreatorCard({ name, category, subscribers, tags, imageUrl, rating }: CreatorCardProps) {
  return (
    <div className="group relative bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl hover:border-slate-300 transition-all duration-300 flex flex-col">
      <div className="aspect-[4/3] w-full bg-slate-100 relative overflow-hidden">
        <img src={imageUrl} alt={name} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent z-10" />
        <div className="absolute bottom-3 left-3 right-3 z-20 flex justify-between items-end">
          <span className="px-2.5 py-1 bg-white/20 backdrop-blur-md rounded-lg text-white text-xs font-medium border border-white/20">
            {category}
          </span>
          <div className="flex items-center gap-1 text-white bg-slate-900/40 px-2 py-1 rounded-lg backdrop-blur-md">
            <Star className="w-3.5 h-3.5 fill-current text-yellow-400" />
            <span className="text-xs font-bold">{rating}</span>
          </div>
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg text-slate-900 leading-tight group-hover:text-blue-600 transition-colors">{name}</h3>
        </div>
        
        <div className="flex items-center gap-1.5 text-slate-500 mb-4 text-sm font-medium">
          <Users className="w-4 h-4" />
          <span>구독자 {subscribers}</span>
        </div>
        
        <div className="flex flex-wrap gap-1.5 mt-auto">
          {tags.map(tag => (
            <span key={tag} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md">
              #{tag}
            </span>
          ))}
        </div>
        
        <Link href="/showcase" className="mt-5 w-full py-2.5 flex items-center justify-center bg-slate-900 text-white rounded-xl text-sm font-semibold hover:bg-slate-800 transition-colors shadow-sm">
          쇼케이스 보기
        </Link>
      </div>
    </div>
  );
}
