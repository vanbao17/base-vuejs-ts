import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/dashboard",
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/pages/Login.vue"),
    meta: { layout: "none" },
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("@/pages/Register.vue"),
    meta: { layout: "none" },
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("@/pages/Dashboard.vue"),
    meta: { requiresAuth: true, layout: "default" },
  },
  {
    path: "/booking",
    name: "Booking",
    component: () => import("@/pages/Booking.vue"),
    meta: { requiresAuth: true, layout: "none" },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// ✅ Middleware - Global Before Guard
router.beforeEach((to, from, next) => {
  const auth = useAuthStore();
  const path = to.path;

  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return next({ name: "Login" });
  }

  if (path === "/login" && auth.isAuthenticated) {
    return next({ name: "Dashboard" });
  }
  next();
});

export default router;
