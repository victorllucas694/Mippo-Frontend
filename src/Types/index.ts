export interface IChildSKUs {
  salePrice: number;
  repositoryId: string;
  listPrice: number;
}

export interface IMockProducts {
  id: number;
  Marca: string;
  Fabricante: string;
  Formato: string;
  Marca_do_processador: string;
  Tipo_de_processador:string;
  Velocidade_do_processador: string;
  Tipo_de_soquete_do_processador: string;
  Numero_de_processadores: string;
  Tamanho_da_memoria: string;
  Tecnologia_da_memoria: string;
  Tipo_de_Memoria:  string;
  Tamanho_do_HD: string;
  Tecnologia_do_HD: string;
  Interface_do_HD: string;
  Marca_do_chipset_de_video: string;
  Descricao_da_placa_de_video: string;
  Tipo_de_conexao: string;
  Tecnologia_de_conexao: string;
  Plataforma_de_hardware: string;
  Sistema_operacional: string;
  Peso_do_produto: string;
  Dimensoes_da_embalagem: string;
  Codigo: string;
  Fornecedor: string;
  Quantidade_em_estoque: number;
  User_Id: number,
  Valor_a_vista: string;
  Valor_a_prazo: string;
  Codigo_das_Imagens: string;
  Dimensoes_do_pacote: string;
  Descricao_final_sobre_o_produto: string;
}

export interface ISocialsDataBoxes {
  label: string;
  icon: string;
}

export interface IRegisterIO {
  label: string;
  placeholder: string;
  inputPrototype: string;
  type: string
}

export interface IProductsCategories {
  category: string;
  id: number;
}

export interface IOffersCheckBoxes {
  label: string;
}

