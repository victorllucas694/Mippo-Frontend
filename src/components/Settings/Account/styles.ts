import styled from "styled-components";

export const AccountBox = styled.div`
  width: 95%;
  height: auto;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  margin: auto;
  min-height: 85vh;
  padding: 2rem;
  border-radius: 5px;

  h1 {
    font-family: "Open Sans";
    color: rgb(80, 80, 80);
    font-weight: 300;
    font-size: 1.5rem;
  }

  .personal-info {
    width: 100%;
    margin: 2rem auto;
    height: auto;
    min-height: 35vh;
    border: 1px solid rgb(230, 230, 230);
    padding: 2rem;

    h2 {
      font-family: "Open Sans";
      color: rgb(80, 80, 80);
      font-weight: 300;
      font-size: 1.2rem;
    }

    .inputs-info {
        width: 70%;
        height: auto;
        min-height: 24vh;
        margin: 1rem 0;
        display: flex;
        justify-content: space-between;


        .col-6 {
            width: 48%;
            height: 24vh;
            border: 1px solid;
        }
    }
  }
`;
