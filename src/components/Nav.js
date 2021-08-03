import styled from "styled-components";
import Logo from "./Logo";
import PrimaryBtn from "./Buttons";
import { useEffect, useState} from "react";

const Nav = () => {

  const [showCreateList, setShowCreateList]=useState(false);
  const toggleCreateList = () => {
    setShowCreateList(showCreateList?false:true);
  };

  const createList = () => {
    
  };

  return (
    <NavWrapper>
      <Logo />
      <PrimaryBtn onClick={toggleCreateList}>Create list</PrimaryBtn>
      <div style={{display:showCreateList?"block":"none"}}>
        <h2>Enter List Name</h2>
        <input type="text" placeholder="List Name"/>
        <button onClick={createList}></button>
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
`;

