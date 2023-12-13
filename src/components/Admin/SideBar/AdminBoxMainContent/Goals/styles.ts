import styled from "styled-components";

export const GoalsContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  min-height: 40vh;
  flex-direction: column;
  justify-content: space-between;

  .items-section {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin: auto;

    .item-body {
      width: 45%;
      min-width: 18rem;
      margin: auto;
      padding: 1rem;
      box-shadow: 3px 3px 16px -8px rgb(220, 220, 220);
      height: 10rem;
      border-radius: 3px;
      border: 1px solid rgb(220, 220, 220);
      display: flex;
      justify-content: space-between;

      @media (max-width: 1650px) {
        width: 45%;
        min-height: 11rem;
        height: auto;
        margin: 1rem;
        padding: 0;
      }

      @media (max-width: 1410px) {
        height: auto;
        justify-content: center;
        width: 45%;
      }

      @media (max-width: 1100px) {
        width: 100%;
      }

      .text {
        padding: 0.5rem;
        width: 60%;
        height: 100%;

        h1 {
          font-size: 1rem;
          font-family: "Open Sans";
          color: rgb(140, 140, 140);
        }
        h3 {
          font-size: 1rem;
          font-weight: 300;
          font-family: "Roboto";
          color: rgb(40, 40, 40);
          margin: 1rem 0;

          strong {
            font-size: 1rem;
            font-weight: 600;
            font-family: "Roboto";
            color: rgb(40, 40, 40);
            margin: 1rem 0;
          }
        }

        p {
          font-size: 0.9rem;
          font-family: "Open Sans";
          color: rgb(140, 140, 140);

          strong {
            font-size: 1rem;
            font-weight: 600;
            font-family: "Roboto";
            color: rgb(40, 40, 40);
            margin: 1rem 0;
          }
        }
      }

      .image {
        width: 40%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        img {
          max-width: 75%;
          height: auto;
        }
      }
    }
  }
`;
