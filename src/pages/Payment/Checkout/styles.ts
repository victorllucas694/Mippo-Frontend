import styled from "styled-components";

export const PaymentAllSteps = styled.div`
  width: 100%;
  min-height: 80vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .products-data-payment {
    width: 50%;
    border: 1px solid;
    height: 80vh;
    min-width: 45rem;
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .products-by-express {
      width: 100%;
      border: 1px solid;
      height: 80vh;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .header-products {
      width: 100%;
      height: 5rem;
      border: 1px solid;
      display: flex;
      align-items: center;

      .circle-data {
        box-shadow: 2px 2px 10px rgb(240, 240, 240);
        border: 1px solid rgb(230, 230, 230);
        margin: 0.4rem 5rem;
        width: 4rem;
        border-radius: 4rem;
        height: 4rem;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      h1 {
        font-family: "Open Sans";
        font-size: 1.2rem;
        font-weight: 300;
      }
    }
  }

  .products-data {
    border: 1px solid;
    width: 50%;
    height: 80vh;
  }
`;
