import React, { useContext, useEffect, useState } from "react";
import { FiClock, FiInfo } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { Map, Marker, TileLayer } from "react-leaflet";
import { useParams } from "react-router-dom";
import { useHistory } from 'react-router-dom';

import Sidebar from "../../components/Sidebar";
import happyMapIcon from "../../utils/mapIcon";
import api from "../../services/api";

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import {
   Container,
   Content,
   OrphanageDetailsContainer,
   OrphanageDetailsContent,
   MapContainer,
   OpenDetails,
   ContactButton,
   Image
} from './styles';

interface OrphanageInterface {
   latitude: number;
   longitude: number;
   name: string;
   about: string;
   instruction: string;
   opening_hours: string;
   open_on_weekends: boolean;
   images: Array<{
      id: number;
      url: string;
   }>
}

interface OrphanageParams {
   id: string;
}

const OrphanageDetails: React.FC = () => {
   const params = useParams<OrphanageParams>();
   const [orphanage, setOrphanage] = useState<OrphanageInterface>();
   const [activeImageIndex, setActiveImageIndex] = useState(0);

   const history = useHistory();

   useEffect(() => {
      api.get(`orphanages/details/${params.id}`).then(response => {
         setOrphanage(response.data);
      })
   }, [params.id])

   if (!orphanage) {
      return <p>Carregando ...</p>
   }

   return (
      <Container>
         <Sidebar>.</Sidebar>

         <Content>
            <OrphanageDetailsContainer>
               <img src={orphanage.images[activeImageIndex].url} alt="Lar das meninas" />

               <OrphanageDetailsContent>
                  <h1>{orphanage.name}</h1>
                  <p>{orphanage.about}</p>

                  <Carousel
                     // autoPlay={this.props.deviceType !== "mobile" ? true : false}
                     // customTransition="all .5"
                     // deviceType={this.props.deviceType}
                     // dotListClass=""
                     // containerClass="carousel-container"
                     // itemClass=""
                     ssr={true} // means to render carousel on server-side.
                     transitionDuration={500}
                     removeArrowOnDeviceType={["tablet", "mobile"]}
                     additionalTransfrom={0}
                     arrows
                     autoPlaySpeed={3000}
                     centerMode={false}
                     className=""
                     containerClass="container-with-dots"
                     dotListClass="custom-dot-list-style"
                     infinite={false}
                     draggable
                     focusOnSelect={false}
                     itemClass="carousel-item-padding-40-px"
                     keyBoardControl
                     minimumTouchDrag={80}
                     renderButtonGroupOutside={false}
                     renderDotsOutside={false}
                     responsive={{
                        desktop: {
                           breakpoint: {
                              max: 3000,
                              min: 1024
                           },
                           items: 3,
                           partialVisibilityGutter: 40
                        },
                        mobile: {
                           breakpoint: {
                              max: 464,
                              min: 0
                           },
                           items: 1,
                           partialVisibilityGutter: 30
                        },
                        tablet: {
                           breakpoint: {
                              max: 1024,
                              min: 464
                           },
                           items: 2,
                           partialVisibilityGutter: 30
                        }
                     }}
                     showDots={false}
                     sliderClass=""
                     slidesToSlide={1}
                     swipeable
                  >
                      {orphanage.images.map((image, index) => {
                        return (
                           <Image onClick={() => setActiveImageIndex(index)} src={image.url} alt={orphanage.name} />
                        )
                     })}
                  </Carousel>

                  <MapContainer>
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

                     <footer>
                        <a target="_blank" rel="noopener noreferrer" href={`https://www.google.com/maps/dir/?api=1&destination=${orphanage.latitude},${orphanage.longitude}`}>Ver rotas no Google Maps</a>
                     </footer>
                  </MapContainer>

                  <hr />

                  <h2>Instruções para visita</h2>
                  <p>{orphanage.instruction}</p>

                  <OpenDetails>
                     <div className="hour">
                        <FiClock size={32} color="#15B6D6" />
                        Segunda à Sexta <br /> {orphanage.opening_hours}
                     </div>

                     {orphanage.open_on_weekends ? (
                        <div className="open-on-weekends">
                           <FiInfo size={32} color="#39CC83" />
                           Atendemos <br />
                           fim de semana
                        </div>
                     ) : (
                           <div className="open-on-weekends dont-open">
                              <FiInfo size={32} color="#ff669d" />
                           Não atendemos <br />
                           fim de semana
                           </div>
                        )}
                  </OpenDetails>

                  <ContactButton>
                     <FaWhatsapp size={20} color="#FFF" />
                     Entrar em contato
                  </ContactButton>
               </OrphanageDetailsContent>
            </OrphanageDetailsContainer>
         </Content>
      </Container>
   );
}

export default OrphanageDetails;