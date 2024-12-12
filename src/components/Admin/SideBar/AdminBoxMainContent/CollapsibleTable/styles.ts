import styled from "styled-components";

export const MemberContainer = styled.div`
  width: auto;  
  height: 100%;
  box-shadow: 3px 3px 16px -8px rgb(220, 220, 220);
  border: 1px solid rgb(230, 230, 230);
  display: flex;
  align-items: center;
  justify-content: center;

  .header-events {
    width: 100%;
    padding: 0.5rem;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid rgb(230, 230, 230);
    height: 4rem;

    p {
      margin: auto 0.5rem;
      font-size: 1rem;
    }
  }

  .data-user {
    width: 100%;
    margin: auto;
    display: flex;
    justify-content: space-between;
    height: 4rem;
    border-bottom: 1px solid rgb(200, 200, 200);

    .data-flex-col-2 {
      width: 5%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .data-flex-col-4 {
      width: 10%;
      height: 100%;
      display: flex;
      align-items: center;
    }

    .data-flex-col-6 {
      width: 20%;
      height: 100%;
      display: flex;
      align-items: center;
    }

    .data-flex-col-8 {
      width: 30%;
      height: 100%;
      display: flex;
      align-items: center;
    }

    .data-flex-col-4 {
      width: 100%;
      height: auto;
      padding: 1rem;
    }
  }
`;
