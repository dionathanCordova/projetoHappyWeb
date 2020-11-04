import React, { createContext, useCallback, useState } from 'react';
import api from '../services/api';

interface UserProps {
   id: string;
   name: string;
   email: string;
}

interface ResponseSignInUser {
   user: UserProps;
   token: string;
   rememberMe: boolean | null;
}

interface SignedResult {
   signed: boolean;
}

interface AuthContextData {
   signed: boolean;
   user: UserProps;
   signIn(
      email: string,
      password: string,
      remember: boolean
   ): Promise<{ signed: boolean }>;
   signOut: any;
   updateUser(user: UserProps): void;
   remember: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
   const [ user, setUser ]       = useState<UserProps>({} as UserProps);
   const [ signed, setSigned ]   = useState(false);

   const [ data, setData ] = useState<ResponseSignInUser>(() => {
      const storageUser    = localStorage.getItem('@AuthHappy:user');
      const storageToken   = localStorage.getItem('@AuthHappy:token');
      const remember       = (localStorage.getItem('@AuthHappy:remember') === 'true') ? true : false;

      if(storageUser && storageToken) {
         setSigned(true);
         return { user: JSON.parse(storageUser), token: storageToken, rememberMe: remember};
      }

      if(remember) {
         setSigned(true);
      }

      return {} as ResponseSignInUser;
   })

   async function signIn(email: string, password: string, rememberMe: boolean):Promise<SignedResult> {
     
     
      const reponse = await api.post<ResponseSignInUser>('auth', {
         email, 
         password
      })

      if(reponse.data) {
         const user = reponse.data.user;
         const token = reponse.data.token;

         localStorage.setItem("@AuthHappy:user", JSON.stringify(user));
         localStorage.setItem("@AuthHappy:token", token);
         
         localStorage.setItem("@AuthHappy:remember", rememberMe ? 'true' : 'false');

         setUser(user);
         setSigned(true);
         setData({user, token, rememberMe});
         
         return { signed : true}
      }
      
      setSigned(false);
      setUser({} as UserProps);
      setData({} as ResponseSignInUser);

      return { signed: false};
   }

   async function signOut() {
      localStorage.removeItem('@AuthHappy:user');
      localStorage.removeItem('@AuthHappy:token');
      localStorage.removeItem("@AuthProffy:remember");

      setUser({} as UserProps);
      setSigned(false);
      setData({} as ResponseSignInUser);

      return { signed: false};
   }

   const updateUser = useCallback((user: UserProps) => {
      localStorage.setItem("@AuthHappy:user", JSON.stringify(user));
      
      setData({
         token: data.token,
         user,
         rememberMe: data.rememberMe
      });

   }, [data.rememberMe, data.token])

   return (
      <AuthContext.Provider value={{ 
         user: data.user,
         signed: signed,
         remember: !!data.rememberMe,
         signIn,
         signOut,
         updateUser
      }}>
         {children}
      </AuthContext.Provider>
   )
}


export default AuthContext;