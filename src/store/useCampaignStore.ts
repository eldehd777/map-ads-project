import { create } from "zustand";

export interface Campaign {
  id: number | string;
  storeName: string;
  title: string;
  distance: string;
  reward: string;
  tags: string[];
  imageUrl: string;
  isUrgent?: boolean;
  status: "active" | "completed" | "paused";
  applicants: number;
  views: string;
  budget: string;
  endDate: string;
}

const INITIAL_CAMPAIGNS: Campaign[] = [
  {
    id: 1,
    storeName: "카페 베를린",
    title: "신메뉴 '흑임자 라떼' 릴스/쇼츠 리뷰어 모집",
    distance: "도보 3분 거리 (150m)",
    reward: "흑임자 라떼 2잔 + 디저트 1종",
    tags: ["카페", "신상리뷰", "디저트"],
    imageUrl: "https://picsum.photos/600/400?random=1",
    isUrgent: true,
    status: "active",
    applicants: 42,
    views: "12.4k",
    budget: "300,000",
    endDate: "2024-06-15"
  },
  {
    id: 2,
    storeName: "근육공방 피트니스",
    title: "새로 오픈한 PT샵 시설 소개 영상 촬영",
    distance: "도보 5분 거리 (300m)",
    reward: "1개월 무료 이용권 + 5만원",
    tags: ["오운완", "헬스장", "다이어트"],
    imageUrl: "https://picsum.photos/600/400?random=2",
    status: "active",
    applicants: 18,
    views: "5.2k",
    budget: "500,000",
    endDate: "2024-06-20"
  },
  {
    id: 3,
    storeName: "스시 오마카세 젠",
    title: "디너 오마카세 2인 식사권 협찬 (블로그/인스타)",
    distance: "차로 10분 거리 (2.5km)",
    reward: "디너 2인 식사권 (30만원 상당)",
    tags: ["맛집", "오마카세", "데이트코스"],
    imageUrl: "https://picsum.photos/600/400?random=3",
    status: "completed",
    applicants: 56,
    views: "45.1k",
    budget: "200,000",
    endDate: "2024-05-01"
  }
];

interface CampaignStore {
  campaigns: Campaign[];
  addCampaign: (campaign: Campaign) => void;
  updateCampaign: (id: number | string, updates: Partial<Campaign>) => void;
}

export const useCampaignStore = create<CampaignStore>((set) => ({
  campaigns: INITIAL_CAMPAIGNS,
  addCampaign: (campaign) => set((state) => ({ campaigns: [campaign, ...state.campaigns] })),
  updateCampaign: (id, updates) => set((state) => ({
    campaigns: state.campaigns.map(c => c.id === id ? { ...c, ...updates } : c)
  })),
}));
