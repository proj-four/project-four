import { useState, useContext } from "react";
import SavedShowsContext from "../contexts/SavedShowsContext";
import styled from "styled-components";
import { black, black2, cyan2, grey, white } from "../variables/colors";


const ShowList = () => {
  const [savedShows, setSavedShows] = useContext(SavedShowsContext);
  console.log(savedShows);
  return (
          <div>
            {
                Object.entries(savedShows).map((list, index) => {
                    return(
                        <Container key={`savedShowList-${index}`}>
                            <p>{list[0]}</p>
                            {
                                    list[1].map((favoritedShow, index) => {
                                        console.log(favoritedShow.show)
                                        return(
                                            <ShowCard 
                                                key={`favoritedShow-${index}`}
                                                showObj={favoritedShow}
                                            />      
                                        )
                                    })
                                }
                        </Container>
                    )
                })
            }     
        </div>
    );
}

export default ShowList;