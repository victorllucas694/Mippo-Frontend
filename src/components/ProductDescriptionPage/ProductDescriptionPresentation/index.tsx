import {
  FinalizationProductDetail,
  PresentationBox,
  PurchaseInstallment,
} from "./styles";
import PaymentIcon from "@mui/icons-material/Payment";
import ReceiptIcon from "@mui/icons-material/Receipt";
import { useRequestsProductsContext } from "../../../contexts/RequestsProductsContext";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Pagination,
  Rating,
  Typography,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import { useState, useEffect } from "react";
import { useAxios } from "../../../providers/AxiosProvider";

function ProductDescriptionPresentation() {
  const { productSelected } = useRequestsProductsContext();
  const { axiosInstance } = useAxios();

  interface ILargeImage {
    codigo_das_imagens: string;
    id: number;
    large_image: string;
  }

  interface ISideImage {
    first_image: string;
    fourth_image: string;
    id: number;
    image_code: string;
    second_image: string;
    third_image: string;
  }

  interface ImageData {
    largeImages: ILargeImage[];
    sideImages: ISideImage[];
    tableName: string;
    imageCodes: string;
  }
  const initialState: ImageData = {
    largeImages: [],
    sideImages: [],
    tableName: "",
    imageCodes: "",
  };

  const getProductImageByCategoryAndProductId = async (
    category: string,
    productID: string,
    imageCode: string
  ) => {
    const token = localStorage.getItem("c__token");
    const foundedImages = await axiosInstance(
        `/products-management-without-auth/get/all/images/${category}/${productID}/${imageCode}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      foundedImages.data.map((data: any) => {
        const { tableName, largeImages, sideImages, imageCodes } = data;
        

        if (productSelected?.Codigo_das_Imagens === imageCodes) {
          setImageData({
            largeImages,
            sideImages,
            tableName,
            imageCodes,
          });
        }
      });

  };
  
  const [imageData, setImageData] = useState<ImageData>(initialState);

  useEffect(() => {
    const currentURL = window.location.pathname;
    const urlParts = currentURL.split("/");
    const category = urlParts[1];

    if (
      category &&
      productSelected?.id &&
      productSelected?.Codigo_das_Imagens
    ) {
      getProductImageByCategoryAndProductId(
        category,
        String(productSelected?.id),
        productSelected.Codigo_das_Imagens
      );
    }
  }, [productSelected]);


  return (
    <PresentationBox>
      <div className="content-presentation">
        <div className="image-presentation-product">
          <div className="sub-boxes-images">
            <div className="box-image"></div>
            <div className="box-image"></div>
            <div className="box-image"></div>
            <div className="box-image"></div>
          </div>
          <div className="box-primary-image">
            {imageData.largeImages.map((largeImg, index) => (
              <img
                style={{
                  objectFit: "contain",
                  margin: "auto",
                  height: "100%",
                  width: "100%",
                }}
                key={index}
                src={`http://localhost:3000/${largeImg.large_image}`}
                loading="lazy"
                alt=""
              />
            ))}
          </div>
          
        </div>
        <div className="information-product-presentation">
          <div className="brand-product">
            <h1>{productSelected?.Fabricante}</h1>
          </div>
          <div className="title-product">
            <h1>{productSelected?.Marca}</h1>
            {/* <Typography>{productSelected?.Fabricante}</Typography> */}
            <p>
              {productSelected?.Fornecedor}: (1) Avaliação sobre esse
              produto/fornecedor
            </p>
            <Rating name="simple-controlled" value={5} /> (1 avaliação do
            produto)
            <Typography>
              <span>
                <strong>Processador: </strong>
              </span>
              {`${productSelected?.Marca_do_chipset_de_video || ""} ${
                productSelected?.Tipo_de_processador || ""
              } ${productSelected?.Velocidade_do_processador || ""} ${
                productSelected?.Tipo_de_soquete_do_processador || ""
              }`.trim()}
              <br />
              <span>
                <strong>Marca: </strong>
              </span>
              {productSelected?.Marca}
              <br />
              <span>
                <strong>Numero de núclos: </strong>
              </span>
              {productSelected?.Numero_de_processadores} Núcleo(s)
              <br />
              <span>
                <strong>Memória RAM: </strong>
              </span>
              {productSelected?.Tamanho_da_memoria +
                " " +
                productSelected?.Tipo_de_Memoria}
            </Typography>
            <p>Código: <span><strong>{productSelected?.Codigo}</strong></span></p>
          </div>
          <PurchaseInstallment>
            <p>
              por <span>R$ {productSelected?.Valor_a_prazo}</span>
            </p>
            <div className="payment-method">
              <div className="icon-payment">
                <PaymentIcon sx={{ width: "50%", height: "50%" }} />
              </div>
              <div className="info-payment">
                <h3>
                  Até <span>12x</span> de <span>R$ 30,33</span>
                </h3>
                <a href="">Outros métodos de pagamentos</a>
              </div>
            </div>
            <div className="payment-method">
              <div className="icon-payment">
                <ReceiptIcon sx={{ width: "50%", height: "50%" }} />
              </div>
              <div className="info-payment">
                <p>{productSelected?.Valor_a_vista} à vista</p>
                <h3>Economize: R$ 100,00</h3>
              </div>
            </div>
          </PurchaseInstallment>
          <FinalizationProductDetail>
            <div className="purchase-product">
              <Button
                color="success"
                component="label"
                sx={{
                  width: "100%",
                  height: "100%",
                }}
                variant="contained"
                startIcon={<ShoppingCartIcon />}
              >
                Comprar produto agora
              </Button>
            </div>
            <div className="input-inc-dec">
              <Button
                component="label"
                sx={{
                  width: "100%",
                  height: "100%",
                }}
                variant="outlined"
                startIcon={<LocalMallIcon />}
              >
                Adicionar ao carrinho
              </Button>
            </div>
          </FinalizationProductDetail>
        </div>
      </div>
    </PresentationBox>
  );
}

export default ProductDescriptionPresentation;