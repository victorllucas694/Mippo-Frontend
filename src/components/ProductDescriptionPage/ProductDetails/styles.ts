import styled from "styled-components";

export const ContainerProductListDetails = styled.div`
  width: 100%;
  height: auto;
  padding: 1rem;

  .body-details {
    width: 90%;
    margin: auto;
    min-height: 40rem;
    padding: 2rem;

    h1 {
      font-size: 1.8rem;
      font-family: "Roboto";
      font-weight: 300;
    }

    ul {
      margin: 2rem;

      li {
        width: 100%;
        display: flex;
        align-items: center;
        font-size: 1rem;
        font-family: "Open Sans";
        margin: 0.5rem 0;
        list-style: none;
      }
    }
  }
`;

export const BoxProductReview = styled.div`
  width: 100%;
  min-height: 30rem;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  .reviews {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 55%;
    min-height: 32rem;
    min-width: 25rem;

    @media (max-width: 1360px) {
      width: 100%;
    }

    .box-review {
      padding: 1rem;
      width: 100%;
      gap: 1rem;
      height: 15.5rem;
      border-radius: 5px;
      box-shadow: 3px 3px 16px -8px rgb(220, 220, 220);
      border: 1px solid rgb(240, 240, 240);

      h1 {
        font-family: "Open Sans";
        color: rgb(80, 80, 80);
        font-size: 1.2rem;
      }

      h2 {
        font-family: "Open Sans";
        color: rgb(80, 80, 80);
        font-size: 0.8rem;
      }

      h3 {
        font-family: "Open Sans";
        color: rgb(40, 40, 40);
        margin: 0.5rem 0;
        font-size: 1rem;
      }

      #like-comment {
        width: 10rem;
        border: none;
        border-radius: 5px;
        height: 2.8rem;
        margin: 0.5rem 0;
        background-color: rgb(240, 240, 240);
      }
    }
  }

  .final-reviews {
    box-shadow: 3px 3px 16px -8px rgb(220, 220, 220);
    border: 1px solid rgb(240, 240, 240);
    width: 40%;
    min-height: 30rem;
    display: flex;
    margin: 1rem 0 ;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    @media (max-width: 1360px) {
      width: 100%;
    }

    h1 {
      font-family: "Open Sans";
      font-size: 2rem;
    }

    .rating-wrapper {
      width: 80%;
      margin: 0.5rem 0;
      height: 2rem;
      display: flex;
      justify-content: center;
      gap: 1rem;

      h1 {
        font-family: "Open Sans";
        font-size: 1rem;
        font-weight: 600;
      }

      .percent-data {
        width: 50%;
        height: 0.6rem;
        background-color: rgb(235, 235, 235);
        border-radius: 2rem;

        .percent-color {
          width: 80%;
          border-radius: 2rem;
          height: 100%;
          background-color: #1976d2;
        }
      }

      h4 {
        font-family: "Open Sans";
        font-weight: 300;
        color: rgb(120, 120, 120);
        font-size: 1rem;
      }
    }
  }
`;
