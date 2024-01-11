import styled from "styled-components";

export const PaymentAllSteps = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  margin: 4rem 0rem;
  justify-content: space-between;
  flex-wrap: wrap;

  .body-data {
    width: 60%;
    height: auto;
    margin: auto;

    @media (max-width: 1280px) {
      width: 90%;
    }

    .delivery-data {
      width: 100%;
      height: auto;
      padding: 1rem;
      border: 1px solid rgb(240, 240, 240);
      box-shadow: 2px 2px 20px rgb(240, 240, 240);
      border-radius: 5px;
      min-height: 10vh;

      .papers-address {
        width: 100%;
        display: flex;
        justify-content: flex-start;
        height: auto;
      }

      .header-delivery-data {
        width: 100%;
        display: flex;
        justify-content: space-between;
        min-height: 10vh;
        height: 8vh;

        .title-delivery-data {
          display: flex;
          justify-content: flex-start;
          gap: 1rem;
          align-items: center;
          width: 60%;
          height: 100%;

          h1 {
            font-size: 1.5rem;
            font-weight: 300;
            margin: 0 2rem;
            font-family: "Roboto";
          }
        }
      }
    }

    .payment-data {
      width: 100%;
      min-width: 30rem;
      height: auto;
      padding: 1rem;
      flex-direction: column;
      border: 1px solid rgb(240, 240, 240);
      box-shadow: 2px 2px 20px rgb(240, 240, 240);
      border-radius: 5px;

      h5 {
        font-size: 1rem;
        cursor: pointer;
        margin: 2rem;
        font-weight: 400;
        font-family: "Roboto";
        color: #1976d2;
      }

      p {
        font-size: 1rem;
        margin: 1rem 2rem;
      }

      .header-payment-data {
        width: 100%;
        display: flex;
        justify-content: space-between;

        .title-payment-data {
          display: flex;
          justify-content: flex-start;
          gap: 1rem;
          width: 70%;
          margin: 2rem 0;
          height: 100%;

          h1 {
            font-size: 1.2rem;
            font-weight: 300;
            margin: 0 2rem;
            width: 70%;
            font-family: "Roboto";
          }
        }
      }
    }
  }

  .cart-data {
    padding: 2rem;
    min-height: 50vh;
    overflow-y: scroll;
    max-height: 80vh;
    margin: 0 auto;
    width: 32%;
    height: auto;
    border: 1px solid rgb(240, 240, 240);
    box-shadow: 2px 2px 20px rgb(240, 240, 240);

    @media (max-width: 1280px) {
      width: 90%;
      margin: 2rem auto;
    }

    .body-cart-items {
      width: 100%;
      height: auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 1rem;
      padding: 1rem;

      .all-final-data {
        width: 100%;
        height: auto;
      }

      .all-data {
        width: 100%;
        height: auto;
      }

      .item-product {
        width: 100%;
        padding: 1rem;
        min-height: 3rem;
        display: flex;
        margin: 1rem 0;
        align-items: center;
        justify-content: space-between;
        position: relative;
        gap: 1rem;

        .products-images {
          width: 7rem;
          height: 7rem;
          border: 1px solid rgb(220, 220, 220);
          display: flex;
          border-radius: 3px;
          justify-content: center;
          align-items: center;

          img {
            padding: 1rem;
            max-width: 100%;
            margin: auto;
            height: auto;
          }
        }

        h1 {
          font-size: 1rem;
          font-weight: 300;
          font-family: "Roboto";
        }

        .layer-product {
          display: flex;
          justify-content: space-between;
          width: 100%;
          height: auto;
          flex-direction: column;

          h1 {
            font-size: 1rem;
            font-weight: 300;
            font-family: "Roboto";
          }
        }
      }
    }

    .header-cart-items {
      width: 100%;
      height: 4rem;
      display: flex;
      align-items: center;

      h1 {
        font-size: 1.2rem;
        font-weight: 300;
        font-family: "Roboto";
      }
    }
  }
`;

export const ButtonSection = styled.div`
  width: 50px;
  height: 50px;
  background-color: rgb(210, 63, 87);
  border-radius: 80px;
  display: flex;
  align-items: center;
  justify-content: center;

  p {
    font-size: 1.3rem;
    color: white;
  }
`;

export const ModalBox = styled.div`
  width: 45%;
  height: 100vh;
  position: absolute;
  left: 55%;
  padding: 2rem;
  background-color: white;

  .items-modal-12 {
    width: 100%;
    height: auto;
  }
`;

export const PaperBox = styled.div`
  width: 15rem;
  height: 8rem;
  background-color: rgb(248, 248, 248);
  margin: 2rem;

  .body-paper {
    width: 95%;
    margin: auto;
    height: 5rem;
    display: flex;
    align-items: center;
    justify-content: center;

    h1 {
      font-weight: 400;
      color: rgb(5 0, 50, 50);
      font-family: "Roboto";
      margin: 0 1rem;
      font-size: 0.9rem;
    }
  }

  .header-paper {
    width: 100%;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: space-between;

    h1 {
      font-weight: 400;
      font-family: "Roboto";
      margin: 0 1rem;
      font-size: 0.86rem;
    }

    .buttons-header {
      width: 35%;
      height: 100%;
      display: flex;
      justify-content: space-between;

      .icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 50%;
        height: 100%;
      }
    }
  }
`;
