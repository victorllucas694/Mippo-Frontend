import {
  BoxCountAdd,
  CardBox,
  DescriptionProductCard,
  OffBox,
  PriceProductCard,
} from "./styles";
import { styled } from "@mui/material/styles";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Rating from "@mui/material/Rating";
import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import Chip from "@mui/joy/Chip";
import Link from "@mui/joy/Link";
import Typography from "@mui/joy/Typography";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { useProductsContext } from "../../../contexts/CardContexts";
import { IMockProducts } from "../../../Types";
import { useRequestsProductsContext } from "../../../contexts/RequestsProductsContext";
import { useAuth } from "../../../contexts/AuthenticateContext";
import { useAxios } from "../../../providers/AxiosProvider";
import { useState } from "react";
import { Alert, Snackbar } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

interface IProductData {
  productsList: IMockProducts;
}

function CardProduct({ productsList }: IProductData) {
  const { id } = useAuth();

  const [productCode, setProductCode] = React.useState<string | null>(
    productsList.Codigo
  );
  const [productId, setProductId] = React.useState<number | null>(0);
  const [productCategory, setProductCategory] = React.useState<string | null>();

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

  const [productImagesObject, setProductImagesObject] = useState<
    IProductData | null | undefined
  >(null);

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
          width: category ? '30%' : "21%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          borderRadius: "3px",
          backgroundColor: "transparent",
          ":hover": {
            boxShadow: "xl",
          },
          "@media (max-width: 1600px)": {
            width: category ? '30%' : "20%",
          },
          "@media (max-width: 1490px)": {
            width: category ? '30%' : "25%",
          },
        }}
      >
        <CardOverflow>
          <AspectRatio sx={{ minWidth: "100%", }}>
            {imageData.largeImages.map((largeImg, index) => (
              <img
                key={index}
                src={`http://localhost:3000/${largeImg.large_image}`}
                loading="lazy"
                alt=""
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            ))}
          </AspectRatio>
        </CardOverflow>
        <CardContent>
          <Typography level="body-xs">{productsList.Fabricante}</Typography>
          <Link
            onClick={getProduct}
            href={
              category !== ""
                ? `/product/${category}/${productCode}/${productId}`
                : `/product/Hardware/${productCode}/${productId}`
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
            endDecorator={
              <Chip
                component="span"
                size="md"
                variant="soft"
                color={
                  productsList.Quantidade_em_estoque >= 1 ? "success" : "#fff"
                }
                sx={{
                  color:
                    productsList.Quantidade_em_estoque >= 1 ? "black" : "red",
                }}
              >
                {productsList.Quantidade_em_estoque >= 1
                  ? "disponivel"
                  : "Indisponivel"}
              </Chip>
            }
            sx={{
              "@media (max-width: 1600px)": {
                fontSize: ".8rem",
              },
            }}
          >
            R$ {productsList.Valor_a_prazo}
          </Typography>
          <Typography
            level="body-sm"
            sx={{
              "@media (max-width: 1600px)": {
                fontSize: ".8rem",
              },
            }}
          >
            Ou R$ {productsList.Valor_a_prazo} em até 12 vezes no boleto sem
            juros.
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