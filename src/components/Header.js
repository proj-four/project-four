import styled from "styled-components";
import Nav from "./Nav";
import Search from "./Search";

const Header = () => {
  return (
    <HeaderWrapper>
      <Nav />
      <Search />
    </HeaderWrapper>
  );
};

export default Header;

const HeaderWrapper = styled.header`
  max-width: 1200px;
  width: 90%;
  height: 100%;
  margin: 0 auto;
  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-columns: 1fr;
  grid-template-areas: "nav" "search";
`;