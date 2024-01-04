import styled from "styled-components";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Fade from "@mui/material/Fade";

export const ModalStyle = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ContentBox = styled(Box)`
  background-color: #fff;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40rem;
  height: auto;
  min-height: 20rem;
  max-height: 100vh;
  position: absolute;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  max-width: 80%;
  border: none;
  overflow: auto;
  padding: 20px;

  .error-message {
    font-size: .9rem;
    color: red;
    width: 90%;
    margin: auto;
    font-family: 'Open Sans';
  }

  #register-button {
    width: 100%;
    height: 3.5rem;
    border: none;
    color: white;
    font-family: 'Roboto';
    font-size: 1rem;
    background-color: #00438b;
  }

  .register-userdata {
    width: 100%;
    height: 5rem;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid rgb(220, 220, 220);
    padding: 0.5rem;

    .title-box {
      width: 60%;
      height: 100%;
      display: flex;
      align-items: center;

      h1 {
        font-size: 1.3rem;
        font-family: "Open Sans";
      }
    }

    .button-box {
      cursor: pointer;
      width: 40%;
      align-items: center;
      display: flex;
      justify-content: flex-end;
      height: 100%;
    }
  }
`;
