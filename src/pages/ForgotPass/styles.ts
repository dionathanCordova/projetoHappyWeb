import styled from 'styled-components';

export const Container = styled.div`
   width: 100vw;
   height: 100vh;
   position: relative;
   display: flex;
`
export const Aside = styled.aside`
   width: 80%;
   background: linear-gradient(329.54deg, #29B6D1 0%, #00C7C7 100%);
   padding: 80px;
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   
   #aside-cidade {
      margin-top: 80px;
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: 20px;
   }
`
export const Content = styled.div`
   background: #FFF;
   width: 800px;
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;

   #btn-back {
      border: none;
      outline: 0;
      background: #ebf2f5;
      width: 48px;
      height: 48px;
      border-radius: 15px;
      position: absolute;
      right: 40px;
      top: 40px;
      z-index: 10;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: background 0.2s;

      &:hover{
         background: #dcebf2;
      }
   }

   .form-content {
      width: 80%;

      h2 {
         color: #5C8599;
         font-family: Nunito_700Bold, sans-serif;
         margin-bottom: 20px;
      }

      p{
         color: #5C8599;
         width: 500px;
         margin-bottom: 20px;
      }
   }
   
`

export const Button = styled.button`
	margin-top: 2rem;
	width: 100%;
	background: #37C77F;
	color: #FFF;
	font-weight: 700;
	padding: 1.2rem;
   border-radius: .8rem;
   outline: 0;
	border: 0;
	transiction: background-color 0.2s;

   &:disabled{
      background: #9be3bf;
      color: #FFF;

      &:hover{
         background: #9be3bf;
      }
   }

   &:hover{
		background: #76e28d;
   }
`