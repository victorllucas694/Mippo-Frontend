import { AccountBox } from "./styles";

function Account() {
  return (
    <>
      <AccountBox>
        <h1>Perfil de usuário</h1>

        <div className="personal-info">
          <h2>Informações pessoais</h2>

          <div className="inputs-info">
            <div className="col-6"></div>
            <div className="col-6"></div>
          </div>
        </div>
        <div className="personal-info"></div>
      </AccountBox>
    </>
  );
}

export default Account;
