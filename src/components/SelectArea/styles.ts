import styled from 'styled-components';



export const BodySelectArea = styled.div`
  margin: 0.3rem 0 ;
  >label{
    display:flex;
    justify-content:space-between;
    align-items:center;
    font: 400 1rem Roboto;
    color:var(--orange);
  }
  >div{
    margin-top: 0.2rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows:1fr;
    grid-gap:0;
    border:2px solid var(--yellow);
    border-radius:0.4rem ;
  .area-selecao, .area-selecionadas{
    height:60vh;
  }
  .area-selecao{
      border-right:2px solid var(--yellow);
      grid-column:1;
      grid-row:1;
      height:60vh;
      .area-rolagem{
        height:100%;
        overflow-y: auto;
        > button{
          background:none;
          display: flex;
          justify-content:flex-start;
          align-items:center;
          height:10%;
          width:100%;
          border:0;
          border-bottom:2px solid var(--yellow);
          padding:0 1.4rem;
          color:var(--orange);
          font:500 1rem Roboto;
        }
      }
      .area-subarea{    
        height:100%;
        header{
          position:relative;
          display: flex;
          justify-content:center;
          align-items:center;
          height:10%;
          border-bottom:2px solid var(--yellow);
          padding:0 0.4rem;
          legend{
            color:var(--green-bg);
            font:500 1rem Roboto;
          }
          button{
            position:absolute; 
            left:1rem;
            border:1px solid var(--green-bg);
            border-radius:0.2rem;
            padding:0.2rem;
            background:none;
            color:var(--green-bg);
            
          }
        }
        >fieldset{
          height:90%;
          overflow-y:auto;
          overflow-x:hidden;
          >button{
            position:relative;
            margin-top:1px;
            width:100%;
            cursor:pointer;
            background:none;
            display: flex;
            justify-content:space-between;
            align-items:center;
            height:10%;
            border:0;
            border-bottom:2px solid var(--yellow);
            padding:0 1.4rem;
            font:500 1rem Roboto;
            strong,span{
              color:var(--green);
              font-size:1.3rem;
            }
            span{
              position:absolute;
            }
            legend{
              color:var(--orange);
              display:flex;
              align-items:center;
              justify-content:center;
              margin-left:0.4rem; 
              width:100%;
              
            }
          }

        }   
      }
    }
    .area-selecionadas{
      grid-column:2;
      grid-row:1;
      width:100%;
      >legend{
        display:flex;
        justify-content:center;
        align-items:center;
        height:10%;
        width:100%;
        background:var(--green-bg);
        color:white;
        font:500 1.2rem Roboto;
        border-top-right-radius:0.4rem;
      }
      fieldset{
        height:90%;
        overflow-y:auto;
        >label{
          display: flex;
          justify-content:space-between;
          align-items:center;
          width:100%;
          height:9%;
          margin-top:1px;
          background:none;
          border:0;
          border-bottom:2px solid var(--yellow);
          padding:0 1.4rem;
          font:500 1rem Roboto;
          >svg{
            color:var(--green);
            font-size:1.3rem;
          }
          >img{
            cursor:pointer;
            height:2.5rem;
            cursor:pointer;
          }
        }
        legend{
          color:var(--green-bg);
          display:flex;
          align-items:center;
          justify-content:flex-start;
          margin-left:0.4rem; 
          width:100%;
          font:500 1rem Roboto;

        }
      }
    }
  }
`;