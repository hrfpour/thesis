"use client";

import { create } from "zustand";

type PresentationState = {
  active: boolean;
  slideIndex: number;
  slideCount: number;
  startPresentation: (fromSlide?: number) => void;
  exitPresentation: () => void;
  goTo: (index: number) => void;
  next: () => void;
  prev: () => void;
  setSlideCount: (count: number) => void;
};

export const usePresentation = create<PresentationState>((set, get) => ({
  active: false,
  slideIndex: 0,
  slideCount: 0,
  startPresentation: (fromSlide = 0) =>
    set((s) => ({ active: true, slideIndex: fromSlide ?? 0 })),
  exitPresentation: () => set({ active: false }),
  goTo: (index) => {
    const { slideCount } = get();
    if (index >= 0 && index < slideCount) set({ slideIndex: index });
  },
  next: () => {
    const { slideIndex, slideCount } = get();
    if (slideIndex < slideCount - 1) set({ slideIndex: slideIndex + 1 });
  },
  prev: () => {
    const { slideIndex } = get();
    if (slideIndex > 0) set({ slideIndex: slideIndex - 1 });
  },
  setSlideCount: (count) => set({ slideCount: count }),
}));
