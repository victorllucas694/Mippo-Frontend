import styled from "styled-components";

export const PaymentAllSteps = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 1rem;
  margin: 4rem 0;

  .body-cards {
    width: 48%;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    min-height: 40rem;
    height: auto;
    padding: 1rem;

    .prices-values {
      width: 90%;
      margin: 1rem auto;
      height: auto;
      min-height: 8rem;
      padding: 1rem;
      border-bottom: 1px solid rgb(230, 230, 230);

      .prices {
        width: 100%;
        height: 4rem;
        display: flex;
        justify-content: space-between;
        padding: 1rem;
        align-items: center;

        h3 {
          font-size: 1rem;
          color: rgb(80, 80, 80);
        }
      }
    }

    .cart-values {
      width: 80%;
      height: auto;
      margin: 0 auto;
      min-height: 30rem;
      box-shadow: 3px 3px 16px -8px rgb(220, 220, 220);
      border: 1px solid rgb(230, 230, 230);

      .header-cart {
        min-height: 4rem;
        width: 90%;
        margin: 1rem auto;
        border-bottom: 1px solid rgb(230, 230, 230);

        h1 {
          font-size: 1.6rem;
          font-family: 'Roboto';
          margin: 2rem;
        }
      }

      .shipping-cart-code {
        width: 90%;
        margin: auto;
        display: flex;
        justify-content: space-between;
        height: 4rem;
      }

    }
  }
`;
