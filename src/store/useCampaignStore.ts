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

const INITIAL_CAMPAIGNS: Campaign[] = [];

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
