import React, { useState } from "react";
import { Fade, TextField, Button } from "@mui/material";
import { Box, styled, Theme } from "@mui/system";
import { Modal } from "@mui/base/Modal";
import Slide from "@mui/material/Slide";
import {
  AdvancedSupplierInformation,
  BodyModalData,
  HeaderModal,
  SaveAllInformations,
} from "./styles";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useAxios } from "../../../../../../providers/AxiosProvider";
import { useAuth } from "../../../../../../contexts/AuthenticateContext";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import DOMPurify from "dompurify";

interface ISuppliersBasicData {
  Name: string;
  NIF: string;
  Phone: string;
  ShippingMethod: string;
}

interface ISuppliersSecretData {
  BankAccountHolder: string;
  BankAccountNumber: string;
  BankAgency: string;
  BankName: string;
  CEP: string;
  City: string;
  Road: string;
}

const Backdrop = React.forwardRef<HTMLDivElement, { open?: boolean }>(
  (props, ref) => {
    const { open, ...other } = props;
    return (
      <Fade in={open}>
        <div ref={ref} {...other} />
      </Fade>
    );
  }
);

// const blue = {
//   200: "#99CCF3",
//   400: "#3399FF",
//   500: "#007FFF",
// };

// const grey = {
//   50: "#f6f8fa",
//   100: "#eaeef2",
//   200: "#d0d7de",
//   300: "#afb8c1",
//   400: "#8c959f",
//   500: "#6e7781",
//   600: "#57606a",
//   700: "#424a53",
//   800: "#32383f",
//   900: "#24292f",
// };

