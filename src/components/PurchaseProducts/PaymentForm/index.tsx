import React, { useState, ChangeEvent } from "react";
import { Grid, TextField } from "@mui/material";
import { usePaymentContext } from "../../../contexts/payment";

interface IShippingFormat {
  id: number;
  label: string;
}

const inputsFormat: IShippingFormat[] = [
  {
    id: 0,
    label: "Nome do titular",
  },
  {
    id: 1,
    label: "Número do cartão",
  },
  {
    id: 2,
    label: "Data de expiração",
  },
  {
    id: 3,
    label: "CVV",
  },
];

const MyComponent: React.FC = () => {
  const {
    cardholder,
    cardNumber,
    expirationDate,
    cvv,
    setCardholder,
    setCardNumber,
    setExpirationDate,
    setCVV,
  } = usePaymentContext();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <TextField
          required
          id="cardholder"
          label="Cardholder"
          fullWidth
          autoComplete="cc-name"
          variant="standard"
          value={cardholder}
          onChange={(event) => setCardholder(event.target.value)}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          required
          id="cardNumber"
          label="Card Number"
          fullWidth
          autoComplete="cc-number"
          variant="standard"
          value={cardNumber}
          onChange={(event) => setCardNumber(event.target.value)}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          required
          id="expirationDate"
          label="Expiration Date"
          fullWidth
          autoComplete="cc-exp"
          variant="standard"
          value={expirationDate}
          onChange={(event) => setExpirationDate(event.target.value)}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          required
          id="cvv"
          label="CVV"
          fullWidth
          autoComplete="cc-csc"
          variant="standard"
          value={cvv}
          onChange={(event) => setCVV(event.target.value)}
        />
      </Grid>
    </Grid>
  );
};

export default MyComponent;
