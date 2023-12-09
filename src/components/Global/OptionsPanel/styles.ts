import styled from "styled-components";

export const OptionsPanelWrapper = styled.div`
  width: 100%;
  height: 4rem;
  border-bottom: 1px solid rgb(240, 240, 240);
  box-shadow: 0 5px 8px -3px rgba(200, 200, 200, 0.5);

  .all-categories {
    width: 90%;
    margin: auto;
    height: 100%;
    align-items: center;
    display: none;

    @media (max-width: 1280px) {
      display: flex;
      justify-content: space-between;
    }
  }

  .categories-box {
    width: 80%;
    height: 100%;
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 1280px) {
      display: none;
    }

    .categories-products {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }

    .box-item {
      max-width: 100%;
      padding: 2rem;
      margin: auto;
      height: 4rem;
      display: flex;
      align-items: center;
      justify-content: space-around;

      @media (max-width: 1480px) {
        padding: 0;
      }

      .box-hidden {
        /* @media (max-width: 1280px) {
          display: none;
        } */
      }

      p {
        font-family: "Roboto";
        font-weight: 300;
        font-size: 1rem;
      }

      .box-icon {
        width: 50px;
        align-items: center;
        display: flex;
        justify-content: center;
        height: 50px;
      }
    }
  }
`;
