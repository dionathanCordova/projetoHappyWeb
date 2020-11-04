import styled from 'styled-components';

export const Container = styled.div`
   background: #6cc880;
   height: 100vh;

   display: flex;
   align-items: center;
   justify-content: center;

`

export const Content = styled.div`
   display: flex;
   flex-direction: row;

   align-items: center;
   justify-content: center;

   .first-box{
      text-align: center;
      color: #fff;
      font-family: Nunito_800Bold, sans-serif;
      margin-right: 150px;

      h1{
         font-size: 70px;
         font-weight: bold;
      }
      
      p{
         width: 400px;
      }

      button {
         margin-top: 40px;
         background: #31B272;
         border: 0;
         height: 60px;
         width: 200px;
         border-radius: 10px;
         color: #fff;
         transition: background 0.2s;

         :hover{
            background: #3BD689;
         }
      }
   }

   .second-box{
      height: 100vh;
   }

`