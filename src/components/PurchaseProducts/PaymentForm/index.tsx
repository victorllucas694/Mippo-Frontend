import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

interface IShippingFormat {
  id: number;
  label: string
}

export default function PaymentForm() {

  const inputsFormat: IShippingFormat[] = [
    {
      id: 0,
      label: 'Nome do titular'
    },
    {
      id: 0,
      label: 'Número do cartão'
    },
    {
      id: 0,
      label: 'Data de expiração'
    },
    {
      id: 0,
      label: 'CVV'
    },
  ]

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Metodo de pagamento
      </Typography>
      <Grid container spacing={3}>
        {
          inputsFormat.map((inputsFiltred: IShippingFormat) => {
            return (
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  key={inputsFiltred.id}
                  id="cardName"
                  label={inputsFiltred.label}
                  fullWidth
                  autoComplete="cc-name"
                  variant="standard"
                />
              </Grid>

            )
          })
        }

        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveCard" value="yes" />}
            label="Quero Salvar meus dados"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}