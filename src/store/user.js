import { defineStore } from "pinia";
import store from "@/store";
import { generateDynamicRouter, filterAsyncRouter } from './utils'
import { getUserDetail } from "@/api/user";

export const useUserStore = defineStore("user", {
  state: () => ({
    userInfo: null,
    roles: null,
    permssions: null,
    routes: null,
  }),
  getters: {
    addRoutes: (state) => state.routes,
  },
  actions: {
    getUserInfo() {
      return new Promise((resolve, reject) => {
        getUserDetail().then((res) => {
          const result = res.data;
          if (result.roles && result.roles.length) {
            const roles = result.roles;
            roles.permissions = result.roles
              .map((role) => role.permissions)
              .flat();
            roles.permissionList = roles.permissions.map(p => p.permission)
            roles.permissions.forEach((p) => {
              if (p.actionList) {
                p.actionList = JSON.parse(p.actionList);
              } else {
                p.actionList = [];
              }
            });
            this.$patch((state) => {
              state.roles = { ...roles };
              state.userInfo = {
                name: result.name,
                mobile: result.mobile
              }
            });
            resolve(res);
          } else {
            reject(new Error("没有路由权限"));
          }
        });
      });
    },

    generateRoutes(roles) {
      return new Promise((resolve, reject) => {
        generateDynamicRouter().then((routers) => {
          const accessRoutes = filterAsyncRouter(routers, roles);
          this.routes = accessRoutes;
          resolve();
        }).catch(error => {
          reject(error)
        })
      });
    },
  },
});


export function useUserStoreWithOut() {
  return useUserStore(store);
}
