import { MapContainer, TileLayer,Marker,Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import "leaflet-defaulticon-compatibility";

//mapbox api: 
const Map = ({lat, long, type, locations}) => {
  return (
    <MapContainer
      center={type == "bigMap" ? [0,0] : [lat, long]}
      zoom={type == "bigMap" ? 3 : 13}
      scrollWheelZoom={true}
      style={type == "bigMap" ? { height: "100vh", width: "100vw" } : { height: "300px", width: "400px" }}       
    >
      <TileLayer
        url={`https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.NEXT_PUBLIC_MAPBOX_API_KEY}`}
        attribution='Map data &copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors, <a href=&quot;https://creativecommons.org/licenses/by-sa/2.0/&quot;>CC-BY-SA</a>, Imagery &copy; <a href=&quot;https://www.mapbox.com/&quot;>Mapbox</a>'
      />{type == "bigMap" ?
      locations.map(res => {return(
      <Marker position={[res.location.lat, res.location.lng]} draggable={false} animate={true}>
        <Popup>I visited here!</Popup>
      </Marker> 
      )})
      : ""}
    </MapContainer>
  );
};

export default Map;