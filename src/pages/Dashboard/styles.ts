import styled from 'styled-components';

interface ButtonProps {
   bgColor?: string;
}

export const Container = styled.div`
   width: 90vw;
   height: 100vh;
`

export const Aside = styled.aside<ButtonProps>`
   width: 80px;
   background: linear-gradient(329.54deg, #29B6D1 0%, #00C7C7 100%);

   button {
      outline: 0;
   }
`

export const Content = styled.div`
   width: 85vw;
   margin-left: 200px;
   height: 100px;
   display: flex;
   flex-direction: column;
   justify-content: space-between;
   padding-top: 100px;

   .title{
      font-family: Nunito_800ExtraBold, sans-serif;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      width: 90%;
      height: 80px;
      border-bottom: 1px solid #D3E2E5;

      color: #4D6F80;

      p{
         color: #8FA7B2;
      }
   }
`
export const MapContainer = styled.div`
   display: grid;
   align-items: center;
   grid-template-columns: repeat(2, minmax(240px, 1fr));
   max-width: 77vw;

`

export const MapContent = styled.div`

   margin: 4px 3px;
   background: #FFF;
   border: 1px solid #B3DAE2;
   border-radius: 20px;

   .footer {

      padding: 20px 0;
      display: grid;
      column-gap: 20px;
      grid-template-columns: 4fr 1fr;
      background: #FFF;
      border-radius: 40px;

      a {
         font-size: 25px;
         padding: 20px 20px;
         color: #4D6F80;
         text-decoration: none;
         font-family: Nunito_600SemiBold, sans-serif;
         vertical-align: baseline;
         line-height: normal;
      }

      #btnGroup{
         align-self: center;
         display: flex;
         flex-direction: row;
         margin-right: 0;

         button{
            margin-right: 10px;
            width: 60px;
            height: 60px;
            border: 0;
            border-radius: 16px;
         }
      }

   }

   .leaflet-container {
      border-bottom: 1px solid #DDE3F0;
      border-radius: 20px;
   }
`
export const EmptyContent = styled.div`
   margin:auto;
   width: 80vw;
   margin-top: 30vmin;
   text-align: center;
`

     