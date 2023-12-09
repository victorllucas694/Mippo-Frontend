import styled from "styled-components";

export const TicketsManagement = styled.div`
    width: 100%;
    height: 12rem;
    display: flex;
    justify-content: space-around;
    padding: 1rem;

    .box-order {
        width: 28%;
        height: 9rem;
        margin: auto;
        border: 1px solid rgb(220, 220, 220);
        border-left: 1px solid rgb(120, 120, 150);
        border-radius: 3px;
        padding: 2.5rem;

        h1 {
            font-size: 1.6rem;
            margin: 0rem 1rem;
            font-weight: 300;
            font-family: 'Roboto';
        }

        p {
            font-size: 1rem;
            font-family: 'Roboto';
        }
    }

    .active {
        background-color: rgb(245, 245, 245);
        border-left: 1px solid darkblue;
        border-right: none;
        border-bottom: none;
        border-top: none;
        

    }
`;