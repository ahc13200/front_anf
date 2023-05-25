import { defineStore } from 'pinia'

export const useMasterStore = defineStore({
  id: 'masters',
  state: () => ({
    genders: [] as String[],
    patientsType: [] as String[],
    reasons: [] as String[],
    states: [] as String[]
  }),
  actions: {
    // since we rely on `this`, we cannot use an arrow function
    construct(params) {
      const { genders = [], patientsType = [], reasons = [], states = [] } = { ...params }
      this.genders = genders
      this.patientsType = patientsType
      this.reasons = reasons
      this.states = states
    }
  }
})
