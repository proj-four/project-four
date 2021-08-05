import { useState, useEffect } from "react";
import noImageFound from "../assets/noImageFound.jpg";
import {
  black,
  black1,
  black2,
  cyan1,
  cyan2,
  grey,
  white,
} from "../variables/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faThumbsDown,
  faMinus,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import ShowsDataContext from "../contexts/ShowsDataContext";
import styled from "styled-components";
import ListOptions from "./ListOptions";
import { IconBtn } from "./Buttons";
import ClickAwayListener from "./ClickAwayListener";
import firebase from "../firebase";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const ShowCard = (props) => {
  // TODO: Need to get list name as prop from when this card is shown in a list
  const { showObj, list, favorite } = props;
  const { id, image, language, name, summary, genres } = showObj.show;

  // Tracks whether the list dropdown is shown or not to the user
  const [listMenuOpen, setListMenuOpen] = useState(false);

  // Tracks the formatted summary / show description
  const [formattedSummary, setFormattedSummary] = useState(null);

  // Tracks whether the entire show description should be shown to the user or not
  const [expand, setExpand] = useState(false);

  // Tracks the maximum number of characters to show in the summary
  const maxSummaryLength = 50;

  useEffect(() => {
    // If user selects show entire show's summary, expand it to full length, otherwise truncate it
    if (expand) {
      const finalSummary = formatSummary(summary, summary.length);
      setFormattedSummary(finalSummary);
    } else {
      const finalSummary = formatSummary(summary);
      setFormattedSummary(finalSummary);
    }
  }, [expand]);

  // Function formats the summary received from the API
  const formatSummary = (summary, maxCharLength = maxSummaryLength) => {
    let result = null;

    // Check if summary is null or not
    if (summary === null || summary === undefined) {
      result = "N/A";
    } else {
      // Remove HTML tags
      const regex = /(<([^>]+)>)/gi;
      const cleanSummary = summary.replace(regex, "");

      // Trim the summary
      if (cleanSummary.length > maxCharLength) {
        result = cleanSummary.substring(0, maxCharLength) + "...";
      } else {
        result = cleanSummary;
      }
    }

    return result;
  };

  const score = Math.floor(showObj.score * 100);

  const handleLikeClick = () => {
    updateVotes("like");
  };

  const handleDislikeClick = () => {
    updateVotes("dislike");
  };

  const updateVotes = (voteType) => {
    const dbRef = firebase.database().ref(`${list}`);
    dbRef.once("value", (result) => {
      const data = result.val();

      for (const key in data) {
        if (data[key].show.id === id) {
          voteType === "like" ? data[key].votes++ : data[key].votes--;
          break;
        }
      }

      dbRef.set(data);
    });
  };

  // const finalSummary = formatSummary(summary);
  // const finalGenres = changeGenres(genres);

  const toggleListMenu = () => {
    setListMenuOpen(!listMenuOpen);
  };

  const closeListMenu = () => {
    setListMenuOpen(false);
  };

  const removeShowFromList = () => {
    // Create connection to the specific list in firebase
    const dbRef = firebase.database().ref(`/${list}`);
    dbRef.once("value", (response) => {
      // Get all the shows in a given list
      const responseObj = response.val();

      // Loop through the database response to find the key to be removed by matching the show id
      for (const key in responseObj) {
        if (responseObj[key].show.id === id) {
          // Delete the specific key from the database if there are still movies in it
          delete responseObj[key];

          break;
        }
      }

      // Update the database
      dbRef.set(responseObj);
    });

    // add remove here from firebase
  };

  return (
    <Card key={id}>
      {image ? (
        <Image src={image.medium} alt={`Poster of ${name}`} />
      ) : (
        <Image src={noImageFound} alt="No image found" />
      )}

      {favorite && (
        <RemoveShowStyle onClick={removeShowFromList}>
          <Icon icon={faTimes} />
        </RemoveShowStyle>
      )}

      <ButtonWrapper>
        {/* Like button */}
        {favorite && (
          <Button name="like" onClick={handleLikeClick}>
            <Icon icon={faThumbsUp} />
          </Button>
        )}

        {/* Dislike button */}
        {favorite && (
          <Button name="dislike" onClick={handleDislikeClick}>
            <Icon icon={faThumbsDown} />
          </Button>
        )}

        {/* List options dropdown */}
        <ClickAwayListener clickAwayCallBack={closeListMenu}>
          <ShowListsWrapper>
            <Button onClick={toggleListMenu}>
              <Icon icon={listMenuOpen ? faMinus : faPlus} />
            </Button>
            {listMenuOpen && (
              <ListOptions isOpen={listMenuOpen} showObj={showObj} />
            )}
          </ShowListsWrapper>
        </ClickAwayListener>
      </ButtonWrapper>

      <Title>{name}</Title>
      <Score>{score}%</Score>
      <Language>{language}</Language>
      <Genres>{genres}</Genres>
      <Summary>{formattedSummary}</Summary>

      {/* Only show expand and hide toggle if the summary is long */}
      {summary && summary.length > maxSummaryLength && (
        <Load onClick={() => setExpand(!expand)}>
          {expand ? "Hide" : "Expand"}
        </Load>
      )}
    </Card>
  );
};

export default ShowCard;

const Card = styled.li`
  width: 220px;
  margin-right: 10px;
  position: relative;
`;

const Button = styled(IconBtn)`
  border-radius: 50%;
  border: 1px solid ${cyan2};
  margin-right: 5px;
`;

const Title = styled.p`
  margin: 0;
  font-size: 1.5rem;
  font-weight: bold;
  color: ${white};
`;

const Icon = styled(FontAwesomeIcon)``;

const Summary = styled.p`
  color: ${grey};
  font-size: 0.9rem;
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

const Image = styled.img`
  width: 210px;
  height: 295px;
  object-fit: cover;
  object-position: center center;
  border-radius: 5px;
`;

const Genres = styled.p`
  position: absolute;
  top: 250px;
  left: 5px;
  padding: 3px 7px;
  color: ${cyan1};
  background-color: ${black1};
`;

const Score = styled.p`
  display: inline-block;
  color: ${white};
`;

const Language = styled.p`
  color: ${cyan2};
  margin: 0;
`;

const ShowListsWrapper = styled.div`
  position: relative;
`;

const ButtonWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 35px) auto;
  justify-items: start;
  align-items: center;
  grid-column-gap: 5px;
`;

const RemoveShowStyle = styled(IconBtn)`
  position: absolute;
  z-index: 10;
  top: 8px;
  right: 20px;
  border-radius: 100%;
  color: ${cyan1};
  padding: 5px 8px;
  font-size: 20px;
  border: 2px solid ${cyan1};
  margin-right: 5px;
`;
