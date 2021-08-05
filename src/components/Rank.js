import { useContext } from "react";
import SavedShowsContext from "../contexts/SavedShowsContext";
import styled from "styled-components";
import { black, black2, cyan1, cyan2, grey, white } from "../variables/colors";
import ShowCard from "./ShowCard";



const Rank = () => {
    const [savedShows, setSavedShows] = useContext(SavedShowsContext);
  return (
    <div>
            {savedShows.map((vote, index) => {
              // console.log(vote.show);
              return (
                <div>
                  <Title>Rank</Title>
                  <Containr key={`voted-${index}`}>
                    <ShowCard
                    key={`voted-${index}`}
                    showObj={vote}
                  />
                  </Containr>
                </div>
              );
            })
          })
    </div>
  )
}

export default Rank;

const Title = styled.h2`
color: black;
`;

const Containr = styled.ul`
list-style: none;
  display: flex;
  overflow-x: auto;
  max-width: 100vw;
  padding: 20px 0;
  background-color: ${black2};
  padding: 10px 30px;
`;