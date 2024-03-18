import styled from "styled-components";

export const BannerModifyBox = styled.div`
  width: 100%;
  height: auto;
  padding: 2rem;

  h1 {
    font-size: 1.6rem;
    font-weight: 400;
    font-family: "Open Sans";
  }

  .banner-body-modify {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: space-between;

    .form-data {
      width: 52%;
      height: auto;
      display: flex;
      flex-direction: column;

      .image-drag-in-drop {
        width: 30rem;
        margin: 2rem auto;
        max-height: 20rem;
        border-radius: 20px;
        border: 3px dashed rgb(120, 120, 120);

        img {
          max-width: 50%;
          margin: 2rem 7rem;
          height: auto;
        }
      }

      h2 {
        font-size: 1.6rem;
        font-weight: 400;
        font-family: "Roboto";
      }
    }

    .check-list {
      width: 48%;
      height: auto;
      display: flex;
      flex-direction: column;

      .label-box {
        display: flex;
        align-items: center;
        margin: auto;
        width: 100%;
        height: 5rem;
        padding: 1rem;
        font-size: .95rem;
        border-radius: 5px;
        border: 1px solid rgb(200, 200, 200);
      }

      h2 {
        font-size: 1.6rem;
        font-weight: 400;
        font-family: "Roboto";
      }
    }
  }

  .header-banner-modify {
    width: 100%;
    height: auto;

    p {
      margin: 2rem 0;
      font-size: 1rem;
      font-weight: 400;
      width: 60%;
      font-family: "Open Sans";
    }
  }
`;
