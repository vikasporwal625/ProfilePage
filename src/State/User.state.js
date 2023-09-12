import { create } from 'zustand'

export const useUserStore = create((set) => ({
  firstName: "Vikas",
  lastName: "proval",
  username: "Vikas002",
  profileUrl: "",
  bio: "I am a programmer",
  updateUser: (userData) => set((state) => {
    return {
      ...state,
      ...userData,
    }
  }),
}))
