import { notify } from "./toastify";

export function handleError(error) {
    // Log internal errors for developers
    if (import.meta.env.DEV) {
        console.error("Internal Error:", error);
    }

    let message = "Something went wrong.";

    if (error.response?.data?.message) {
        // Custom backend message
        message = error.response.data.message;
    } else if (error.response?.data?.error?.message) {
        // Third-party API (like WeatherAPI)
        if (import.meta.env.DEV) {
            console.error("Internal Error:", error.response.data.error.message);
        }
    } else if (error.message) {
        // Network error or JS error
        message = error.message;
    } else if (error.status >= 500) {
        message = "Server error. Please try again later.";
    }

    // Show toast
    notify.error(message);
}
