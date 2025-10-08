function WeatherCard({ data, loading }) {
    if (loading) {
        return (
            <div className="flex h-full items-center justify-center rounded-xl bg-white shadow-lg">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="flex h-full items-center justify-center rounded-xl bg-gray-100 text-gray-500 shadow-lg">
                No location selected yet
            </div>
        );
    }

    const { location, current } = data;

    return (
        <div className="h-full overflow-y-auto rounded-xl border-2 border-black/50 bg-gray-50 p-5 shadow-lg">
            {/* Header */}
            <div className="mb-4 flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-semibold text-gray-800">
                        {location.name}, {location.country}
                    </h2>
                    <p className="text-sm text-gray-500">
                        {location.localtime}
                    </p>
                </div>
                <img
                    src={`https:${current.condition.icon}`}
                    alt={current.condition.text}
                    className="h-12 w-12"
                />
            </div>

            {/* Main Temperature */}
            <div className="mb-4">
                <h1 className="text-5xl font-bold text-blue-600">
                    {current.temp_c}°C
                </h1>
                <p className="text-gray-600">{current.condition.text}</p>
                <p className="text-sm text-gray-500">
                    Feels like {current.feelslike_c}°C
                </p>
            </div>

            {/* Additional Details */}
            <div className="grid grid-cols-2 gap-3 text-sm text-gray-700">
                <div>
                    <p className="font-medium">Humidity:</p>
                    <p>{current.humidity}%</p>
                </div>
                <div>
                    <p className="font-medium">Wind:</p>
                    <p>
                        {current.wind_kph} kph {current.wind_dir}
                    </p>
                </div>
                <div>
                    <p className="font-medium">Pressure:</p>
                    <p>{current.pressure_mb} mb</p>
                </div>
                <div>
                    <p className="font-medium">Visibility:</p>
                    <p>{current.vis_km} km</p>
                </div>
                <div>
                    <p className="font-medium">UV Index:</p>
                    <p>{current.uv}</p>
                </div>
                <div>
                    <p className="font-medium">Cloud:</p>
                    <p>{current.cloud}%</p>
                </div>
            </div>

            {/* Air Quality */}
            <div className="mt-5 border-t pt-3">
                <h3 className="mb-2 text-sm font-semibold text-gray-700">
                    Air Quality
                </h3>
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                    <p>PM2.5: {current.air_quality["pm2_5"]}</p>
                    <p>PM10: {current.air_quality["pm10"]}</p>
                    <p>CO: {current.air_quality.co}</p>
                    <p>NO₂: {current.air_quality.no2}</p>
                    <p>O₃: {current.air_quality.o3}</p>
                    <p>SO₂: {current.air_quality.so2}</p>
                </div>
            </div>
        </div>
    );
}

export default WeatherCard;
