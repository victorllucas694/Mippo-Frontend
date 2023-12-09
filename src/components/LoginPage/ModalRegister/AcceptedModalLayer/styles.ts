import styled from "styled-components";

export const CookieCheckerBox = styled.div`
    width: 100%;
    height: auto;

    .business-account {
        width: 100%;
        height: auto;

        h1 {
            font-size: 1.2rem;
            margin: 1rem;
            font-family: 'Roboto';
            font-weight: 400;
        }

        p {
            font-size: .8rem;
            margin: 1rem;
            font-family: 'Open Sans';
            font-weight: 400;
        }
    }

    .accept-condition-checkbox {
        width: 100%;
        height: auto;
        display: flex;
        flex-direction: column;
        margin: 1rem;

        label {
            width: 100%;
            height: auto;
            font-size: .9rem;
            font-family: 'Open Sans';
            font-weight: 400;
        }

        input {
            width: 20px;
            margin: .5rem;
            height: 20px;
        }
    }
`;