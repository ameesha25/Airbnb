'use client';
import L from "leaflet";
import { MapContainer,Marker,TileLayer } from "react-leaflet";

import "leaflet/dist/leaflet.css";

// import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
// import markerIcon from "leaflet/dist/images/marker-icon.png";
// import markerShadow from "leaflet/dist/images/marker-shadow.png";


//@ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconUrl: "/marker-icon.png",
  iconRetinaUrl: "/marker-icon-2x.png",
  shadowUrl: "/marker-shadow.png",
});

interface MapProps{
    center?: number[]
}
//number is option which is also known as latitudenal and longitudenal 



const Map: React.FC<MapProps> = ({
     center
}) => {
    if (typeof window === 'undefined') return null;

  
    return (

    <MapContainer
    center={(center ?? [51, -0.09]) as L.LatLngExpression}

     zoom={center ? 4 : 2}
     scrollWheelZoom={false}
     className="h-[35vh] rounded-lg"

        >
    <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    {center && (
        <Marker
        position={center as L.LatLngExpression}
        
        />
    )}
    
    </MapContainer>
  

  )
}

export default Map;
