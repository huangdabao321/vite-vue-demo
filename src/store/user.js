import { defineStore, acceptHMRUpdate } from 'pinia';
import { getUserInfo } from '../api/login';

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    userInfo: null
  }),
  getters: {

  },
  actions: {
    async getUserInfo(params) {
      const userInfo =  await getUserInfo(params)
      this.$patch({
        userInfo,
        ...userInfo
      })
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore(), import.meta.hot))
}