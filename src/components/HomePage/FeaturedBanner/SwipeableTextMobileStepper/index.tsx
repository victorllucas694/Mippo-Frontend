import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import { StepperBodyData } from "./styles";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
  {
    title:
      "Potencialize seu Desempenho: Guia Definitivo de Hardware Gamer",
    label:
      "Explore um universo de possibilidades para elevar seu PC a novos patamares de desempenho. Aumente sua imersão nos jogos com periféricos de alta precisão para suas aventuras virtuais.",
    imgPath:
      "https://imgs.casasbahia.com.br/1546744747/1xg.jpg",
  },
  {
    title:
      "Além da Estética: A Revolução dos PCs Gamer Personalizados",
    label:
      "Mergulhe no mundo dos PCs gamer personalizados, onde a estética encontra o desempenho máximo. De iluminação RGB a sistemas de refrigeração avançados.",
      imgPath:
      "https://exitocol.vtexassets.com/arquivos/ids/13631502/computador-pc-torre-gamer-alca-amd-ryzen-7-5700g-hdd-1tb-ram-16gb-led-22-full-hd-pulgadas.jpg?v=637934998748330000",
  },
  {
    title:
      "Acessórios Gamer: Elevando sua Experiência a Outro Nível",
    label:
      "Os verdadeiros gamers sabem que os acessórios certos podem fazer toda a diferença. Descubra como cada acessório contribui para uma jogabilidade mais envolvente e competitiva.",
      imgPath:
      "https://m.media-amazon.com/images/I/61HH9uitmTL._AC_UF894,1000_QL80_.jpg",
  },
  {
    title:
      "Construa Seu Império Digital: O Poder dos Componentes de PC de Última Geração",
    label:
      "Entre no universo da construção de PCs e desvende os segredos por trás dos componentes de última geração. Valiosos para quem busca o ápice do desempenho em suas jornadas digitais.",
      imgPath:
      "https://exitocol.vtexassets.com/arquivos/ids/11640389-800-auto?v=637786562733830000&width=800&height=auto&aspect=true",
  },
];

function SwipeableTextMobileStepper() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = images.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  return (
    <Box sx={{ width: "100%", minHeight: "40vh" }}>
      <Paper
        square
        elevation={0}
        sx={{
          display: "flex",
          alignItems: "center",
          height: "auto",
          pl: 2,
          bgcolor: "background.default",
        }}
      ></Paper>
      <AutoPlaySwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {images.map((step, index) => (
          <div key={index}>
            {Math.abs(activeStep - index) <= 2 ? (
              <Box>
                <StepperBodyData>
                  <div className="body-container">
                    <h1>{step.title}</h1>
                    <p>{step.label}</p>
                    <button id="more-info">Abrir categoria</button>
                  </div>
                  <div className="image-container">
                    <div className="image-wrapper">
                      <img src={step.imgPath} alt="" />
                    </div>
                  </div>
                </StepperBodyData>
              </Box>
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
          </Button>
        }
      />
    </Box>
  );
}

export default SwipeableTextMobileStepper;
