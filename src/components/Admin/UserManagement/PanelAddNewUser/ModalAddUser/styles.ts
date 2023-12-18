import styled from "styled-components";

export const ModalBoxWrapper = styled.div`
    width: 60%;
    position: absolute;
    left: 40%;
    height: 100vh;
    border: 1px solid;  
    padding: 4rem;
    background-color: white;


    .all-inputs {
        width: 100%;
        height: auto;
        /* margin: 5rem 0; */
        display: flex;
        gap: 2rem;
        margin: 2rem auto;
    }

    .all-buttons {
        width: 100%;
        height: auto;
        display: flex;
        justify-content: flex-end;
        gap: 2rem;
        margin: 2rem auto;
    }
`;