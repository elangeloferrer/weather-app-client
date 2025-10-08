import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { handleAsync } from "../../utils/handleAsync";
import { handleError } from "../../utils/handleError";
import { handleSuccess } from "../../utils/handleSuccess";
import LocationMarker from "./LocationMarker";
import DraggableMarker from "./DraggableMarker";
import WeatherCard from "./WeatherCard";

const defaultCenter = { lat: 12.8797, lng: 121.774 };

// Fetch current weather
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
async function saveLocation(weatherData) {
    const url = import.meta.env.VITE_APP_API_URL + "/locations";
    const [data, error] = await handleAsync(
        axios.post(url, {
            lat: weatherData.location.lat,
            lon: weatherData.location.lon,
            name: weatherData.location.name,
            region: weatherData.location.region,
            country: weatherData.location.country,
            tzId: weatherData.location.tz_id,
        }),
    );

    if (error) return handleError(error);

    handleSuccess(data);
    console.log("Save location Response:", data?.data);
    return data?.data;
}

export default function Map() {
    const [position, setPosition] = useState(defaultCenter);
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);
    const didMount = useRef(false);

    useEffect(() => {
        if (!didMount.current) {
            didMount.current = true;
            return;
        }

        const fetchWeather = async () => {
            setLoading(true);
            const data = await fetchCurrentWeather(position);
            setWeatherData(data);
            setLoading(false);
        };

        fetchWeather();
    }, [position]);

    return (
        <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-5 md:grid-rows-5">
            {/* Map Section */}
            <div className="col-span-1 row-span-5 md:col-span-3">
                <p className="mb-4 text-center text-sm font-light text-gray-800">
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
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <DraggableMarker
                            position={position}
                            onChange={setPosition}
                        />
                        <LocationMarker onSelect={setPosition} />
                    </MapContainer>
                </div>

                <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-sm text-gray-700">
                    <span>
                        Selected: {position.lat.toFixed(4)},{" "}
                        {position.lng.toFixed(4)}
                    </span>
                    {loading && (
                        <div className="h-5 w-5 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
                    )}
                </div>

                <div className="mt-2 flex justify-center">
                    <button
                        onClick={() => saveLocation(weatherData)}
                        className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                    >
                        Save Location
                    </button>
                </div>
            </div>

            {/* Weather Info Section */}
            <div className="col-span-1 row-span-5 md:col-span-2 md:col-start-4">
                <WeatherCard data={weatherData} loading={loading} />
            </div>
        </div>
    );
}
