import { useMapEvents } from "react-leaflet";

function LocationMarker({ onSelect }) {
    useMapEvents({
        click(e) {
            // const { lat, lng } = e.latlng;
            console.log("Clicked coordinates:", e.latlng);
            onSelect(e.latlng);
        },
    });
    return null;
}
export default LocationMarker;
