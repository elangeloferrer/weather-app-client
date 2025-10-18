import { useMapEvents } from "react-leaflet";

function LocationMarker({ onSelect }) {
    useMapEvents({
        click(e) {
            // const { lat, lng } = e.latlng;
            onSelect(e.latlng);
        },
    });
    return null;
}
export default LocationMarker;
