import styled from "styled-components";

export const LoginBox = styled.div`
  width: 85%;
  margin: auto;
  height: auto;
  padding: 2rem;

  @media(max-width: 1480px) {
    width: 95%;
  }

  p {
    font-size: 1.2rem;
    font-family: "Roboto";
    color: #797979;

    span {
      font-size: 1.5rem;
      font-family: "Roboto";
      color: black;
    }
  }

  .login-register-panel {
    width: 90%;
    height: auto;
    margin: 2rem auto;
    display: flex;
    flex-wrap: wrap;

    @media(max-width: 1380px) {
      width: 100%;
    }

    .login {
      width: 40%;
      min-width: 25rem;
      border-radius: 5px;
      border: 1px solid rgb(240, 240, 240);
      box-shadow: 2px 2px 12px -6px rgb(200, 200, 200);
      height: auto;
      padding: 1rem;

       @media(max-width: 1280px) {
        width: 90%;
        margin: auto;
      } 
    }

    .register {
      width: 40%;
      border: 1px solid rgb(240, 240, 240);
      box-shadow: 2px 2px 12px -6px rgb(200, 200, 200);
      height: 12rem;
      margin: auto 7rem;
      border-radius: 5px;

      @media(max-width: 1280px) {
        width: 70%;
        margin: 3rem auto;
      } 

      @media(max-width: 780px) {
        width: 100%;
        margin: 2rem auto;
      } 
    }
  }
`;

export const BoxHeader = styled.div`
  width: 90%;
  height: 4rem;
  margin: auto;
  display: flex;
  border-bottom: 1px solid rgb(230, 230, 230);

  .icon-box {
    width: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    border: 1px solid rgb(230, 230, 230);
    border-radius: 3px;
    margin: auto 0;
  }

  .label-header-box {
    width: 70%;
    height: 45px;
    margin: auto 1rem;
    display: flex;
    align-items: center;

    h1 {
      font-family: "Roboto";
      font-size: 1rem;
      font-weight: 300;
      color: rgb(60, 60, 60);
    }
  }
`;

export const FormContainer = styled.div`
  width: 90%;
  height: auto;
  margin: 1rem auto;

  .captcha {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin: auto;
  }

  .register-payload {
    width: 100%;
    height: auto;

    .label-payload {
      width: 45%;
      height: 100%;
      display: flex;
      align-items: center;

      h1 {
        font-family: "Open Sans";
        font-weight: 300;
        font-size: 0.9rem;
      }
    }

    .input-payload {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: space-between;

      button {
        width: 30%;
        height: 2.8rem;
        margin: auto 0;
        border: none;
        border-radius: 2px;
        background-color: #00438b;
        color: white;
        font-size: .95rem;
        font-family: 'Open Sans';
      }

      input {
        width: 65%;
        padding: 1rem;
        margin: 1rem 0;
        height: 2.5rem;
        border: 1px solid rgb(200, 200, 200);
        border-radius: 4px;

        &::before {
          border: 1px solid rgb(200, 200, 200);
        }
      }
    }
  }

  .login-payload {
    width: 100%;
    display: flex;
    align-items: center;
    margin: 1rem auto;
    height: 2.8rem;
    justify-content: space-between;

    .label-payload {
      width: 18%;
      height: 100%;
      display: flex;
      align-items: center;

      h1 {
        font-family: "Open Sans";
        font-weight: 300;
        font-size: 0.9rem;
      }
    }

    .input-payload {
      width: 79%;
      height: 100%;
      display: flex;
      justify-content: space-between;

      button {
        width: 33%;
        height: 90%;
        margin: auto 0;
        border: none;
        border-radius: 2px;
        background-color: #00438b;
        color: white;
        font-size: .95rem;
        font-family: 'Open Sans';
      }

      input {
        width: 100%;
        padding: 1rem;
        margin: auto 0;
        height: 90%;
        border: 1px solid rgb(200, 200, 200);
        border-radius: 4px;

        &::before {
          border: 1px solid rgb(200, 200, 200);
        }
      }
    }
  }

  .forgot-password {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    height: 3rem;
    margin: auto;

    .data-anchor {
      display: flex;
      width: 80%;
      height: 100%;
      border-bottom: 1px solid rgb(230, 230, 230);

      .icon-anchor {
        width: 3rem;
        height: 3rem;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      a {
        margin: auto 0;
        color: black;
        text-decoration: none;
        font-size: .95rem;
      }
    }
  }
`;
