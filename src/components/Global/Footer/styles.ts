import styled from "styled-components";

export const FooterConteiner = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: #2b3445;
  align-items: center;
  height: auto;
  min-height: 45vh;

  .body-footer {
    width: 90%;
    height: auto;
    display: flex;
    justify-content: space-between;
    min-height: 35vh;
    flex-wrap: wrap;
    padding: 1rem;

    .company-information {
      width: 30%;
      min-height: 35vh;
      height: auto;
      min-width: 20rem;
      display: flex;

      @media(max-width: 1280px) {
        min-height: 50vh;
      }

      .brand-company {
        width: 100%;
        height: 10vh;

        .brand {
          width: 50%;
          height: 100%;
          border: 1px solid #161d2b;
        }
      }

      p {
        color: #AEB4BE;
        font-family: 'Open Sans';
        font-weight: 300;
        width: 80%;
        font-size: 1rem;
        margin: 2rem 0;

      }

      .buttons-socials {
        width: 100%;
        height: 8vh;
        display: flex;
        gap: 1rem;

        .buttons-layer {
            border-radius: 5px;
            display: flex;
            justify-content: space-between;
            width: 35%;
            height: 80%;
            min-width: 10rem;
            align-items: center;
            background-color: #161d2b;

            .brand-social {
                width: 50px;
                margin: auto 0;
                height: 6vh;
                display: flex;
                justify-content: center;
                align-items: center;
            }


            .body-social {
                width: 65%;
                height: 80%;
                display: flex;
                justify-content: center;
                flex-direction: column;

                h4 {
                    font-size: .8rem;
                    color: #AEB4BE;
                    font-weight: 300;
                    font-family: 'Roboto';
                }

                h3 {
                    color: white;
                    margin: .5rem 0;
                    font-size: .9rem;
                    font-family: 'Open Sans';
                }

            }
        }
      }
    }


    .about-us {
      width: 20%;
      min-width: 20rem;
      display: flex;
      flex-direction: column;
      height: 35vh;
        
      h1 {
        color: white;
        font-size: 1.6rem;
        font-family: 'Roboto';
        margin: 1rem 2rem;
      }

      a {
        margin: 1rem 2rem;
        text-decoration: none;
        color: #AEB4BE;
      }
    }

    .contact-us {
      min-width: 20rem;
      width: 25%;
      height: 35vh;
      display: flex;
      flex-direction: column;
      height: 35vh;
      
      h1 {
        color: white;
        font-size: 1.6rem;
        font-family: 'Roboto';
        margin: 1rem 2rem;
      }

      a {
        margin: 1rem 2rem;
        text-decoration: none;
        color: #AEB4BE;
      }
    }
  }
`;
