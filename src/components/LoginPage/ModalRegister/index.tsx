import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { ContentBox } from "./styles";
import FormBoxModal from "./FormBoxModal";
import AcceptedModalLayer from "./AcceptedModalLayer";
import { useInputContext } from "../../../contexts/UserInputOutput";
import { useAxios } from "../../../providers/AxiosProvider";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface IHandleStates {
  openModal: boolean;
  handleClose: () => void;
}

function ModalRegister({ openModal, handleClose }: IHandleStates) {
  const { axiosInstance } = useAxios();
  const { registerInput } = useInputContext();
  const navigate = useNavigate();
  const [messageError, setMessageError] = useState<string | null>(null);

  async function handleAddNewUser(_e: any) {
    const areAllFieldsFilled = Object.values(registerInput).every(
      (value) => value
    );

    if (areAllFieldsFilled) {
      const req = await axiosInstance.post("/register-user", {
        name: registerInput["name"],
        last_name: registerInput["lastName"],
        email: registerInput["email"],
        text: registerInput["text"],
        phone: registerInput["phone"],
        password: registerInput["password"],
      });

      if (req.data) {
        navigate("/");
      } else {
        setMessageError(
          "Desculpe, parece que há alguns erros no formulário. Por favor, verifique as seguintes informações e tente novamente"
        );
      }
    }
  }

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={openModal}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={openModal}>
        <ContentBox>
          <div className="register-userdata">
            <div className="title-box">
              <h1>Criar uma conta</h1>
            </div>
            <div className="button-box">
              <p>Fazer login</p>
            </div>
          </div>
          <FormBoxModal />
          {messageError !== null ? <p className="error-message">{messageError}</p> : null}
          <AcceptedModalLayer />
          <button onClick={handleAddNewUser} id="register-button">
            Registrar
          </button>
        </ContentBox>
      </Fade>
    </Modal>
  );
}

export default ModalRegister;
