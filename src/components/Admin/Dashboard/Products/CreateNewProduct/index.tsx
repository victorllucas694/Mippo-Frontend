import { HeaderProduct, IconBackToHomePage, ProductPage } from "../../styles";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import DescriptionBody from "./DescriptionBody";
import BurstModeIcon from "@mui/icons-material/BurstMode";
import { useState } from "react";
import ModalGallery from "../../../../Global/ModalGallery";
import { GalleryImages } from "./styles";

function CreateNewProduct() {
  const [open, setOpen] = useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <ProductPage>
        <HeaderProduct>
          <div className="flex-header-wrapper">
            <IconBackToHomePage>
              <KeyboardBackspaceIcon />
            </IconBackToHomePage>

            <h1>Descrição produto</h1>
          </div>
          <div className="trash">
            <IconBackToHomePage onClick={handleClose}>
              <BurstModeIcon />
            </IconBackToHomePage>
            <IconBackToHomePage>
              <DeleteForeverIcon />
            </IconBackToHomePage>
          </div>
        </HeaderProduct>

        {open ? (
          <div className="flex-body-wrapper">
            <DescriptionBody />
          </div>
        ) : (
          <GalleryImages>
            <ModalGallery />
          </GalleryImages>
        )}
      </ProductPage>
    </>
  );
}

export default CreateNewProduct;
