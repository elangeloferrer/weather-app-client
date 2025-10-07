import { toast } from "react-toastify";

const options = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
};

export const notify = {
    success: (msg) => toast.success(msg, options),
    error: (msg) => toast.error(msg, options),
    warning: (msg) => toast.warning(msg, options),
    info: (msg) => toast.info(msg, options),
};
