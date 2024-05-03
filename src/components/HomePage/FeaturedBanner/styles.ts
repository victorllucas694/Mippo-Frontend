import styled from "styled-components";

export const FeaturedBannerComponent = styled.div`
  width: 100%;
  min-height: 45rem;
  height: auto;
  overflow: hidden;
  margin: 1rem 0;
  display: flex;
  justify-content: space-between;
  flex-direction: column;

  @media (max-width: 1280px) {
    flex-direction: column;
  }

  .box-market-offers {
    width: 100%;
    border-radius: 10px;
    margin: auto;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    height: auto;
    min-height: 40rem;
    border-radius: 5px;

    .more-products {
      width: 100%;
      display: flex;
      justify-content: space-around;
      height: auto;
      padding: 4rem;
      border: 1px solid;

      .side-products-categories {
        width: 30%;
        height: 100%;
        border: 1px solid;
      }
    }

    .featured-banner-container {
      height: 300px;
    }

    img {
      border-radius: 10px;
      object-fit: contain;
      height: auto;
      align-items: center;
      width: 100%;
    }

    @media (max-width: 1280px) {
      width: 90%;
      margin: auto;
    }
  }

  .sub-box-offers {
    width: 90%;
    margin: 2rem auto;
    min-height: 8rem;
    height: auto;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    @media (max-width: 1280px) {
      width: 90%;
      margin: auto;
      gap: 2rem;
      justify-content: center;
    }

    @media (max-width: 700px) {
      width: 90%;
      margin: auto;
      gap: 2rem;
      justify-content: center;
    }

    .flags {
      width: 22%;
      height: 100%;
      border-radius: 5px;
      min-width: 19rem;
      border: 1px solid rgb(220, 220, 220);
      display: flex;
      gap: 1rem;
      justify-content: center;

      @media (max-width: 700px) {
        margin: auto;
        min-width: 17rem;
        padding: 0.5rem;
        justify-content: center;
      }

      .icon-flag {
        width: 6rem;
        margin: auto 0;
        height: 6rem;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .body-flag {
        width: 50%;
        height: 6rem;
        display: flex;
        justify-content: center;
        flex-direction: column;
        margin: auto 0;

        h1 {
          font-family: "Roboto";
          color: rgb(80, 80, 80);
          font-size: 1.1rem;

          @media (max-width: 480px) {
            font-size: 1rem;
          }
        }

        h2 {
          font-family: "Roboto";
          font-size: 1rem;
          margin: 0.5rem 0;
          font-weight: 300;

          @media (max-width: 480px) {
            font-size: .8rem;
          }
        }
      }
    }
  }

  /* .sub-box-offers {
    width: 30%;
    margin: auto;
    background-image: url("https://gamernareal.com.br/wp-content/uploads/2022/05/pc-core-i5-11400F-01.png");
    height: 31rem;    
    background-size: cover;
    background-repeat: no-repeat;
    background-color: rgb(235, 235, 235);

    @media(max-width: 1280px) {
      width: 90%;
      margin: auto;
      margin-top: 2rem;
    }
  } */
`;
