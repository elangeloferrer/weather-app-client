import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Map from "./components/Map/Map";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
    return (
        <div className="flex min-h-screen flex-col items-center bg-gray-50 p-4 sm:p-8">
            {/* Header */}
            <h1 className="mt-4 mb-6 text-center text-3xl font-bold text-gray-800 drop-shadow-md sm:text-4xl md:text-5xl lg:text-6xl">
                Weather App
            </h1>

            {/* Map section */}
            <div className="w-full max-w-6xl">
                <Map />
            </div>

            {/* Toast message*/}
            <ToastContainer
                position="top-right"
                autoClose={7000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Slide}
            />
        </div>
    );
}

export default App;
