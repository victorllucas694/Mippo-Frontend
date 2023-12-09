import styled from "styled-components";

export const HeaderBoxDashboardPanel = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-between;
  margin: auto;
`;

export const ContainerWrapperFlex = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-between;
  margin: auto;
  flex-wrap: wrap;

  .flex-col-4 {
    width: 40%;
    min-width: 25rem;
    height: auto;

    @media (max-width: 1650px) {
      width: 45%;
    }

    @media (max-width: 1510px) {
      width: 40%;
      min-width: 20rem;
    }

    @media (max-width: 1280px) {
      width: 100%;
    }
  }

  .flex-col-8 {
    width: 58%;
    height: auto;

    @media (max-width: 1650px) {
      width: 53%;
    }

    @media (max-width: 1510px) {
      width: 58%;
    }

    @media (max-width: 1280px) {
      width: 100%;
    }
  }

  .flex-col-12 {
    width: 100%;
    height: auto;
    min-height: 50vh;
    padding: 1rem;

    @media (max-width: 1650px) {
      width: 100%;
    }
  }
`;

export const TitleAdmin = styled.h1`
  font-family: "Open Sans";
  margin: auto 0;
  font-size: 1.3rem;
  color: rgb(30, 30, 30);
  font-weight: 300;
`;

export const BoxDashPanel = styled.div`
  width: 100%;
  height: auto;
  border-radius: 4px;
  margin: auto;

  @media (max-width: 1280px) {
    width: 100%;
  }
`;
