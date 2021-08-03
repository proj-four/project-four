import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import SavedShowsContext from "../contexts/SavedShowsContext";

const ListOptionsWrapper = styled.div`
  position: absolute;
  width: 200px;
  background-color: #0d0d0d;
  color: white;
  z-index: 10;
  top: calc(100% + 10px);
  margin-left: -10px;
  border-radius: 10px;
  overflow: hidden;
`;

const ListOptionWrapper = styled.button`
  width: 100%;
  text-align: left;
  padding: 15px;
  transition: background-color 0.2s;
  background: transparent;
  border: none;
  color: white;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const ListOptions = (props) => {
  const [savedShows, setSavedShows] = useContext(SavedShowsContext);
  const [lists, setLists] = useState([]);

  useEffect(() => {
    const tempLists = Object.keys(savedShows);

    console.log(tempLists);
    setLists(tempLists);
  }, [savedShows]);

  //   const lists = ["Favorites", "Watch Later"];

  return (
    <ListOptionsWrapper style={{ display: props.isOpen ? "block" : "none" }}>
      {lists.map((list, index) => {
        return <ListOption key={index} name={list} />;
      })}
    </ListOptionsWrapper>
  );
};

// TODO: Separate into another .js file and import it
const ListOption = (props) => {
  return <ListOptionWrapper>{props.name}</ListOptionWrapper>;
};

export default ListOptions;
