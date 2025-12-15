import styled from "styled-components";

export const BoxHeader = styled.div`
  width: ${({ toggle }) =>
    toggle ? "calc(100% - 325px)" : "calc(100% - 85px)"};

  @media (max-width: 592px) {
    width: 100%;
    top: 0;
  }
`;