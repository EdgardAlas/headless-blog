import { create } from 'zustand';

interface ModalContextProps {
	isOpen: boolean;

	open: (_data?: unknown) => void;
	close: () => void;
	data: unknown;
	setData: (_data: unknown) => void;
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
