import { FooterConteiner } from "./styles";
import GoogleIcon from "@mui/icons-material/Google";
import CastIcon from "@mui/icons-material/Cast";
function Footer() {
  interface AboutUsItem {
    id: number;
    label: string;
  }

  interface FooterContentItem {
    title: string;
    aboutUs: AboutUsItem[];
  }

  const footerContent: FooterContentItem[] = [
    {
      title: "Quem somos",
      aboutUs: [
        {
          id: 0,
          label: "Equipe",
        },
        {
          id: 1,
          label: "Suporte",
        },
        {
          id: 2,
          label: "Carreira",
        },
        {
          id: 2,
          label: "Lojas parceiras",
        },
        {
          id: 2,
          label: "Politica de privacidade",
        },
      ],
    },
    {
      title: "Ajuda ao cliente",
      aboutUs: [
        {
          id: 0,
          label: "Central de ajuda",
        },
        {
          id: 1,
          label: "Reembolso",
        },
        {
          id: 2,
          label: "Localizar pedidos",
        },
        {
          id: 2,
          label: "Reclamação e ouvidoria",
        },
        {
          id: 2,
          label: "Reclamação e ouvidoria",
        },
      ],
    },
  ];

  return (
    <FooterConteiner>
      <div className="body-footer">
        <div className="company-information">
          <div className="brand-company">
            <div className="brand"></div>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Non, sed
              harum. Perferendis assumenda ipsam recusandae nostrum iure
              consequuntur soluta sequi.
            </p>
            <div className="buttons-socials">
              <div className="buttons-layer">
                <div className="brand-social">
                  <GoogleIcon sx={{ color: "white " }} />
                </div>
                <div className="body-social">
                  <h4>abrir com</h4>
                  <h3>Google Play</h3>
                </div>
              </div>
              <div className="buttons-layer">
                <div className="brand-social">
                  <CastIcon sx={{ color: "white " }} />
                </div>
                <div className="body-social">
                  <h4>abrir com</h4>
                  <h3>Google Cast</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        {footerContent.map((footer: FooterContentItem) => {
          return (
            <>
              <div className="about-us">
                <h1>{footer.title}</h1>

                {footer.aboutUs.map((aboutUs: AboutUsItem) => {
                  return <a href="">{aboutUs.label}</a>;
                })}
              </div>
            </>
          );
        })}
        <div className="contact-us">
          <h1>Entre em contato</h1>

          <a href="">90 Washington Square South, New York, United States</a>
          <a href="">Email: emailexemplo@gmail.com</a>
          <a href="">Phone: +19 91245-6780</a>
        </div>
      </div>
    </FooterConteiner>
  );
}

export default Footer;
