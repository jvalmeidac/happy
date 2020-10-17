import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { FiPlus, FiArrowRight } from "react-icons/fi";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";

import mapMarkerImg from "../images/map-marker.svg";
import mapIcon from "../utils/mapIcon";
import "../styles/pages/orphanages-map.css";
import "leaflet/dist/leaflet.css";
import api from "../services/api";

interface Orphanage {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
}

function OrphanagesMap() {
  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

  useEffect(() => {
    api.get("orphanages").then((res) => {
      setOrphanages(res.data);
    });
  }, []);
  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={mapMarkerImg} alt="Happy" />

          <h2>Escolha um orfanato do mapa.</h2>
          <p>Muitas crianças estão esperando sua visita :)</p>
        </header>

        <footer>
          <strong>Araguaína</strong>
          <span>Tocantins</span>
        </footer>
      </aside>

      <Map
        center={[-7.2089242, -48.237452]}
        zoom={16.25}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer url="https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png" />

        {orphanages.map((orphanage) => {
          return (
            <Marker
              key={orphanage.id}
              icon={mapIcon}
              position={[orphanage.latitude, orphanage.longitude]}
            >
              <Popup
                closeButton={false}
                maxWidth={240}
                minWidth={240}
                className="map-popup"
              >
                {orphanage.name}
                <Link to={`/orfanato/${orphanage.id}`}>
                  <FiArrowRight size={20} color="#FFF" />
                </Link>
              </Popup>
            </Marker>
          );
        })}
      </Map>

      <Link to="/criar-orfanato" className="create-orphanage">
        <FiPlus size={32} color="#FFF" />
      </Link>
    </div>
  );
}

export default OrphanagesMap;
