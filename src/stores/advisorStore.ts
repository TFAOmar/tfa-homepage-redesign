import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type AdvisorStatus = "pending" | "published" | "hidden" | "archived";

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
  status: AdvisorStatus;
  displayPriority?: number;
  createdAt: string;
  updatedAt?: string;
  rejectionReason?: string;
}

interface AdvisorStore {
  advisors: DynamicAdvisor[];
  adminApprovalEnabled: boolean;
  addAdvisor: (advisor: Omit<DynamicAdvisor, 'id' | 'createdAt' | 'status'>) => void;
  updateAdvisor: (id: string, updates: Partial<Omit<DynamicAdvisor, 'id' | 'createdAt'>>) => void;
  approveAdvisor: (id: string) => void;
  rejectAdvisor: (id: string, reason?: string) => void;
  hideAdvisor: (id: string) => void;
  archiveAdvisor: (id: string) => void;
  restoreAdvisor: (id: string) => void;
  deleteAdvisorPermanently: (id: string) => void;
  toggleAdminApproval: () => void;
  bulkApprove: (ids: string[]) => void;
  bulkHide: (ids: string[]) => void;
  bulkArchive: (ids: string[]) => void;
  getPublishedAdvisors: () => DynamicAdvisor[];
  getPendingAdvisors: () => DynamicAdvisor[];
  getHiddenAdvisors: () => DynamicAdvisor[];
  getArchivedAdvisors: () => DynamicAdvisor[];
  getApprovedAdvisors: () => DynamicAdvisor[]; // Legacy compatibility
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
          status: get().adminApprovalEnabled ? 'pending' : 'published',
        };
        
        set((state) => ({
          advisors: [...state.advisors, newAdvisor],
        }));
      },

      updateAdvisor: (id, updates) => {
        set((state) => ({
          advisors: state.advisors.map((advisor) =>
            advisor.id === id 
              ? { ...advisor, ...updates, updatedAt: new Date().toISOString() } 
              : advisor
          ),
        }));
      },
      
      approveAdvisor: (id) => {
        set((state) => ({
          advisors: state.advisors.map((advisor) =>
            advisor.id === id ? { ...advisor, status: 'published' as const, updatedAt: new Date().toISOString() } : advisor
          ),
        }));
      },
      
      rejectAdvisor: (id, reason) => {
        set((state) => ({
          advisors: state.advisors.map((advisor) =>
            advisor.id === id ? { ...advisor, status: 'hidden' as const, rejectionReason: reason, updatedAt: new Date().toISOString() } : advisor
          ),
        }));
      },

      hideAdvisor: (id) => {
        set((state) => ({
          advisors: state.advisors.map((advisor) =>
            advisor.id === id ? { ...advisor, status: 'hidden' as const, updatedAt: new Date().toISOString() } : advisor
          ),
        }));
      },

      archiveAdvisor: (id) => {
        set((state) => ({
          advisors: state.advisors.map((advisor) =>
            advisor.id === id ? { ...advisor, status: 'archived' as const, updatedAt: new Date().toISOString() } : advisor
          ),
        }));
      },

      restoreAdvisor: (id) => {
        set((state) => ({
          advisors: state.advisors.map((advisor) =>
            advisor.id === id ? { ...advisor, status: 'published' as const, updatedAt: new Date().toISOString() } : advisor
          ),
        }));
      },

      deleteAdvisorPermanently: (id) => {
        set((state) => ({
          advisors: state.advisors.filter((advisor) => advisor.id !== id),
        }));
      },
      
      toggleAdminApproval: () => {
        set((state) => ({
          adminApprovalEnabled: !state.adminApprovalEnabled,
        }));
      },

      bulkApprove: (ids) => {
        set((state) => ({
          advisors: state.advisors.map((advisor) =>
            ids.includes(advisor.id) ? { ...advisor, status: 'published' as const, updatedAt: new Date().toISOString() } : advisor
          ),
        }));
      },

      bulkHide: (ids) => {
        set((state) => ({
          advisors: state.advisors.map((advisor) =>
            ids.includes(advisor.id) ? { ...advisor, status: 'hidden' as const, updatedAt: new Date().toISOString() } : advisor
          ),
        }));
      },

      bulkArchive: (ids) => {
        set((state) => ({
          advisors: state.advisors.map((advisor) =>
            ids.includes(advisor.id) ? { ...advisor, status: 'archived' as const, updatedAt: new Date().toISOString() } : advisor
          ),
        }));
      },

      getPublishedAdvisors: () => {
        return get().advisors.filter((advisor) => advisor.status === 'published');
      },
      
      getPendingAdvisors: () => {
        return get().advisors.filter((advisor) => advisor.status === 'pending');
      },

      getHiddenAdvisors: () => {
        return get().advisors.filter((advisor) => advisor.status === 'hidden');
      },

      getArchivedAdvisors: () => {
        return get().advisors.filter((advisor) => advisor.status === 'archived');
      },

      // Legacy compatibility
      getApprovedAdvisors: () => {
        return get().advisors.filter((advisor) => advisor.status === 'published');
      },
    }),
    {
      name: 'advisor-storage',
    }
  )
);
