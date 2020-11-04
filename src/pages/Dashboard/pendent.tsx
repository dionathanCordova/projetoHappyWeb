import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Map, Marker, TileLayer } from "react-leaflet";

import api from '../../services/api';
import AuthContext from '../../contexts';
import Sidebar from '../../components/Sidebar/index';
import happyMapIcon from "../../utils/mapIcon";

import mapPinFFF from '../../images/map-pin-FFF.svg';
import unregistered from '../../images/unregistered.svg';
import edit3 from '../../images/edit-3.svg';
import trash from '../../images/trash.svg';
import emptyContent from '../../images/emptyContent.svg';

import swal from 'sweetalert';

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
   const [orphanages, setOrphanages] = useState([]);
   const history = useHistory();

   const { user } = useContext(AuthContext);

   useEffect(() => {
      api.get(`/orphanages/mylist/${user.id}/${0}`).then(response => {
         setOrphanages(response.data);
      })
   }, [])

   function handleEditOrphanage(id: string) {
      history.push(`/orphanages/edit/${id}`);
   }

   function handleRemoveOrphanage(id: string) {
      api.delete(`orphanages/${user.id}/${id}`).then(response => {
         console.log(response);

         if (response.status == 201) {
            swal(
               "",
               'Remoção realizado com sucesso!',
               'success'
            );

            history.push('/orphanages');
         }
      }).catch(err => {
         console.log(err);
      })
   }

   return (
      <Container>
         <Sidebar colorFirstIcon="#12AFCB" colorSecondIcon="#FFD666" signout={true}>
            <button id="first" type="button" onClick={() => history.push('/dashboard')}>
               <img src={mapPinFFF} alt="" />
            </button>
            <button id="second" type="button">
               <img src={unregistered} alt="" />
            </button>
         </Sidebar>

         <Content>
            <div className="title">
               <h1>Cadastrados pendentes</h1>

               <p>{orphanages.length} orfanato</p>
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
                                 <img src={trash} alt="" onClick={() => handleRemoveOrphanage(orphanage.id)} />
                              </button>
                           </div>
                        </div>
                     </MapContent>
                  )
               })}

               {orphanages.length == 0 &&
                  <EmptyContent>
                     <img src={emptyContent} alt="" />
                  </EmptyContent>
               }
            </MapContainer>
         </Content>
      </Container>
   )
}

export default Dashboard;