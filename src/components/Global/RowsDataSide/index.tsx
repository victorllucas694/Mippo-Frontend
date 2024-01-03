import { RowsData } from "./styles";

interface IRows {
  orderTracking: any[];
}

function RowsDataSide({ orderTracking }: IRows) {
  return (
    <>
      <RowsData>
        <img
          src="https://img.freepik.com/vetores-premium/nenhuma-ilustracao-do-conceito-de-dados_86047-486.jpg?w=996"
          alt=""
        />
      </RowsData>
      você ainda não tem pedidos aceitos
    </>
  );
}

export default RowsDataSide;
