import React, { useContext } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { useHistory, Link } from 'react-router-dom';
import { ReactNode } from 'react';

import mapMarkerImg from '../../images/map-marker.svg';
import power from '../../images/power.svg';

import AuthContext from '../../contexts';

import {
   Container,
   Button,
   Children
} from './styles'

interface AsideProps {
   children: ReactNode;
   colorFirstIcon?: string;
   colorSecondIcon?: string;
   signout?: boolean
}

export default function Sidebar({ children, colorFirstIcon, colorSecondIcon, signout }: AsideProps) {
   const { signOut } = useContext(AuthContext);
   const { goBack } = useHistory();
   const historiy = useHistory();

   function handleLogout() {
      signOut();
      historiy.push('/');
   }

   return (
      <Container>
         <Link to="/">
            <img src={mapMarkerImg} alt="Happy" />
         </Link>

         <Children colorFirstIcon={colorFirstIcon} colorSecondIcon={colorSecondIcon}>
            {children}
         </Children>

         {signout ? (
            <footer>
               <Button type="button" onClick={handleLogout}>
                  <img id="powerof" src={power} alt=""/>
               </Button>
            </footer>
         ) : (
            <footer>
               <Button type="button" onClick={goBack}>
                  <FiArrowLeft size={24} color="#FFF" />
               </Button>
            </footer>
         )}

      </Container>
   )
}