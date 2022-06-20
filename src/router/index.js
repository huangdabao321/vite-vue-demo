import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    name: "index",
    path: "/",
    component: () => import("@/layout/BaseLayout.vue"),
    redirect: "/welcome",
    meta: {
      title: "主页",
    },
    children: [
      {
        name: "welcome",
        path: "/welcome",
        meta: { title: "欢迎页" },
        component: () => import("@/views/welcome/index.vue"),
      },
      {
        name: "userList",
        path: "/users/list",
        meta: { title: "用户列表" },
        component: () => import("@/views/system/users/index.vue"),
      },
      {
        name: "rolesList",
        path: "/roles/list",
        meta: { title: "角色列表" },
        component: () => import("@/views/system/roles/index.vue"),
      },
      {
        name: "permissionsList",
        path: "/permissions/list",
        meta: { title: "权限列表" },
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
