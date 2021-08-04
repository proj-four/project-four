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
    for (const favourite in savedShows) {
        <div>
            {
                favourite.map((listItem, index) => {
                    <p key={index}>
                        liteItem.show.name
                    </p>
                })
            }
        </div>
    }
}
  </div>
    );
}

export default ShowList;