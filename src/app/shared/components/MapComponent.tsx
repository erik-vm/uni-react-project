import {MapContainer, TileLayer, Marker} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

type Props = {
    position: [number, number];
}

export default function MapComponent({position}: Props) {
    return (
        <MapContainer center={position} zoom={13} scrollWheelZoom={true} style={{height: '100%'}}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
                
            </Marker>
        </MapContainer>
    )
}