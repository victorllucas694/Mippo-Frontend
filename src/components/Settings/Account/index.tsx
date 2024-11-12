import { ChangeEvent, useEffect, useState } from "react";
import { useAuth } from "../../../contexts/AuthenticateContext";
import { useAxios } from "../../../providers/AxiosProvider";
import { AccountBox, BoxButtonWrapper, BoxInputsWrapper } from "./styles";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import CircleChart from './CircleChart';
interface UserSettings {
  email: string;
  last_name: string;
  name: string;
  phone: string;
}

const initialUserSettings: UserSettings = {
  email: "",
  last_name: "",
  name: "",
  phone: "",
};

interface Address {
  address: string | boolean;
  city: string | boolean;
  address_other: string | boolean;
  country: string | boolean;
  CEP: string | boolean;
  state: string | boolean;
}

const initialAddress: Address = {
  address: false,
  city: false,
  address_other: false,
  country: false,
  CEP: false,
  state: false,
};

function Account() {
  const { axiosInstance } = useAxios();
  const { id } = useAuth();
  const [userSettings, setUserSettings] =
    useState<UserSettings>(initialUserSettings);
  const [address, setAddress] = useState<Address>(initialAddress);
  const [open, setOpen] = useState(false);
  const [openUserSettings, setOpenUserSettings] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const handleOpen = (editMode: boolean) => {
    setIsEditMode(editMode);
    setOpen(true);
  };

  const handleOpenUserSettings = () => {
    setOpenUserSettings(true);
  };
  const handleClose = () => setOpen(false);
  const handleCloseUserSettings = () => setOpenUserSettings(false);

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
          console.log(req.data);
        } catch (error) {
          console.error("Error fetching address:", error);
        }
      }
    }

    getUserData();
    getUserAddressData();
  }, [axiosInstance, id]);

  const handleChangeUser = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUserSettings((prevUserSettings) => ({
      ...prevUserSettings,
      [name]: value,
    }));
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  async function handleSendData() {
    const c_tokenData = localStorage.getItem("c__token");
    if (c_tokenData) {
      console.log({ ...address });
      try {
        const endpoint = isEditMode
          ? `/user-settings/update/${id}`
          : `/user-settings/create/${id}`;
        const req = await axiosInstance.post(
          endpoint,
          {
            ...address,
            User_Id: id,
          },
          {
            headers: {
              Authorization: `Bearer ${c_tokenData}`,
            },
          }
        );
        console.log("data:", req.data);
      } catch (error) {
        console.error("Error sending address data:", error);
      }
    }
  }

  async function handleUpdateUser() {
    const c_tokenData = localStorage.getItem("c__token");
    if (c_tokenData) {
      console.log({ ...userSettings });
      try {
        const endpoint = `/user-settings/update/user/${id}`;
        const req = await axiosInstance.post(
          endpoint,
          {
            ...userSettings,
            id: id,
          },
          {
            headers: {
              Authorization: `Bearer ${c_tokenData}`,
            },
          }
        );
        console.log("data:", req.data);
      } catch (error) {
        console.error("Error sending address data:", error);
      }
    }
  }

  return (
    <>
      <Modal
        open={openUserSettings}
        onClose={handleCloseUserSettings}
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
            Editar informações de usuário
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            edite suas informações pessoais aqui
          </Typography>
          <br />
          <TextField
            label="Nome"
            name="name"
            sx={{
              width: "100%",
            }}
            value={userSettings.name || ""}
            onChange={handleChangeUser}
          />
          <BoxInputsWrapper>
            <TextField
              sx={{
                width: "47%",
              }}
              label="Sobrenome"
              name="last_name"
              value={userSettings.last_name || ""}
              onChange={handleChangeUser}
            />
            <TextField
              sx={{
                width: "47%",
              }}
              label="Email"
              name="email"
              value={userSettings.email || ""}
              onChange={handleChangeUser}
            />
          </BoxInputsWrapper>
          <BoxInputsWrapper>
            <TextField
              sx={{
                width: "100%",
              }}
              label="Telefone"
              name="phone"
              helperText="(11)12345-1234"
              value={userSettings.phone || ""}
              onChange={handleChangeUser}
            />
          </BoxInputsWrapper>

          <BoxButtonWrapper>
            <Button
              sx={{ height: "2.8rem", minWidth: "10rem" }}
              onClick={handleCloseUserSettings}
              variant="outlined"
            >
              Cancelar
            </Button>
            <Button
              sx={{ height: "2.8rem", minWidth: "10rem" }}
              onClick={handleUpdateUser}
              variant="contained"
            >
              Salvar
            </Button>
          </BoxButtonWrapper>
        </Box>
      </Modal>
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
            {isEditMode ? "Editar Endereço" : "Adicionar Endereço"}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {isEditMode
              ? "Edite seu endereço de entrega."
              : "Adicione seu endereço de entrega."}
          </Typography>
          <br />
          <TextField
            label="Endereço"
            name="address"
            sx={{
              width: "100%",
            }}
            helperText="Rua do peixe, 1234"
            value={address.address || ""}
            onChange={handleChange}
          />
          <BoxInputsWrapper>
            <TextField
              sx={{
                width: "47%",
              }}
              label="Cidade"
              name="city"
              value={address.city || ""}
              onChange={handleChange}
            />
            <TextField
              sx={{
                width: "47%",
              }}
              label="País"
              name="country"
              value={address.country || ""}
              onChange={handleChange}
            />
          </BoxInputsWrapper>
          <BoxInputsWrapper>
            <TextField
              sx={{
                width: "47%",
              }}
              label="CEP"
              name="CEP"
              helperText="13453-123"
              value={address.CEP || ""}
              onChange={handleChange}
            />
            <TextField
              sx={{
                width: "47%",
              }}
              helperText="São Paulo"
              label="Estado"
              name="state"
              value={address.state || ""}
              onChange={handleChange}
            />
          </BoxInputsWrapper>

          <BoxButtonWrapper>
            <Button
              sx={{ height: "2.8rem", minWidth: "10rem" }}
              onClick={handleClose}
              variant="outlined"
            >
              Cancelar
            </Button>
            <Button
              sx={{ height: "2.8rem", minWidth: "10rem" }}
              onClick={handleSendData}
              variant="contained"
            >
              {isEditMode ? "Salvar" : "Adicionar"}
            </Button>
          </BoxButtonWrapper>
        </Box>
      </Modal>
      <AccountBox>
        <h1>Perfil de usuário</h1>

        <div className="box-graphics">
          <div className="personal-info-layer">
            <div className="header-personal">
              <h2>Informações pessoais</h2>
              <Button
                sx={{ height: "2.8rem", minWidth: "8rem" }}
                variant="contained"
                onClick={() => handleOpenUserSettings()}
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

          <div className="graphic-body">
            <CircleChart />
          </div>
        </div>

        <div className="personal-info">
          <div className="header-personal">
            <h2>Endereço de entregas</h2>
            <div style={{ display: "flex", gap: "1rem" }}>
              <Button
                sx={{ height: "2.8rem", minWidth: "8rem" }}
                onClick={() => handleOpen(false)}
                variant="outlined"
              >
                Adicionar
              </Button>
              <Button
                sx={{ height: "2.8rem", minWidth: "8rem" }}
                onClick={() => handleOpen(true)}
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
                  <p>{address.address_other || "adicionar os detalhes"}</p>
                </div>
              )}
            </div>
            <div className="col-6">
              {userSettings && (
                <div className="data-info">
                  <h3>Código Postal:</h3>
                  <p>{address.CEP || "adicionar o Código Postal"}</p>
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
