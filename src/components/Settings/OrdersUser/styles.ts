import styled from "styled-components";

export const BoxOrderUser = styled.div`
  width: 100%;
  height: auto;
  min-height: 90vh;
  padding: 2rem;
  margin: 1rem auto;

  .data-statistic {
    width: 100%;
    height: 7rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;

    .box-statistic {
      width: 24%;
      height: 7rem;
      min-width: 20rem;
      box-shadow: 0px 1px 8px -1px rgb(220, 220, 220);
      border-radius: 5px;
      padding: 1rem;
      display: flex;
      justify-content: center;
      gap: 1rem;
      align-items: center;

      .box-icon {
        width: 3.5rem;
        height: 3.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 5px;
      }

      .body-statistic {
        width: 70%;
        height: auto;
        padding: .7rem;

        h1 {
          font-family: "Open Sans";
          font-weight: 400;
          color: rgb(160, 160, 160);
          font-size: 1.1rem;
        }

        h2 {
          font-family: "Open Sans";
          font-weight: 400;
          color: rgb(60, 60, 60);
          font-size: 1.25rem;
        }
      }

      @media (max-width: 1100px) {
        display: none;
      }
    }
  }
`;
