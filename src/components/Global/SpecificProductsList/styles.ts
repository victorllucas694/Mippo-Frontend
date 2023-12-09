import styled from "styled-components";

export const SpecificProductsListBoxWrapper = styled.div`
  width: 100%;
  height: auto;
  margin: auto;

  @media(max-width: 1280px) {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .header-product {
    width: 90%;
    margin: 2rem auto;
    height: 4rem;
    

    h1 {
      font-family: "Roboto";
      font-size: 1.7rem;
    }
  }

  .body-product {
    display: flex;
    width: 90%;
    margin: auto;
    flex-wrap: wrap;
    gap: 4rem;
    justify-content: center;
    height: auto;

    @media(max-width: 1280px) {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;
