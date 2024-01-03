import { BoxDropImage, BoxWrapperMain } from "./styles";
import FormControl from "@mui/joy/FormControl";
import CropRotateIcon from "@mui/icons-material/CropRotate";
import PhotoSizeSelectLargeIcon from "@mui/icons-material/PhotoSizeSelectLarge";
import { useState } from "react";
import { Select, MenuItem } from "@mui/material";
import { IProductsCategories } from "../../../Types";
import RealTimeInputValidate from "../RealTimeInputValidate";
import { Button, SelectChangeEvent } from "@mui/material";
import { useAxios } from "../../../providers/AxiosProvider";
import { useAuth } from "../../../contexts/AuthenticateContext";
import DOMPurify from "dompurify";
// import { useProductsContext } from "../../../contexts/CardContexts";

interface ImageData {
  key: keyof SideImages;
  label: string;
}

interface SideImages {
  firstImage: string;
  secondImage: string;
  thirdImage: string;
  fourthImage: string;
}

function ModalGallery() {
  const [imageLargeURL, setImageLargeURL] = useState<string | null>(null);
  const [sideImages, setSideImages] = useState<SideImages>({
    firstImage: "",
    secondImage: "",
    thirdImage: "",
    fourthImage: "",
  });

  const handleDropSideImages = (
    e: React.DragEvent<HTMLDivElement>,
    imageKey: string
  ) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
  
    if (file) {
      if (file.type.startsWith("image/")) {
        const maxSizeInBytes = 5 * 1024 * 1024; // 5 MB
        if (file.size <= maxSizeInBytes) {
          const cleanedFileName = file.name.replace(/[^\w.]/g, '_');
          console.log(cleanedFileName)
  
          const reader = new FileReader();
          reader.onload = (e) => {
            setSideImages((prevState) => ({
              ...prevState,
              [imageKey]: e.target?.result as string,
            }));
          };
  
          reader.readAsDataURL(file);
        } else {
          alert("O tamanho do arquivo excede o limite permitido.");
        }
      } else {
        alert("Tipo de arquivo não aceitável. Por favor, envie uma imagem.");
      }
    }
  };

  const handleDragOverSideImages = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDropLargeImage = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
  
    if (file) {
      if (file.type.startsWith("image/")) {
        const maxSizeInBytes = 5 * 1024 * 1024;
        if (file.size <= maxSizeInBytes) {
          const cleanedFileName = file.name.replace(/[^\w.]/g, '_');
          console.log(cleanedFileName);
  
          const reader = new FileReader();
          reader.onload = (e) => {
            setImageLargeURL(e.target?.result as string);
          };
  
          reader.readAsDataURL(file);
        } else {
          alert("O tamanho do arquivo excede o limite permitido.");
        }
      } else {
        alert("Tipo de arquivo não aceitável. Por favor, envie uma imagem.");
      }
    }
  };

  const handleDragOverLargeImage = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const divsToRender: ImageData[] = [
    { key: "firstImage", label: "first small image" },
    { key: "secondImage", label: "second small image" },
    { key: "thirdImage", label: "third small image" },
    { key: "fourthImage", label: "fourth small image" },
  ];

  const productsCategories: IProductsCategories[] = [
    {
      id: 1,
      category: "Notebook",
    },
    {
      id: 2,
      category: "Acessórios",
    },
    {
      id: 3,
      category: "Hardware",
    },
    {
      id: 3,
      category: "Área gamer",
    },
    {
      id: 4,
      category: "Computadores",
    },
    {
      id: 5,
      category: "Softwares",
    },
  ];
  const { axiosInstance } = useAxios();
  const { id } = useAuth();

  const [productCode, setProductCode] = useState<string>("");
  const [productCategory, setCategoryProduct] = useState<string>("");

  const handleChangeCategory = (event: SelectChangeEvent<string>) => {
    const sanitizedValue = DOMPurify.sanitize(event.target.value);
    setCategoryProduct(sanitizedValue as string);
  };

  const handleSendImages = async () => {
    try {
      const c_tokenData = localStorage.getItem("c__token");

      if (!c_tokenData) {
        console.error("Token de autenticação não encontrado.");
        return;
      }

      const formDataLarge = new FormData();

      if (imageLargeURL) {
        const responseLarge = await fetch(imageLargeURL);
        const blobLarge = await responseLarge.blob();
        formDataLarge.append("largeImage", blobLarge, "largeImage.jpg");
        formDataLarge.append("productCode", productCode);
        formDataLarge.append("productCategory", productCategory);
      }

      const responseLarge = await axiosInstance.post(
        `/products-management/upload/image/large/${id}`,
        formDataLarge,
        {
          headers: {
            Authorization: `Bearer ${c_tokenData}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(responseLarge)

      const formDataSide = new FormData();

      await Promise.all(
        divsToRender.map(async (image) => {
          if (sideImages[image.key]) {
            try {
              const responseSide = await fetch(sideImages[image.key]);
              if (!responseSide.ok) {
                throw new Error("Erro ao baixar a imagem.");
              }
              const blobSide = await responseSide.blob();
              formDataSide.append("images", blobSide, "ads.jpg");
            } catch (error) {
              console.error(
                `Erro ao processar a imagem ${image.key}: ${error}`
              );
            }
          }
        })
      );

      try {
        formDataSide.append("productCode", productCode);
        formDataSide.append("productCategory", productCategory);
        const responseSide = await axiosInstance.post(
          `/products-management/upload/image/sideImages/${id}`,
          formDataSide,
          {
            headers: {
              Authorization: `Bearer ${c_tokenData}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log(responseSide)

      } catch (error) {
        console.error(`Erro ao enviar a solicitação POST: ${error}`);
      }

      const responseCategory = await axiosInstance.post(
        `/products-management/product/drop/layer/${id}`,
        { productCode, productCategory },
        {
          headers: {
            Authorization: `Bearer ${c_tokenData}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(responseCategory)
    } catch (error) {
      console.error("Erro ao enviar imagens:", error);
    }
  };
  return (
    <BoxWrapperMain>
      <div className="presentation-session">
        <h1>Upload das imagens dos produtos</h1>
        <p>
          Faça upload das imagens dos produtos em sequencia pelo valor do código
          contido no arquivo CSV. Ao todo, cada produto pode ter{" "}
          <strong>5 imagens não excedendo o tamanho de 30mb</strong> por imagem.
        </p>
      </div>

      <div className="product-code">
        <div className="data-layers">
          <div className="col-sx-8">
            <FormControl>
              <RealTimeInputValidate
                productCode={productCode}
                setProductCode={setProductCode}
              />
            </FormControl>
          </div>
          <div className="col-sx-4">
            <FormControl>
              <Select
                value={productCategory}
                onChange={handleChangeCategory}
                placeholder="Selecione a categoria"
                sx={{ width: "100%", height: "3.5rem" }}
                name="category"
              >
                {productsCategories.map((category: IProductsCategories) => {
                  return (
                    <MenuItem value={category.category} key={category.id}>
                      {category.category}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
        </div>

        <BoxDropImage>
          <div className="side-images">
            {divsToRender.map((image) => {
              return (
                <div
                  className="image-drop-box"
                  key={image.key}
                  onDrop={(e) => handleDropSideImages(e, image.key)}
                  onDragOver={handleDragOverSideImages}
                >
                  {sideImages[image.key] && (
                    <img
                      src={sideImages[image.key]}
                      alt={image.label}
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: "5px",
                        objectFit: "cover",
                      }}
                    />
                  )}
                  {sideImages[image.key] ? null : (
                    <PhotoSizeSelectLargeIcon
                      sx={{
                        width: "30px",
                        height: "30px",
                        color: "rgb(130, 130, 130)",
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>
          <div
            className="large-image"
            onDrop={handleDropLargeImage}
            onDragOver={handleDragOverLargeImage}
          >
            {imageLargeURL ? null : (
              <CropRotateIcon
                sx={{
                  width: "120px",
                  height: "120px",
                  color: "rgb(130, 130, 130)",
                }}
              />
            )}

            {imageLargeURL ? (
              <img
                src={imageLargeURL}
                alt="Imagem pré-renderizada"
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "5px",
                  objectFit: "contain",
                  backgroundColor: "transparent",
                }}
              />
            ) : (
              <p>
                Arraste para dentro desse painel ou{" "}
                <span>
                  <strong>Clique aqui</strong>
                </span>{" "}
                para enviar a imagem
              </p>
            )}
          </div>
        </BoxDropImage>
      </div>
      <div className="button-send">
        <Button
          sx={{
            width: "12rem",
            height: "3rem",
          }}
          variant="outlined"
        >
          Cancelar
        </Button>
        <Button
          onClick={handleSendImages}
          sx={{
            width: "12rem",
            height: "3rem",
            marginLeft: "2rem",
          }}
          variant="contained"
        >
          Salvar imagens
        </Button>
      </div>
    </BoxWrapperMain>
  );
}

export default ModalGallery;
