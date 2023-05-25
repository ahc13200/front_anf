import { defineStore } from 'pinia'

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    pets: [] as any[]
  }),
  actions: {
    // since we rely on `this`, we cannot use an arrow function
    construct(_params) {}
  }
})
