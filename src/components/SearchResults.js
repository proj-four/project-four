import { useContext } from "react";
import ShowsDataContext from "../contexts/ShowsDataContext";
import Container from "./Container.styled";
import ShowCard from "./ShowCard";
import Title from "./Title.styled";

const SearchResults = () => {
  const [showsData] = useContext(ShowsDataContext);

  return (
    <div>
      {showsData && showsData.length > 0 && <Title>Search results</Title>}

      {showsData && showsData.length > 0 && (
        <Container>
          {showsData.map((showObj) => (
            <ShowCard
              key={`searchResult-${showObj.show.id}`}
              showObj={showObj}
              favorite={false}
            />
          ))}
        </Container>
      )}
    </div>
  );
};

export default SearchResults;
