import { App } from "vue";
import { createPinia } from "pinia";
import { useToastStore } from "../stores/ToastStore";
import ToastContainer from "../components/base/containers/ToastContainer.vue";

export function registerToast(app: App) {
  // Đảm bảo Pinia được đăng ký
  if (!app._context.provides.pinia) {
    app.use(createPinia());
  }

  // Đăng ký component ToastContainer global
  app.component("ToastContainer", ToastContainer);

  // Thêm $toast vào app global properties
  app.config.globalProperties.$toast = useToastStore();
}

export { useToastStore };
export * from "../core/types/toast";

// Sử dụng như plugin
export default {
  install(app: App) {
    registerToast(app);
  },
};
