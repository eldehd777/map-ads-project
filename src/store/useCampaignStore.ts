import { create } from "zustand";
import { persist } from "zustand/middleware";

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
  lat?: number;
  lng?: number;
}

export interface Application {
  id: number | string;
  campaignId: number | string;
  name: string;
  role: string;
  followers: string;
  message: string;
  status: "pending" | "approved" | "rejected" | "canceled";
  avatar: string;
}

const INITIAL_CAMPAIGNS: Campaign[] = [
  {
    id: 1,
    storeName: "강남역 맛집 마라탕",
    title: "블로그 리뷰어 모집 (방문 식사 제공)",
    distance: "1.2km",
    reward: "30,000원 상당 식사권",
    tags: ["맛집", "마라탕", "강남역"],
    imageUrl: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?q=80&w=400&auto=format&fit=crop",
    isUrgent: true,
    status: "active",
    applicants: 12,
    views: "245",
    budget: "30,000",
    endDate: "2023-12-31",
    lat: 37.4979,
    lng: 127.0276,
  },
  {
    id: 2,
    storeName: "홍대 감성 카페",
    title: "인스타그램 릴스 체험단",
    distance: "5.5km",
    reward: "디저트 세트 + 원고료 1만원",
    tags: ["카페", "디저트", "홍대"],
    imageUrl: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=400&auto=format&fit=crop",
    status: "active",
    applicants: 35,
    views: "890",
    budget: "25,000",
    endDate: "2023-11-15",
    lat: 37.5559,
    lng: 126.9231,
  },
  {
    id: 3,
    storeName: "올리브영 신상 뷰티",
    title: "유튜브 쇼츠 뷰티 제품 리뷰",
    distance: "전국",
    reward: "제품 제공 + 원고료 5만원",
    tags: ["뷰티", "화장품", "올리브영"],
    imageUrl: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=400&auto=format&fit=crop",
    status: "active",
    applicants: 50,
    views: "1.2k",
    budget: "80,000",
    endDate: "2023-10-31",
    lat: 37.5326,
    lng: 127.0246,
  }
];

interface CampaignState {
  campaigns: Campaign[];
  applications: Application[];
  
  addCampaign: (campaign: Campaign) => void;
  updateCampaignStatus: (id: string | number, status: Campaign["status"]) => void;
  updateCampaign: (id: string | number, updates: Partial<Campaign>) => void;
  deleteCampaign: (id: string | number) => void;
  
  addApplication: (app: Application) => void;
  updateApplicationStatus: (id: string | number, status: Application["status"]) => void;
}

export const useCampaignStore = create<CampaignState>()(
  persist(
    (set) => ({
      campaigns: INITIAL_CAMPAIGNS,
      applications: [],
      
      addCampaign: (campaign) => set((state) => ({ campaigns: [...state.campaigns, campaign] })),
      updateCampaignStatus: (id, status) => set((state) => ({
        campaigns: state.campaigns.map(c => c.id === id ? { ...c, status } : c)
      })),
      updateCampaign: (id, updates) => set((state) => ({
        campaigns: state.campaigns.map(c => c.id === id ? { ...c, ...updates } : c)
      })),
      deleteCampaign: (id) => set((state) => ({
        campaigns: state.campaigns.filter(c => c.id !== id)
      })),
      
      addApplication: (app) => set((state) => ({ applications: [...state.applications, app] })),
      updateApplicationStatus: (id, status) => set((state) => ({
        applications: state.applications.map(app => 
          app.id === id ? { ...app, status } : app
        )
      }))
    }),
    {
      name: "campaign-store",
    }
  )
);
