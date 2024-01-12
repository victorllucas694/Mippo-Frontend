import { useAuth } from "../../../contexts/AuthenticateContext";
import { useAxios } from "../../../providers/AxiosProvider";
import { HeaderPaper } from "./styles";
import { useEffect, useState } from "react";

function Header() {
  return (
    <HeaderPaper>
      <div className="box-content">
        <div className="message">
          <h1></h1>
        </div>

        <div className="account-data">
          <div className="box-button">
            <a href="/login"></a>
          </div>
        </div>
      </div>
    </HeaderPaper>
  );
}

export default Header;
