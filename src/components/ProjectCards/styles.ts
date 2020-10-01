import styled from 'styled-components';



export const BodyCard = styled.div`
  background-color:var(--green-bg);
  width:320px;
  height:288px;
  border-radius:0.5rem;
  display:flex;
  margin:calc(1vw - 0.1rem) 0.2rem;
  flex-direction:column;
  justify-content:flex-start;
  align-items:center;

  a{
    img{
      width:320px;
      border-radius: 0.5rem 0.5rem 0 0;
      height:126px;
      border-bottom:2px solid var(--yellow);
    }
  }
  main{
    width:90%;
    display:grid;
    grid-template-rows:  104px 56px;
    grid-template-columns: 240px 48px;
    grid-template-areas: "textos icones" "membros progresso";

    .description{
      padding:0.2rem;
      border-bottom:1px solid var(--yellow);
      a{
        text-decoration:none;
        color:var(--white);
      }
      
      .areas{
        display:flex;
        flex-flow:row wrap;
        a{
        margin:0.1rem;
        padding: 0.1rem 0.1rem;
        border-radius:0.2rem;
        color:var(--green-bg);
        background-color:var(--yellow);
        transition: background-color 0.2s;
        font:700 0.8rem Roboto;
        }
      }
    }
    .icons{
      grid-area:icones;
      display:flex;
      flex-direction:column;
      justify-content:center;
      align-items:center;
      border-bottom:1px solid var(--yellow);
      p{
        color:var(--white);
        font:400 0.8rem Roboto;
      }

    }
    .members{
      grid-area:membros;
      display:flex;
      justify-content:flex-start;
      align-items:center;
      img{
        margin:0 0.2rem;
        clip-path:circle(50%);
        width:40px;
        height:40px;
      }
    }
  }
  
`;