import * as React from "react";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { usePaymentContext } from "../../../contexts/payment";
import { useAxios } from "../../../providers/AxiosProvider";
import { useAuth } from "../../../contexts/AuthenticateContext";


export default function Review() {
  const [products, __setProducts] = React.useState([]);

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
  
const payments = [
  { name: "Card type:", detail: "Visa" },
  { name: "Card holder:", detail: nameBody },
  { name: "Card number:", detail: cardNumber },
  { name: "Expiry date:", detail: expirationDate },
];
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

  const { axiosInstance } = useAxios();
  const { id } = useAuth();
  
  const [total, setTotal] = React.useState<number>(0);
  
  const getAllPriceData = async () => {
    try {
      const req = await axiosInstance(`/payment-shipping-cart/cart/${id}`);
      let valTotal = 0; 
      req.data.forEach((products: any) => {
        const { getProductsByOrderId } = products;
        valTotal += Number(getProductsByOrderId.Valor_a_prazo);
      });
      setTotal(valTotal);
    } catch (error) {
      console.error('Erro ao obter dados de preço:', error);
    }
  };
  
  React.useEffect(() => {
    getAllPriceData();
  }, [axiosInstance, id]);

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
            R${total}
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
          <Typography gutterBottom>{addressBody}</Typography>
          <Typography color="text.secondary" gutterBottom>
            {cityBody + " " + countryBody}
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
