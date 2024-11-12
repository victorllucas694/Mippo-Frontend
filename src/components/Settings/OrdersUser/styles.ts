import styled from "styled-components";

export const BoxOrderUser = styled.div`
  width: 100%;
  height: auto;
  min-height: 90vh;
  margin: 1rem auto;
  padding: 1rem;

  .header-data-orders {
    display: flex;
    width: 100%;
    height: 5rem;
    justify-content: space-between;

    h1 {
      font-family: "Open Sans";
      font-weight: 400;
      margin: 0 1rem;
      display: flex;
      font-size: 1.5rem;
    }

    .date-layer {
      width: auto;
      min-width: 25rem;
      border-radius: 5px;
      height: 4rem;
      border: 1px solid rgb(180, 180, 180);
    }
  }

  .items-statiscs {
    width: 100%;
    height: auto;
    min-height: 12rem;
    flex-wrap: wrap;
    display: flex;
    justify-content: space-around;
    gap: 2rem;

    .box-statistic {
      width: 23%;
      height: 8rem;
      min-width: 20rem;
      border-radius: 5px;
      border: 1px solid rgb(220, 220, 220);
      padding: 1rem;

      .message {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        height: auto;
        min-height: 3rem;
      }

      .body-box-statistic {
        width: 100%;
        height: 5rem;
        display: flex;
        justify-content: flex-start;
        align-items: center;

        .icon-box {
          width: 3.5rem;
          margin: 0 1rem;
          height: 3.5rem;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 5px;
        }

        h2 {
          font-family: "Open Sans";
          font-weight: 400;
          color: rgb(80, 80, 80);
          display: flex;
          font-size: 1.2rem;
        }
      }

      h1 {
        font-family: "Open Sans";
        font-weight: 400;
        color: rgb(160, 160, 160);
        display: flex;
        font-size: 1rem;
      }
    }
  }
`;
