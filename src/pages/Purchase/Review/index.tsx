import * as React from "react";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useAxios } from "../../../providers/AxiosProvider";
import { useAuth } from "../../../contexts/AuthenticateContext";
import { usePaymentContext } from "../../../contexts/payment";
// import { usePaymentContext } from "../../../contexts/payment";

const addresses = ["1 MUI Drive", "Reactville", "Anytown", "99999", "USA"];
const payments = [
  { name: "Card type:", detail: "Visa" },
  { name: "Card holder:", detail: "Mr. John Smith" },
  { name: "Card number:", detail: "xxxx-xxxx-xxxx-1234" },
  { name: "Expiry date:", detail: "04/2024" },
];

export default function Review() {
  const { id } = useAuth();
  const { axiosInstance } = useAxios();
  const token = localStorage.getItem("c__token");
  const [products, setProducts] = React.useState([]);
  const [productsCallBack, setProductsCallBack] = React.useState([]);

  const {
    addressBody,
    cardNumber,
    cardholder,
    cityBody,
    countryBody,
    cvv,
    detailsBody,
    expirationDate,
    lastNameBody,
    nameBody,
    paymentType,
  } = usePaymentContext();

  console.log(
    addressBody,
    cardNumber,
    cardholder,
    cityBody,
    countryBody,
    cvv,
    detailsBody,
    expirationDate,
    lastNameBody,
    nameBody,
    paymentType
  );

  return (
    <Stack spacing={2}>
      <List disablePadding>
        {products.map((getProductsByOrderId: any) => {
          return (
            <ListItem sx={{ py: 1, px: 0 }}>
              <ListItemText primary="Products" secondary="4 selected" />
              <Typography variant="body2">
                {getProductsByOrderId.Valor_a_prazo}
              </Typography>
            </ListItem>
          );
        })}
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            $144.97
          </Typography>
        </ListItem>
      </List>
      <Divider />
      <Stack
        direction="column"
        divider={<Divider flexItem />}
        spacing={2}
        sx={{ my: 2 }}
      >
        <div>
          <Typography variant="subtitle2" gutterBottom>
            detalhes de pagamento
          </Typography>
          <Typography gutterBottom>John Smith</Typography>
          <Typography color="text.secondary" gutterBottom>
            {addresses.join(", ")}
          </Typography>
        </div>
        <div>
          <Typography variant="subtitle2" gutterBottom>
            Payment details
          </Typography>
          <Grid container>
            {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Stack
                  direction="row"
                  spacing={1}
                  useFlexGap
                  sx={{ width: "100%", mb: 1 }}
                >
                  <Typography variant="body1" color="text.secondary">
                    {payment.name}
                  </Typography>
                  <Typography variant="body2">{payment.detail}</Typography>
                </Stack>
              </React.Fragment>
            ))}
          </Grid>
        </div>
      </Stack>
    </Stack>
  );
}
