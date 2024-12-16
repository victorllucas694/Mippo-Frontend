import styled from "styled-components";

export const SearchPanelContainer = styled.div`
  width: 100%;
  height: auto;
  min-height: 8rem;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 1280px) {
    padding: 2rem;
  }

  .box-main-content {
    width: 80%;
    margin: auto;
    height: auto;
    display: flex;
    justify-content: space-between;

    @media (max-width: 1280px) {
      min-height: 12rem;
      padding: 1rem;
      flex-direction: column;
    }

    .brand {
      width: 25%;
      cursor: pointer;
      margin: auto;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;

      img {
        object-fit: cover;
        width: 80%;
        height: 100%;
      }

      @media (max-width: 1280px) {
        width: 80%;
        margin: auto;
        flex-direction: column;
      }
    }

    .search-panel {
      width: 45%;
      height: 70%;
      margin: auto;

      @media (max-width: 1280px) {
        display: flex;
        margin-top: 1rem;
        height: 50%;
        width: 100%;
      }
    }

    .contact-box {
      width: 30%;
      height: 3.5rem;
      display: flex;
      justify-content: center;
      margin: auto;
      gap: 5px;

      .favorite-box {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 80px;
        height: 100%;
        border: 1px solid rgb(220, 220, 220);
        border-radius: 3px;
      }

      .shop-box {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 80px;
        border-radius: 3px;
        height: 100%;
        border: 1px solid rgb(220, 220, 220);
      }

      .sign-in {
        display: flex;
        justify-content: flex-start;
        flex-direction: column;
        width: 200px;
        height: 100%;
        padding: 0.7rem;
        border-radius: 3px;
        border: 1px solid rgb(220, 220, 220);

        h1 {
          font-family: "Open Sans";
          font-size: 0.8rem;
        }

        p {
          font-family: "Roboto";
          font-size: 0.9rem;
        }
      }

      @media (max-width: 1280px) {
        display: none;
      }
    }
  }
`;
