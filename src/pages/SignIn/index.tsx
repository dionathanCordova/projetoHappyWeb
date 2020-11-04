import React, { FormEvent, useCallback, useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import logo from '../../images/Logotipo.svg';
import Input from '../../components/Input';
import swal from 'sweetalert';

import AuthContext from '../../contexts';

import {
   Container,
   Aside,
   Content,
   PassInfo,
   Button
} from './styles';

const SignIn: React.FC = () => {
   const [rememberMe, setRememberMe] = useState(false);
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');

   const { signIn } = useContext(AuthContext);

   const history = useHistory();
   
   function handleRememberMe() {
      setRememberMe(!rememberMe);
   }

   const handleSubmit = useCallback( async(e: FormEvent) => {
      e.preventDefault();

      signIn(email, password, rememberMe).then(response => {
         if(response.signed) {
            history.push('/dashboard');
         }
      }).catch(err => {
         swal(
            "Ops!",
            'Credential not match',
            'warning'
         );
      });
   }, [email, history, password, rememberMe, signIn])

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
               <h2>Fazer login</h2>

               <form action="">
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

                  <PassInfo>
                     <label className="container">Lembrar-me
                        <input type="checkbox" checked={rememberMe} onChange={handleRememberMe} onClick={handleRememberMe} />
                        <span className="checkmark"></span>
                     </label>
                     <Link to="forgot-pass">Esqueci minha senha</Link>
                  </PassInfo>

                  <Button disabled={false} type="button" onClick={handleSubmit}>Entrar</Button>
               </form>
            </div>
         </Content>
      </Container>
   )
}

export default SignIn