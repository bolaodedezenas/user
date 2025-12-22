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
`;
