import styled from "styled-components";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Fade from "@mui/material/Fade";

export const BoxWrapperMain = styled.div`
  width: 100%;
  height: auto;
  max-width: 1380px;
  margin: auto;

  .button-send {
    width: 100%;
    height: auto;
    padding: 1rem;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .product-code {
    width: 90%;
    margin: auto;
    height: auto;
    padding: 1rem;

    .data-layers {
      width: 100%;
      height: auto;
      display: flex;
      justify-content: space-between;

      .col-sx-8 {
        width: 68%;
        height: auto;
      }
      
      .col-sx-4 {
        width: 30%;
        height: auto;
      }
    }
  }

  .presentation-session {
    width: 100%;
    height: auto;
    padding: 1rem;
    display: flex;
    flex-direction: column;

    h1 {
      font-size: 1.7rem;
      font-weight: 300;
      text-align: center;
      font-family: "Roboto";
    }

    p {
      font-size: 1rem;
      width: 60%;
      color: rgb(80, 80, 80);
      margin: 1rem auto;
      font-weight: 300;
      text-align: center;
      font-family: "Roboto";
    }
  }
`;

export const ModalStyle = styled(Modal)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const BoxDropImage = styled(Box)`
  width: 90%;
  margin: 2rem auto;
  height: 36rem;
  display: flex;
  justify-content: space-between;

  .side-images {
    width: 20%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .image-drop-box {
      background-color: rgb(244, 244, 244);
      width: 90%;
      margin: auto;
      border: 2px dashed rgb(220, 220, 220);
      border-radius: 5px;
      height: 8rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }

  .large-image {
    width: 78%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 2px dashed rgb(220, 220, 220);
    border-radius: 5px;
    background-color: rgb(244, 244, 244);
    height: 100%;

    p {
      width: 70%;
      margin: 3rem auto;
      font-family: "Roboto";
      font-size: 1rem;
      font-weight: 300;
      text-align: center;
    }
  }
`;
