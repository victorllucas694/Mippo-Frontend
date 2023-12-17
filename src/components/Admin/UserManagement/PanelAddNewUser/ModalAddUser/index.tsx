import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { ModalBoxWrapper } from "./styles";
import { TextField } from "@mui/material";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface IModalAddUser {
  open: boolean;
  handleClose: () => void;
}

function ModalAddUser({ open, handleClose }: IModalAddUser) {
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ModalBoxWrapper>
          <Typography
            sx={{ fontSize: "1.8rem" }}
            id="modal-modal-title"
            variant="h1"
            component="h2"
          >
            Cadastro de um novo funcionário
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Ao adicionar o funcionário, adicione as permissões em que ele poderá
            acessar
          </Typography>
          <br />

          <div className="all-inputs">
            <TextField
              style={{ width: "30%" }}
              required
              id="outlined-required"
              label="Nome"
            />
            <TextField
              style={{ width: "50%" }}
              required
              id="outlined-required"
              label="Sobrenome do funcionário"
            />
            <TextField
              style={{ width: "50%" }}
              required
              id="outlined-required"
              label="Genero do funcionário"
            />
          </div>
          <div className="all-inputs">
            <TextField
              style={{ width: "40%" }}
              required
              id="outlined-required"
              label="Endereço"
            />
            <TextField
              style={{ width: "60%" }}
              required
              id="outlined-required"
              label="Telefone"
            />
          </div>
          <div className="all-inputs">
            <TextField
              style={{ width: "50%" }}
              required
              id="outlined-required"
              label="RG do funcionário"
            />
            <TextField
              style={{ width: "50%" }}
              required
              id="outlined-required"
              label="CPF do funcionário"
            />
            <TextField
              style={{ width: "50%" }}
              required
              id="outlined-required"
              label="Numero da carteira de trabalho"
            />
          </div>
          <div className="all-inputs">
            <TextField
              style={{ width: "50%" }}
              required
              id="outlined-required"
              label="Cargo do funcionário"
            />
            <TextField
              style={{ width: "50%" }}
              required
              id="outlined-required"
              label="Admissão do funcionário"
            />
          </div>
          <div className="all-inputs">
            <TextField
              style={{ width: "50%" }}
              required
              id="outlined-required"
              label="Supervisor do funcionário"
            />
            <TextField
              style={{ width: "50%" }}
              required
              id="outlined-required"
              label="Carga horaria"
            />
            <TextField
              style={{ width: "50%" }}
              required
              id="outlined-required"
              label="Código do funcionário"
            />
          </div>
          <div className="all-inputs">
            <TextField
              style={{ width: "50%" }}
              required
              id="outlined-required"
              label="Email"
            />
            <TextField
              style={{ width: "50%" }}
              required
              type="password"
              id="outlined-required"
              label="senha"
            />
          </div>
          <div className="all-inputs">
            <TextField
              style={{ width: "50%" }}
              required
              id="outlined-required"
              label="Conta bancaria"
            />
            <TextField
              style={{ width: "50%" }}
              required
              type="password"
              id="outlined-required"
              label="Agência"
            />
            <TextField
              style={{ width: "50%" }}
              required
              type="password"
              id="outlined-required"
              label="Banco"
            />
          </div>
          <div className="all-buttons">
            <Button variant="outlined" sx={{ width: "12rem", height: "3rem" }}>
              Cancelar
            </Button>
            <Button variant="contained" sx={{ width: "12rem", height: "3rem" }}>
              Salvar
            </Button>
          </div>
        </ModalBoxWrapper>
      </Modal>
    </div>
  );
}

export default ModalAddUser;
