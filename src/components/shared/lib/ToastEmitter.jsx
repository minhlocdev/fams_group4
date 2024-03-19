import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastEmitter = {
  success: (message) => toast.success(message),
  warning: (message) => toast.warning(message),
  error: (message) => toast.error(message),
  default: (message) => toast(message),
};

export default ToastEmitter;
