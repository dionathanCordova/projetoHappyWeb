import React, { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import { Map, Marker, TileLayer } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet'
import { useHistory } from "react-router-dom";
import { FiPlus } from "react-icons/fi";

import Sidebar from "../../components/Sidebar";
import happyMapIcon from "../../utils/mapIcon";
import AuthContext from '../../contexts';

import './styles.css';
import api from "../../services/api";
import swal from 'sweetalert';
import Xcircle from '../../images/x-circle.svg';

export default function EditOrphanage(props: any) {
   const history = useHistory();
   const { user } = useContext(AuthContext);

   const [position, setPosition] = useState({ latitude: 0, longitude: 0 });

   const [id, setId] = useState('');
   const [name, setName] = useState('');
   const [about, setAbout] = useState('');
   const [instruction, setInstruction] = useState('');
   const [opening_hours, setOpeningHours] = useState('');
   const [open_on_weekends, setOpenOnWeekends] = useState(true);
   const [images, setImages] = useState<File[]>([]);
   const [previewImages, setPreviewImages] = useState<string[]>([]);
   const [latitude, setLatitude] = useState(0);
   const [longitude, setLongitude] = useState(0);
   const [orphanage_id, setOrphanageId] = useState(0);

   useEffect(() => {
      const orphanageId = props.match.params.id;
      setOrphanageId(orphanageId);

      api.get(`orphanages/details/${orphanageId}`).then(response => {
         const data = response.data;
         setLatitude(data.latitude);
         setLongitude(data.longitude);
         setName(data.name);
         setInstruction(data.instruction);
         setOpeningHours(data.opening_hours);
         setOpenOnWeekends(data.open_on_weekends);
         setAbout(data.about);
         setPosition({ latitude: data.latitude, longitude: data.longitude });
         setImages(data.images);
         setId(data.id);

         handleOrphanageImages(data.images);
      })
   }, [props.match.params.id]);

   function handleSelectImages(event: ChangeEvent<HTMLInputElement>) {
      if (!event.target.files) {
         return
      }

      const selectedImages = Array.from(event.target.files);
      setImages(selectedImages);

      const selectedImagesPreview = selectedImages.map(image => {
         return URL.createObjectURL(image);
      })

      setPreviewImages(selectedImagesPreview);
   }

   function handleOrphanageImages(images: any[]) {
      const selectedImagesPreview = images.map((image: any) => {
         return image.url;
      })

      setPreviewImages(selectedImagesPreview);
   }

   async function handleSubmit(event: FormEvent) {
      event.preventDefault();

      const { latitude, longitude } = position;

      const data = new FormData();
      data.append('name', name);
      data.append('latitude', String(latitude));
      data.append('longitude', String(longitude));
      data.append('about', about);
      data.append('instruction', instruction);
      data.append('opening_hours', opening_hours);
      data.append('open_on_weekends', String(open_on_weekends));
      data.append('orphanage_id', String(orphanage_id));

      images.forEach(image => {
         data.append('images', image);
      })

      await api.put('orphanages', data).then(response => {
         console.log(response);
         if (response.status === 201) {
            swal(
               "",
               'Cadastro realizado com sucesso! Aguarde até que este cadastro seja confirmado.',
               'success'
            );

            history.push('/orphanages');
         }
      }).catch(err => {
         console.log(err.message);

         swal(
            "",
            'Cadastro realizado com sucesso! Aguarde até que este cadastro seja confirmado.',
            'warning'
         );
      });
   }

   function handleMapClick(event: LeafletMouseEvent) {
      const { lat, lng } = event.latlng;

      setPosition({
         latitude: lat,
         longitude: lng
      })
   }

   function handleRemoveImage(index: number) {
      const oldImages = [ ...previewImages];
      oldImages.splice(index, 1);
      setPreviewImages(oldImages);
   }

   async function handleRemoveOrphanage(id: string) {
      swal(
         "Olá!",
         'Deseja realmente remover este registro? ', {
            buttons: ["Não!", "Sim!"],
      }).then((willDelete) => {
         if (willDelete) {
            api.delete(`orphanages/${user.id}/${id}`).then(response => {
               if(response.data.status === 'ok') {
                  history.push('/orphanage/removeconfirm');
               }
            }).catch(err => {
               console.log(err.message);
            })
         }
      });
   }

   return (
      <div id="page-create-orphanage">

         <Sidebar>.</Sidebar>

         <main>
            <form className="create-orphanage-form" onSubmit={handleSubmit}>

               <fieldset>
                  <legend>Dados</legend>

                  <Map
                     center={[latitude, longitude]}
                     style={{ width: '100%', height: 280 }}
                     zoom={15}
                     onclick={handleMapClick}
                  >
                     <TileLayer
                        url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                     />

                     {position.latitude !== 0 && (
                        <Marker
                           interactive={false}
                           icon={happyMapIcon}
                           position={[
                              position.latitude,
                              position.longitude
                           ]}
                        />
                     )}

                  </Map>

                  <div className="input-block">
                     <label htmlFor="name">Nome</label>
                     <input id="name" value={name} onChange={event => setName(event.target.value)} />
                  </div>

                  <div className="input-block">
                     <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
                     <textarea id="name" value={about} onChange={event => setAbout(event.target.value)} maxLength={300} />
                  </div>

                  <div className="input-block">
                     <label htmlFor="images">Fotos</label>

                     <div className="images-container">
                        {previewImages.map((image, index) => {
                           return (
                              <div key={image}>
                                 <button id="removeImg" type="button" onClick={() => handleRemoveImage(index)}>
                                    <img src={Xcircle} alt="" />
                                 </button>
                                 <img id="uploadedImg" src={image} alt="" />
                              </div>
                           )
                        })}

                        <label htmlFor="image[]" className="new-image">
                           <FiPlus size={24} color="#15b6d6" />
                        </label>
                     </div>
                     <input multiple onChange={handleSelectImages} type="file" name="" id="image[]" />
                  </div>
               </fieldset>

               <fieldset>
                  <legend>Visitação</legend>

                  <div className="input-block">
                     <label htmlFor="instructions">Instruções</label>
                     <textarea
                        id="instructions"
                        value={instruction}
                        onChange={event => setInstruction(event.target.value)}
                     />
                  </div>

                  <div className="input-block">
                     <label htmlFor="opening_hours">Horario de funcionamento</label>
                     <input id="opening_hours" value={opening_hours} onChange={event => setOpeningHours(event.target.value)} />
                  </div>

                  <div className="input-block">
                     <label htmlFor="open_on_weekends">Atende fim de semana</label>

                     <div className="button-select">
                        <button type="button" className={open_on_weekends ? "active" : ''} onClick={() => setOpenOnWeekends(true)}>Sim</button>
                        <button type="button" className={!open_on_weekends ? "active" : ''} onClick={() => setOpenOnWeekends(false)}>Não</button>
                     </div>
                  </div>
               </fieldset>
            
               <div className="btnfooter">
                  <button className="remove-button" onClick={() => handleRemoveOrphanage(id)} type="button">
                     Remover
                  </button>

                  <button className="confirm-button" type="submit">
                     Confirmar
                  </button>
               </div>
            </form>
         </main>
      </div>
   );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
