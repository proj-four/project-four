import { useState, useContext } from "react";
import noImageFound from "../assets/noImageFound.jpg";
import { black, cyan2, grey, white } from "../variables/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import ShowsDataContext from "../contexts/ShowsDataContext";
import styled from "styled-components";

const ShowCard = (props) => {
  const showObj = props.showObj;
  const { id, image, language, name, summary } = showObj.show;

  const [formattedSummary, setFormattedSummary] = useState(null);

  // Triggers a modal to appear on the page with the movie details
  const handleLoadMore = (summary) => {
    const finalSummary = formatSummary(summary, summary.length);

    setFormattedSummary(finalSummary);
  };

  const formatSummary = (summary, maxCharLength = 50) => {
    let finalSummary = null;

    // Check if summary is null or not
    if (summary === null || summary === undefined) {
      finalSummary = "N/A";
    } else {
      // Remove HTML tags
      const regex = /(<([^>]+)>)/gi;
      const cleanSummary = summary.replace(regex, "");

      // Trim the summary
      if (cleanSummary.length > maxCharLength) {
        finalSummary = cleanSummary.substring(0, maxCharLength) + "...";
      } else {
        finalSummary = cleanSummary;
      }
    }

    return finalSummary;
  };

  const score = Math.floor(showObj.score * 100);
  const finalSummary = formatSummary(summary);

  return (
    <li key={id} className="card">
      {image ? (
        <img src={image.medium} alt={`Poster of ${name}`} />
      ) : (
        <img src={noImageFound} alt="No image found" />
      )}
      {/* <button className={isActive ? "add" : "remove"}> */}
      {/* <button onClick={handleAdd}> */}
      {/* {/* <button onClick={handleAdd} className="add">+</button> */}
      {/* <button onClick={handleAdd} className="remove">-</button> */}
      {/* <span></span> */}
      {/* <span></span> */}
      {/* </button> */}
      <button>up</button>
      <button>down</button>
      <p>{name}</p>
      <p>{score}%</p>
      <p>{language}</p>
      <button onClick={() => handleLoadMore(summary)}>Load More</button>
      <p>{formattedSummary ? formattedSummary : finalSummary}</p>
    </li>
  );
};

export default ShowCard;
