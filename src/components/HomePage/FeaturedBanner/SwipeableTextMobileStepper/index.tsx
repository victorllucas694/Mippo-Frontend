import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
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
      "PLACA DE VIDEO ASUS GEFORCE RTX 4070 DUAL WHITE OC EDITION, 8GB, GDDR6, 128-BIT, DUAL-RTX4060-O8G-WHITE",
    label:
      "Explore um universo de possibilidades para elevar seu PC a novos patamares de desempenho. Aumente sua imersão nos jogos com periféricos de alta precisão para suas aventuras virtuais.",
    imgPath:
      "https://m.media-amazon.com/images/I/81oBMA48NXL._AC_UF894,1000_QL80_.jpg",
  },
  {
    title:
      "PLACA DE VIDEO PNY GEFORCE RTX 3050, 8GB, GDDR6, 128-BIT, VCG30518DFBPB1-NAC",
    label:
      "Mergulhe no mundo dos PCs gamer personalizados, onde a estética encontra o desempenho máximo. De iluminação RGB a sistemas de refrigeração avançados.",
      imgPath:
      "https://m.media-amazon.com/images/I/71JJi2GQIqS._AC_UF894,1000_QL80_.jpg",
  },
  {
    title:
      "PROCESSADOR INTEL CORE I9-13900F, 24-CORE, 32-THREADS, 2.0GHZ (5.6GHZ TURBO), CACHE 36MB, LGA1700, BX8071513900F",
    label:
      "Os verdadeiros gamers sabem que os acessórios certos podem fazer toda a diferença. Descubra como cada acessório contribui para uma jogabilidade mais envolvente e competitiva.",
      imgPath:
      "https://media.pichau.com.br/media/catalog/product/cache/2f958555330323e505eba7ce930bdf27/b/x/bx8071512900kf2121.jpg",
  },
  {
    title:
      "PICHAU KIT UPGRADE, AMD RYZEN 9 7900X, X670 DDR5",
    label:
      "1 x Processador AMD Ryzen 9 7900X, 12-Core, 24-Threads, 4.7GHz (5.6GHz Turbo), Cache 76MB, AM5, 100-100000589WOF. 1 x Placa Mae Asus TUF Gaming X670E-Plus, DDR5, Socket AM5, ATX, Chipset AMD X670, TUF-GAMING-X670E-PLUS",
      imgPath:
      "https://d30u9wim1barf6.cloudfront.net/Custom/Content/Products/98/73/987390_processador-amd-ryzen-9-3950x-64mb-3-5ghz-4-7ghz-am4-100-100000051wofnac006551_m1_637145342866581634.jpg",
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
                      <img style={{ borderRadius: '10px' }} src={step.imgPath} alt="" />
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
