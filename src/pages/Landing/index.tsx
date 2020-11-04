import React, { useContext } from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import './landing.css'

import AuthContext from '../../contexts';
import LogoImg from '../../images/Logo.svg';

const Landing: React.FC = () => {
   const history = useHistory();
   const { signed } = useContext(AuthContext);

   function handleLogin() {
      if(signed) {
         history.push('/dashboard');
      }else {
         history.push('/signin');
      }
   }

   return (
      <div id="page-landing">
         <div className="content-wrapper">
            <div className='box-1'>
               <img src={LogoImg} alt="" />

               <div className="location">
                  <strong>Camboriú</strong>
                  <span>Santa Catarina</span>
               </div>
            </div>

            <main>
               <h1>Leve felicidade para o mundo</h1>
               <p>Visite orfanatos e mude o dia de muitas crianças.</p>
            </main>

            <div className="acesso-restrito">
               <button onClick={handleLogin}>Acesso restrito</button>
            </div>

            <Link to="orphanages" className="enter-app">
               <FiArrowRight size={26} color="rgba(0, 0, 0, 0.6)" />
            </Link>
         </div>
      </div>
   )
}

export default Landing;