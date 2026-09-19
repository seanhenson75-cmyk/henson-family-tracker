'use client';
import {useEffect} from 'react';
import {MapContainer,TileLayer,Marker,Popup,useMap} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
const icon=L.divIcon({className:'familyMarker',html:'●',iconSize:[34,34],iconAnchor:[17,17]});
function Follow({point}){const map=useMap();useEffect(()=>{if(point)map.setView([point.latitude,point.longitude],15)},[point,map]);return null}
export default function FamilyMap({center,members,me,onSelect}){return <MapContainer center={center} zoom={15} zoomControl scrollWheelZoom touchZoom className="leafletMap"><TileLayer attribution="&copy; OpenStreetMap contributors" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>{members.map(m=><Marker key={m.id} position={[m.latitude,m.longitude]} icon={icon} eventHandlers={{click:()=>onSelect(m.id)}}><Popup>{m.display_name}</Popup></Marker>)}<Follow point={me}/></MapContainer>}