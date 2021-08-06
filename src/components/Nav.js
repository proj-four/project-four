import styled from "styled-components";
import Logo from "./Logo";
import CreateList from "./CreateList";

const Nav = () => {
  return (
    <NavWrapper>
      <Logo />
      <div>
        <CreateList />
      </div>
    </NavWrapper>
  );
};

export default Nav;

const NavWrapper = styled.nav`
  grid-area: nav;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 660px) {
    flex-direction: column;
  }
`;
