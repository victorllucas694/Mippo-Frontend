import { useAuth } from "../../../contexts/AuthenticateContext";
import { useAxios } from "../../../providers/AxiosProvider";
import { HeaderPaper } from "./styles";
import { useEffect, useState } from "react";
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

interface IHeaderButton {
  id: number;
  label: string;
}

interface IHeaderProps {
  headerInitial: string;
  buttonsTopHeaderData: IHeaderButton[];
}

function Header({ headerInitial, buttonsTopHeaderData }: IHeaderProps) {
  const { id } = useAuth();
  const { axiosInstance } = useAxios();
  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    getUSerPayload();
  }, []);

  const getUSerPayload = async () => {
    if (id) {
      const userData = await axiosInstance.get(
        `/common-users-management/${id}`
      );
      setName(userData.data.name);
    }
  };

  return (
    <HeaderPaper>
      <div className="box-content">
        <div className="message">
          <h1>{headerInitial}</h1>
        </div>
        {name ? (
          <div className="account-data">
            <p>Olá, <strong>{name}</strong>! Seja bem vindo(a) novamente.</p>
          </div>
        ) : (
          <div className="account-data">
            {buttonsTopHeaderData.map((accountData: IHeaderButton) => {
              return (
                <div key={accountData.id} className="box-button">
                  <a href="/login">{accountData.label}</a>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </HeaderPaper>
  );
}

export default Header;
