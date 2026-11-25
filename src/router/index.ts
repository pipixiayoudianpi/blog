import { createRouter, createWebHistory } from "vue-router";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/HomeView.vue"),
    },
    {
      path: "/posts",
      children: [
        {
          path: "",
          name: "post-list",
          component: () => import("@/views/PostListView.vue"),
        },
        {
          path: ":slug",
          name: "post-detail",
          component: () => import("@/views/PostDetailView.vue"),
          props: true,
        },
      ],
    },
    {
      path: "/about",
      name: "about",
      component: () => import("@/views/AboutView.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: () => import("@/views/NotFoundView.vue"),
    },
  ],
  // 跳转到新页面时回到顶部；浏览器后退时恢复原来的滚动位置
  scrollBehavior(_to, _from, savedPosition) {
    return savedPosition ?? { top: 0 };
  },
});
