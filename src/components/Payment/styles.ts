import styled from "styled-components";

export const BoxHeaderPayment = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-evenly;
  border-radius: 3px;
  font-family: "Roboto";
  margin: 2rem auto;
  align-items: center;

  .shopping-cart-itens {
    width: 60%;
    height: auto;
    border-radius: 5px;

    .header-itens {
      width: 100%;
      height: auto;
      display: flex;
      justify-content: space-between;

      .item-order {
        width: 100%;
        height: auto;
      }

      .product {
        width: 50%;
        height: auto;
        display: flex;
        align-items: center;
        padding: 1.8rem;

        .image-large-box {
          width: 8rem;
          background-color: rgb(235, 235, 235);
          height: 6rem;
          border-radius: 5px;
        }

        p {
          margin: 0 1rem;
        }
      }

      .quantity {
        width: 20%;
        padding: 1.8rem;
        height: auto;
        display: flex;
        align-items: center;
      }

      .price {
        width: 20%;
        padding: 1.8rem;
        height: auto;
        display: flex;
        align-items: center;
      }

      .delete {
        width: 10%;
        height: auto;
        padding: 1.8rem;
        display: flex;
        align-items: center;
      }
    }
  }

  .shopping-cart-values {
    width: 20%;
    height: 23rem;

    .header-values {
      border-bottom: 1px solid rgb(230, 230, 230);
      width: 95%;
      margin: auto;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 4rem;

      p {
        color: rgb(80, 80, 80);
        font-size: 1.3rem;
      }
    }

    .body-cart {
      width: 100%;
      margin: auto;
      margin: 1rem auto;

      .total {
        width: 90%;
        margin: auto;
        background-color: rgb(245, 245, 245);
        height: 4rem;
        display: flex;
        justify-content: space-around;
        align-items: center;

        h1 {
          font-size: 1.2rem;
          font-family: "Roboto";
          font-weight: 300;
        }
      }

      .total-offer {
        width: 80%;
        height: 15rem;
        margin: -1.5rem auto;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        p {
          font-size: 1.2rem;
          font-family: "Roboto";
          font-weight: 300;
          color: green;
        }

        h1 {
          font-size: 2rem;
          margin: 0.5rem auto;
          font-family: "Roboto";
          font-weight: 600;
          color: green;
        }

        h5 {
          text-align: center;
          font-family: "Roboto";
          font-weight: 500;
        }

        .red {
          font-size: 1rem;
          text-align: center;
          margin: 0.8rem auto;
          font-family: "Roboto";
          font-weight: 600;
          color: #f00;
        }
      }
    }
  }
`;
