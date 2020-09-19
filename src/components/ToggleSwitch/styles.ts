import styled from 'styled-components';



export const BodySwitch = styled.div`
    display:flex;
    flex-flow:row-reverse wrap;
    align-items:center;
    margin:0.6rem;
    label{
        margin-left:0.8rem;
        color:var(--orange);
    }
    .switch { 
        position : relative ;
        display : inline-block;
        width : 46px;
        height : 22px;
        background-color: white;
        border:solid 2px var(--green-bg);
        border-radius: 20px;
        cursor: pointer;
        ::after {
            content: '';
            position: absolute;
            width: 18px;
            height: 18px;
            border-radius: 50%;
            background-color: var(--green);
            border:solid 2px var(--green-bg);
            top: -2px; 
            left: -2px;
            transition: all 0.3s;
        }
    }
    .checkbox:checked + .switch {
        background-color: var(--green-bg);
        ::after {
            left : 22px; 
        }
    }
    .checkbox { 
        display : none;
    }
    

`;
