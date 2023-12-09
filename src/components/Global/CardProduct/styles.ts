import styled from "styled-components";

export const CardBox = styled.div`
  width: 20rem;
  height: 32rem;
  margin: auto;
  cursor: pointer;

  &:hover {
    border: 1px solid rgb(240, 240, 240);
  }
`;

export const OffBox = styled.div`
  max-width: 25rem;
  min-width: 120px;
  display: flex;
`;

export const DescriptionProductCard = styled.div`
  width: 100%;
  margin: 0.5rem auto;
  height: 3rem;
`;

export const PriceProductCard = styled.div`
  margin: 0.5rem auto;
  width: 100%;
  height: 6.5rem;

  h1 {
    font-size: 1.7rem;
  }
`;

export const BoxCountAdd = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  height: 4rem;
  margin-top: -2rem;

  .quantity-product {
    width: 30%;
    border-radius: 3px;
    border: 1px solid rgb(220, 220, 220);
    height: 3rem;
    margin: auto;
  }

  .button-purchase {
    width: 65%;
    border: 1px solid rgb(220, 220, 220);
    border-radius: 3px;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-family: "Roboto";
    background-color: #00438b;
    color: white;
    margin: auto;
  }
`;
