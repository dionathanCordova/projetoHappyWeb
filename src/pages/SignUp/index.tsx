import React, { FormEvent, useCallback, useContext, useState } from 'react';

import logo from '../../images/Logotipo.svg';
import Input from '../../components/Input';
import { FiArrowLeft } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';

import AuthContext from '../../contexts';

import {
   Container,
   Aside,
   Content,
   Button
} from './styles';
import api from '../../services/api';

const SignUp: React.FC = () => {
   const history = useHistory();
   const [name, setName] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [confirm_password, setConfirmPassword] = useState('');
   const [disabled, setDisabled] = useState(true);

   const { signIn } = useContext(AuthContext);

   const handleSubmit = useCallback( async (e: FormEvent) => {
      e.preventDefault();

      if(name != '' && email != '' && password != '' && password.length > 5 && password == confirm_password) {
         await api.post('/user', {
            name,
            email,
            password,
            confirm_password
         }).then(response => {
            if(response.data.status == 'erro') {
               swal(
                  "Ops!",
                  `${response.data.message}`,
                  'warning'
               );
            }else{
               signIn(email, password, false).then(response => {
                  if(response.signed) {
                     history.push('/orphanages/create');
                  }
               });
            }
           
         }).catch(err => {
            console.log('erro :' + err.message);
         });
      }else {
         swal(
            "Ops!",
            'Credential not match',
            'warning'
         );
      }
      
   }, [password, email, confirm_password]);

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
               <h2>Fazer Cadastro</h2>

               <form action="">
                  <Input
                     type="name"
                     name="name"
                     label="Name"
                     value={name}
                     onChange={(e) => setName(e.target.value)}
                  />

                  <Input
                     type="email"
                     name="email"
                     label="E-mail"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                  />

                  <Input
                     type="password"
                     name="password"
                     label="Senha"
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                  />

                  <Input
                     type="password"
                     name="confirm-password"
                     label="Confirm a senha"
                     value={confirm_password}
                     onChange={(e) => setConfirmPassword(e.target.value)}
                  />

                  <Button disabled={false} type="button" onClick={handleSubmit}>Cadastrar</Button>
               </form>
            </div>
         </Content>
      </Container>
   )
}

export default SignUp