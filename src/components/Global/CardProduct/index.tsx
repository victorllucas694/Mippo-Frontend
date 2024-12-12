import CardContent from "@mui/material/CardContent";
import Rating from "@mui/material/Rating";
import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import Link from "@mui/joy/Link";
import Typography from "@mui/joy/Typography";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { IMockProducts } from "../../../Types";
import { useRequestsProductsContext } from "../../../contexts/RequestsProductsContext";
import { useAuth } from "../../../contexts/AuthenticateContext";
import { useAxios } from "../../../providers/AxiosProvider";
import { useState } from "react";

interface IProductData {
  productsList: IMockProducts;
}

function CardProduct({ productsList }: IProductData) {
  const { id } = useAuth();

  const [productCode] = React.useState<string | null>(productsList.Codigo);
  const [productId, setProductId] = React.useState<number | null>(0);

  const currentURL = window.location.pathname;
  const urlParts = currentURL.split("/");
  let category = urlParts[1];

  React.useEffect(() => {
    getProduct();
    const id = productsList.id;
    setProductId(id);

    getProductImageByCategoryAndProductId(
      category,
      String(id),
      productsList.Codigo_das_Imagens
    );
  }, []);

  const getProduct = () => {};

  const {
    addItemToShoppingCart,
    isUserLoggedIn,
    calcPriceByShoppingCart,
    verifyUserLoggedByAddProductToShoppingCart,
  } = useRequestsProductsContext();

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

  const [imageData, setImageData] = useState<ImageData>(initialState);
  const [productInInventory, setProductInInventory] = useState<boolean>(false);

  const verifyInventary = () => {
    if (productsList.Quantidade_em_estoque <= 1) {
      setProductInInventory(true);
      console.log(productInInventory);
    } else {
      setProductInInventory(false);
    }
  };

  const getProductImageByCategoryAndProductId = async (
    category: string,
    productID: string,
    imageCode: string
  ) => {
    try {
      if (category) {
        const foundedImages = await axiosInstance(
          `/products-management-without-auth/get/all/images/${category}/${productID}/${imageCode}`
        );

        foundedImages.data.map((data: any) => {
          const { tableName, largeImages, sideImages, imageCodes } = data;

          if (productsList.Codigo_das_Imagens === imageCodes) {
            setImageData({
              largeImages,
              sideImages,
              tableName,
              imageCodes,
            });
          }
        });
      } else {
        const foundedImages = await axiosInstance(
          `/products-management-without-auth/get/all/images/Hardware/${productID}/${imageCode}`
        );

        foundedImages.data.map((data: any) => {
          const { tableName, largeImages, sideImages, imageCodes } = data;

          if (productsList.Codigo_das_Imagens === imageCodes) {
            setImageData({
              largeImages,
              sideImages,
              tableName,
              imageCodes,
            });
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Card
        sx={{
          minWidth: "18rem",
          width: category ? "25%" : "21%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          border: "1px solid rgb(230, 230, 230)",
          borderRadius: "3px",
          height: 'auto',
          minHeight: '35rem',
          backgroundColor: "transparent",
          ":hover": {
            boxShadow: "xl",
          },
          "@media (max-width: 1600px)": {
            width: category ? "30%" : "20%",
          },
          "@media (max-width: 1490px)": {
            width: category ? "30%" : "25%",
          },
        }}
      >
        <AspectRatio
          sx={{
            minWidth: "100%",
            height: "auto",
            backgroundColor: "white",
            display: "block",
          }}
        >
          {imageData.largeImages.map((largeImg, index) => (
            <img
              key={index}
              src={`http://localhost:3000/${largeImg.large_image}`}
              loading="lazy"
              alt={`Image ${index}`}
              style={{
                maxWidth: "100%",
                display: "block",
                height: "100%",
                objectFit: "contain",
                imageRendering: "auto",
                backgroundColor: "white",
              }}
            />
          ))}
        </AspectRatio>
        <CardContent>
          <Typography level="body-xs">{productsList.Fabricante}</Typography>
          <Link
            onClick={getProduct}
            href={
              category !== ""
                ? `/product/${category}/${productCode}/${productId}`
                : // : `/product/Hardware/${productCode}/${productId}`
                  `/`
            }
            fontWeight="md"
            color="neutral"
            textColor="text.primary"
            overlay
            sx={{
              "@media (max-width: 1600px)": {
                fontSize: ".8rem",
              },
            }}
            endDecorator={<ArrowOutwardIcon />}
          >
            {productsList.Marca}
          </Link>
          <Typography
            level="body-sm"
            lineHeight={2}
            sx={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
              "@media (max-width: 1600px)": {
                fontSize: ".7rem",
              },
            }}
          >
            {productsList.Descricao_final_sobre_o_produto}
          </Typography>
          <Rating name="simple-controlled" value={4} />
          <Typography
            sx={{
              mt: 1,
              fontWeight: "xl",
              "@media (max-width: 1600px)": {
                fontSize: ".8rem",
              },
            }}
          >
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(parseFloat(productsList.Valor_a_vista))}
          </Typography>
          <Typography
            level="body-sm"
            sx={{
              "@media (max-width: 1600px)": {
                fontSize: ".8rem",
              },
            }}
          >
            Ou{" "}
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(parseFloat(productsList.Valor_a_vista) / 12)}{" "}
            em até 12 vezes no boleto sem juros.
          </Typography>
        </CardContent>
        <CardOverflow>
          <Button
            sx={{ backgroundColor: "none" }}
            onClick={() => {
              verifyInventary();
              addItemToShoppingCart();
              calcPriceByShoppingCart(productsList.Valor_a_vista);
              isUserLoggedIn();
              verifyUserLoggedByAddProductToShoppingCart(id, productsList);
            }}
            variant="plain"
            size="lg"
          >
            Adicionar ao carrinho
          </Button>
        </CardOverflow>
      </Card>
    </>
  );
}

export default CardProduct;
