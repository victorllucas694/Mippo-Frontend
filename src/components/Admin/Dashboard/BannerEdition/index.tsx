import { Button, TextField } from "@mui/material";
import { BannerModifyBox } from "./styles";

interface imagesDefault {
  title: string;
  label: string;
  imgPath: string;
}

function BannerEdition() {
  const images: imagesDefault[] = [
    {
      title:
        "PLACA DE VIDEO ASUS GEFORCE RTX 4070 DUAL WHITE OC EDITION, 8GB, GDDR6, 128-BIT",
      label:
        "Explore um universo de possibilidades para elevar seu PC a novos patamares de desempenho. Aumente sua imersão nos jogos com periféricos de alta precisão para suas aventuras virtuais.",
      imgPath:
        "https://m.media-amazon.com/images/I/81oBMA48NXL._AC_UF894,1000_QL80_.jpg",
    },
    {
      title: "PLACA DE VIDEO PNY GEFORCE RTX 3050, 8GB, GDDR6, 128-BIT, ",
      label:
        "Mergulhe no mundo dos PCs gamer personalizados, onde a estética encontra o desempenho máximo. De iluminação RGB a sistemas de refrigeração avançados.",
      imgPath:
        "https://m.media-amazon.com/images/I/71JJi2GQIqS._AC_UF894,1000_QL80_.jpg",
    },
    {
      title:
        "PROCESSADOR INTEL CORE I9-13900F, 24-CORE, 32-THREADS, 2.0GHZ CACHE 36MB",
      label:
        "Os verdadeiros gamers sabem que os acessórios certos podem fazer toda a diferença. Descubra como cada acessório contribui para uma jogabilidade mais envolvente e competitiva.",
      imgPath:
        "https://www.visaovip.com/imagem/cpu-intel/processador-intel-core-i9-12900k-socket-lga-1700-3-2ghz-30mb/2/559089.jpg?pfdrid_c=true",
    },
    {
      title: "PICHAU KIT UPGRADE, AMD RYZEN 9 7900X, X670 DDR5",
      label:
        "1 x Processador AMD Ryzen 9 7900X, 12-Core, 24-Threads, 4.7GHz (5.6GHz Turbo), Cache 76MB, AM5, 100-100000589WOF. 1 x Placa Mae Asus TUF Gaming X670E-Plus, DDR5, Socket AM5, ATX, Chipset AMD X670, TUF-GAMING-X670E-PLUS",
      imgPath:
        "https://d30u9wim1barf6.cloudfront.net/Custom/Content/Products/98/73/987390_processador-amd-ryzen-9-3950x-64mb-3-5ghz-4-7ghz-am4-100-100000051wofnac006551_m1_637145342866581634.jpg",
    },
    {
      title: "PICHAU KIT UPGRADE, AMD RYZEN 9 7900X, X670 DDR5",
      label:
        "1 x Processador AMD Ryzen 9 7900X, 12-Core, 24-Threads, 4.7GHz (5.6GHz Turbo), Cache 76MB, AM5, 100-100000589WOF. 1 x Placa Mae Asus TUF Gaming X670E-Plus, DDR5, Socket AM5, ATX, Chipset AMD X670, TUF-GAMING-X670E-PLUS",
      imgPath:
        "https://d30u9wim1barf6.cloudfront.net/Custom/Content/Products/98/73/987390_processador-amd-ryzen-9-3950x-64mb-3-5ghz-4-7ghz-am4-100-100000051wofnac006551_m1_637145342866581634.jpg",
    },
  ];


  return (
    <BannerModifyBox>
      <h1>Modifique o banner principal</h1>
      <div className="header-banner-modify">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt
          consequatur dolores vel blanditiis perspiciatis sint earum. Sint saepe
          deleniti fugiat? Temporibus voluptatem error rem facere, adipisci
          earum impedit praesentium et!
        </p>
      </div>

      <div className="banner-body-modify">
        <div className="form-data">
          <h2>Monte o novo layout</h2>

          <TextField
            sx={{ width: "90%", margin: " 1rem " }}
            id="outlined-basic"
            label="Titulo do banner"
            variant="outlined"
          />
          <TextField
            sx={{ width: "90%", margin: " 1rem " }}
            id="outlined-basic"
            label="texto do banner"
            variant="outlined"
          />

          <div className="image-drag-in-drop">
            <img
              src="https://img.freepik.com/vetores-gratis/imagens-conceito-ilustracao_114360-218.jpg?t=st=1710629442~exp=1710633042~hmac=61ddf87de80855314d202b1ef388a0c5c0457d2a1cdc9417d70b161c2710e249&w=826"
              alt=""
            />
          </div>
          <Button sx={{
            width: '30%',
            height: '3.4rem'
          }} variant="contained">Salvar banner</Button>
        </div>
        <div className="check-list">
          <h2>layouts padrão</h2>
          {images.map((labels: imagesDefault) => {
            return <div className="label-box">{labels.title}</div>;
          })}
        </div>
      </div>
    </BannerModifyBox>
  );
}

export default BannerEdition;
