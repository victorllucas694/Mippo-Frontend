import { Alert, Button, Checkbox, FormControlLabel, Switch } from "@mui/material";
import { BoxOrderUser } from "../OrdersUser/styles";
import { BoxOptions } from "./styles";
import { CheckBox } from "@mui/icons-material";

function Options() {
  const obterDataPorExtenso = (): string => {
    const dataAtual = new Date();

    const diaSemana = new Intl.DateTimeFormat("pt-BR", {
      weekday: "long",
    }).format(dataAtual);
    const mes = new Intl.DateTimeFormat("pt-BR", { month: "long" }).format(
      dataAtual
    );
    const ano = dataAtual.getFullYear();

    return `${diaSemana}, ${dataAtual.getDate()} de ${mes} de ${ano}`;
  };
  return (
    <BoxOrderUser>
      <div className="header-data-orders">
        <h1>Configurações de usuário</h1>

        <div style={{ display: "flex", gap: "1rem" }}>
          <Button
            variant="outlined"
            sx={{
              height: "3rem",
            }}
          >
            {"Configurações de usuário"}
          </Button>
          <Button
            variant="contained"
            sx={{
              height: "3rem",
            }}
          >
            {obterDataPorExtenso()}
          </Button>
        </div>
      </div>

      <Alert severity="success">Você está conectado com sucesso</Alert>
      <br />
      <BoxOptions>
        <div className="header-notify">
            <div>
                <h1>Me notificar quando...</h1>
                <h2>Selecione as suas opções para notificações dentro do sistema</h2>
            </div>
            <p>Sobre notificações</p>
        </div>
        <div className="check-items">
            <FormControlLabel required control={<Checkbox />} label="Notificações de promoções" />
            <FormControlLabel required control={<Checkbox />} label="Notificação mensal" />
            <FormControlLabel required control={<Checkbox />} label="Notificação de entrega" />

        </div>
      </BoxOptions>
      <BoxOptions>
        <div className="header-notify">
            <div>
                <h1>Autenticação de dois fatores</h1>
                <h2>Ativar ou desativar autenticação de dois fatores ao entrar em sua conta</h2>
            </div>
            <Switch defaultChecked />
        </div>
      </BoxOptions>
      <BoxOptions>
        <div className="header-notify">
            <div>
                <h1>Notificações por Email</h1>
                <h2>Receber notificações do sistema enviadas por email</h2>
            </div>
            <Switch defaultChecked />
        </div>
      </BoxOptions>
    </BoxOrderUser>
  );
}

export default Options;
