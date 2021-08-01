import styled from "styled-components";
import { black2, cyan2, white } from "../variables/colors";

export const IconBtn = styled.button`
  border: none;
  background: none;
  padding: 5px;
  border-radius: 5px;
  color: ${cyan2};
  transition: all 0.2s ease-in-out;

  &:hover,
  &:active,
  &:focus {
    cursor: pointer;
    color: ${white};
    background-color: ${cyan2};
    outline: none;
  }
`;
