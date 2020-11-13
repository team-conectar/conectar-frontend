import styled from 'styled-components';
export const BodyNavBar=styled.header` width:100%;
margin:0 auto;
background:transparent;
display: flex;
justify-content:space-between;
align-items: center;
padding: 1.2rem;
img {
    width: 12rem;
}

.searchBlock {
    border: 2px solid var(--green);
    height: 2rem;
    margin-top: 0.2rem;
    padding: 0;
    border-radius: 0.3rem;
    display: flex;
    align-items: center;
    input {
        border: 0;
        width: 20vw;
        background: transparent;
        height: 2rem;
        color: var(--white);
        outline: 0;
        padding: 0 0.6rem;
    }
    button {
        border: 0;
        background: transparent;
        padding: 0 0.4rem;
        border-right: 2px solid var(--green);
        cursor: pointer;
        img {
            width: 16px;
        }
    }
}

aside {
    display: flex;
    align-items: center;
    a {
        text-decoration: none;
        font: 500 0.9rem Roboto;
        color: var(--white);
    }
    .create {
        padding: 0.4rem 0.6rem;
        border-radius: 0.2rem;
        background-color: var(--green);
        transition: background-color 0.2s;
    }
    a+a {
        margin-left: 20px;
    }
    #dropdown {
      position: relative;
      display: inline-block;
      #user {
          background: white;
          padding: .4rem;
          font-size: 18px;
          border-radius: 50%;
          border: solid 2px var(--green);
          cursor: pointer;
          margin: .2rem .6rem;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          img {
              width: 20px;
          }
      }
      .dropdown-content {
          display: block;
          position: absolute;
          background-color: white;
          width: 20rem;
          right: 0;
          margin-top: .8rem;
          box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
          z-index: 1;
          border-radius: .4rem;
          border: solid 2px var(--green);
          >section {
              padding: 1rem;
              display: grid;
              grid-template-columns: 1fr 2fr;
              grid-template-rows: repeat(3, 1rem);
              row-gap: .5rem;
              border-bottom: solid 1px var(--green);
              img {
                  grid-column: 1;
                  grid-row: 1 / 3;
                  border-radius: 50%;
                  width: 4rem;
                  height: 4rem;
                  border: solid 2px var(--green);
                  padding: .2rem;
              }
              legend {
                  grid-column: 2;
                  grid-row: 1;
              }
              p:nth-child(2) {
                  grid-column: 2;
                  grid-row: 2;
              }
              p:nth-child(3) {
                  grid-column: 2;
                  grid-row: 3;
              }
          }
          a {
              text-decoration: none;
              color: black;
              display:flex;
              padding:.6rem 1.2rem;
              margin:0;      
            }
          button{
            border:0;
            border-top:solid 1px var(--green);
            background:0;
            padding: .8rem 1.2rem;
            width:100%;
            text-align:start;
          }
          :before, :after{ //setas
            content:"";
            position: absolute;
            height: 0px;
            width: 0px;
            right: 15px;
            border-width: 12px;
            border-style: solid;
          } 
          :before{ //borda da seta
            top: -25.5px;
            border-color: transparent transparent var(--green) transparent;
          }
          :after{ //seta
            top: -22.5px;
            border-color: transparent transparent white transparent;
          }
      }
    }
}

`;