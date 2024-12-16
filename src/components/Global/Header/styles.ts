import styled from "styled-components";

export const HeaderPaper = styled.div`
  width: 100%;
  height: auto;
  background-color: rgb(240, 240, 240);

  .box-content {
    width: 100%;
    height: 3rem;
    margin: auto;
    display: flex;
    justify-content: space-around;

    @media (max-width: 780px) {
      width: 99%;
    }

    .message {
      width: 30%;
      align-items: center;
      display: flex;
      height: 100%;

      @media (max-width: 1280px) {
        width: 50%;
      }

      h1 {
        font-size: 1rem;
        font-family: "Open Sans";
        font-family: 300;
        color: rgb(70, 70, 70);
      }
    }

    .account-data {
      width: 25%;
      align-items: center;
      height: 100%;
      display: flex;
      justify-content: center;

      @media (max-width: 1280px) {
        width: 60%;
      }

      @media (max-width: 780px) {
        width: 80%;
      }

      p {
        font-family: "Open Sans";
      }

      .box-button {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 2rem;
        margin: auto;
        gap: 2rem;

        a {
          text-decoration: none;
          font-size: 0.95rem;
          color: rgb(30, 30, 30);
          font-family: "Open Sans";

          &:hover {
            color: #ff5e00;
          }
        }
      }
    }
  }
`;
