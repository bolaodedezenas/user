import styled, { css } from "styled-components";

export const Ball = styled.div`
  position: relative;

  ${({ $close }) =>
    $close &&
    css`
      &:hover::after {
        content: "❌";
        position: absolute;
        top: -10px;
        right: -6px;
        font-size: 0.6rem;
        font-weight: bold;
      }
    `}

  @keyframes bounceIn {
    0% {
      margin-top: -130px;
    }
    60% {
      margin-top: -6px;
    }
    70% {
      margin-top: -10px;
    }
    80% {
      margin-top: -2px;
    }
    90% {
      margin-top: -5px;
    }
    100% {
      margin-top: 0;
    }
  }

  animation: ${({ $anima }) => ($anima ? "bounceIn 1s ease-in forwards" : " ")};
`;
