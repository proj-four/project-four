import styled from "styled-components";
import Logo from "./Logo";
import PrimaryBtn from "./Buttons";

const Nav = () => {
  return (
    <NavWrapper>
      <Logo />
      <PrimaryBtn>Create list</PrimaryBtn>
    </NavWrapper>
  );
};

export default Nav;

const NavWrapper = styled.nav`
  grid-area: nav;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
