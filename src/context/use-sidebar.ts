/* eslint-disable no-unused-vars */
import { create } from 'zustand';

interface SidebarContextProps {
	isOpen: boolean;
	toggleSidebar: () => void;
	setOpen: (isOpen: boolean) => void;
}

export const useSidebar = create<SidebarContextProps>()((set) => ({
	isOpen: false,
	toggleSidebar: () => set((state) => ({ isOpen: !state.isOpen })),
	setOpen: (isOpen) => set({ isOpen }),
}));
