import styled from "styled-components";

export const MainComponentOnPage = styled.div`
  width: 80%;
  margin: auto;
  height: auto;
  display: flex;
  justify-content: space-between;

  .filters {
    width: 20%;

    @media(max-width: 1280px) {
      display: none;
    }

    @media(max-width: 1380px) {
      width: 27%;
    }


    .category-item {
      width: 100%;
      border-radius: 5px;

      .button-apply {
        width: 100%;
        height: 3rem;
        display: flex;
        justify-content: flex-end;
        margin: 0 1rem;
      }

      .item {
        width: 100%;
        margin: 1rem;
        border-bottom: 1px solid rgb(230, 230, 230);
        min-height: 10rem;

        h1 {
          font-size: 1.1rem;
          font-weight: 600;
          font-family: "Open Sans";
        }

        .item-header {
          margin: auto;
          width: 100%;
          padding: 1rem;
          height: 3.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;

          h1 {
            font-family: "Open Sans";
            font-weight: 400;
            color: rgb(60, 60, 60);
            font-size: 1.2rem;
          }
        }

        .item-body {
          padding: 1rem;
          
          h2 {
            font-weight: 300;
            font-size: 1rem;
            padding: .5rem;
          }

          P {
            font-family: "Open Sans";
            color: rgb(110, 110, 110);
            font-weight: 400;
            margin: 0.5rem;
            font-size: 0.9rem;
          }
        }
      }

      .category-body {
        display: flex;
        flex-direction: column;
      }

      h1 {
        font-weight: 300;
        font-size: 1.6rem;
        font-family: "Roboto";
        color: rgb(80, 80, 80);
      }
    }
  }

  .body-content {
    width: 100%;
    min-height: 30rem;
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;

    .pagination-data {
      width: 100%;
      height: 5rem;
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }

    @media(max-width: 1280px) {
      width: 100%;
      justify-content: center;
      align-items: center;
    }

    .header-dody-filter {
      width: 100%;
      height: 4rem;
      display: flex;
      justify-content: space-between;

      h1 {
        font-weight: 300;
        font-size: 1.6rem;
        font-family: "Roboto";
        color: rgb(80, 80, 80);
      }

      .filter-by {
        width: 50%;
        display: flex;
        height: 100%;
        align-items: center;
        display: flex;
        align-items: center;
        justify-content: flex-end;

        p {
          font-weight: 300;
          font-size: 1rem;
          font-family: "Roboto";
          margin: 0 1rem;
          color: rgb(80, 80, 80);
        }
      }
    }

    @media (max-width: 1280px) {
      width: 100%;
    }
  }
`;
