import * as React from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import {
  usePaymentContext,
} from "../../../contexts/payment";

const products = [
  {
    name: "Product 1",
    desc: "A nice thing",
    price: "$9.99",
  },
  {
    name: "Product 2",
    desc: "Another thing",
    price: "$3.45",
  },
  { name: "Shipping", desc: "", price: "Free" },
];
const addresses = ["1 MUI Drive", "Reactville", "Anytown", "99999", "USA"];


export default function Review() {  
  // const {
  //   firstName,
  //   address1,
  //   address2,
  //   cardNumber,
  //   cardholder,
  //   city,
  //   country,
  //   cvv,
  //   expirationDate,
  //   lastName,
  // } = usePaymentContext();

// const payments = [
//   { name: "Banco", detail: "Bradesco" },
//   { name: "Titular", detail: cardholder },
//   { name: "Cartão", detail: cardNumber },
//   { name: "Expiração", detail: expirationDate },
// ];



  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Etapa de pagamento
      </Typography>
      <List disablePadding>
        {products.map((product) => (
          <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
            <ListItemText primary={product.name} secondary={product.desc} />
            <Typography variant="body2">{product.price}</Typography>
          </ListItem>
        ))}
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            $34.06
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping
          </Typography>
          <Typography gutterBottom>John Smith</Typography>
          <Typography gutterBottom>{addresses.join(", ")}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Payment details
          </Typography>
          {/* <Grid container>
            {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid> */}
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
