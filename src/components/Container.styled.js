import styled from "styled-components";
import { black2, cyan2 } from "../variables/colors";

const Container = styled.ul`
  list-style: none;
  display: flex;
  overflow-x: auto;
  max-width: 100vw;
  padding: 20px;
  background-color: ${black2};

  /* Whole scrollbar */
  &::-webkit-scrollbar {
    height: 5px;
    background: transparent;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: ${cyan2};
    border-radius: 5px;
  }
`;

export default Container;
