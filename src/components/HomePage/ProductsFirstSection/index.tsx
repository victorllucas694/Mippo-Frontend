import { Typography } from "@mui/material";
import { ProductTitleBox } from "./styles";

interface LabelTitle {
  label: string;
}

function ProductsFirstSection({label} : LabelTitle) {
  return (
    <>
      <ProductTitleBox>
        <Typography variant="h1" component="h1">
          {label.length > 0 ? label : 'Componentes para gamers'} 
        </Typography>
      </ProductTitleBox>
    </>
  );
}

export default ProductsFirstSection;
