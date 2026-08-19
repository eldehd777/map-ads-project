"use client";

import { useState } from "react";
import { Users, Star, Award, MapPin, ExternalLink, Settings, X, Camera, Video, Edit3, Link as LinkIcon } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";

const DUMMY_FRIENDS = [
  { id: 1, name: "푸드트래블러", role: "맛집 전문 리뷰어", followers: "12.4k", rating: 4.9, avatar: "https://picsum.photos/200/200?random=11" },
  { id: 2, name: "뷰티여신", role: "뷰티/패션 크리에이터", followers: "8.2k", rating: 4.8, avatar: "https://picsum.photos/200/200?random=12" },
  { id: 3, name: "운동하는 직장인", role: "헬스/다이어트", followers: "45.1k", rating: 5.0, avatar: "https://picsum.photos/200/200?random=13" },
  { id: 4, name: "동네카페탐방", role: "카페 투어", followers: "3.1k", rating: 4.7, avatar: "https://picsum.photos/200/200?random=14" },
  { id: 5, name: "IT리뷰슉", role: "테크/기기 리뷰", followers: "98.2k", rating: 4.9, avatar: "https://picsum.photos/200/200?random=15" },
  { id: 6, name: "데일리룩기록", role: "패션 인플루언서", followers: "15.7k", rating: 4.6, avatar: "https://picsum.photos/200/200?random=16" },
];

