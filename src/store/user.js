import { defineStore, acceptHMRUpdate } from 'pinia';
import { login } from '../api/login';

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    userInfo: null
  }),
  getters: {

  },
  actions: {
    async login(params) {
      const userData =  await login(params)
      this.$patch({
        userInfo,
        ...userData
      })
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore(), import.meta.hot))
}