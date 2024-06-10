import * as React from 'react';

import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/system';

const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

export default function AddressForm() {

  const [ userName, setUsername ] = React.useState<string>('');
  const [ lastName, setLastname ] = React.useState<string>('');
  const [ address, setAddress ] = React.useState<string>('');
  const [ details, setDetails ] = React.useState<string>('');
  const [ city, setCity ] = React.useState<string>('');
  const [ state, setState ] = React.useState<string>('');
  const [ postalCode, setPostalCode ] = React.useState<string>('');
  const [ country, setCuntry ] = React.useState<string>('');


  console.log(userName,lastName,address,details,city, state, postalCode, country )

  return (
    <Grid container spacing={3}>
      <FormGrid item xs={12} md={6}>
        <FormLabel htmlFor="first-name" required>
          Primeiro nome
        </FormLabel>
        <OutlinedInput
          id="first-name"
          name="first-name"
          onChange={(e: any) => setUsername(e.target.value)}
          type="name"
          placeholder="Victor"
          autoComplete="first name"
          required
        />
      </FormGrid>
      <FormGrid item xs={12} md={6}>
        <FormLabel htmlFor="last-name" required>
          Sobrenome
        </FormLabel>
        <OutlinedInput
          id="last-name"
          name="last-name"
          type="last-name"
          onChange={(e: any) => setLastname(e.target.value)}
          placeholder="Lucas da Silva"
          autoComplete="last name"
          required
        />
      </FormGrid>
      <FormGrid item xs={12}>
        <FormLabel htmlFor="address1" required>
          endereço
        </FormLabel>
        <OutlinedInput
          id="address1"
          onChange={(e: any) => setAddress(e.target.value)}
          name="address1"
          type="address1"
          placeholder="Rua duque de caxias 1203"
          autoComplete="shipping address-line1"
          required
        />
      </FormGrid>
      <FormGrid item xs={12}>
        <FormLabel htmlFor="address2">Complemento</FormLabel>
        <OutlinedInput
          id="address2"
          onChange={(e: any) => setDetails(e.target.value)}
          name="address2"
          type="address2"
          placeholder="Apartamento, Hotel, casas, etc. (Não obrigatorio)"
          autoComplete="shipping address-line2"
          required
        />
      </FormGrid>
      <FormGrid item xs={6}>
        <FormLabel htmlFor="city" required>
          Cidade
        </FormLabel>
        <OutlinedInput
          id="city"
          name="city"
          onChange={(e: any) => setCity(e.target.value)}
          type="city"
          placeholder="Campinas"
          autoComplete="City"
          required
        />
      </FormGrid>
      <FormGrid item xs={6}>
        <FormLabel htmlFor="state" required>
          Estado
        </FormLabel>
        <OutlinedInput
          id="state"
          onChange={(e: any) => setState(e.target.value)}
          name="state"
          type="state"
          placeholder="SP"
          autoComplete="State"
          required
        />
      </FormGrid>
      <FormGrid item xs={6}>
        <FormLabel htmlFor="zip" required>
          Código postal
        </FormLabel>
        <OutlinedInput
          id="zip"
          onChange={(e: any) => setPostalCode(e.target.value)}
          name="zip"
          type="zip"
          placeholder="12345"
          autoComplete="shipping postal-code"
          required
        />
      </FormGrid>
      <FormGrid item xs={6}>
        <FormLabel htmlFor="country" required>
          País
        </FormLabel>
        <OutlinedInput
          id="country"
          onChange={(e: any) => setCuntry(e.target.value)}
          name="country"
          type="country"
          placeholder="Brasil"
          autoComplete="shipping country"
          required
        />
      </FormGrid>
      <FormGrid item xs={12}>
        <FormControlLabel
          control={<Checkbox name="saveAddress" value="yes" />}
          label="Use this address for payment details"
        />
      </FormGrid>
    </Grid>
  );
}