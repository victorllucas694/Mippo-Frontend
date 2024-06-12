import { HeaderProductDetail, ProductDetails } from "./styles";

function ProductDescriptionDetails() {
  return (
    <ProductDetails>
      <div className="detail-container">
        <HeaderProductDetail>
          <div className="box-detail">
            <h1>Descrição</h1>
          </div>
        </HeaderProductDetail>
      </div>
    </ProductDetails>
  );
}

export default ProductDescriptionDetails;
