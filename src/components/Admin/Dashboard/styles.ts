import styled from "styled-components";

export const ProductPage = styled.div`
  width: 100%;
  height: auto;

  .flex-body-wrapper {
    width: 100%;
    height: auto;
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  

`;

export const HeaderProduct = styled.div`
  width: 100%;
  height: 5rem;
  border-bottom: 1px solid rgb(230, 230, 230);
  display: flex;
  justify-content: space-between;
  align-items: center;

  .flex-header-wrapper {
    width: 30%;
    height: 100%;
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    h1 {
      font-size: 1.3rem;
      font-family: "Open Sans";
      font-weight: 400;
    }
  }
  .trash {
    width: 10rem;
    height: 5rem;
    display: flex;
  }
`;

export const IconBackToHomePage = styled.div`
  width: 3rem;
  height: 3rem;
  margin: 1rem;
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: 1px solid rgb(220, 220, 220);

  &:hover {
    background-color: rgb(220, 220, 220);
    transition: 1.2s;
  }
`;
