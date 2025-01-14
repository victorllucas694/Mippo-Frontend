import {
  FinalizationProductDetail,
  PresentationBox,
  PurchaseInstallment,
} from "./styles";
import PaymentIcon from "@mui/icons-material/Payment";
import ReceiptIcon from "@mui/icons-material/Receipt";
import { useRequestsProductsContext } from "../../../contexts/RequestsProductsContext";
import {
  Alert,
  Button,
  Snackbar,
  Typography,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import { useState, useEffect } from "react";
import { useAxios } from "../../../providers/AxiosProvider";
import { useAuth } from "../../../contexts/AuthenticateContext";

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
      `/products-management-without-auth/get/all/images/${category}/${productID}/${imageCode}`,
      {
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
        console.log(imageData);
      }
    });
  };

  const [imageData, setImageData] = useState<ImageData>(initialState);
  const [open, setOpen] = useState(false);
  const { id } = useAuth();
  // const token = localStorage.getItem("c__token");

  const purchaseItem = async () => {
    const currentURL = window.location.pathname;
    const urlParts = currentURL.split("/");
    const category = urlParts[2];

    const sendData = {
      id_pedido: productSelected.id,
      categoria_pedido: category,
      codigo_do_pedido: productSelected.Codigo_das_Imagens,
      User_Id: id,
      pagamento: "not_paid",
      retirado: "false",
    };

    if (id) {
      const response = await axiosInstance.post(
        `/payment-shipping-cart/purchase/products/${category}/${productSelected.id}`,
        sendData
      );
      console.log(productSelected);

      if (response.data.error === "Produto esgotado") {
        setOpen(true);
      } else if (response.data && id) {
        window.location.href = `/purchase/${id}`;
      }
    } else {
      window.location.href = "/login";
    }
  };

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

  const handleClose = (
  ) => {
    setOpen(false);
  };
  return (
    <>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Erro: Esse produto está esgotado
        </Alert>
      </Snackbar>
      <PresentationBox>
        <div className="content-presentation">
          <div className="image-presentation-product">
            <div className="sub-boxes-images">
              {imageData.sideImages.map((image: any) => {
                return (
                  <div className="box-image">
                    <img
                      style={{
                        objectFit: "contain",
                        margin: "auto",
                        height: "100%",
                        width: "100%",
                      }}
                      src={`http://localhost:3000/${image.first_image}`}
                      loading="lazy"
                      alt=""
                    />
                  </div>
                );
              })}
              {imageData.sideImages.map((image: any) => {
                return (
                  <div className="box-image">
                    <img
                      style={{
                        objectFit: "contain",
                        margin: "auto",
                        height: "100%",
                        width: "100%",
                      }}
                      src={`http://localhost:3000/${image.second_image}`}
                      loading="lazy"
                      alt=""
                    />
                  </div>
                );
              })}
               {imageData.sideImages.map((image: any) => {
                return (
                  <div className="box-image">
                    <img
                      style={{
                        objectFit: "contain",
                        margin: "auto",
                        height: "100%",
                        width: "100%",
                      }}
                      src={`http://localhost:3000/${image.third_image}`}
                      loading="lazy"
                      alt=""
                    />
                  </div>
                );
              })}
               {imageData.sideImages.map((image: any) => {
                return (
                  <div className="box-image">
                    <img
                      style={{
                        objectFit: "contain",
                        margin: "auto",
                        height: "100%",
                        width: "100%",
                      }}
                      src={`http://localhost:3000/${image.fourth_image}`}
                      loading="lazy"
                      alt=""
                    />
                  </div>
                );
              })}
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
              <p>Fornecedor: {productSelected?.Fornecedor}</p>
              <Typography>
                <span>
                  <strong>Processador: </strong>
                </span>
                {`${productSelected?.Marca_do_chipset_de_video || ""} ${
                  productSelected?.Tipo_de_processador || ""
                } ${productSelected?.Velocidade_do_processador || ""} ${
                  productSelected?.Tipo_de_soquete_do_processador || ""
                }`.trim() &&
                productSelected?.Marca_do_chipset_de_video &&
                productSelected?.Tipo_de_processador &&
                productSelected?.Velocidade_do_processador &&
                productSelected?.Tipo_de_soquete_do_processador
                  ? `${productSelected.Marca_do_chipset_de_video} ${productSelected.Tipo_de_processador} ${productSelected.Velocidade_do_processador} ${productSelected.Tipo_de_soquete_do_processador}`
                  : "Informações do processador não disponíveis"}
                <br />
                <span>
                  <strong>Marca: </strong>
                </span>
                {productSelected?.Fabricante || "Marca não disponível"}
                <br />
                <span>
                  <strong>Numero de núclos: </strong>
                </span>
                {productSelected?.Numero_de_processadores
                  ? `${productSelected.Numero_de_processadores} Núcleo(s)`
                  : "Número de núcleos não disponível"}
                <br />
                <span>
                  <strong>Memória RAM: </strong>
                </span>
                {productSelected?.Tamanho_da_memoria &&
                productSelected?.Tipo_de_Memoria
                  ? `${productSelected.Tamanho_da_memoria} ${productSelected.Tipo_de_Memoria}`
                  : "Informações da memória RAM não disponíveis"}
              </Typography>
            </div>
            <PurchaseInstallment>
              <p>
                por{" "}
                <span>
                  {productSelected?.Valor_a_prazo &&
                    new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(parseFloat(productSelected.Valor_a_prazo))}
                </span>
              </p>
              <div className="payment-method">
                <div className="icon-payment">
                  <PaymentIcon sx={{ width: "50%", height: "50%" }} />
                </div>
                <div className="info-payment">
                  <h3>
                    Até <span>12x</span> de{" "}
                    <span>
                      {productSelected?.Valor_a_prazo &&
                        new Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        }).format(
                          parseFloat(productSelected.Valor_a_prazo) / 12
                        )}
                    </span>
                  </h3>
                  <a href="">Outros métodos de pagamentos</a>
                </div>
              </div>
              <div className="payment-method">
                <div className="icon-payment">
                  <ReceiptIcon sx={{ width: "50%", height: "50%" }} />
                </div>
                <div className="info-payment">
                  <p>
                    {productSelected?.Valor_a_vista &&
                      new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(parseFloat(productSelected.Valor_a_vista))}{" "}
                    à vista
                  </p>
                  <h3>
                    Economize:{" "}
                    {productSelected?.Valor_a_prazo &&
                      productSelected?.Valor_a_vista &&
                      new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(
                        parseFloat(productSelected.Valor_a_prazo) -
                          parseFloat(productSelected.Valor_a_vista)
                      )}
                  </h3>
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
                  onClick={purchaseItem}
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
    </>
  );
}

export default ProductDescriptionPresentation;
