import AddressForm from "./AddressForm";
import { BoxPurchase } from "./styles";
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import PaymentForm from "./PaymentForm";
import Review from "./Review";
import Header from "../Global/Header";
import SearchPanel from "../Global/SearchPanel";
import OptionsHeader from "../Global/OptionsPanel";
import Footer from "../Global/Footer";

function Copyright() {
    return (
      <Typography variant="body2" color="text.secondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
          Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
  
  const steps = ['Endereço de entrega', 'Pagamento dos produtos', 'Revisar dados fornnecidos'];
  
  function getStepContent(step: number) {
    switch (step) {
      case 0:
        return <AddressForm />;
      case 1:
        return <PaymentForm />;
      case 2:
        return <Review />;
      default:
        throw new Error('Unknown step');
    }
  }
  
  export default function Checkout() {
    const [activeStep, setActiveStep] = React.useState(0);
  
    const handleNext = () => {
      setActiveStep(activeStep + 1);
    };
  
    const handleBack = () => {
      setActiveStep(activeStep - 1);
    };
    const categoriesBoxProps = [
      {
        id: 1,
        label: "Departamentos gerais",
      },
      {
        id: 2,
        label: "Notebook",
      },
      {
        id: 3,
        label: "Acessorios",
      },
      {
        id: 4,
        label: "Área gamer",
      },
      {
        id: 5,
        label: "Hardware",
      },
      {
        id: 4,
        label: "Computadores",
      },
      {
        id: 5,
        label: "Softwares",
      },
    ];
    return (
      <React.Fragment>
        <CssBaseline />
        <Header />
        <SearchPanel/>
        <OptionsHeader categoriesBoxProps={categoriesBoxProps} />
        <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
          <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
            <Typography component="h1" variant="h4" align="center">
              Etapas de pagamento
            </Typography>
            <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is #2001539. We have emailed your order
                  confirmation, and will send you an update when your order has
                  shipped.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Back
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    {activeStep === steps.length - 1 ? 'Place order' : 'Avançar'}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </Paper>
          <Copyright />
        </Container>
        <Footer />
      </React.Fragment>
    );
  }


{/* <BoxPurchase>
                <div className="container-purchase">
                    
                </div>
            </BoxPurchase> */}