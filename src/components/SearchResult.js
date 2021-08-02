import { useState, useContext } from "react";
import ShowsDataContext from "../contexts/ShowsDataContext";
import ShowCard from "./ShowCard";

const SearchResult = () => {
  const [showsData, setShowsData] = useContext(ShowsDataContext);

  return (
    <div>
      <ul>
        {showsData.map((showObj) => (
          <ShowCard key={showObj.show.id} showObj={showObj} />
        ))}
      </ul>
    </div>
  );
};

export default SearchResult;
