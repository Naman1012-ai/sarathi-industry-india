import { create } from 'zustand';
import { Products } from '@/entities';

interface InquiryItem extends Products {
  addedAt: number;
}

interface InquiryStore {
  items: InquiryItem[];
  addItem: (product: Products) => void;
  removeItem: (productId: string) => void;
  clearItems: () => void;
  getItemCount: () => number;
}

export const useInquiryStore = create<InquiryStore>((set, get) => ({
  items: [],
  
  addItem: (product: Products) => {
    set((state) => {
      // Check if product already exists
      const exists = state.items.find((item) => item._id === product._id);
      if (exists) {
        return state;
      }
      return {
        items: [...state.items, { ...product, addedAt: Date.now() }],
      };
    });
  },
  
  removeItem: (productId: string) => {
    set((state) => ({
      items: state.items.filter((item) => item._id !== productId),
    }));
  },
  
  clearItems: () => {
    set({ items: [] });
  },
  
  getItemCount: () => {
    return get().items.length;
  },
}));
