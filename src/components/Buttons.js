import styled from "styled-components";
import { black2, cyan1, cyan2, white } from "../variables/colors";

const PrimaryBtn = styled.button`
  border: none;
  background: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  display: inline-block;
  background-color: ${cyan1};
  color: ${black2};
  text-transform: uppercase;
  box-shadow: 0px 3px 1px -2px rgb(255 255 255 / 20%),
    0px 2px 2px 0px rgb(255 255 255 / 14%),
    0px 1px 5px 0px rgb(255 255 255 / 12%);
  font-size: 1rem;
  font-weight: 700;
  transition: all 0.3s ease-in-out;

  &:hover,
  &:focus,
  &:focus-visible,
  &:active {
    box-shadow: 0px 2px 4px -1px rgb(255 255 255 / 20%),
      0px 4px 5px 0px rgb(255 255 255 / 14%),
      0px 1px 10px 0px rgb(255 255 255 / 12%);
    background-color: ${cyan2};
    outline: none;
  }
`;

export const SecondaryBtn = styled(PrimaryBtn)`
  background-color: ${black2};
  color: ${cyan2};
  border: 2px solid ${cyan2};
  box-shadow: none;

  &:hover,
  &:focus,
  &:focus-visible,
  &:active {
    color: ${black2};
    background-color: ${cyan2};
    outline: none;
  }
`;

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

export default PrimaryBtn;
