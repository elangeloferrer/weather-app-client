import { Marker, Popup, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useRef, useMemo } from "react";

function DraggableMarker({ position, onChange }) {
    const markerRef = useRef(null);
    const eventHandlers = useMemo(
        () => ({
            dragend() {
                const marker = markerRef.current;
                if (marker) {
                    const newPosition = marker.getLatLng();
                    console.log("Dragged-end coordinates:", newPosition);
                    onChange(newPosition);
                }
            },
        }),
        [onChange],
    );

    return (
        <Marker
            draggable
            position={position}
            ref={markerRef}
            eventHandlers={eventHandlers}
        >
            <Popup>
                Latitude: {position.lat.toFixed(5)} <br />
                Longitude: {position.lng.toFixed(5)}
            </Popup>
            <Tooltip>
                Lat: {position.lat.toFixed(5)}, Lng: {position.lng.toFixed(5)}
            </Tooltip>
        </Marker>
    );
}

export default DraggableMarker;
