import React, { useCallback, useContext, useEffect, useState } from 'react';

import mapMarkerImg from '../../images/map-marker.svg';
import happyMapIcon from '../../utils/mapIcon';

import { Link, useHistory } from 'react-router-dom';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import api from '../../services/api';
import AuthContext from '../../contexts';
import swal from 'sweetalert';

import {
   Container,
   Aside,
   CreateOrphanage   
} from './styles';

interface OrphanageInterface {
   id: number;
   latitude: number;
   longitude: number;
   name: string;
}

function Orphanages() {
   const [orphanages, setOrphanages] = useState<OrphanageInterface[]>([]);
   const [latitude, setLatitude] = useState(0);
   const [longitude, setLongitude] = useState(0);

   const { user, signed, signOut } = useContext(AuthContext);
   const history = useHistory();

   useEffect(() => {
      // signOut();

      api.get('orphanages').then(response => {
         setOrphanages(response.data);
      })

      navigator.geolocation.getCurrentPosition((position) => {
         const latitude = position.coords.latitude;
         const longitude = position.coords.longitude;

         setLatitude(latitude);
         setLongitude(longitude);
      })
   }, [signOut, signed])

   const handleCreateOrphamage = useCallback(() => {
      if (!signed) {
         swal(
            "Olá!",
            'Para criar o registro de um orphanato você precisa estar logado, deseja se cadastrar?', {
               buttons: ["Não!", "Sim!"],
            }).then((willDelete) => {
               if (willDelete) {
                  history.push('/signup');
               }
            });
      } else {
         history.push('/orphanages/create');
      }
   }, [history, signed])

   return (
      <Container>
         <Aside>
            <header>
               <button onClick={() => history.push('/')}>
                  <img src={mapMarkerImg} alt="happy logo" />
               </button>

               <h2>Escolha um orfanato do mapa</h2>
               <p>Muitas crianças estão esperando a sua visita :) </p>
            </header>

            <footer>
               <strong>Camboriú</strong>
               <span>Santa Catarina</span>
            </footer>
         </Aside>

         <Map
            center={[latitude, longitude]}
            zoom={15}
            style={{ width: '100%', height: '100%' }}
         >
            <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
            {/* <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} /> */}

            {orphanages.length > 0 && orphanages.map((orphanage) => {
               return (
                  <Marker
                     key={orphanage.id}
                     icon={happyMapIcon}
                     position={[orphanage.latitude, orphanage.longitude]}
                  >
                     <Popup closeButton={false} minWidth={240} maxWidth={248} className="map-popup">
                        {orphanage.name}
                        <Link to={`/orphanages/${orphanage.id}`}>
                           <FiArrowRight size={28} color='#FFF' />
                        </Link>
                     </Popup>
                  </Marker>
               )
            })}
         </Map>

         <CreateOrphanage onClick={handleCreateOrphamage}>
            <FiPlus size={32} color="#fff" />
         </CreateOrphanage>
      </Container>
   )
}

export default Orphanages;