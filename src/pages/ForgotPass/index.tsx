import React, { FormEvent, useCallback, useState } from 'react';

import logo from '../../images/Logotipo.svg';
import Input from '../../components/Input';
import swal from 'sweetalert';
import { FiArrowLeft } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

import {
   Container,
   Aside,
   Content,
   Button
} from './styles';
import api from '../../services/api';

const ForgotPass: React.FC = () => {
   const [ rememberMe, setRememberMe ] = useState(false);
   const [ email, setEmail ] = useState('');
   const [ disabled, setDisabled ] = useState(true);

   const history = useHistory();

   const handleChangeDisabled = useCallback((e: string) => {
      setEmail(e);
      setDisabled(e !== '' ? false : true);
   }, []);

   const handleSubmit = useCallback(async(e: FormEvent) => {
      e.preventDefault();

      const response = await api.post('forgotpass', {
         email
      });
      
      if(response.data.status == 'erro') {
         swal(
            "Ops!",
            'Não temos registro deste email',
            'warning'
         );

         return;
      }
      console.log(response.data);

   }, [])

   return (
      <Container>
         <Aside>
            <div id='aside-logo'>
               <img src={logo} alt="happy logo" />
            </div>

            <div id="aside-cidade">
               <strong>Camboriú</strong>
               <span>Santa Catarina</span>
            </div>
         </Aside>

         <Content>
            <button id="btn-back" onClick={() => history.goBack()}>
               <FiArrowLeft size={28} color='#64c4d7' />
            </button>

            <div className="form-content">
               <h2>Esqueci a senha</h2>

               <p>Sua refefinição de senha será enviada para o e-mail cadastrada</p>

               <form action="">
                  <Input
                     type="email"
                     name="email"
                     value={email}
                     onChange={(e) => handleChangeDisabled(e.target.value)}
                     label="E-mail"
                  />

                  <Button disabled={disabled} type="submit" onClick={handleSubmit}>Entrar</Button>
               </form>
            </div>
         </Content>
      </Container>
   )
}

export default ForgotPass