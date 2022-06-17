import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    name: "/",
    component: () => import("@/layout/BaseLayout.vue"),
    children: [
      {
        name: "usersList",
        path: "/users/list",
        component: () => import("@/views/system/users/index.vue"),
      },
      {
        name: "rolesList",
        path: "/roles/list",
        component: () => import("@/views/system/roles/index.vue"),
      },
      {
        name: "permissionsList",
        path: "/permissions/list",
        component: () => import("@/views/system/permissions/index.vue"),
      },
    ],
  },
  {
    name: "user",
    path: "/user",
    component: () => import("@/layout/UserLayout.vue"),
    children: [
      {
        name: "login",
        path: "login",
        component: () => import("@/views/user/login.vue"),
      },
      {
        name: "404",
        path: "/:pathMatch(.*)*",
        component: () => import("@/views/errors/404.vue"),
      },
    ],
  },
  {
    name: "404",
    path: "/:pathMatch(.*)*",
    component: () => import("@/views/errors/404.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
