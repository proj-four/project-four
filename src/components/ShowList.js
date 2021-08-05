import { useContext } from "react";
import SavedShowsContext from "../contexts/SavedShowsContext";
import ShowCard from "./ShowCard";
import Title from "./Title.styled";
import Container from "./Container.styled";

const ShowList = () => {
  const [savedShows] = useContext(SavedShowsContext);

  return (
    <div>
      {Object.entries(savedShows).map((list, index) => {
        return (
          <div key={`savedShowContainer-${index}`}>
            <Title>{list[0]}</Title>

            <Container key={`savedShowList-${index}`}>
              {list[1].map((showObj, index) => {
                return (
                  <ShowCard
                    key={`favoritedShow-${index}`}
                    showObj={showObj}
                    favorite={true}
                    list={list[0]}
                    index={index}
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
