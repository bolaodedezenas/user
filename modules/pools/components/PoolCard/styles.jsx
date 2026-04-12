import styled, { css } from "styled-components";
import { transparentize } from "polished";

export const Card = styled.div`
  ${({ color }) => css`
    background: linear-gradient(
      90deg,
      ${color} 0%,
      ${transparentize(0.4, color)} 100%
    );
  `}
`;
