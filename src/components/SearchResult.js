import { useState, useContext } from "react";
import ShowsDataContext from "../contexts/ShowsDataContext";
import ShowCard from "./ShowCard";
import styled from "styled-components";
import { black, black2, cyan2, grey, white } from "../variables/colors";

const SearchResult = () => {
  const [showsData, setShowsData] = useContext(ShowsDataContext);

  return (
    <div>
      <Container>
        {showsData.map((showObj) => (
          <ShowCard key={showObj.show.id} showObj={showObj} />
        ))}
      </Container>
    </div>
  );
};

export default SearchResult;


const Container = styled.ul`
    list-style: none;
    display: flex;
    overflow-x: auto;
    max-width: 100vw;
    padding: 20px 0;   
    background-color: ${black2};
`;