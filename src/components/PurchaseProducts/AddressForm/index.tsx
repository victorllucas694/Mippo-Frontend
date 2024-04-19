import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { usePaymentContext } from "../../../contexts/payment";

export default function AddressForm() {
  const {
    name,
    lastName,
    address,
    details,
    city,
    state,
    zip,
    country,
    setName,
    setLastName,
    setAddress,
    setDetails,
    setCity,
    setState,
    setZip,
    setCountry,
  } = usePaymentContext(); 

  console.log(name,
    lastName,
    address,
    details,
    city)
  

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Endereço de entrega
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="Primeiro nome"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="Sobrenome"
            label="Sobrenome"
            fullWidth
            autoComplete="family-name"
            variant="standard"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="Endereço"
            label="Endereço"
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address2"
            name="Complemento"
            label="Complemento"
            fullWidth
            autoComplete="shipping address-line2"
            variant="standard"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="Cidade"
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="state"
            name="Estado/região"
            label="Estado/região"
            fullWidth
            variant="standard"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="CEP - Código postal"
            fullWidth
            autoComplete="shipping postal-code"
            variant="standard"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="País"
            fullWidth
            autoComplete="shipping country"
            variant="standard"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox color="secondary" name="saveAddress" value="yes" />
            }
            label="Use this address for payment details"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
