import styled from "styled-components";

export const Box = styled.div`

  @media (max-width: 908px) {
    
    justify-content: center;
  }

`;

export const BoxLayout = styled.section`
  margin-top: 90px;

  @media (max-width: 861px) {
    margin-top: ${(props) => (props.toggle ? "150px" : "90px")};
  }

  @media (max-width: 621px) {
    margin-top: 150px;
  }

  @media (max-width: 592px) {
    margin-top: 75px;
  }

  @media (max-width: 576px) {
    margin-top: 140px;
  }


`;