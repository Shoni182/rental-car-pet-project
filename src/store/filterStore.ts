import { create } from 'zustand';
import { CarFilter } from '@/types/car';

type FilterStore = {
  filters: CarFilter;
  setFilters: (filters: CarFilter) => void;
  resetFilters: () => void;
};

const defaultFilters: CarFilter = {
  brand: '',
  price: null,
  mileageFrom: '',
  mileageTo: '',
};

export const useFilterStore = create<FilterStore>((set) => ({
  filters: defaultFilters,
  setFilters: (filters) => set({ filters }),
  resetFilters: () => set({ filters: defaultFilters }),
}));
