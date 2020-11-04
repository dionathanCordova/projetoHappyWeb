import React from 'react';
import { useHistory } from 'react-router-dom';
import Vector from '../../images/Vector.svg';

import {
   Container,
   Content
} from './styles';

const PageConfirm: React.FC = () => {
   const history = useHistory();
   
   return (
      <Container>
         <Content>
            <div className="first-box">
               <h1>Ebaaa!</h1>

               <p>
                  O cadastro deu certo e foi enviado
                  ao administrador para ser aprovado.
                  Agora é só esperar :)
               </p>

               <button onClick={() => history.push('/orphanages')}>Voltar para o mapa</button>
            </div>

            <div className="secont-box">
               <img src={Vector} alt=""/>
            </div>
         </Content>
      </Container>
   )
}

export default PageConfirm;