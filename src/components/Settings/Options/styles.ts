import styled from "styled-components";

export const BoxOptions = styled.div`
    width: 100%;
    height: auto;
    padding: 1rem;
    display: flex;
    flex-direction: column;

    .header-notify {
        width: 100%;
        height: 4rem;
        display: flex;
        justify-content: space-between;
        h1 {
            font-size: 1.4rem;
            font-family: 'Roboto';
            color: rgb(80, 80, 80);
            font-weight: 300;
    
        }
        h2 {
            font-size: 1rem;
            font-family: 'Roboto';
            color: rgb(120, 120, 120);
            font-weight: 300;
        }

        p {
            font-size: 1rem;
            font-family: 'Roboto';
            color: #1976d2;
            font-weight: 500;
        }
    }

    .check-items {
        width: 100%;
        height: auto;    
        padding: 1rem;
        display: flex;
        flex-direction: column;
    }

`;