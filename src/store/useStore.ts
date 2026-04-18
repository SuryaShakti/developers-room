import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

type RoomName = 'main' | 'about' | 'skills' | 'projects' | 'contact'

interface StoreState {
  activeRoom: RoomName
  isTransitioning: boolean
  scrollProgress: number
  keyboardVisible: boolean
  setActiveRoom: (room: RoomName) => void
  setIsTransitioning: (value: boolean) => void
  setScrollProgress: (value: number) => void
  setKeyboardVisible: (value: boolean) => void
}

export const useStore = create<StoreState>()(
  subscribeWithSelector((set) => ({
    activeRoom: 'main',
    isTransitioning: false,
    scrollProgress: 0,
    keyboardVisible: false,
    setActiveRoom: (room) => set({ activeRoom: room }),
    setIsTransitioning: (value) => set({ isTransitioning: value }),
    setScrollProgress: (value) => set({ scrollProgress: value }),
    setKeyboardVisible: (value) => set({ keyboardVisible: value }),
  }))
)
