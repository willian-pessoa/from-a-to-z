import toast from "react-hot-toast";

export const appToast = {
  loading(message: string) {
    return toast.loading(message);
  },

  success(message: string, id?: string) {
    toast.success(message, { id });
  },

  error(message: string, id?: string) {
    toast.error(message, { id });
  },
};