const StyledModal = styled(Modal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const style = (theme: Theme) => ({
  position: "absolute" as "absolute",
  top: "50%",
  left: "74%",
  transform: "translate(-50%, -50%)",
  width: "52%",
  height: "100%",
  borderRadius: "2px",
  padding: "16px 32px 24px 32px",
  backgroundColor: theme.palette.mode === "dark" ? "#0A1929" : "white",
  boxShadow: `0px 2px 24px ${
    theme.palette.mode === "dark" ? "#1a1a1a" : "#424242"
  }`,
});

// const TriggerButton = styled(Button)(
//   ({ theme }) => `
//     font-family: IBM Plex Sans, sans-serif;
//     font-size: 0.875rem;
//     font-weight: 600;
//     box-sizing: border-box;
//     min-height: calc(1.5em + 22px);
//     border-radius: 12px;
//     padding: 6px 12px;
//     line-height: 1.5;
//     background: transparent;
//     border: 1px solid ${theme.palette.mode === "dark" ? grey[800] : grey[200]};
//     color: ${theme.palette.mode === "dark" ? grey[100] : grey[900]};

//     &:hover {
//       background: ${theme.palette.mode === "dark" ? grey[800] : grey[50]};
//       border-color: ${theme.palette.mode === "dark" ? grey[600] : grey[300]};
//     }

//     &:focus-visible {
//       border-color: ${blue[400]};
//       outline: 3px solid ${
//         theme.palette.mode === "dark" ? blue[500] : blue[200]
//       };
//     }
//     `
// );

interface ISettingsModal {
  isOpen: boolean;
  handleOpen: () => void;
  handleClose: () => void;
}

interface IShippingMethods {
  label: string;
  id: number;
}

export default function ModalAddNewSupplier({
  handleClose,
  isOpen,
}: ISettingsModal) {
  const shippingMethods: IShippingMethods[] = [
    {
      id: 0,
      label: "Padrão",
    },
    {
      id: 1,
      label: "Expressa",
    },
    {
      id: 2,
      label: "Retirar na loja",
    },
  ];

  const { axiosInstance } = useAxios();
  const { id } = useAuth();
  const [open, setOpen] = React.useState(false);
  const token = localStorage.getItem("c__token");

  const [suppliersBasicData, setSuppliersBasicData] =
    useState<ISuppliersBasicData>({
      Name: "",
      NIF: "",
      Phone: "",
      ShippingMethod: "Padrão",
    });

  const [suppliersSecretData, setSuppliersSecretData] =
    useState<ISuppliersSecretData>({
      BankAccountHolder: "",
      BankAccountNumber: "",
      BankAgency: "",
      BankName: "",
      CEP: "",
      City: "",
      Road: "",
    });

  const [activeButton, setActiveButton] = useState(0);

  const handleAddSupplierWithBasicData = async () => {
    const generateSupplierBasicDataPayload = {
      supplier_name: suppliersBasicData.Name,
      NIF: suppliersBasicData.NIF,
      phone: suppliersBasicData.Phone,
      shipping_method: suppliersBasicData.ShippingMethod,
    };

    const generateSupplierSecretDataPayload = {
      bank_account_holder: suppliersSecretData.BankAccountHolder,
      bank_account_number: suppliersSecretData.BankAccountNumber,
      bank_agency: suppliersSecretData.BankAgency,
      bank_name: suppliersSecretData.BankName,
      CEP: suppliersSecretData.CEP,
      city: suppliersSecretData.City,
      supplier_name: suppliersBasicData.Name,
      road: suppliersSecretData.Road,
    };

    const sendSupplierBasicDataPayload = await axiosInstance.post(
      `/suppliers-management/add/new/basic/${id}`,
      generateSupplierBasicDataPayload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const sendSupplierSecretDataPayload = await axiosInstance.post(
      `/suppliers-management/add/new/secret/${id}`,
      generateSupplierSecretDataPayload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (
      sendSupplierBasicDataPayload.data &&
      sendSupplierSecretDataPayload.data
    ) {
      setOpen(true);
    }
  };

  const handleShippingMethodClick = (
    method: IShippingMethods,
    index: number
  ) => {
    setSuppliersBasicData((prevData) => ({
      ...prevData,
      ShippingMethod: method.label,
    }));
    setActiveButton(index);
  };

  const handleInputChange = (
    field: keyof ISuppliersSecretData,
    value: string
  ) => {
    setSuppliersSecretData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleCloseSnackBar = () => {
    setOpen(false);
  };

  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  return (
    <>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleCloseSnackBar}
          severity="success"
          sx={{ width: "100%" }}
        >
          Fornecedor criado com sucesso
        </Alert>
      </Snackbar>
      <div>
        <StyledModal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={isOpen}
          onClose={handleClose}
          closeAfterTransition
          slots={{ backdrop: StyledBackdrop }}
          TransitionComponent={Slide}
          TransitionProps={{
            direction: "left",
            timeout: 1000,
          }}
        >
          <Box sx={style}>
            <HeaderModal>
              <h1>Adicionar novo fornecedor</h1>
              <div className="close-modal">
                <CloseIcon
                  sx={{
                    color: "rgb(80, 80, 80)",
                  }}
                />
              </div>
            </HeaderModal>
            <BodyModalData>
              <div className="shipping-method">
                <h1>Métodos de envio</h1>

                <div className="buttons-methods">
                  {shippingMethods.map(
                    (method: IShippingMethods, index: number) => (
                      <div
                        className={`method ${
                          activeButton === index ? "active" : ""
                        }`}
                        key={method.id}
                        onClick={() => handleShippingMethodClick(method, index)}
                      >
                        {method.label}
                      </div>
                    )
                  )}
                </div>
              </div>

              <h1>Informações sobre o fornecedor</h1>

              <TextField
                sx={{
                  margin: "1rem 0",
                  width: "100%",
                }}
                id="outlined-basic"
                label="Nome do fornecedor"
                value={suppliersBasicData.Name}
                onChange={(e) =>
                  setSuppliersBasicData({
                    ...suppliersBasicData,
                    Name: DOMPurify.sanitize(e.target.value),
                  })
                }
                variant="outlined"
              />

              <br />
              <h1>Informações sobre a empresa</h1>
              <div className="basic-supplier-layer">
                <TextField
                  sx={{
                    margin: "1rem 0",
                    width: "48%",
                  }}
                  id="outlined-basic"
                  label="Número de Identificação Fiscal"
                  value={suppliersBasicData.NIF}
                  onChange={(e) =>
                    setSuppliersBasicData({
                      ...suppliersBasicData,
                      NIF: DOMPurify.sanitize(e.target.value),
                    })
                  }
                  variant="outlined"
                />

                <TextField
                  sx={{
                    margin: "1rem 0",
                    width: "48%",
                  }}
                  id="outlined-basic"
                  label="Telefone de contato"
                  value={suppliersBasicData.Phone}
                  onChange={(e) =>
                    setSuppliersBasicData({
                      ...suppliersBasicData,
                      Phone: DOMPurify.sanitize(e.target.value),
                    })
                  }
                  variant="outlined"
                />
              </div>
              <div className="advanced-supplier-information">
                <h1>Politicas de termos e pagamento</h1>

                <div className="close-modal">
                  <KeyboardArrowDownIcon
                    sx={{
                      width: "60%",
                      height: "60%",
                      color: "rgb(80, 80, 80)",
                    }}
                  />
                </div>
              </div>
              <AdvancedSupplierInformation>
                <TextField
                  sx={{
                    width: "100%",
                  }}
                  id="outlined-basic"
                  label="Nome do titular da conta bancária"
                  variant="outlined"
                  name="BankAccountHolder"
                  value={suppliersSecretData.BankAccountHolder}
                  onChange={(e) =>
                    handleInputChange(
                      "BankAccountHolder",
                      DOMPurify.sanitize(e.target.value)
                    )
                  }
                />

                <div className="basic-supplier-layer">
                  <TextField
                    sx={{
                      margin: "1rem 0",
                      width: "38%",
                    }}
                    id="outlined-basic"
                    label="Número da conta bancária"
                    variant="outlined"
                    name="BankAccountNumber"
                    value={suppliersSecretData.BankAccountNumber}
                    onChange={(e) =>
                      handleInputChange(
                        "BankAccountNumber",
                        DOMPurify.sanitize(e.target.value)
                      )
                    }
                  />

                  <TextField
                    sx={{
                      margin: "1rem 0",
                      width: "38%",
                    }}
                    id="outlined-basic"
                    label="Nome do Banco"
                    name="BankName"
                    variant="outlined"
                    value={suppliersSecretData.BankName}
                    onChange={(e) =>
                      handleInputChange(
                        "BankName",
                        DOMPurify.sanitize(e.target.value)
                      )
                    }
                  />

                  <TextField
                    sx={{
                      margin: "1rem 0",
                      width: "20%",
                    }}
                    id="outlined-basic"
                    label="Número da Agência"
                    name="BankAgency"
                    variant="outlined"
                    value={suppliersSecretData.BankAgency}
                    onChange={(e) =>
                      handleInputChange(
                        "BankAgency",
                        DOMPurify.sanitize(e.target.value)
                      )
                    }
                  />
                </div>

                <div className="basic-supplier-layer">
                  <TextField
                    sx={{
                      margin: "1rem 0",
                      width: "38%",
                    }}
                    id="outlined-basic"
                    name="Road"
                    label="Rua"
                    variant="outlined"
                    value={suppliersSecretData.Road}
                    onChange={(e) =>
                      handleInputChange(
                        "Road",
                        DOMPurify.sanitize(e.target.value)
                      )
                    }
                  />
                  <TextField
                    sx={{
                      margin: "1rem 0",
                      width: "20%",
                    }}
                    id="outlined-basic"
                    name="CEP"
                    label="CEP"
                    variant="outlined"
                    value={suppliersSecretData.CEP}
                    onChange={(e) =>
                      handleInputChange(
                        "CEP",
                        DOMPurify.sanitize(e.target.value)
                      )
                    }
                  />
                  <TextField
                    sx={{
                      margin: "1rem 0",
                      width: "38%",
                    }}
                    id="outlined-basic"
                    label="Cidade"
                    variant="outlined"
                    value={suppliersSecretData.City}
                    onChange={(e) =>
                      handleInputChange(
                        "City",
                        DOMPurify.sanitize(e.target.value)
                      )
                    }
                  />
                </div>
              </AdvancedSupplierInformation>
              <SaveAllInformations>
                <Button
                  sx={{
                    height: "2.8rem",
                    margin: "0 2rem",
                    width: "200px",
                  }}
                  variant="outlined"
                >
                  Cancelar
                </Button>
                <Button
                  sx={{
                    height: "2.8rem",
                    width: "200px",
                  }}
                  onClick={handleAddSupplierWithBasicData}
                  variant="contained"
                >
                  Salvar Fornecedor
                </Button>
              </SaveAllInformations>
            </BodyModalData>
          </Box>
        </StyledModal>
      </div>
    </>
  );
}
