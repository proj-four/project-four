import { useState, useContext } from "react";
import SavedShowsContext from "../contexts/SavedShowsContext";
import styled from "styled-components";
import { black, black2, cyan1, cyan2, grey, white } from "../variables/colors";
import ShowCard from "./ShowCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { IconBtn } from "./Buttons";

const ShowList = () => {
  const [savedShows, setSavedShows] = useContext(SavedShowsContext);
  return (
    <div>
      {Object.entries(savedShows).map((list, index) => {
        return (
            <div>
            <ListTitle>{list[0]}</ListTitle>
          <Container key={`savedShowList-${index}`}>
            {list[1].map((favoritedShow, index) => {
              console.log(favoritedShow.show);
              return (
                <ShowCard
                  key={`favoritedShow-${index}`}
                  showObj={favoritedShow}
                  favorite={true}
                />
              );
            })}
          </Container>
          </div>
        );
      })}
    </div>
  );
};

export default ShowList;

const Container = styled.ul`
  list-style: none;
  display: flex;
  overflow-x: auto;
  max-width: 100vw;
  padding: 20px 0;
  background-color: ${black2};
  padding: 10px 30px;

`;

const ListTitle = styled.h2`
  margin-bottom: 2rem;
  font-size: 3rem;
  color: ${white};
  background-color: ${black2};
  padding: 0 30px;
  margin: 0;
`;


