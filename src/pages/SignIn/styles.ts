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
   }

   .form-content {
      width: 80%;

      h2 {
         color: #5C8599;
         font-family: Nunito_600SemiBold, sans-serif;
         margin-bottom: 20px;
      }
   }
   
`

export const PassInfo = styled.div`
	display: flex;
	font-size: 1.2rem;
	color: #8FA7B2;
	padding-top: 2rem;
   padding-bottom: 2rem;
   
	.container {
		width: 40%;
		display: block;
		position: relative;
		padding-left: 35px;
		margin-bottom: 12px;
		cursor: pointer;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
      
		input {
			position: absolute;
			opacity: 0;
			cursor: pointer;
			height: 0;
			width: 0;
      }
      
		.checkmark {
			position: absolute;
			top: 0;
			left: 0;
			height: 25px;
			width: 25px;
       
         background: #5C8599
         border-radius: 8px;
         border: 1px solid #5C8599;
         border-radius: 8px;
		}
   }
   
	a {
		margin-left: auto;
		font-size: 1.2rem;
		color: #8FA7B2;
		text-decoration: none;
		transition: -webkit-filter .2s;
		transition: filter .2s;
		transition: filter .2s, -webkit-filter .2s;
   }
   
	.container input:checked ~ .checkmark {
      background-color: #37C77F;
   }
   
	.container input:checked ~ .checkmark:after {
		display: block;
	}
	  
	.checkmark:after {
		content: "";
		position: absolute;
		display: none;
	}
	  
	.container .checkmark:after {
		left: 8px;
		top: 3px;
		width: 5px;
		height: 10px;
		border: solid white;
		border-width: 0 3px 3px 0;
		-webkit-transform: rotate(45deg);
		-ms-transform: rotate(45deg);
		transform: rotate(45deg);
   }
`
export const Button = styled.button`
	margin-top: 0.5rem;
	width: 100%;
	background: #37C77F;
	color: #FFF;
	font-weight: 700;
	padding: 1.2rem;
   border-radius: .8rem;
   outline: 0;
	border: 0;
	transiction: background-color 0.2s;
	&:hover{
		background: #76e28d;
	}
`