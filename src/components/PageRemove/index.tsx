import React from 'react';
import { useHistory } from 'react-router-dom';
import VectorExcluir from '../../images/VectorExcluir.svg';

import {
   Container,
   Content
} from './styles';

const PageRemove: React.FC = () => {
   const history = useHistory();
   
   return (
      <Container>
         <Content>
            <div className="first-box">
               <h1>Excluído!</h1>

               <p>
                  Seu registro acaba de ser excluído do nosso sistema.
               </p>

               <button onClick={() => history.push('/orphanages')}>Voltar para o mapa</button>
            </div>

            <div className="secont-box">
               <img src={VectorExcluir} alt=""/>
            </div>
         </Content>
      </Container>
   )
}

export default PageRemove;