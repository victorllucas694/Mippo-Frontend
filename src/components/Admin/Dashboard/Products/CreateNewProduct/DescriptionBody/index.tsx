import TextField from "@mui/material/TextField";
import { DescriptionContainer } from "./styles";
import { ChangeEvent, useRef, useState } from "react";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Button } from "@mui/material";
import { useAxios } from "../../../../../../providers/AxiosProvider";
import { useAuth } from "../../../../../../contexts/AuthenticateContext";
import { useProductsContext } from "../../../../../../contexts/CardContexts";
import DOMPurify from "dompurify";

interface IProductsCategories {
  category: string;
  id: number;
}

function DescriptionBody() {
  const { axiosInstance } = useAxios();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { id } = useAuth();

  const [categorySelected, setCategorySelected] = useState<string | undefined>(
    undefined
  );
  const [qualitySelected, setQualitySelected] = useState<string | undefined>(
    undefined
  );

  const [productPayload, setProductPayload] = useState({
    name: undefined,
    price: undefined,
    type: undefined,
    code: undefined,
    description: undefined,
    category: undefined,
    quality: undefined,
    supplier_name: undefined,
    brand: undefined,
    id: id,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const sanitizedValue = DOMPurify.sanitize(value);

    setProductPayload((prevData) => ({
      ...prevData,
      [name]: sanitizedValue,
    }));
  };

  const handleChange = (event: SelectChangeEvent) => {
    const sanitizedValue = DOMPurify.sanitize(event.target.value);

    setCategorySelected(sanitizedValue as string);
  };

  const handleChangeQuality = (event: SelectChangeEvent) => {
    const sanitizedValue = DOMPurify.sanitize(event.target.value);

    setQualitySelected(sanitizedValue as string);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file || null);
  };

  const handleUploadButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const productsQuality: IProductsCategories[] = [
    {
      id: 1,
      category: "Produtos Novos",
    },
    {
      id: 1,
      category: "Produtos Semi-Novos",
    },
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
      id: 4,
      category: "Computadores",
    },
  ];

  const { setPackageCode } = useProductsContext();

  function handleUpload() {
    if (productPayload.code) {
      setPackageCode(productPayload.code);
    }

    if (selectedFile instanceof File) {
      if (
        selectedFile.type === "text/csv" ||
        selectedFile.name.endsWith(".csv")
      ) {
        const formData = new FormData();
        formData.append("file", selectedFile);
        const c_tokenData = localStorage.getItem("c__token");
        if (
          c_tokenData ||
          productPayload.supplier_name ||
          productPayload.brand ||
          productPayload.name ||
          productPayload.price ||
          productPayload.type ||
          productPayload.code ||
          productPayload.description
        ) {
          formData.append("supplier_name", productPayload.supplier_name || "");
          formData.append("brand", productPayload.brand || "");
          formData.append("name", productPayload.name || "");
          formData.append("price", productPayload.price || "");
          formData.append("type", productPayload.type || "");
          formData.append("code", productPayload.code || "");
          formData.append("description", productPayload.description || "");
          formData.append("category", categorySelected || "");
          formData.append("quality", qualitySelected || "");
          formData.append("id", id.toString());

          axiosInstance
            .post(`/products-management/upload/${id}`, formData, {
              headers: {
                Authorization: `Bearer ${c_tokenData}`,
                "Content-Type": "multipart/form-data",
              },
            })
            .then((response) => {
              console.log(response.data);
            })
            .catch((error) => {
              console.error(error);
            });
        }
      } else {
        console.log(
          "Erro ao enviar o arquivo: selectedFile não é uma instância de File."
        );
      }
    }
  }

  return (
    <DescriptionContainer>
      <div className="product-details">
        <div className="product-details-body">
          <div className="flex-col-12">
            <div className="flex-col-6">
              <TextField
                sx={{
                  width: "100%",
                }}
                id="outlined-basic"
                name="name"
                value={productPayload.name}
                onChange={handleInputChange}
                label="Nome do Pacote"
                variant="outlined"
              />
            </div>
            <div className="flex-col-4">
              <TextField
                sx={{
                  width: "100%",
                }}
                name="price"
                id="outlined-basic"
                value={productPayload.price}
                onChange={handleInputChange}
                label="R$ 100.00 - Valor total do pacote"
                variant="outlined"
              />
            </div>
          </div>
          <br />
          <div className="flex-col-12">
            <div className="flex-col-4">
              <TextField
                sx={{
                  width: "100%",
                }}
                id="outlined-basic"
                name="type"
                value={productPayload.type}
                onChange={handleInputChange}
                label="Especificação do pacote"
                variant="outlined"
              />
            </div>
            <div className="flex-col-6">
              <TextField
                sx={{
                  width: "100%",
                }}
                id="outlined-basic"
                name="code"
                value={productPayload.code}
                onChange={handleInputChange}
                label="Código do pacote - GABTD25B (Valor exemplar)"
                variant="outlined"
              />
            </div>
          </div>
          <br />
          <div className="flex-col-12">
            <div className="flex-col-5">
              <TextField
                sx={{
                  width: "100%",
                }}
                id="outlined-basic"
                name="description"
                value={productPayload.description}
                onChange={handleInputChange}
                label="Descrição dos planos do pacote (Garantia extendida, frete)"
                variant="outlined"
              />
            </div>
            <div className="flex-col-4" style={{ width: "38%" }}>
              <input
                type="file"
                onChange={handleFileChange}
                ref={fileInputRef}
                style={{ display: "none" }}
                accept=".csv"
              />
              <button id="button-upload-file" onClick={handleUploadButtonClick}>
                <AttachFileIcon sx={{ margin: "-.5rem .5rem" }} />
                <span className="upload-text-file">Envie arquivo CSV</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="product-details">
        <div className="header-details">
          <h1>Categorias e qualidade do produto</h1>
        </div>

        <div className="product-details-body">
          <div className="flex-col-12">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Categoria dos produtos do pacote
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="category"
                value={categorySelected}
                label="Categoria do produto"
                onChange={handleChange}
              >
                {productsCategories.map((product: IProductsCategories) => {
                  return (
                    <MenuItem value={product.category}>
                      {product.category}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
          <br />
          <div className="flex-col-12">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Pacote de produtos novos ou semi-novos
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="quality"
                value={qualitySelected}
                label="Categoria do produto"
                onChange={handleChangeQuality}
              >
                {productsQuality.map((product: IProductsCategories) => {
                  return (
                    <MenuItem value={product.category}>
                      {product.category}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
          <br />
          <div className="flex-col-12">
            <div className="flex-col-6">
              <TextField
                sx={{
                  width: "100%",
                }}
                id="outlined-basic"
                name="supplier_name"
                label="Nome do fornecedor"
                value={productPayload.supplier_name}
                onChange={handleInputChange}
                variant="outlined"
              />
            </div>
            <div className="flex-col-4">
              <TextField
                sx={{
                  width: "100%",
                }}
                id="outlined-basic"
                label="Marca"
                name="brand"
                value={productPayload.brand}
                onChange={handleInputChange}
                variant="outlined"
              />
            </div>
          </div>
          <br />
          <div className="flex-col-12" style={{ justifyContent: "flex-end" }}>
            <Button
              sx={{ height: "3rem", width: "200px", margin: "0 2rem" }}
              variant="outlined"
            >
              Cancelar envio
            </Button>
            <Button
              onClick={handleUpload}
              sx={{ height: "3rem", width: "280px" }}
              variant="contained"
            >
              Adicionar Produtos
            </Button>
          </div>
        </div>
      </div>
    </DescriptionContainer>
  );
}

export default DescriptionBody;
