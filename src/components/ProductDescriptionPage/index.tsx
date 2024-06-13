import { ProductDescriptionRootContainer } from "./styles";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { useProductsContext } from "../../contexts/CardContexts";
import { useRequestsProductsContext } from "../../contexts/RequestsProductsContext";

interface Category {
  categoryBySearchProductPage: string | null;
}

function ProductDescriptionPage({ categoryBySearchProductPage }: Category) {
  const { socialsDataBox } = useProductsContext();
  const { productSelected } = useRequestsProductsContext();

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
          {socialsDataBox.map(() => {
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
