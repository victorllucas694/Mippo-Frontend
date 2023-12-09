import { GridMicroBannersBoxes } from "./styles";

interface IBannerLayerData {
  id: number;
  image: string;
  label: string;
  title: string;
}

function GridBannersData() {
  const bannerLayerData: IBannerLayerData[] = [
    {
      id: 0,
      image:
        "https://img.freepik.com/psd-gratuitas/design-de-computador-realista_1310-689.jpg?w=1380&t=st=1698354982~exp=1698355582~hmac=ed2ba0c4547f572cf3616740a723424b10432d6320ff6a234e905726e849fce9",
      label: "Computadores ideais para seu trabalho",
      title: "Melhore seu Hardware",
    },
    {
      id: 1,
      image:
        "https://img.freepik.com/psd-gratuitas/maquete-de-computador_1310-706.jpg?w=1380&t=st=1698355245~exp=1698355845~hmac=1e61c70919e2746e5436d74c4c8ec17845895270e040a14ee9d9dbfd5e12ea26",
      label: "Máquinas para simulação e jogos",
      title: "Notebooks gerais",
    },
  ];

  return (
    <GridMicroBannersBoxes>
      <div className="product-layer">
        {bannerLayerData.map((bannerLayer: IBannerLayerData) => {
          return (
            <div className="md-banner">
              <img src={bannerLayer.image} alt="" />
              <h1>{bannerLayer.label}</h1>
            </div>
          );
        })}
      </div>
    </GridMicroBannersBoxes>
  );
}

export default GridBannersData;
