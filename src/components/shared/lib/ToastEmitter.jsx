import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastEmitter = {
  success: (message) => toast.success(message),
  warning: (message) => toast.warning(message),
  error: (message) => toast.error(message),
  default: (message, toastId) =>
    toast(message, { autoClose: 3000, toastId: toastId }),
  update: (message, toastId, type) =>
    toast.update(toastId, {
      render: message,
      type: type,
      autoClose: 2000,
      closeButton: true,
      isLoading: false,
    }),
  loading: (message, toastId) => toast.loading(message, { toastId: toastId }),
};

export default ToastEmitter;
