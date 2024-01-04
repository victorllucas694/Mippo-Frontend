import * as React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { ModalBoxWrapper } from "./styles";
import { TextField } from "@mui/material";
import { useAxios } from "../../../../../providers/AxiosProvider";
import { useAuth } from "../../../../../contexts/AuthenticateContext";

// const style = {
//   position: "absolute" as "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 400,
//   bgcolor: "background.paper",
//   border: "2px solid #000",
//   boxShadow: 24,
//   p: 4,
// };

interface IModalAddUser {
  open: boolean;
  handleClose: () => void;
}


function ModalAddUser({ open, handleClose }: IModalAddUser) {
  const [formValues, setFormValues] = React.useState({
    Bank: '',
    CPF: '',
    Employee_gender: '',
    RG: '',
    address: '',
    agency: '',
    bank_account: '',
    email: '',
    employee_code: '',
    employee_supervisor: '',
    employer_date: '',
    last_name: '',
    name: '',
    numberJob: '',
    password: '',
    phone: '',
    position: '',
    workload: ''
  });

  const handleInputChange = (fieldName: any) => (event: any) => {
    setFormValues({
      ...formValues,
      [fieldName]: event.target.value,
    });
  };

  const { axiosInstance } = useAxios();
  const { id } = useAuth();

  
  const createNewEmployer = async () => {
    const token = localStorage.getItem("c__token");
    const addEmployer = await axiosInstance.post(`/employer-management/add/new/employer/${id}`, formValues  , {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(addEmployer);
  }

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
            acessar durante o uso da plataforma.
          </Typography>
          <br />
          <div className="all-inputs">
            <TextField
              style={{ width: "30%" }}
              required
              id="outlined-required"
              label="Nome"
              value={formValues.name}
              onChange={handleInputChange("name")}
            />
            <TextField
              style={{ width: "50%" }}
              required
              id="outlined-required"
              label="Sobrenome do funcionário"
              value={formValues.last_name}
              onChange={handleInputChange("last_name")}
            />
            <TextField
              style={{ width: "50%" }}
              required
              id="outlined-required"
              label="Genero do funcionário"
              value={formValues.Employee_gender}
              onChange={handleInputChange("Employee_gender")}
            />
          </div>
          <div className="all-inputs">
            <TextField
              style={{ width: "40%" }}
              required
              id="outlined-required"
              label="Endereço"
              value={formValues.address}
              onChange={handleInputChange("address")}
            />
            <TextField
              style={{ width: "60%" }}
              required
              id="outlined-required"
              label="Telefone"
              value={formValues.phone}
              onChange={handleInputChange("phone")}
            />
          </div>
          <div className="all-inputs">
            <TextField
              style={{ width: "50%" }}
              required
              id="outlined-required"
              label="RG do funcionário"
              value={formValues.RG}
              onChange={handleInputChange("RG")}
            />
            <TextField
              style={{ width: "50%" }}
              required
              id="outlined-required"
              label="CPF do funcionário"
              value={formValues.CPF}
              onChange={handleInputChange("CPF")}
            />
            <TextField
              style={{ width: "50%" }}
              required
              id="outlined-required"
              label="Numero da carteira de trabalho"
              value={formValues.numberJob}
              onChange={handleInputChange("numberJob")}
            />
          </div>
          <div className="all-inputs">
            <TextField
              style={{ width: "50%" }}
              required
              id="outlined-required"
              label="Cargo do funcionário"
              value={formValues.position}
              onChange={handleInputChange("position")}
            />
            <TextField
              style={{ width: "50%" }}
              required
              id="outlined-required"
              label="Admissão do funcionário"
              value={formValues.employer_date}
              onChange={handleInputChange("employer_date")}
            />
          </div>
          <div className="all-inputs">
            <TextField
              style={{ width: "50%" }}
              required
              id="outlined-required"
              label="Supervisor do funcionário"
              value={formValues.employee_supervisor}
              onChange={handleInputChange("employee_supervisor")}
            />
            <TextField
              style={{ width: "50%" }}
              required
              id="outlined-required"
              label="Carga horaria"
              value={formValues.workload}
              onChange={handleInputChange("workload")}
            />
            <TextField
              style={{ width: "50%" }}
              required
              id="outlined-required"
              label="Código do funcionário"
              value={formValues.employee_code}
              onChange={handleInputChange("employee_code")}
            />
          </div>
          <div className="all-inputs">
            <TextField
              style={{ width: "50%" }}
              required
              id="outlined-required"
              label="Email"
              value={formValues.email}
              onChange={handleInputChange("email")}
            />
            <TextField
              style={{ width: "50%" }}
              required
              type="password"
              id="outlined-required"
              label="Senha"
              value={formValues.password}
              onChange={handleInputChange("password")}
            />
          </div>
          <div className="all-inputs">
            <TextField
              style={{ width: "50%" }}
              required
              id="outlined-required"
              label="Conta bancária"
              value={formValues.bank_account}
              onChange={handleInputChange("bank_account")}
            />
            <TextField
              style={{ width: "50%" }}
              required
              type="password"
              id="outlined-required"
              label="Agência"
              value={formValues.agency}
              onChange={handleInputChange("agency")}
            />
            <TextField
              style={{ width: "50%" }}
              required
              type="password"
              id="outlined-required"
              label="Banco"
              value={formValues.Bank}
              onChange={handleInputChange("Bank")}
            />
          </div>
          <div className="all-buttons">
            <Button variant="outlined" sx={{ width: "12rem", height: "3rem" }}>
              Cancelar
            </Button>
            <Button onClick={createNewEmployer} variant="contained" sx={{ width: "12rem", height: "3rem" }}>
              Salvar
            </Button>
          </div>
        </ModalBoxWrapper>
      </Modal>
    </div>
  );
}

export default ModalAddUser;