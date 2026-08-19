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
    endDate: "2024-06-15",
    lat: 37.5340,
    lng: 126.9940
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
    endDate: "2024-06-20",
    lat: 37.4965,
    lng: 127.0280
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
    endDate: "2024-05-01",
    lat: 37.4990,
    lng: 127.0250
  },
  {
    id: 4,
    storeName: "제주바다 해산물",
    title: "제주도 직송 해산물 세트 홈파티 리뷰",
    distance: "배송 상품 (전국)",
    reward: "제주 해산물 세트 (15만원 상당)",
    tags: ["배송", "먹방", "홈파티"],
    imageUrl: "https://picsum.photos/600/400?random=4",
    status: "active",
    applicants: 120,
    views: "34.2k",
    budget: "1,000,000",
    endDate: "2024-06-30",
    lat: 33.5000,
    lng: 126.5300
  },
  {
    id: 5,
    storeName: "루나 에스테틱",
    title: "프리미엄 스킨케어 1회 체험권",
    distance: "도보 15분 거리 (1.2km)",
    reward: "프리미엄 케어 1회 (12만원 상당)",
    tags: ["뷰티", "스킨케어", "관리하는여자"],
    imageUrl: "https://picsum.photos/600/400?random=5",
    isUrgent: true,
    status: "paused",
    applicants: 9,
    views: "2.1k",
    budget: "240,000",
    endDate: "2024-06-10",
    lat: 37.5568,
    lng: 126.9245
  },
  {
    id: 6,
    storeName: "감성스테이 제주",
    title: "제주 애월 독채 펜션 1박 2일 숙박권",
    distance: "비행기 1시간 (제주도)",
    reward: "독채 펜션 1박 숙박권 (40만원 상당)",
    tags: ["여행", "제주도", "감성숙소"],
    imageUrl: "https://picsum.photos/600/400?random=6",
    status: "active",
    applicants: 310,
    views: "89.5k",
    budget: "2,000,000",
    endDate: "2024-07-15",
    lat: 33.4660,
    lng: 126.3200
  },
  {
    id: 7,
    storeName: "테크기어 스토어",
    title: "신형 노이즈캔슬링 무선 헤드폰 런칭 리뷰",
    distance: "배송 상품 (전국)",
    reward: "무선 헤드폰 본품 (25만원 상당)",
    tags: ["IT", "전자기기", "음향기기"],
    imageUrl: "https://picsum.photos/600/400?random=7",
    status: "active",
    applicants: 245,
    views: "67.8k",
    budget: "1,500,000",
    endDate: "2024-06-25",
    lat: 37.3940,
    lng: 127.1110
  },
  {
    id: 8,
    storeName: "펫마블 반려동물용품",
    title: "강아지 프리미엄 수제 간식 세트 체험단",
    distance: "배송 상품 (전국)",
    reward: "수제 간식 5종 세트",
    tags: ["반려동물", "강아지", "수제간식"],
    imageUrl: "https://picsum.photos/600/400?random=8",
    status: "active",
    applicants: 88,
    views: "15.3k",
    budget: "300,000",
    endDate: "2024-05-20",
    lat: 35.1587,
    lng: 129.1604
  }
];

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

const INITIAL_APPLICATIONS: Application[] = [
  { id: 1, campaignId: 1, name: "푸드트래블러", role: "맛집 전문 리뷰어", followers: "12.4k", message: "정말 기대되는 캠페인이네요! 제 유튜브와 인스타에 정성껏 리뷰하겠습니다.", status: "pending", avatar: "https://picsum.photos/200/200?random=11" },
  { id: 2, campaignId: 1, name: "뷰티여신", role: "뷰티/패션 크리에이터", followers: "8.2k", message: "평소 관심있던 브랜드라 꼭 참여하고 싶습니다. 고화질 사진 약속드려요.", status: "approved", avatar: "https://picsum.photos/200/200?random=12" },
  { id: 3, campaignId: 1, name: "동네카페탐방", role: "라이프스타일", followers: "3.1k", message: "집 근처라 방문하기 너무 좋습니다. 로컬 찐리뷰 남길게요!", status: "pending", avatar: "https://picsum.photos/200/200?random=14" },
];

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
