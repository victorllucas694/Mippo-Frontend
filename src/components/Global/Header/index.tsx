import { useEffect, useState } from "react";
import { useAuth } from "../../../contexts/AuthenticateContext";
import { useAxios } from "../../../providers/AxiosProvider";
import { HeaderPaper } from "./styles";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate } from "react-router-dom";


function Header() {
  const { id } = useAuth();
  const { axiosInstance } = useAxios();
  const [name, setName] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    async function GetUserInformation() {
      const c_tokenData = localStorage.getItem("c__token");

      if (c_tokenData) {
        try {
          const req = await axiosInstance.get(`/user-settings/get/${id}`, {
            headers: {
              Authorization: `Bearer ${c_tokenData}`,
            },
          });

          setName(req.data.name);
          setLastname(req.data.last_name);
        } catch (error) {
          console.error("Failed to fetch user information:", error);
        }
      }
    }

    GetUserInformation();
  }, [id]);

  return (
    <HeaderPaper>
      <div className="box-content">
        <div className="message">
          <h1>(19) 98427-7203</h1>
        </div>

        {id ? (
          <div className="account-data">
            <div className="box-button">
              bem vindo(a) - {name + " " + lastname}{" "}
              <div>
                <PersonIcon sx={{ cursor: "pointer", color: "rgb(80,80,80)" }} />{" "}
                <SettingsIcon onClick={() => navigate('/settings')} sx={{ cursor: "pointer", color: "rgb(80,80,80)" }} />
              </div>
            </div>
          </div>
        ) : (
          <div className="account-data">
            <div className="box-button">
              <a href="/login">Login</a>
              <a href="/login">Cadastre-se</a>
            </div>
          </div>
        )}
      </div>
    </HeaderPaper>
  );
}

export default Header;
