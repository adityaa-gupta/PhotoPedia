import { toast } from "react-toastify";

export const toastError = (message, params) => {
  toast.error(message, {
    position: params?.position || "top-right",
    closeButton: params?.close || false,
  });
};
export const toastSuccess = (message) => {
  toast.success(message, {
    position: "top-right",
    closeButton: false,
  });
};