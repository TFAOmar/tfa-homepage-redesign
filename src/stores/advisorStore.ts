import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface DynamicAdvisor {
  id: string;
  name: string;
  title: string;
  type: "Advisor" | "Broker";
  email: string;
  phone: string;
  state: string;
  city: string;
  region: string;
  bio: string;
  passionateBio?: string;
  specialties: string[];
  licenses: string[];
  yearsOfExperience: number;
  image?: string;
  schedulingLink?: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

interface AdvisorStore {
  advisors: DynamicAdvisor[];
  adminApprovalEnabled: boolean;
  addAdvisor: (advisor: Omit<DynamicAdvisor, 'id' | 'createdAt' | 'status'>) => void;
  approveAdvisor: (id: string) => void;
  rejectAdvisor: (id: string) => void;
  toggleAdminApproval: () => void;
  getApprovedAdvisors: () => DynamicAdvisor[];
  getPendingAdvisors: () => DynamicAdvisor[];
}

export const useAdvisorStore = create<AdvisorStore>()(
  persist(
    (set, get) => ({
      advisors: [],
      adminApprovalEnabled: false,
      
      addAdvisor: (advisor) => {
        const newAdvisor: DynamicAdvisor = {
          ...advisor,
          id: `advisor-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          createdAt: new Date().toISOString(),
          status: get().adminApprovalEnabled ? 'pending' : 'approved',
        };
        
        set((state) => ({
          advisors: [...state.advisors, newAdvisor],
        }));
      },
      
      approveAdvisor: (id) => {
        set((state) => ({
          advisors: state.advisors.map((advisor) =>
            advisor.id === id ? { ...advisor, status: 'approved' as const } : advisor
          ),
        }));
      },
      
      rejectAdvisor: (id) => {
        set((state) => ({
          advisors: state.advisors.map((advisor) =>
            advisor.id === id ? { ...advisor, status: 'rejected' as const } : advisor
          ),
        }));
      },
      
      toggleAdminApproval: () => {
        set((state) => ({
          adminApprovalEnabled: !state.adminApprovalEnabled,
        }));
      },
      
      getApprovedAdvisors: () => {
        return get().advisors.filter((advisor) => advisor.status === 'approved');
      },
      
      getPendingAdvisors: () => {
        return get().advisors.filter((advisor) => advisor.status === 'pending');
      },
    }),
    {
      name: 'advisor-storage',
    }
  )
);
