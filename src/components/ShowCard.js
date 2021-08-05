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
  red,
} from "../variables/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faThumbsDown,
  faMinus,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import ShowsDataContext from "../contexts/ShowsDataContext";
import styled, { css } from "styled-components/macro";
import ListOptions from "./ListOptions";
import { SecondaryBtn, IconBtn } from "./Buttons";
import ClickAwayListener from "./ClickAwayListener";
import firebase from "../firebase";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const ShowCard = (props) => {
  const { showObj, list, favorite } = props;
  const { id, image, language, name, summary, genres } = showObj.show;

  // Tracks whether the list dropdown is shown or not to the user
  const [listMenuOpen, setListMenuOpen] = useState(false);

  // Tracks the formatted summary / show description
  const [formattedSummary, setFormattedSummary] = useState(null);

  // Tracks whether the entire show description should be shown to the user or not
  const [expand, setExpand] = useState(false);

  // Tracks the maximum number of characters to show in the summary
  const maxSummaryLength = 75;

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
      <CardHeader>
        {/* Render the default image if there is no image url */}
        {image && image.medium ? (
          <Image src={image.medium} alt={`Poster of ${name}`} />
        ) : (
          <Image src={noImageFound} alt="No image found" />
        )}

        {favorite && (
          <DeleteBtn onClick={removeShowFromList}>
            <DeleteIcon icon={faTimes} />
          </DeleteBtn>
        )}

        {!favorite && <Score>{score}% match</Score>}

        {/* Render a maximum of two genres */}
        <GenresContainer>
          {genres &&
            genres.map(
              (genre, index) =>
                index < 2 && (
                  <Genre key={`${name}ShowGenre-${index}`}>{genre}</Genre>
                )
            )}
        </GenresContainer>
      </CardHeader>

      <CardContent expand={expand}>
        <TitleWrapper>
          <Title>{name}</Title>

          {/* Show the vote buttons when a show is on a list, otherwise render the dropdown to allow the user to select which list they want to add the show to */}
          {favorite ? (
            <VoteBtnWrapper>
              {/* Like button */}

              <Button name="like" onClick={handleLikeClick}>
                <Icon icon={faThumbsUp} />
              </Button>

              {/* Dislike button */}

              <Button name="dislike" onClick={handleDislikeClick}>
                <Icon icon={faThumbsDown} />
              </Button>

              {/* TODO: Current vote count */}
            </VoteBtnWrapper>
          ) : (
            <ClickAwayListener clickAwayCallBack={closeListMenu}>
              {/* List options dropdown */}
              <ShowListsWrapper>
                <Button onClick={toggleListMenu}>
                  <Icon icon={listMenuOpen ? faMinus : faPlus} />
                </Button>
                {listMenuOpen && (
                  <ListOptions isOpen={listMenuOpen} showObj={showObj} />
                )}
              </ShowListsWrapper>
            </ClickAwayListener>
          )}
        </TitleWrapper>

        {/* <Title>{name}</Title> */}
        <Language>{language}</Language>

        <Summary>{formattedSummary}</Summary>
      </CardContent>

      {/* Only show expand and hide toggle if the summary is long */}
      {summary && summary.length > maxSummaryLength && (
        <ExpandBtn onClick={() => setExpand(!expand)}>
          {expand ? "Hide" : "Expand"}
        </ExpandBtn>
      )}
    </Card>
  );
};

export default ShowCard;

// Card container

const Card = styled.li`
  width: 220px;
  margin-right: 10px;
  background-color: ${black1};
  border-radius: 5px;
  position: relative;
`;

const CardHeader = styled.div`
  position: relative;
`;

const CardContent = styled.div`
  padding: 10px;
  position: relative;
  height: 200px;

  ${({ expand }) => {
    return (
      expand &&
      css`
        height: auto;
      `
    );
  }}
`;

const Image = styled.img`
  width: 220px;
  height: 295px;
  object-fit: cover;
  object-position: center center;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
`;

// Genres

const GenresContainer = styled.div`
  position: absolute;
  margin: 10px;
  bottom: 0px;
  left: 0px;
  display: flex;
`;

const Genre = styled.p`
  padding: 5px;
  margin: 0px;
  border-radius: 5px;
  font-size: 0.8rem;
  color: ${grey};
  background-color: ${black2};
  margin-right: 3px;
`;

// Score

const Score = styled.p`
  position: absolute;
  margin: 10px;
  top: 0px;
  right: 0px;
  background-color: ${black2};
  padding: 5px 8px;
  font-size: 0.5rem;
  border-radius: 5px;
  color: ${grey};
`;

// Button styles

const VoteBtnWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-items: end;
  column-gap: 5px;
`;

const Icon = styled(FontAwesomeIcon)`
  height: 16px;
  width: 14px;
`;

const Button = styled(IconBtn)`
  border-radius: 50%;
  border: 1px solid ${cyan2};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DeleteIcon = styled(FontAwesomeIcon)`
  height: 16px;
  width: 16px !important;
`;

const DeleteBtn = styled(Button)`
  position: absolute;
  margin: 10px;
  top: 0px;
  right: 0px;

  color: ${white};
  background-color: ${cyan2};

  &:hover,
  &:active,
  &:focus {
    background-color: ${red};
    border-color: ${red};
  }
`;

// Card content styles

const TitleWrapper = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  grid-template-rows: 1fr;
  column-gap: 10px;
  justify-items: space-between;
  align-items: start;
`;

const Title = styled.h3`
  margin: 0;
  width: 125px;
  font-size: 1.5rem;
  font-weight: bold;
  color: ${white};
`;

const Summary = styled.p`
  color: ${grey};
  font-size: 1rem;
  margin: 5px 0px;
`;

const ExpandBtn = styled(SecondaryBtn)`
  font-size: 0.8rem;
  padding: 5px 10px;
  margin: 10px;
  position: absolute;
  bottom: 0px;
  right: 0px;
`;

const Language = styled.p`
  color: ${cyan2};
  font-size: 0.8rem;
  margin: 0px;
  margin-bottom: 10px;
`;

// Dropdown container styles

const ShowListsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;
