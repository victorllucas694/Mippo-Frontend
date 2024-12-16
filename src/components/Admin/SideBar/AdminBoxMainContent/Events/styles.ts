import styled from "styled-components";

export const EventsAndProjectsBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;

  @media (max-width: 1690px) {
    min-height: 42vh;
  }

  .body-dash {
    width: 50%;
    height: 70%;
    padding: 1rem;
    margin: auto;

    @media (max-width: 1510px) {
      width: 50%;
      height: 70%;
      padding: 0rem;
    }

    .information-admin {
      width: 100%;
      height: 68%;
      margin: 1rem 0;
      display: flex;
      justify-content: center;
      flex-direction: column;

      h2 {
        font-family: "Roboto";
        color: rgb(80, 80, 80);
        font-size: 1.1rem;
        font-weight: 300;
        margin: 0.5rem 0;

        @media (max-width: 1690px) {
          font-size: 1rem;
        }

        @media (max-width: 1510px) {
          font-size: .8rem;
        }
      }
    }

    @media (max-width: 1480px) {
      max-width: 100%;
      height: auto;
    }

    h1 {
      font-family: "Roboto";
      color: rgb(80, 80,80);
      font-size: 1.5rem;
      font-weight: 400;

      @media (max-width: 1510px) {
          font-size: 1.2rem;
        }

      @media (max-width: 1690px) {
        font-size: 1.3rem;
      }
    }

    p {
      font-family: "Roboto";
      color: rgb(100, 100, 100);
      font-size: 0.9rem;

      @media (max-width: 1690px) {
        margin: 1rem 0;
      }
    }
  }

  .image-dash {
    height: 40vh;
    width: 45%;
    display: flex;
    align-items: center;
    justify-content: center;

    @media (max-width: 1510px) {
      width: 40%;
    }

    img {
      max-width: 100%;
      float: center;
      margin: auto;
      height: auto;

      @media (max-width: 1480px) {
        max-width: 70%;
        height: auto;
      }
    }
  }
`;
/*
    .header-events {
        width: 100%;
        padding: .5rem;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid rgb(230, 230, 230);
        height: 4rem;
 
        p {
            margin: auto .5rem;
            font-size: 1rem;
        }
    }
 
    .container-events {
        width: 100%;
        padding: .5rem;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid rgb(230, 230, 230);
        height: 5rem;
 
        .event-text {
            width: 70%;
            height: 100%;
            margin: auto 1rem;
            display: flex;
            align-items: center;
 
            .image-box {
                width: 100px;
                background-color: rgb(240, 240, 240);
                border-radius: 3px;
                height: 90%;
                margin: auto 0;
 
                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    border-radius: 3px;
                }
            }
 
            .title-card {
                font-size: 1rem;
                margin: 0 1rem;
            }
 
            .card-updated-at {
                font-size: .9rem;
                color: rgb(110, 110, 110);
            }
        }
 
        .button-more-info {
            width: 5%;
            margin: auto;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
            margin: auto 1rem;
        }
    } */
