import styled from "styled-components";

export const InventoryTableRootContainer = styled.div`
    width: 100%;
    height: auto;
    padding: 1rem;
`;

export const ImageContainer = styled.div`
    width: 100%;
    height: 4.5rem;
    border-radius: 5px;
    border: 1px solid rgb(230, 230, 230);
    background-color: rgb(250, 250, 250);
`;

export const StatusProduct = styled.div`
    width: 40%;
    margin: auto;
    border-radius: 10px;
    display: flex;
    height: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;

    .circle-button {
        width: 6px;
        border-radius: 6px;
        height: 6px;
        background-color: rgb(51, 208, 103);
    }

    .circle-data-button {
        width: 6px;
        border-radius: 6px;
        height: 6px;
        background-color: rgb(51, 208, 103);
    }

    p {
        font-family: 'Open Sans';
        color: rgb(33 121 63);
        margin: 1rem;
        font-weight: 600;
        font-size: .9rem;
    }
`;