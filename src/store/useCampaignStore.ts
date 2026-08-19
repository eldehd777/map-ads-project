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
  lat?: number;
  lng?: number;
}

const INITIAL_CAMPAIGNS: Campaign[] = [];

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

const INITIAL_APPLICATIONS: Application[] = [];

interface CampaignStore {
  campaigns: Campaign[];
  applications: Application[];
  addCampaign: (campaign: Campaign) => void;
  updateCampaign: (id: number | string, updates: Partial<Campaign>) => void;
  deleteCampaign: (id: number | string) => void;
  addApplication: (app: Application) => void;
  updateApplicationStatus: (id: number | string, status: Application["status"]) => void;
}

export const useCampaignStore = create<CampaignStore>((set) => ({
  campaigns: INITIAL_CAMPAIGNS,
  applications: INITIAL_APPLICATIONS,
  addCampaign: (campaign) => set((state) => ({ campaigns: [campaign, ...state.campaigns] })),
  updateCampaign: (id, updates) => set((state) => ({
    campaigns: state.campaigns.map(c => c.id === id ? { ...c, ...updates } : c)
  })),
  deleteCampaign: (id) => set((state) => ({
    campaigns: state.campaigns.filter(c => c.id !== id)
  })),
  addApplication: (app) => set((state) => ({ applications: [app, ...state.applications] })),
  updateApplicationStatus: (id, status) => set((state) => ({
    applications: state.applications.map(a => a.id === id ? { ...a, status } : a)
  })),
}));
