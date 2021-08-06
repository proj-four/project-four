import styled from "styled-components";
import { white, black2, black1 } from "../variables/colors";

const Title = styled.h2`
  margin-bottom: 2rem;
  font-size: 3rem;
  color: ${white};
  background-color: ${black2};
  padding: 30px 30px 10px 30px;
  margin: 0;
  border-top: 5px solid ${black1};
  text-transform: capitalize;

  @media (max-width: 660px) {
    font-size: 2rem;
  }
`;

export default Title;
