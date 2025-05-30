import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useMemo } from 'react';

type Location = {
    id: string;
    latitude: number;
    longitude: number;
    // add any other properties your location object has
}

type Props = {
    locations: Location[];
    showPath?: boolean;
}

export default function MapComponent({ locations, showPath = true }: Props) {
    // Calculate center and bounds
    const { center, pathCoordinates } = useMemo(() => {
        if (!locations || locations.length === 0) {
            return { center: [0, 0] as [number, number], pathCoordinates: [] };
        }

        const pathCoordinates = locations.map(location => [
            location.latitude,
            location.longitude
        ] as [number, number]);

        const centerLat = locations.reduce((sum, loc) => sum + loc.latitude, 0) / locations.length;
        const centerLng = locations.reduce((sum, loc) => sum + loc.longitude, 0) / locations.length;

        return {
            center: [centerLat, centerLng] as [number, number],
            pathCoordinates
        };
    }, [locations]);

    if (!locations || locations.length === 0) {
        return <div>No locations to display</div>;
    }

    return (
        <MapContainer 
            center={center} 
            zoom={13} 
            scrollWheelZoom={true} 
            style={{ height: '100%' }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            {/* Draw the path connecting all points */}
            {showPath && pathCoordinates.length > 1 && (
                <Polyline
                    positions={pathCoordinates}
                    color="red"
                    weight={3}
                    opacity={0.7}
                />
            )}
            
            {/* Add markers for each location */}
            {locations.map((location, index) => (
                <Marker
                    key={location.id}
                    position={[location.latitude, location.longitude]}
                >
                    <Popup>
                        <div>
                            <strong>Point {index + 1}</strong><br />
                            Lat: {location.latitude.toFixed(6)}<br />
                            Lng: {location.longitude.toFixed(6)}
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}