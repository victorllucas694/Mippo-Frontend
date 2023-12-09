import styled from "styled-components";

export const StepperBodyData = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: auto;
  flex-wrap: wrap;
  border-radius: 10px;
  min-height: 35rem;

  .body-container {
    width: 55%;
    height: 35rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 4rem;

    @media (max-width: 1280px) {
      width: 100%;
    }

    h1 {
      font-size: 2rem;
      font-family: "Open Sans";

      @media (max-width: 480px) {
        font-size: 1.2rem;
      }
    }

    p {
      font-size: 1rem;
      margin: 2rem 0rem;
      font-family: "Open Sans";

      @media (max-width: 480px) {
        font-size: .8rem;
      }
    }

    #more-info {
      width: 15rem;
      height: 3rem;
      min-height: 3rem;
      color: white;
      font-family: "Roboto";
      font-size: 0.9rem;
      border: none;
      border-radius: 4px;
      background-color: rgb(210, 63, 87);
    }
  }

  .image-container {
    width: 45%;
    height: 35rem;
    min-width: 30rem;
    padding: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 1280px) {
      width: 100%;
    }

    .image-wrapper {
      width: 100%;
      border-radius: 5px;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        max-width: 100%;
        object-fit: contain;
        margin: auto;
        height: 100%;
      }
    }
  }
`;
