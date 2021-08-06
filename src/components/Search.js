import styled from "styled-components";
import { getRGBvalue } from "../utils";
import { cyan1, white } from "../variables/colors";
import SearchBar from "./SearchBar";

const Search = () => {
  return (
    <SearchWrapper>
      <DescriptionContainer>
        <Heading>Unlimited TV shows</Heading>
        <Description>Never miss your favourite show.</Description>
        <CallToAction>
          Ready to browse? Search for your shows and add it to your list.
        </CallToAction>
        <SearchBar />
      </DescriptionContainer>
    </SearchWrapper>
  );
};

export default Search;

const SearchWrapper = styled.div`
  grid-area: search;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const DescriptionContainer = styled.div`
  text-align: center;
  background-color: rgba(${getRGBvalue(cyan1)}, 0.15);
  box-shadow: 0px 0px 15px 15px rgba(${getRGBvalue(cyan1)}, 0.15);
  padding: 30px;
  border-radius: 20px;
  margin-bottom: 10px;

  @media (max-width: 660px) {
    padding: 20px;
  }

  @media (max-width: 410px) {
    padding: 10px;
  }
`;

const Heading = styled.h1`
  color: ${white};
  font-size: 4rem;
  margin: 10px;

  @media (max-width: 660px) {
    font-size: 2.5rem;
  }

  @media (max-width: 410px) {
    font-size: 2rem;
    margin: 5px;
  }
`;

const Description = styled.h2`
  color: ${white};
  font-size: 2rem;
  margin: 10px 0px 50px 0px;

  @media (max-width: 660px) {
    font-size: 1.5rem;
  }

  @media (max-width: 410px) {
    font-size: 1.2rem;
  }
`;

const CallToAction = styled.p`
  color: ${white};
  font-size: 1rem;
`;
