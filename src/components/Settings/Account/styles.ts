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
    box-shadow:0px 1px 8px -1px rgb(220, 220, 220);
    padding: 2rem;

    .header-personal {
      width: 100%;
      align-items: center;
      display: flex;
      height: 4rem;
      justify-content: space-between;
    
      h2 {
        font-family: "Open Sans";
        color: rgb(80, 80, 80);
        font-weight: 300;
        font-size: 1.2rem;
      }
    }


    .inputs-info {
        width: 100%;
        height: auto;
        min-height: 24vh;
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;


        .col-6 {
            width: 30%;
            height: auto;
            border-radius: 5px;

            .data-info {
              width: 100%;
              height: auto;
              padding: 1rem;

              h3 {
                font-family: "Open Sans";
                color: rgb(80, 80, 80);
                font-weight: 600;
                font-size: 1rem;
              }

              p {
                font-family: "Open Sans";
                color: rgb(80, 80, 80);
                font-weight: 500;
                margin: .5rem 0;
                font-size: 1rem;
              }
            }
        }
    }
  }
`;

export const BoxInputsWrapper = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 5rem;
  margin: 1rem 0;
`;

export const BoxButtonWrapper = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: flex-end;
  min-height: 5rem;
  margin: 1rem 0;
`;