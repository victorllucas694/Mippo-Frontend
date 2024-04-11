import styled from "styled-components";

export const FindProductData = styled.div`
    width: 100%;
    min-width: 10rem;
    min-height: 30rem;
    border-radius: 4px;
    height: auto;
`;

export const TableAllProducts = styled.div`
    width: 100%;
    height: auto;

    .header-page {
        width: 100%;
        height: 6rem;
        display: flex;
        justify-content: space-between;
        align-items: center;


        h1 {
            font-weight: 300;
            font-family: 'Open Sans';
            font-size: 1.8rem;
        }

        .right-table {
            width: 20%;
            height: 6rem;
            display: flex;
            justify-content: space-around;
            align-items: center;
        }
    }
`;