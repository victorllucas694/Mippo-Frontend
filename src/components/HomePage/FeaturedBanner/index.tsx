import { FeaturedBannerComponent } from "./styles";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PriceChangeIcon from "@mui/icons-material/PriceChange";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import PrivacyTipIcon from "@mui/icons-material/PrivacyTip";
import SwipeableTextMobileStepper from "./SwipeableTextMobileStepper";

interface IFlags {
  id: number;
  title: string;
  label: string;
  icon: any;
}

function FeaturedBanner() {
  const flagsToHomePage: IFlags[] = [
    {
      id: 0,
      title: "Frete Grátis",
      label: "Acima de R$100,00",
      icon: (
        <LocalShippingIcon
          sx={{ width: "43px", height: "43px", color: "rgb(60, 60, 60)" }}
        />
      ),
    },
    {
      id: 1,
      title: "Garantia extendida",
      label: "30 dias de retorno",
      icon: (
        <PriceChangeIcon
          sx={{ width: "43px", height: "43px", color: "rgb(60, 60, 60)" }}
        />
      ),
    },
    {
      id: 2,
      title: "Pagamento Seguro",
      label: "Segurança de seus dados",
      icon: (
        <CreditScoreIcon
          sx={{ width: "43px", height: "43px", color: "rgb(60, 60, 60)" }}
        />
      ),
    },
    {
      id: 3,
      title: "Suporte Completo",
      label: "Suporte 24/7",
      icon: (
        <PrivacyTipIcon
          sx={{ width: "43px", height: "43px", color: "rgb(60, 60, 60)" }}
        />
      ),
    },
  ];

  return (
    <FeaturedBannerComponent>
      <div className="box-market-offers">
        <SwipeableTextMobileStepper />
      </div>
      <div className="sub-box-offers">
        {flagsToHomePage.map((flagsDataBody: IFlags) => {
          return (
            <div className="flags">
              <div className="icon-flag">{flagsDataBody.icon}</div>

              <div className="body-flag">
                <h1>{flagsDataBody.title}</h1>
                <h2>{flagsDataBody.label}</h2>
              </div>
            </div>
          );
        })}
      </div>
    </FeaturedBannerComponent>
  );
}

export default FeaturedBanner;
