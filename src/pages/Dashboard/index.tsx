import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Map, Marker, TileLayer } from "react-leaflet";

import api from '../../services/api';
import Sidebar from '../../components/Sidebar/index';
import happyMapIcon from "../../utils/mapIcon";

import AuthContext from '../../contexts';
import mapPin from '../../images/map-pin.svg';
import edit3 from '../../images/edit-3.svg';
import trash from '../../images/trash.svg';
import unregisteredFFF from '../../images/unregisteredFFF.svg';
import emptyContent from '../../images/emptyContent.svg';

import {
   Container,
   Content,
   MapContainer,
   MapContent,
   EmptyContent
} from './styles';

interface OrphanageProp {
   id: string;
   latitude: number;
   longitude: number;
   name: string;
}

const Dashboard: React.FC = () => {
   const history = useHistory();
   const [orphanages, setOrphanages] = useState([])

   const { user } = useContext(AuthContext);

   useEffect(() => {
      api.get(`/orphanages/mylist/${user.id}/${1}`).then(response => {
         setOrphanages(response.data);
      })
   }, [user.id])

   function handleEditOrphanage(id: string) {
      history.push(`/orphanages/edit/${id}`);
   }

   return (
      <Container>
         <Sidebar colorFirstIcon="#FFD666" colorSecondIcon="#12AFCB" signout={true}>
            <button id="first" type="button">
               <img src={mapPin} alt="" />
            </button>
            <button id="second" type="button" onClick={() => history.push('/dashboard/notregistered')}>
               <img src={unregisteredFFF} alt="" />
            </button>
         </Sidebar>

         <Content>
            <div className="title">
               <h1>Orfanato cadastrado</h1>
               <p>{orphanages.length} orfanatos</p>
            </div>

            <MapContainer>
               {orphanages.map((orphanage: OrphanageProp) => {
                  return (
                     <MapContent key={orphanage.id}>
                        <Map
                           center={[orphanage.latitude, orphanage.longitude]}
                           zoom={16}
                           style={{ width: '100%', height: 280 }}
                           dragging={false}
                           touchZoom={false}
                           zoomControl={false}
                           scrollWheelZoom={false}
                           doubleClickZoom={false}
                        >
                           <TileLayer
                              url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                           />
                           <Marker interactive={false} icon={happyMapIcon} position={[orphanage.latitude, orphanage.longitude]} />
                        </Map>

                        <div className="footer">
                           <a
                              target="_blank"
                              rel="noopener noreferrer"
                              href={`https://www.google.com/maps/dir/?api=1&destination=${orphanage.latitude},${orphanage.longitude}`}
                           >
                              {orphanage.name}
                           </a>

                           <div id="btnGroup">
                              <button onClick={() => handleEditOrphanage(orphanage.id)}>
                                 <img src={edit3} alt="" />
                              </button>

                              <button>
                                 <img src={trash} alt="" />
                              </button>
                           </div>
                        </div>
                     </MapContent>
                  )
               })}

               {orphanages.length === 0 && 
                  <EmptyContent>
                     <img src={emptyContent} alt=""/>
                  </EmptyContent>
               }
            </MapContainer>
         </Content>
      </Container>
   )
}

export default Dashboard;