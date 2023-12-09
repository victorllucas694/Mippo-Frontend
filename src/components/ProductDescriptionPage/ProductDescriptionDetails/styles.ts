import styled from "styled-components";

export const ProductDetails = styled.div`
    width: 100%;
    height: auto;
    padding: 1rem;

    .detail-container {
        width: 80%;
        height: 80rem;
        border: 1px solid black;
        margin: auto;
    }
`;

export const HeaderProductDetail = styled.div`
    width: 100%;
    height: auto;
    border-bottom: 1px solid black;
    height: 4rem;

    .box-detail {
        width: 14rem;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        border-bottom: 4px solid black;

        h1 {
            font-family: 'Open Sans';
            font-size: 1.4rem;
        }
    }
`;