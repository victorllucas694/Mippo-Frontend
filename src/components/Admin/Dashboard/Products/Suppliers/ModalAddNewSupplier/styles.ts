import styled from "styled-components";

export const HeaderModal = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  height: 4rem;
  border-bottom: 1px solid rgb(240, 240, 240);
  align-items: center;
  padding: 1rem;

  h1 {
    font-size: 1.5rem;
    font-weight: 300;
    font-family: "Roboto";
  }

  .close-modal {
    width: 3rem;
    height: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid rgb(230, 230, 230);
    border-radius: 2px;
    box-shadow: 2px 2px 10px rgb(240, 240, 240);
  }
`;

export const BodyModalData = styled.div`
  width: 100%;
  height: auto;
  margin: .5rem 0;
  padding: 1rem;

  h1 {
    font-size: 1.1rem;
    font-weight: 300;
    color: rgb(80, 80, 80);
    font-family: "Roboto";
  }

  .advanced-supplier-information {
    width: 100%;
    margin: 1rem 0;
    height: 4rem;
    display: flex;
    justify-content: space-between;
    border-bottom:  1px solid rgb(240, 240, 240);   
    display: flex;
    align-items: center;

    h1 {
      font-size: 1.1rem;
      font-weight: 300;
      color: rgb(80, 80, 80);
      font-family: "Roboto";
    }

    .close-modal {
      width: 3rem;
      height: 3rem;
      display: flex;
      justify-content: center;
      border: 1px solid rgb(230, 230, 230);
      align-items: center;
      border-radius: 2px;
    }
  }

  .basic-supplier-layer {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: space-between;
  }

  .shipping-method {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    flex-direction: column;

    h1 {
      font-size: 1.1rem;
      font-weight: 300;
      color: rgb(80, 80, 80);
      font-family: "Roboto";
    }

    .buttons-methods {
      width: 100%;
      height: 4rem;
      margin: 1rem 0;
      display: flex;
      justify-content: space-between;


      .method {
        border-radius: 3px;
        border: 1px solid rgb(210, 210, 210);
        width: 30%;
        height: 90%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1rem;
        font-weight: 300;
        color: rgb(110, 110, 110);
        font-family: "Roboto";

        &:hover {
            cursor: pointer;
        }
      }

      .active {
        border: 1px solid #1976d2;
        color: #1565c0;
        box-shadow: 3px 3px 15px -8px #1565c0,
      }
    }
  }
`;


export const AdvancedSupplierInformation = styled.div`
    width: 100%;
    height: auto;
`;

export const SaveAllInformations = styled.div`
    width: 100%;
    height: 4rem;
    display: flex;
    justify-content: flex-end;
    align-items: center;
`;