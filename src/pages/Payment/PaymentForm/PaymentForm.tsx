import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useMyContext } from '../../../contexts/PaymentContext';
import { ChangeEvent } from 'react';

export default function PaymentForm() {
  const { paymentData, setPaymentData, saveAddressToContext } = useMyContext();

  const handlePaymentInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setPaymentData({
      ...paymentData,
      [name]: value,
    });
  };
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardName"
            name="nameUserCard"
            label="Nome do titular"
            fullWidth
            autoComplete="cc-name"
            variant="standard"
            onChange={handlePaymentInputChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardNumber"
            name="cardNumber"
            label="Número do cartão"
            fullWidth
            autoComplete="cc-number"
            variant="standard"
            onChange={handlePaymentInputChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="expDate"
            name="ExpireDate"
            label="Data de expiração"
            fullWidth
            autoComplete="cc-exp"
            variant="standard"
            onChange={handlePaymentInputChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cvv"
            name="CVV"
            label="CVV"
            helperText="Últimos três dígitos na faixa de assinatura"
            fullWidth
            autoComplete="cc-csc"
            variant="standard"
            onChange={handlePaymentInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveCard" value="yes" />}
            label="Salvar meu cartão de crédito para outras compras"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}