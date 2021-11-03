import { MapContainer, TileLayer, Marker,Popup } from 'react-leaflet' //we'll use Marker and Popup later
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import "leaflet-defaulticon-compatibility";

//mapbox api: 
const Map = ({lat, long}) => {
  return (
    <MapContainer
      center={[lat, long]}
      zoom={13}
      scrollWheelZoom={true}
      style={{ height: "300px", width: "400px" }}       
    >
      <TileLayer
        url={`https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.NEXT_PUBLIC_MAPBOX_API_KEY}`}
        attribution='Map data &copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors, <a href=&quot;https://creativecommons.org/licenses/by-sa/2.0/&quot;>CC-BY-SA</a>, Imagery &copy; <a href=&quot;https://www.mapbox.com/&quot;>Mapbox</a>'
      />
    </MapContainer>
  );
};

export default Map;
