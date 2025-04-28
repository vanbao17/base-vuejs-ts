import { useToastStore } from "../stores/ToastStore";
const toast = useToastStore();
export const showToast = (action: string, title: string, content: string) => {
  switch (action) {
    case "SUCCESS":
      toast.success(content, title);
      break;
    case "ERROR":
      toast.error(content, title);
      break;
    case "WARNING":
      toast.warning(content, title);
      break;
    case "INFOR":
      toast.info(content, title);
      break;
  }
};
