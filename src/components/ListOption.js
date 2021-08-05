import { useContext, useState, useEffect } from "react";
import styled, { css } from "styled-components/macro";
import SavedShowsContext from "../contexts/SavedShowsContext";
import { getRGBvalue } from "../utils";
import { cyan1 } from "../variables/colors";
import firebase from "../firebase";

const ListOption = (props) => {
  const { showObj, list } = props;
  const { show } = showObj;

  // Tracks whether the show has been selected by the user or not
  const [isSelected, setIsSelect] = useState(false);

  // Global context which tracks all the lists and shows
  const [savedShows] = useContext(SavedShowsContext);

  useEffect(() => {
    // List of shows extracted from the global context variable
    const shows = savedShows[list];

    // Returns a non-empty array if this show was selected by the user to be included on the list
    const match =
      shows &&
      shows.find((s) => {
        return s && show.id === s.show.id;
      });

    // Update the state to track whether a given show is on the list or not
    if (match && match.length !== 0) {
      setIsSelect(true);
    } else {
      setIsSelect(false);
    }
  }, [savedShows, list, show.id]);

  const handleClick = () => {
    // Remove from firebase if show was previously selected
    if (isSelected) {
      // Create connection to the specific list in firebase
      const dbRef = firebase.database().ref(`/${list}`);
      dbRef.once("value", (response) => {
        // Get all the shows in a given list
        const responseObj = response.val();

        // Loop through the database response to find the key to be removed by matching the show id
        for (const key in responseObj) {
          if (responseObj[key].show.id === show.id) {
            // Delete the specific key from the database
            delete responseObj[key];
            break;
          }
        }

        // Update the database
        dbRef.set(responseObj);
      });
    }

    // Add to firebase if show was not previously selected
    else {
      const dbRef = firebase.database().ref(`/${list}`);
      dbRef.push({ ...showObj, votes: 0 });
    }
  };

  const handleKeyPress = (e) => {
    // If user presses enter key or spacebar, save or remove movie from the database
    if (e.key === "Enter" || e.key === " ") {
      handleClick();
    }
  };

  return (
    <ListItem
      tabIndex={0}
      onClick={handleClick}
      onKeyPress={handleKeyPress}
      isSelected={isSelected}
    >
      {list}
    </ListItem>
  );
};

export default ListOption;

const ListItem = styled.li`
  width: 100%;
  text-align: left;
  padding: 15px;
  transition: background-color 0.2s;
  background: transparent;
  border: none;
  color: white;
  font-size: 16px;
  cursor: pointer;

  &:hover,
  &:focus,
  &:active {
    background-color: rgba(255, 255, 255, 0.1);
    outline: none;
  }

  /* Apply these styles if a user has selected the show to be included to a list */
  ${({ isSelected }) => {
    return (
      isSelected &&
      css`
        background-color: rgba(${getRGBvalue(cyan1)}, 0.5);

        &:hover,
        &:focus,
        &:focus-within,
        &:active {
          background-color: rgba(${getRGBvalue(cyan1)}, 0.3);
        }
      `
    );
  }}
`;
