import { useState, useContext } from "react";
import noImageFound from "../assets/noImageFound.jpg";
import { black, black2, cyan1, cyan2, grey, white } from "../variables/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import ShowsDataContext from "../contexts/ShowsDataContext";
import styled from "styled-components";
import ListOptions from "./ListOptions";

const ShowCard = (props) => {
  const showObj = props.showObj;
  const { id, image, language, name, summary } = showObj.show;
  const [listMenuOpen, setListMenuOpen] = useState(false);

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

  const toggleListMenu = () => {
    setListMenuOpen(listMenuOpen?false:true);
  }

  return (
    <Card key={id}>
      {image ? (
        <img src={image.medium} alt={`Poster of ${name}`} />
      ) : (
        <img src={noImageFound} alt="No image found" />
      )}
      <Button>
        <Icon icon={faThumbsUp} />
      </Button>
      <Button>
        <Icon icon={faThumbsDown} />
      </Button>
      <Button onClick={toggleListMenu}>
        <Icon icon={listMenuOpen?faMinus:faPlus} />
        <ListOptions isOpen={listMenuOpen}/>
      </Button>
      <Name>{name}</Name>
      <p>{score}%</p>
      <p>{language}</p>
      <Summary>{formattedSummary ? formattedSummary : finalSummary}</Summary>
      <Load onClick={() => handleLoadMore(summary)}>Load More</Load>
    </Card>
  );
};

export default ShowCard;



const Card = styled.li`
  margin-right: 10px;
`;

const Button = styled.button`
position:relative;
border-radius: 50%;
padding:15px;
margin-top:5px;
font-size:20px;
border: 1px solid ${grey};
margin-right: 5px;
`;

const Name = styled.p`
font-size: 3rem
color: ${grey};
`;

const Icon = styled(FontAwesomeIcon)`
color: ${black};
`;

const Summary = styled.p`
color: ${grey};
`;

const Load = styled.button`
color: ${grey};
background-color: ${black2};
border: none;
position: relative;
top: -10px;
right: -100px;
font-size: 0.8rem;
`;