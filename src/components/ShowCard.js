import { useState, useContext } from "react";
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

const ShowCard = (props) => {
  const showObj = props.showObj;
  const { id, image, language, name, summary, genres } = showObj.show;
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
  // const finalGenres = changeGenres(genres);

  const toggleListMenu = () => {
    setListMenuOpen(!listMenuOpen);
  };

  const closeListMenu = () => {
    setListMenuOpen(false);
  };

  return (
    <Card key={id}>
      {image ? (
        <Image src={image.medium} alt={`Poster of ${name}`} />
      ) : (
        <Image src={noImageFound} alt="No image found" />
      )}

      <ButtonWrapper>
        <Button>
          <Icon icon={faThumbsUp} />
        </Button>
        <Button>
          <Icon icon={faThumbsDown} />
        </Button>

        {/* List options dropdown */}
        <ClickAwayListener clickAwayCallBack={closeListMenu}>
          <ShowListsWrapper>
            <Button onClick={toggleListMenu}>
              <Icon icon={listMenuOpen ? faMinus : faPlus} />
            </Button>
            {listMenuOpen && <ListOptions isOpen={listMenuOpen} />}
          </ShowListsWrapper>
        </ClickAwayListener>
      </ButtonWrapper>

      <Title>{name}</Title>
      <Score>{score}%</Score>
      <Language>{language}</Language>
      <Genres>{genres}</Genres>
      <Summary>{formattedSummary ? formattedSummary : finalSummary}</Summary>
      <Load onClick={() => handleLoadMore(summary)}>Load More</Load>
    </Card>
  );
};

export default ShowCard;

const Card = styled.li`
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
