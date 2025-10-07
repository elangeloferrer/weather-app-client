import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useState, useRef, useEffect } from "react";
import { handleAsync } from "../../utils/handleAsync";
import { handleError } from "../../utils/handleError";
import axios from "axios";

import LocationMarker from "./LocationMarker";
import DraggableMarker from "./DraggableMarker";

const defaultCenter = { lat: 12.8797, lng: 121.774 };

// Fetch the current weather based on selected location
export async function fetchCurrentWeather(coordinates) {
    const baseUrl = import.meta.env.VITE_WEATHER_API_URL;
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
    const url = `${baseUrl}?key=${apiKey}&q=${coordinates.lat},${coordinates.lng}&aqi=yes`;

    const [data, error] = await handleAsync(axios.get(url));

    if (error) return handleError(error);

    console.log("Weather API Response:", data?.data);
    return data?.data;
}

// Save location to database
async function saveLocation(coordinates) {
    console.log("saving...", coordinates);
}

export default function Map() {
    const [position, setPosition] = useState(defaultCenter);
    const [loading, setLoading] = useState(false);
    const didMount = useRef(false); // Prevent double API call at mount

    // Fetch weather when position changes
    useEffect(() => {
        if (!didMount.current) {
            didMount.current = true;
            return;
        }

        const fetchWeather = async () => {
            setLoading(true);
            await fetchCurrentWeather(position);
            setLoading(false);
        };

        fetchWeather();
    }, [position]);

    return (
        <div className="flex flex-col items-center justify-center p-4">
            <p className="text-md mb-4 text-center font-extralight text-black drop-shadow-sm sm:text-2xl">
                Click or drag the pin to select a location. Your coordinates
                will be fetched automatically.
            </p>

            <div className="h-[400px] w-full overflow-hidden rounded-xl shadow-lg sm:h-[500px] md:h-[600px]">
                <MapContainer
                    center={[position.lat, position.lng]}
                    zoom={7}
                    scrollWheelZoom
                    style={{ height: "100%", width: "100%" }}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    <DraggableMarker
                        position={position}
                        onChange={setPosition}
                    />
                    <LocationMarker onSelect={setPosition} />
                </MapContainer>
            </div>

            {/* Display coordinates with loading spinner */}
            <div className="mt-3 flex items-center space-x-2 text-sm text-gray-600">
                <span>
                    Selected Location: {position.lat.toFixed(5)},{" "}
                    {position.lng.toFixed(5)}
                </span>
                {loading && (
                    <div className="h-5 w-5 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
                )}
            </div>

            <button
                onClick={() => saveLocation(position)}
                className="mt-2 rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            >
                Save Location
            </button>
        </div>
    );
}
