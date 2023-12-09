import styled from "styled-components";

export const DescriptionContainer = styled.div`
  width: 95%;
  margin: 1rem auto;
  min-height: 10rem;
  min-width: 28rem;
  border-radius: 5px;

  @media (max-width: 1280px) {
    width: 100%;
  }

  .product-details {
    width: 100%;
    height: auto;
    margin: auto;

    .header-details {
      width: 100%;
      padding: 0.8rem;
      height: 3.5rem;

      h1 {
        font-size: 1.4rem;
        margin: auto 1rem;
        font-weight: 300;
        font-family: "Roboto";
      }
    }

    .product-details-body {
      padding: 1rem;
      width: 95%;
      min-height: 18rem;
      margin: auto;
    }

    .flex-col-12 {
      display: flex;
      justify-content: space-between;
      width: 100%;
      height: auto;

      .flex-col-4 {
        width: 28%;
        height: auto;

        #button-upload-file {
          width: 100%;
          height: 100%;
          background-color: white;
          border-radius: 3px;
          font-family: "Roboto";
          border: none;
          background-color: none;
          font-size: 0.9rem;
          color: rgb(80, 80, 80);

          .upload-text-file {
            font-size: 0.9rem;
            margin: auto;
          }
        }
      }

      .flex-col-5 {
        width: 60%;
        height: auto;
      }

      .flex-col-6 {
        width: 70%;
        height: auto;
      }
    }
  }
`;
