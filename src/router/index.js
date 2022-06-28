import { createRouter, createWebHistory } from "vue-router";

export const notFoundRouter = {
  name: "404",
  path: "/:pathMatch(.*)*",
  component: () => import("@/views/errors/404.vue"),
};

export const constantRouterComponents = {
  BaseLayout: () => import("@/layout/BaseLayout.vue"),
  RouterView: () => import("@/layout/RouterView.vue"),
  Welcome: () => import("@/views/welcome/index.vue"),
  Users: () => import("@/views/system/users/index.vue"),
  Roles: () => import("@/views/system/roles/index.vue"),
  Permissions: () => import("@/views/system/permissions/index.vue"),
};

const routes = [
  {
    name: "user",
    path: "/user",
    component: () => import("@/layout/UserLayout.vue"),
    children: [
      {
        name: "login",
        path: "login",
        component: () => import("@/views/user/login.vue"),
      }
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
