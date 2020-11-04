import styled from 'styled-components';

interface props {
   colorFirstIcon?: string;
   colorSecondIcon?: string;
}

export const Container = styled.aside`
   position: fixed;
   height: 100%;
   padding: 32px 24px;
   background: linear-gradient(329.54deg, #15B6D6 0%, #15D6D6 100%);
   display: flex;
   flex-direction: column;
   justify-content: space-between;
   align-items: center;

   img {
      width: 48px;
   }
`

export const Children = styled.div<props>`
   #first {
      outline: 0;
      margin-top: 10px;
      width: 48px;
      height: 48px;
      border: 0;
      background: ${(p: props) => p.colorFirstIcon ? `${p.colorFirstIcon}` : '#12AFCB'};
      border-radius: 16px;
      cursor: pointer;
      transition: background-color 0.2s;
      display: flex;
      justify-content: center;
      align-items: center;

      img{
         width: 20px;
         color: #FFF;
      }
   }

   #second {
      outline: 0;
      margin-top: 10px;
      width: 48px;
      height: 48px;
      border: 0;
      background: ${(p: props) => p.colorSecondIcon ? `${p.colorSecondIcon}` : '#12AFCB'};
      border-radius: 16px;
      cursor: pointer;
      transition: background-color 0.2s;
      display: flex;
      justify-content: center;
      align-items: center;

      img{
         width: 20px;
         color: #FFF;
      }
   }
`

export const Button = styled.button`
   margin-top: 20px;
   width: 48px;
   height: 48px;
   border: 0;
   background: #12AFCB;
   border-radius: 16px;
   cursor: pointer;
   transition: background-color 0.2s;
   display: flex;
   justify-content: center;
   align-items: center;

   &:hover{
      background: #17D6EB;
   }

   #powerof{
      width: 25px;
   }
`
