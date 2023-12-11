import { ProductDescriptionRootContainer } from "./styles";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { useProductsContext } from "../../contexts/CardContexts";
import { ISocialsDataBoxes } from "../../Types";
import { useRequestsProductsContext } from "../../contexts/RequestsProductsContext";
import * as React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Slider from "@mui/material/Slider";
import VolumeDown from "@mui/icons-material/VolumeDown";
import VolumeUp from "@mui/icons-material/VolumeUp";

interface Category {
  categoryBySearchProductPage: string | null;
}

function ProductDescriptionPage({ categoryBySearchProductPage }: Category) {
  console.log(categoryBySearchProductPage);

  const { socialsDataBox } = useProductsContext();
  const { productSelected } = useRequestsProductsContext();

  function handleChange(
    event: Event,
    value: number | number[],
    activeThumb: number
  ): void {
    throw new Error("Function not implemented.");
  }

  return (
    <ProductDescriptionRootContainer>
      <div className="breadcrumb-data-product">
        <Breadcrumbs
          aria-label="breadcrumb"
          sx={{
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
          }}
        >
          <Link underline="hover" color="inherit" href="/">
            Página inicial
          </Link>
          <Link
            underline="hover"
            color="inherit"
            href="/material-ui/getting-started/installation/"
          >
            Produtos
          </Link>
          <Typography color="text.primary">
            {categoryBySearchProductPage
              ? categoryBySearchProductPage
              : productSelected?.Codigo}
          </Typography>
        </Breadcrumbs>

        <div className="socials-content">
          <div className="initial-label"></div>
          {socialsDataBox.map((socials: ISocialsDataBoxes) => {
            return (
              <div className="img-social-box">
                <p></p>
              </div>
            );
          })}
        </div>
      </div>
    </ProductDescriptionRootContainer>
  );
}

export default ProductDescriptionPage;
