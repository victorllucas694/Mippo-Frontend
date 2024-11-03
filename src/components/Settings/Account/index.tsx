import { useEffect, useState } from "react";
import { useAuth } from "../../../contexts/AuthenticateContext";
import { useAxios } from "../../../providers/AxiosProvider";
import { AccountBox, BoxButtonWrapper, BoxInputsWrapper } from "./styles";
import { useNavigate } from "react-router-dom";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";

interface UserSettings {
  email: string;
  last_name: string;
  name: string;
  phone: string;
}

interface Address {
  address: string | boolean;
  city: string | boolean;
  details: string | boolean;
  country: string | boolean;
  postal_code: string | boolean;
  state: string | boolean;
}

const initialAddress: Address = {
  address: false,
  city: false,
  details: false,
  country: false,
  postal_code: false,
  state: false,
};

function Account() {
  const { axiosInstance } = useAxios();
  const { id } = useAuth();
  const [userSettings, setUserSettings] = useState<UserSettings | null>(null);
  const [address, setAddress] = useState<Address>(initialAddress);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  useEffect(() => {
    async function getUserData() {
      const c_tokenData = localStorage.getItem("c__token");
      if (c_tokenData) {
        try {
          const req = await axiosInstance.get(`/user-settings/get/${id}`, {
            headers: {
              Authorization: `Bearer ${c_tokenData}`,
            },
          });
          setUserSettings(req.data);
          console.log("User data:", req.data);
        } catch (error) {
          console.error("Error fetching user settings:", error);
        }
      }
    }

    async function getUserAddressData() {
      const c_tokenData = localStorage.getItem("c__token");
      if (c_tokenData) {
        try {
          const req = await axiosInstance.get(
            `/user-settings/get/address/${id}`,
            {
              headers: {
                Authorization: `Bearer ${c_tokenData}`,
              },
            }
          );
          setAddress(req.data || initialAddress);
          console.log("Address data:", req.data);
        } catch (error) {
          console.error("Error fetching address:", error);
        }
      }
    }

    getUserData();
    getUserAddressData();
  }, [axiosInstance, id]);

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ display: "flex", justifyContent: "flex-end", border: "none" }}
      >
        <Box
          sx={{
            width: "45%",
            height: "100vh",
            position: "absolute",
            backgroundColor: "white",
            padding: "3rem",
            border: "none",
          }}
        >
          <Typography id="modal-modal-title" variant="h5" component="h1">
            Adicionar ou editar Endereço
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Edite ou adicione seu endereço de entrega para a compra de seus
            produtos
          </Typography>
          <br />
          <TextField
            sx={{
              width: "100%",
            }}
            id="outlined-basic"
            name="name"
            required
            label="Endereço - Rua de exemplo"
            helperText="Rua do peixe, 1234"
            variant="outlined"
          />
          <BoxInputsWrapper>
            <TextField
              sx={{
                width: "45%",
              }}
              required
              id="outlined-basic"
              name="name"
              label="cidade - Cidade de exemplo"
              variant="outlined"
            />
            <TextField
              sx={{
                width: "45%",
              }}
              required
              id="outlined-basic"
              name="name"
              label="país de exemplo"
              variant="outlined"
            />
          </BoxInputsWrapper>
          <TextField
            sx={{
              width: "100%",
            }}
            required
            id="outlined-basic"
            name="name"
            label="detalhes - Apartamento, bloco"
            helperText="Apartamento número 123"
            variant="outlined"
          />
          <BoxInputsWrapper>
            <TextField
              sx={{
                width: "45%",
              }}
              required
              id="outlined-basic"
              name="name"
              label="CEP - 1231-123"
              variant="outlined"
            />
            <TextField
              sx={{
                width: "45%",
              }}
              required
              id="outlined-basic"
              name="name"
              label="Estado - Estado de exemplo"
              variant="outlined"
            />
          </BoxInputsWrapper>
          <BoxButtonWrapper>
          <Button
                sx={{ height: "2.8rem", minWidth: "10rem" }}
                onClick={() => { handleOpen();  handleClose();}}
                variant="outlined"
              >
                cancelar
              </Button>
          <Button
                sx={{ height: "2.8rem", minWidth: "10rem" }}
                onClick={handleOpen}
                variant="contained"
              >
                Adicionar
              </Button>
          </BoxButtonWrapper>
        </Box>
      </Modal>
      <AccountBox>
        <h1>Perfil de usuário</h1>

        <div className="personal-info">
          <div className="header-personal">
            <h2>Informações pessoais</h2>
            <Button
              sx={{ height: "2.8rem", minWidth: "8rem" }}
              variant="contained"
            >
              Editar
            </Button>
          </div>

          <div className="inputs-info">
            <div className="col-6">
              {userSettings && (
                <div className="data-info">
                  <h3>Primeiro Nome:</h3>
                  <p>{userSettings.name}</p>
                  <br />
                  <h3>Email:</h3>
                  <p>{userSettings.email}</p>
                </div>
              )}
            </div>
            <div className="col-6">
              {userSettings && (
                <div className="data-info">
                  <h3>Sobrenome:</h3>
                  <p>{userSettings.last_name}</p>
                  <br />
                  <h3>Telefone:</h3>
                  <p>{userSettings.phone}</p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="personal-info">
          <div className="header-personal">
            <h2>Endereço de entregas</h2>
            <div style={{ display: "flex", gap: "1rem" }}>
              <Button
                sx={{ height: "2.8rem", minWidth: "8rem" }}
                onClick={handleOpen}
                variant="outlined"
              >
                Adicionar
              </Button>
              <Button
                sx={{ height: "2.8rem", minWidth: "8rem" }}
                onClick={handleOpen}
                variant="contained"
              >
                Editar
              </Button>
            </div>
          </div>
          <div className="inputs-info">
            <div className="col-6">
              {userSettings && (
                <div className="data-info">
                  <h3>Endereço:</h3>
                  <p>{address.address || "adicionar o endereço"}</p>
                  <br />
                  <h3>Cidade:</h3>
                  <p>{address.city || "adicionar a cidade"}</p>
                </div>
              )}
            </div>
            <div className="col-6">
              {userSettings && (
                <div className="data-info">
                  <h3>País:</h3>
                  <p>{address.country || "adicionar o país"}</p>
                  <br />
                  <h3>Detalhes:</h3>
                  <p>{address.details || "adicionar os detalhes"}</p>
                </div>
              )}
            </div>
            <div className="col-6">
              {userSettings && (
                <div className="data-info">
                  <h3>Código Postal:</h3>
                  <p>{address.postal_code || "adicionar o Código Postal"}</p>
                  <br />
                  <h3>Estado:</h3>
                  <p>{address.state || "adicionar o estado"}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </AccountBox>
    </>
  );
}

export default Account;
