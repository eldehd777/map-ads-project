import { create } from "zustand";
import { persist } from "zustand/middleware";

export type UserRole = "creator" | "brand" | "admin";
export type UserStatus = "active" | "suspended";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  status: UserStatus;
  avatar?: string;
  createdAt: string;
}

interface AuthState {
  users: User[];
  currentUser: User | null;
  
  // Auth Actions
  login: (email: string) => boolean;
  logout: () => void;
  register: (user: Omit<User, "id" | "status" | "createdAt">) => User;
  
  // Admin Actions
  suspendUser: (id: string) => void;
  activateUser: (id: string) => void;
  deleteUser: (id: string) => void;
}

const INITIAL_USERS: User[] = [
  {
    id: "user-1",
    email: "admin@hellads.com",
    name: "슈퍼 어드민",
    role: "admin",
    status: "active",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=admin",
    createdAt: new Date().toISOString(),
  },
  {
    id: "user-2",
    email: "brand@hellads.com",
    name: "헬애즈 광고주",
    role: "brand",
    status: "active",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=brand",
    createdAt: new Date().toISOString(),
  },
  {
    id: "user-3",
    email: "creator@hellads.com",
    name: "유명 크리에이터",
    role: "creator",
    status: "active",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=creator",
    createdAt: new Date().toISOString(),
  }
];

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      users: INITIAL_USERS,
      currentUser: null,

      login: (email: string) => {
        const user = get().users.find((u) => u.email === email);
        if (user) {
          if (user.status === "suspended") {
            alert("정지된 계정입니다.");
            return false;
          }
          set({ currentUser: user });
          return true;
        }
        return false;
      },

      logout: () => {
        set({ currentUser: null });
      },

      register: (userData) => {
        const newUser: User = {
          ...userData,
          id: "user-" + Date.now(),
          status: "active",
          createdAt: new Date().toISOString(),
        };
        set((state) => ({ users: [...state.users, newUser] }));
        return newUser;
      },

      suspendUser: (id: string) => {
        set((state) => ({
          users: state.users.map((u) => (u.id === id ? { ...u, status: "suspended" } : u)),
        }));
      },

      activateUser: (id: string) => {
        set((state) => ({
          users: state.users.map((u) => (u.id === id ? { ...u, status: "active" } : u)),
        }));
      },

      deleteUser: (id: string) => {
        set((state) => ({
          users: state.users.filter((u) => u.id !== id),
          currentUser: state.currentUser?.id === id ? null : state.currentUser,
        }));
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
