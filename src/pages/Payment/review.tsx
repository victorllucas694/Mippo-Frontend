import * as React from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import { useMyContext } from "../../contexts/PaymentContext";
import { useAuth } from "../../contexts/AuthenticateContext";

export default function Review() {
  const { paymentData } = useMyContext();
  const { name } = useAuth();
  console.log(paymentData);
  const products = [
    {
      name: "Product 1",
      desc: "A nice thing",
      price: "$9.99",
    },
    { name: "Valor do frete", desc: "", price: "Gratuito" },
  ];
  const payments = [
    { name: "Card type", detail: "MasterCard" },
    { name: "Card holder", detail: paymentData.nameUserCard },
    { name: "Card number", detail: paymentData.cardNumber },
    { name: "Expiry date", detail: paymentData.ExpireDate },
  ];

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
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
            Detalhes
          </Typography>
          <Typography gutterBottom>{paymentData.nameUserCard}</Typography>
          <Typography gutterBottom>
            {paymentData.address +
              ", " +
              paymentData.city +
              ", " +
              paymentData.country +
              ", " +
              paymentData.state}
          </Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Pagamento
          </Typography>
          <Grid container>
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
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
