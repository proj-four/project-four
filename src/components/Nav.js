import { useState } from "react";
import styled from "styled-components";
import Logo from "./Logo";
import PrimaryBtn from "./Buttons";
import CreateList from "./CreateList";

const Nav = () => {
  const [displayCreateList, setDisplayCreateList] = useState(false);

  const handleClick = () => {
    setDisplayCreateList(!displayCreateList);
  };

  return (
    <NavWrapper>
      <Logo />
      {displayCreateList && <CreateList />}
      <PrimaryBtn onClick={handleClick}>New list</PrimaryBtn>
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

