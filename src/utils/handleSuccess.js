import { notify } from "./toastify";

export function handleSuccess(response, customMessage = null) {
    // Log full response in dev mode for debugging
    if (import.meta.env.DEV) {
        console.log("Success Response:", response);
    }

    let message = "Action completed successfully.";

    // Determine the message priority
    if (customMessage) {
        message = customMessage;
    } else if (response?.data?.message) {
        // Custom backend message
        message = response.data.message;
    } else if (typeof response === "string") {
        // When manually passing a string
        message = response;
    }

    // Show toast
    notify.success(message);
}
