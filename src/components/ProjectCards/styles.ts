import styled from 'styled-components';



export const BodyCard = styled.li`
list-style:none;
  >main{
    display:flex;
    flex-direction:column;
    padding:.6rem;
    gap:1rem;
    border-radius:.8rem .8rem 0 0;
    box-shadow: 0 0 1px 1px  var(--borderDivision);
    background:white;
    >aside{
      display:flex;
      width:100%;
      padding-bottom:.6rem;
      box-shadow: 0 2px 2px -2px var(--borderDivision);
      img{
        width:50%;
        height: 180px;
        object-fit:cover;
        object-position: center;
      }
      >section{
        color:var(--green-bg);
        width:50%;
        display:flex;
        flex-direction:column;
        gap:.4rem;
        justify-content:center;
        align-items: center; 
        h3{

        }
        ul{
          li{

          }
        }
        p{
          color:var(--gray);

        }
      }
    }
  }
  >aside{
    width:100%;
    display:flex;
    button{
      width:50%;
      display:flex;
      justify-content:center;
      align-items:center;
      padding: .4rem 0;
      border:0;
      :nth-child(1){
        border-radius: 0 0 0 .8rem;
      }
      :nth-child(2){
        border-radius: 0 0 .8rem 0;
      }
      background:white;
      box-shadow: 0 0 1px 1px  var(--borderDivision);
    }
  }
  
`;