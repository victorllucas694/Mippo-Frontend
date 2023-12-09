import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { ChangeEvent, useState } from "react";
import { useMyContext } from "../../../contexts/PaymentContext";
import { AddressBox } from "./styles";
import { Button } from "@mui/material";
import { useAxios } from "../../../providers/AxiosProvider";
import { useAuth } from "../../../contexts/AuthenticateContext";

interface AddressForm {
  name: string;
  last_name: string;
  address: string;
  address_other: string;
  city: string;
  state: string;
  CEP: string;
  country: string;
}

function AddressForm() {
  const {
    paymentData,
    setPaymentData,
    shippingAddress,
    setShippingAddressData,
    saveAddressToContext,
  } = useMyContext();

  const handlePaymentInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    saveAddressToContext(name, value);
  };

  const [addressForm, setAddressForm] = useState<AddressForm>({
    name: "",
    last_name: "",
    address: "",
    address_other: "",
    city: "",
    state: "",
    CEP: "",
    country: "",
  });
  const { axiosInstance } = useAxios();
  const { id } = useAuth();

  const saveUserAddress = async () => {
    const token = localStorage.getItem("c__token");
    const req = await axiosInstance.post(
      `/user-address/${id}`,
      {
        name: shippingAddress.name,
        last_name: shippingAddress.last_name,
        address: shippingAddress.address,
        address_other: shippingAddress.address_other,
        city: shippingAddress.city,
        state: shippingAddress.state,
        CEP: shippingAddress.CEP,
        country: shippingAddress.country,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if(req.status) {
      window.location.href = `/payment/${id}`
    }
  };

  return (
    <React.Fragment>
      <AddressBox>
        <Grid sx={{ width: "100%" }} container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="name"
              name="name"
              label="Nome"
              fullWidth
              type="text"
              autoComplete="shipping address-level2"
              variant="outlined"
              onChange={handlePaymentInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="outlined-basic"
              name="last_name"
              type="text"
              variant="outlined"
              label="Sobrenome"
              fullWidth
              onChange={handlePaymentInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              required
              id="address"
              name="address"
              label="Endereço inicial"
              type="text"
              fullWidth
              autoComplete="family-name"
              variant="outlined"
              onChange={handlePaymentInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="address1"
              name="address_other"
              label="Endereço de complemento"
              type="text"
              fullWidth
              autoComplete="shipping address-line1"
              variant="outlined"
              onChange={handlePaymentInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="city"
              name="city"
              label="Cidade"
              type="text"
              fullWidth
              autoComplete="shipping address-line2"
              variant="outlined"
              onChange={handlePaymentInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="state"
              name="state"
              type="text"
              label="Estado"
              fullWidth
              autoComplete="shipping address-level2"
              variant="outlined"
              onChange={handlePaymentInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="CEP"
              name="CEP"
              type="text"
              label="CEP - Código Postal"
              fullWidth
              variant="outlined"
              onChange={handlePaymentInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              required
              id="country"
              type="text"
              name="country"
              label="Pais"
              fullWidth
              autoComplete="shipping postal-code"
              variant="outlined"
              onChange={handlePaymentInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox color="secondary" name="saveAddress" value="yes" />
              }
              label="Salvar meu endereço para outras compras"
            />
          </Grid>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Grid item xs={3}>
              <Button
                sx={{ width: "100%", height: "3rem", margin: " 1rem -1rem" }}
                variant="outlined"
              >
                Cancelar
              </Button>
            </Grid>
            <Grid item xs={3}>
              <Button
                onClick={saveUserAddress}
                sx={{ width: "100%", height: "3rem", margin: "1rem" }}
                variant="contained"
              >
                Adicionar
              </Button>
            </Grid>
          </div>
        </Grid>
      </AddressBox>
    </React.Fragment>
  );
}

export default AddressForm;
