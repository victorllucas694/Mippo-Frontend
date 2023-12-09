import styled from "styled-components";

export const PresentationBox = styled.div`
  width: 100%;
  margin: auto;
  height: auto;

  .content-presentation {
    width: 80%;
    margin: 1rem auto;
    display: flex;
    justify-content: space-around;
    padding: 1rem;
    height: auto;

    @media (max-width: 1280px) {
      flex-wrap: wrap;
      width: 90%;
    }

    .image-presentation-product {
      width: 45%;
      max-height: 35rem;
      display: flex;
      max-width: 40rem;
      justify-content: space-between;

      @media (max-width: 1280px) {
        width: 80%;
      }

      .box-primary-image {
        border: 1px solid rgb(240, 240, 240);
        border-radius: 5px;
        width: 80%;
        border-radius: 5px;
        margin: auto;
        height: 80%;
      }

      .sub-boxes-images {
        width: auto;
        margin: auto;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        gap: 1rem;
        height: auto;
        margin: 1rem;

        .box-image {
          border-radius: 3px;
          width: 5rem;
          background-color: rgb(245, 245, 245);
          height: 5rem;

          @media (max-width: 1280px) {
            width: 5.5rem;
            height: 5.5rem;
          }
        }
      }
    }

    .information-product-presentation {
      width: 53%;
      padding: 2rem;
      height: auto;
      min-height: 36rem;

      @media (max-width: 1280px) {
        width: 80%;
        margin: 1rem auto;
      }

      .brand-product {
        width: 100%;
        margin: auto;
        height: 3rem;
        display: flex;
        align-items: center;
        padding: 1rem;

        h1 {
          font-family: "Roboto";
          font-size: 1rem;
          color: rgb(120, 120, 120);
          font-weight: 300;
        }
      }

      .title-product {
        width: 100%;
        min-height: 6rem;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        gap: 0.8rem;
        padding: 1rem;

        h1 {
          font-family: "Roboto";
          font-size: 1.8rem;
          color: rgb(90, 90, 90);
        }

        p {
          font-family: "Open Sans";
        }
      }
    }
  }
`;

export const PurchaseInstallment = styled.div`
  width: 100%;
  min-height: 15rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  p {
    font-family: "Open Sans";
    font-size: 1.2rem;

    span {
      font-family: "Open Sans";
      font-size: 2rem;
    }
  }

  .payment-method {
    width: 100%;
    height: 4rem;
    display: flex;

    .icon-payment {
      width: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
    }

    .info-payment {
      width: 88%;
      height: 100%;
      display: flex;
      justify-content: space-around;
      flex-direction: column;

      h3 {
        font-family: "Open Sans";
        font-size: 0.9rem;
        font-weight: 300;

        span {
          font-family: "Open Sans";
          font-size: 1.2rem;
          font-weight: 400;
        }
      }
    }
  }
`;

export const FinalizationProductDetail = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  margin-top: 1rem;
  display: flex;
  justify-content: space-around;

  .input-inc-dec {
    width: 33%;
    border-radius: 3px;
    height: 3.8rem;
  }

  .purchase-product {
    width: 60%;
    height: 3.8rem;
  }
`;
