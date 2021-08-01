import styled from "styled-components";
import SearchBar from "./SearchBar";

const Header = () => {
  return (
    <Wrapper>
      <SearchBar />
    </Wrapper>
  );
};

export default Header;

const Wrapper = styled.div``;
