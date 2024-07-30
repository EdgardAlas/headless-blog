import { create } from 'zustand';

interface ModalContextProps {
	isOpen: boolean;

	open: (_data?: any) => void;
	close: () => void;
	data: any;
	setData: (_data: any) => void;
	clearData: () => void;
}

export const useModal = create<ModalContextProps>()((set) => ({
	isOpen: false,
	open: (data) => set({ isOpen: true, data }),
	close: () => set({ isOpen: false }),
	setData: (data) => set({ data }),
	data: null,
	clearData: () => set({ data: null }),
}));
