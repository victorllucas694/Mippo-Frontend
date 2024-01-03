import { IProductSelected } from "../../../contexts/RequestsProductsContext";
import { BoxProductReview, ContainerProductListDetails } from "./styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useState } from "react";
import { Rating } from "@mui/material";

interface FoundedProduct {
  product: IProductSelected | null;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

interface IReviews {
  name: string;
  rating: number;
  reviewDate: string;
  title: string;
  comment: string;
  like: number;
}

interface IRating {
  label: string;
  reviewsTotalUser: string;
}

function ProductDetails({ product }: FoundedProduct) {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const IRating: IRating[] = [
    {
      label: "5 estrelas",
      reviewsTotalUser: "8k",
    },
    {
      label: "4 estrelas",
      reviewsTotalUser: "7k",
    },
    {
      label: "3 estrelas",
      reviewsTotalUser: "1.8k",
    },
    {
      label: "2 estrelas",
      reviewsTotalUser: "1.5k",
    },
    {
      label: "1 estrelas",
      reviewsTotalUser: "1.1k",
    },
  ];

  const reviews: IReviews[] = [
    {
      name: "Mephistopholes",
      rating: 4,
      reviewDate: "10/11/2023",
      title: "Ótimo produto, qualiade e entrega no prazo",
      comment:
        "Veio embalado certinho, um dia antes do prazo. Super recomendo galerinha! Achei legal que enviaram um produto Y de brinde ",
      like: 1,
    },
    {
      name: "Mephistopholes",
      rating: 4,
      reviewDate: "10/11/2023",
      title: "Ótimo produto, qualiade e entrega no prazo",
      comment:
        "Veio embalado certinho, um dia antes do prazo. Super recomendo galerinha!! Achei legal que enviaram um produto Y de brinde ",
      like: 1,
    },
  ];

  return (
    <ContainerProductListDetails>
      <div className="body-details">
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Avaliações" {...a11yProps(0)} />
              <Tab label="Descrição do produto" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <BoxProductReview>
              <div className="reviews">
                {reviews.map((userRating: IReviews) => {
                  return (
                    <div className="box-review">
                      <h1>{userRating.name}</h1>
                      <Rating
                        sx={{ margin: ".5rem 0rem" }}
                        name="simple-controlled"
                        value={5}
                      />
                      <h2>Avaliado em {userRating.reviewDate}</h2>
                      <h3>{userRating.comment}</h3>
                      <button id="like-comment"></button>
                    </div>
                  );
                })}
              </div>
              <div className="final-reviews">
                <h1>Avaliações gerais</h1>
                <h1>4/5</h1>
                <Rating name="simple-controlled" size="large" value={4} />
                <br />
                {IRating.map((levelDataRating: IRating) => {
                  return (
                    <div className="rating-wrapper">
                      <h1>{levelDataRating.label}</h1>
                      <div className="percent-data">
                        <div className="percent-color"></div>
                      </div>
                      <h4>80k</h4>
                    </div>
                  );
                })}
              </div>
            </BoxProductReview>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <h1 style={{ fontFamily: 'Open Sans' }}>Informações do Produto</h1>
            <ul>
              {product?.Descricao_da_placa_de_video && (
                <li>
                  Descrição da Placa de Vídeo:{" "}
                  {product.Descricao_da_placa_de_video}
                </li>
              )}
              {product?.Descricao_final_sobre_o_produto && (
                <li>
                  Descrição Final sobre o Produto:{" "}
                  {product.Descricao_final_sobre_o_produto}
                </li>
              )}
              {product?.Dimensoes_da_embalagem && (
                <li>
                  Dimensões da Embalagem: {product.Dimensoes_da_embalagem}
                </li>
              )}
              {product?.Dimensoes_do_pacote && (
                <li>Dimensões do Pacote: {product.Dimensoes_do_pacote}</li>
              )}
              {product?.Fabricante && <li>Fabricante: {product.Fabricante}</li>}
              {product?.Formato && <li>Formato: {product.Formato}</li>}
              {product?.Fornecedor && <li>Fornecedor: {product.Fornecedor}</li>}
              {product?.Interface_do_HD && (
                <li>Interface do HD: {product.Interface_do_HD}</li>
              )}
              {product?.Marca && <li>Marca: {product.Marca}</li>}
              {product?.Marca_do_chipset_de_video && (
                <li>
                  Marca do Chipset de Vídeo: {product.Marca_do_chipset_de_video}
                </li>
              )}
              {product?.Marca_do_processador && (
                <li>Marca do Processador: {product.Marca_do_processador}</li>
              )}
              {product?.Numero_de_processadores && (
                <li>
                  Número de Processadores: {product.Numero_de_processadores}
                </li>
              )}
              {product?.Peso_do_produto && (
                <li>Peso do Produto: {product.Peso_do_produto}</li>
              )}
              {product?.Plataforma_de_hardware && (
                <li>
                  Plataforma de Hardware: {product.Plataforma_de_hardware}
                </li>
              )}
              {product?.Quantidade_em_estoque && (
                <li>Quantidade em Estoque: {product.Quantidade_em_estoque}</li>
              )}
              {product?.Sistema_operacional && (
                <li>Sistema Operacional: {product.Sistema_operacional}</li>
              )}
              {product?.Tamanho_da_memoria && (
                <li>Tamanho da Memória: {product.Tamanho_da_memoria}</li>
              )}
              {product?.Tamanho_do_HD && (
                <li>Tamanho do HD: {product.Tamanho_do_HD}</li>
              )}
              {product?.Tecnologia_da_memoria && (
                <li>Tecnologia da Memória: {product.Tecnologia_da_memoria}</li>
              )}
              {product?.Tecnologia_de_conexao && (
                <li>Tecnologia de Conexão: {product.Tecnologia_de_conexao}</li>
              )}
              {product?.Tecnologia_do_HD && (
                <li>Tecnologia do HD: {product.Tecnologia_do_HD}</li>
              )}
              {product?.Tipo_de_Memoria && (
                <li>Tipo de Memória: {product.Tipo_de_Memoria}</li>
              )}
              {product?.Tipo_de_conexao && (
                <li>Tipo de Conexão: {product.Tipo_de_conexao}</li>
              )}
              {product?.Tipo_de_processador && (
                <li>Tipo de Processador: {product.Tipo_de_processador}</li>
              )}
              {product?.Tipo_de_soquete_do_processador && (
                <li>
                  Tipo de Soquete do Processador:{" "}
                  {product.Tipo_de_soquete_do_processador}
                </li>
              )}
              {product?.User_Id && <li>User ID: {product.User_Id}</li>}
              {product?.Valor_a_prazo && (
                <li>Valor a Prazo: {product.Valor_a_prazo}</li>
              )}
              {product?.Valor_a_vista && (
                <li>Valor à Vista: {product.Valor_a_vista}</li>
              )}
              {product?.Velocidade_do_processador && (
                <li>
                  Velocidade do Processador: {product.Velocidade_do_processador}
                </li>
              )}
              {product?.Tamanho_da_tela && (
                <li>Tamanho da Tela: {product.Tamanho_da_tela}</li>
              )}
              {product?.Bateria_interna && (
                <li>Bateria Interna: {product.Bateria_interna}</li>
              )}
              {product?.Teclado_e_touchpad && (
                <li>Teclado e Touchpad: {product.Teclado_e_touchpad}</li>
              )}
              {product?.Conectividade_sem_fio && (
                <li>Conectividade sem Fio: {product.Conectividade_sem_fio}</li>
              )}
              {product?.Tela_sensivel_ao_toque && (
                <li>
                  Tela Sensível ao Toque: {product.Tela_sensivel_ao_toque}
                </li>
              )}
              {product?.Webcam_embutida && (
                <li>Webcam Embutida: {product.Webcam_embutida}</li>
              )}
              {product?.Audio_integrado && (
                <li>Áudio Integrado: {product.Audio_integrado}</li>
              )}
              {product?.Leitor_de_cartoes_de_memoria && (
                <li>
                  Leitor de Cartões de Memória:{" "}
                  {product.Leitor_de_cartoes_de_memoria}
                </li>
              )}
              {product?.montagem_necessaria && (
                <li>Montagem Necessária: {product.montagem_necessaria}</li>
              )}
              {product?.bateria_pilha && (
                <li>Bateria ou Pilha: {product.bateria_pilha}</li>
              )}
              {product?.bateria_inclusa && (
                <li>Bateria Inclusa: {product.bateria_inclusa}</li>
              )}
              {product?.tipo_da_bateria && (
                <li>Tipo de Bateria: {product.tipo_da_bateria}</li>
              )}
              {product?.Conectividade && (
                <li>Conectividade: {product.Conectividade}</li>
              )}
              {product?.Tamanho_Fisico && (
                <li>Tamanho Físico: {product.Tamanho_Fisico}</li>
              )}
              {product?.Consumo_de_Energia && (
                <li>Consumo de Energia: {product.Consumo_de_Energia}</li>
              )}
              {product?.Compatibilidade && (
                <li>Compatibilidade: {product.Compatibilidade}</li>
              )}
              {product?.Interfaces && <li>Interfaces: {product.Interfaces}</li>}
              {product?.Drivers && <li>Drivers: {product.Drivers}</li>}
              {product?.Outras_Caracteristicas && (
                <li>
                  Outras Características: {product.Outras_Caracteristicas}
                </li>
              )}
              {product?.Tipo_de_Hardware && (
                <li>Tipo de Hardware: {product.Tipo_de_Hardware}</li>
              )}
              {product?.Arquitetura && (
                <li>Arquitetura: {product.Arquitetura}</li>
              )}
              {product?.Velocidade_do_Clock && (
                <li>Velocidade do Clock: {product.Velocidade_do_Clock}</li>
              )}
              {product?.Nucleos_e_Threads && (
                <li>Núcleos e Threads: {product.Nucleos_e_Threads}</li>
              )}
              {product?.Capacidade_de_Armazenamento && (
                <li>
                  Capacidade de Armazenamento:{" "}
                  {product.Capacidade_de_Armazenamento}
                </li>
              )}
              {product?.Tamanho_da_Memoria_RAM && (
                <li>
                  Tamanho da Memória RAM: {product.Tamanho_da_Memoria_RAM}
                </li>
              )}
            </ul>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            Item Three
          </CustomTabPanel>
        </Box>
      </div>
    </ContainerProductListDetails>
  );
}

export default ProductDetails;
