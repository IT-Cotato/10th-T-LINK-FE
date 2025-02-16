import { create } from 'zustand';

interface DeleteStore {
  modalOpen: boolean;
  what: string;
  setModalOpen: (value: boolean) => void;
  setWhat: (what: string) => void;
}

const useDeleteStore = create<DeleteStore>((set) => ({
  modalOpen: false,
  what: '',
  setModalOpen: (value) => set({ modalOpen: value }),
  setWhat: (what) => set({ what }),
}));

export default useDeleteStore;
