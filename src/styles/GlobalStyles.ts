import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
 * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: sans-serif;

  }
  
  ::-webkit-scrollbar-thumb {
  background-color: #e9e9e9;
  border-radius: 2px;
  }

  ::-webkit-scrollbar-track {
    background-color: #f5f5f5;
  }

  ::-webkit-scrollbar {
    width: 2px;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif;
  }
`;

export default GlobalStyles;
