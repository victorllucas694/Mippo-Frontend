import { BoxHeader, FormContainer, LoginBox } from "./styles";
import PersonIcon from "@mui/icons-material/Person";
import LoginIcon from "@mui/icons-material/Login";
import NoEncryptionIcon from "@mui/icons-material/NoEncryption";
import { useState } from "react";
import React from "react";
import ModalRegister from "./ModalRegister";
import { useInputContext } from "../../contexts/UserInputOutput";
import axiosInstance from "../../providers/AxiosInstance";
import { useAuth } from "../../contexts/AuthenticateContext";
import { useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";
import ReCAPTCHA from "react-google-recaptcha";

interface IDataLoginLayout {
  breadcrumb: string;
  loginBoxLabel: string;
  registerBoxLabel: string;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function LoginPage({
  breadcrumb,
  loginBoxLabel,
  registerBoxLabel,
}: IDataLoginLayout) {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { loginInput, setLoginInput } = useInputContext();
  const { token, setAuthToken, setEmailProfile } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    inputPrototype: string
  ) => {
    const oldKey = DOMPurify.sanitize(event.target.value);
    setLoginInput((nextValues: any) => ({
      ...nextValues,
      [inputPrototype]: oldKey,
    }));
  };

  const handleCaptchaChange = (value: string | null) => {
    if (value) {
      sendLoginFormData();
    } else {
      console.error("reCAPTCHA não resolvido");
    }
  };

  const [openCaptcha, setOpenCaptcha] = useState<boolean>(false);

  const sendLoginFormData = async () => {
    try {
      const req = await axiosInstance.post("/authenticate/common-user", {
        email: loginInput.email,
        password: loginInput.password,
      });

      setEmailProfile(req.data.email);

      if (req.status) {
        if (req.data.user === "Allowed") {
          setAuthToken(req.data.token);
          window.location.href = "/admin";
        }

        if (req.data.user === "Not Allowed") {
          setAuthToken(req.data.token);
          window.location.href = "/";
        }
      } else {
        setOpenCaptcha(true);
      }
    } catch (error) {
      console.error("Erro ao enviar dados de login:", error);
    }
  };

  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  return (
    <React.Fragment>
      <LoginBox>
        <p>
          <span>Identificação </span>
          {breadcrumb}
        </p>
        <div className="login-register-panel">
          <div className="login">
            <BoxHeader>
              <div className="icon-box">
                <PersonIcon sx={{ color: "rgb(100, 100, 100)" }} />
              </div>
              <div className="label-header-box">
                <h1>{loginBoxLabel}</h1>
              </div>
            </BoxHeader>
            <FormContainer>
              <div className="login-payload">
                <div className="label-payload">
                  <h1>E-mail:</h1>
                </div>
                <div className="input-payload">
                  <input
                    value={loginInput["email"] || ""}
                    onChange={(e) => handleInputChange(e, "email")}
                    type="email"
                    placeholder="exemplo@exemplo.com"
                  />
                </div>
              </div>
              <div className="login-payload">
                <div className="label-payload">
                  <h1>Password:</h1>
                </div>
                <div className="input-payload">
                  <input
                    value={loginInput["password"] || ""}
                    onChange={(e) => handleInputChange(e, "password")}
                    type="password"
                    style={{ width: "65%" }}
                    placeholder="*****************"
                  />
                  <button onClick={sendLoginFormData}>Entrar</button>
                </div>
              </div>
              <div className="forgot-password">
                <div className="data-anchor">
                  <div className="icon-anchor">
                    <NoEncryptionIcon sx={{ color: "rgb(80, 80, 80)" }} />
                  </div>
                  <a href="">Esqueceu sua senha?</a>
                </div>
              </div>
              {openCaptcha ? (
                <>
                  <br />
                  <div className="captcha">
                    <ReCAPTCHA
                      sitekey="6LfPDx8pAAAAAK9QP8-HP2Zy9pKrxGnyojeo2GlX"
                      onChange={handleCaptchaChange}
                    />
                  </div>
                </>
              ) : null}
            </FormContainer>
          </div>
          <div className="register">
            <BoxHeader>
              <div className="icon-box">
                <LoginIcon sx={{ color: "rgb(100, 100, 100)" }} />
              </div>
              <div className="label-header-box">
                <h1>{registerBoxLabel}</h1>
              </div>
            </BoxHeader>
            <FormContainer>
              <div className="register-payload">
                <div className="label-payload">
                  <h1>Insira o e-mail de registro</h1>
                </div>
                <div className="input-payload">
                  <input type="email" placeholder="exemplo@exemplo.com" />
                  <button onClick={handleOpen}>Registre-se</button>
                </div>
              </div>
            </FormContainer>
          </div>
        </div>
      </LoginBox>

      <ModalRegister openModal={openModal} handleClose={handleClose} />
    </React.Fragment>
  );
}

export default LoginPage;