export default function ProfilePage() {
  const { currentUser, updateProfile } = useAuthStore();
  const [activeTab, setActiveTab] = useState<"friends" | "activity" | "insights">("insights");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
  // Edit Form State
  const [editName, setEditName] = useState("");
  const [editInstagram, setEditInstagram] = useState("");
  const [editYoutube, setEditYoutube] = useState("");
  const [editBlog, setEditBlog] = useState("");

  if (!currentUser) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-slate-50">
        <p className="text-slate-500 font-medium text-lg">로그인이 필요한 서비스입니다.</p>
      </div>
    );
  }

  const openEditModal = () => {
    setEditName(currentUser.name || "");
    setEditInstagram(currentUser.instagram || "");
    setEditYoutube(currentUser.youtube || "");
    setEditBlog(currentUser.blog || "");
    setIsEditModalOpen(true);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name: editName,
      instagram: editInstagram,
      youtube: editYoutube,
      blog: editBlog,
    });
    setIsEditModalOpen(false);
  };

  return (
    <div className="flex-1 bg-slate-50 overflow-y-auto">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        
        {/* Profile Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm mb-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-10" />
          
          <button 
            onClick={openEditModal}
            className="absolute top-6 right-6 p-2 bg-white/80 backdrop-blur-md rounded-full shadow-sm hover:bg-slate-50 transition-colors border border-slate-200 text-slate-600 hover:text-blue-600 z-10"
            title="프로필 수정"
          >
            <Settings className="w-5 h-5" />
          </button>
          
          <div className="relative flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8">
            {/* Avatar */}
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white shadow-lg overflow-hidden shrink-0 bg-slate-100">
              <img src={currentUser.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=fallback"} alt={currentUser.name} className="w-full h-full object-cover" />
            </div>

            {/* Info */}
            <div className="flex-1 text-center sm:text-left mt-2 sm:mt-8">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-2 justify-center sm:justify-start">
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900">{currentUser.name}</h1>
                <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-lg border border-blue-100 w-max mx-auto sm:mx-0">
                  {currentUser.role === "creator" ? "크리에이터" : currentUser.role === "brand" ? "광고주" : "관리자"}
                </span>
              </div>
              <p className="text-slate-500 font-medium mb-4">{currentUser.email}</p>
              
              {/* Social Links */}
              <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                {currentUser.instagram && (
                  <a href={currentUser.instagram.startsWith('http') ? currentUser.instagram : `https://${currentUser.instagram}`} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 bg-pink-50 text-pink-600 rounded-lg text-sm font-semibold hover:bg-pink-100 transition-colors border border-pink-100">
                    <Camera className="w-4 h-4" /> Instagram
                  </a>
                )}
                {currentUser.youtube && (
                  <a href={currentUser.youtube.startsWith('http') ? currentUser.youtube : `https://${currentUser.youtube}`} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-600 rounded-lg text-sm font-semibold hover:bg-red-100 transition-colors border border-red-100">
                    <Video className="w-4 h-4" /> YouTube
                  </a>
                )}
                {currentUser.blog && (
                  <a href={currentUser.blog.startsWith('http') ? currentUser.blog : `https://${currentUser.blog}`} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-600 rounded-lg text-sm font-semibold hover:bg-green-100 transition-colors border border-green-100">
                    <LinkIcon className="w-4 h-4" /> Blog
                  </a>
                )}
                {!currentUser.instagram && !currentUser.youtube && !currentUser.blog && (
                  <p className="text-sm text-slate-400">등록된 소셜 링크가 없습니다. 프로필 수정에서 추가해보세요!</p>
                )}
              </div>
            </div>

            {/* Stats */}
            <div className="flex gap-4 sm:gap-6 mt-6 sm:mt-12 bg-white/50 backdrop-blur-md px-6 py-4 rounded-2xl border border-slate-100 shadow-sm shrink-0">
              <div className="text-center">
                <p className="text-slate-500 text-sm font-medium mb-1">팔로워</p>
                <p className="text-xl font-black text-slate-900">0</p>
              </div>
              <div className="w-px bg-slate-200"></div>
              <div className="text-center">
                <p className="text-slate-500 text-sm font-medium mb-1">매너 온도</p>
                <div className="flex items-center gap-1 justify-center text-orange-500">
                  <Star className="w-4 h-4 fill-current" />
                  <p className="text-xl font-black text-slate-900">36.5</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Modal */}
        {isEditModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsEditModalOpen(false)} />
            <div className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-900">프로필 수정</h2>
                <button onClick={() => setIsEditModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full text-slate-500 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <form onSubmit={handleSaveProfile} className="p-6 space-y-5">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">이름 (닉네임)</label>
                  <input 
                    type="text" 
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                    <Camera className="w-4 h-4 text-pink-600" /> 인스타그램 링크
                  </label>
                  <input 
                    type="text" 
                    placeholder="https://instagram.com/..."
                    value={editInstagram}
                    onChange={(e) => setEditInstagram(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                    <Video className="w-4 h-4 text-red-600" /> 유튜브 링크
                  </label>
                  <input 
                    type="text" 
                    placeholder="https://youtube.com/..."
                    value={editYoutube}
                    onChange={(e) => setEditYoutube(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                    <LinkIcon className="w-4 h-4 text-green-600" /> 블로그 링크
                  </label>
                  <input 
                    type="text" 
                    placeholder="https://blog.naver.com/..."
                    value={editBlog}
                    onChange={(e) => setEditBlog(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                  />
                </div>
                
                <div className="pt-2">
                  <button 
                    type="submit"
                    className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-600/20 transition-all active:scale-[0.98]"
                  >
                    변경사항 저장
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="flex border-b border-slate-200 mb-8 overflow-x-auto no-scrollbar">
          <button 
            onClick={() => setActiveTab("insights")}
            className={`px-6 py-4 text-sm font-bold transition-colors whitespace-nowrap ${activeTab === 'insights' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500 hover:text-slate-900'}`}
          >
            성과 인사이트
          </button>
          <button 
            onClick={() => setActiveTab("activity")}
            className={`px-6 py-4 text-sm font-bold transition-colors whitespace-nowrap ${activeTab === 'activity' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500 hover:text-slate-900'}`}
          >
            활동 내역
          </button>
          <button 
            onClick={() => setActiveTab("friends")}
            className={`px-6 py-4 text-sm font-bold transition-colors whitespace-nowrap ${activeTab === 'friends' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500 hover:text-slate-900'}`}
          >
            친한 인플루언서
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "insights" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-4 text-blue-600">
                <Star className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">상위 5% 크리에이터</h3>
              <p className="text-sm text-slate-500">최근 30일 기준 매우 우수한 활동량</p>
            </div>
            <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mb-4 text-green-600">
                <Award className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">캠페인 완수율 100%</h3>
              <p className="text-sm text-slate-500">총 12개의 캠페인 성공적 완료</p>
            </div>
            <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center mb-4 text-purple-600">
                <MapPin className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">지역 핫플레이스 탐험가</h3>
              <p className="text-sm text-slate-500">주로 강남/홍대 지역에서 활동</p>
            </div>
          </div>
        )}

        {activeTab === "activity" && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden p-8 text-center">
            <p className="text-slate-500 font-medium">아직 완료한 활동 내역이 없습니다.</p>
          </div>
        )}

        {activeTab === "friends" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {DUMMY_FRIENDS.map((friend) => (
              <div key={friend.id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4 cursor-pointer group">
                <img src={friend.avatar} alt={friend.name} className="w-16 h-16 rounded-full object-cover shadow-sm group-hover:scale-105 transition-transform" />
                <div>
                  <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{friend.name}</h3>
                  <p className="text-xs text-slate-500 mb-1">{friend.role}</p>
                  <div className="flex items-center gap-2 text-xs font-semibold">
                    <span className="text-slate-700">팔로워 {friend.followers}</span>
                    <span className="text-orange-500 flex items-center"><Star className="w-3 h-3 fill-current mr-0.5" />{friend.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
