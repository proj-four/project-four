import { useContext } from "react";
import SavedShowsContext from "../contexts/SavedShowsContext";
import styled from "styled-components";
import { cyan1, black2, white } from "../variables/colors";
import ShowCard from "./ShowCard";


const ShowList = () => {
  const [savedShows, setSavedShows] = useContext(SavedShowsContext);
  return (
    <div>
      {Object.entries(savedShows).map((list, index) => {
        return (
          <div key={`savedShowContainer-${index}`}>
            <Title>{list[0]}</Title>
            <Container key={`savedShowList-${index}`}>
              {list[1].map((favoritedShow, index) => {
                return (
                  <ShowCard
                    key={`favoritedShow-${index}`}
                    showObj={favoritedShow}
                    favorite={true}
                    list={list[0]}
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

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    height: 3px;
    background: ${cyan1};
    border-radius: 5px;
  }  
`;

const Title = styled.h2`
  margin-bottom: 2rem;
  font-size: 3rem;
  color: ${white};
  background-color: ${black2};
  padding: 0 30px;
  margin: 0;
`;


