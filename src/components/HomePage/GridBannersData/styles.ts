import styled from "styled-components";

export const GridMicroBannersBoxes = styled.div`
  width: 90%;
  min-height: 28rem;
  margin: auto;
  display: flex;
  flex-wrap: wrap;  


  @media (max-width: 1280px) {
    margin: auto;
  }

  .product-layer {
    min-height: 40rem;
    margin: auto;
    width: 100%;
    display: flex;
    justify-content: center;
    position: relative;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;

    h1 {
      font-size: 1.5rem;
      font-weight: 300;
      text-align: center;
      font-family: "Roboto";
    }

    img {
      max-width: 90%;
      height: auto;
      margin: 3rem 4rem;
      object-fit: cover;
    }

    .active {
      background-image: none;
    }
    
    .md-banner {
      width: 40%;
      border: 1px solid rgb(240, 240, 240);
      border-radius: 3px;
      min-width: 20rem;
      margin: 0 auto;
      box-shadow: 3px 3px 20px -8px rgb(200, 200, 200);
      min-height: 30rem;
      height: auto;
      padding: 4rem;
      cursor: pointer;

      @media(max-width: 1280px) {
        width: 80%;
        margin: 2rem auto;

      }

      &:hover {
        box-shadow: 3px 3px 30px -8px rgb(100, 100, 100);
        transition: 1s;
      }
    }
  }
`;
