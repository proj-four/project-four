import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import SavedShowsContext from "../contexts/SavedShowsContext";
import ListOption from "./ListOption";

const ListOptions = (props) => {
  const { showObj } = props;

  const [savedShows] = useContext(SavedShowsContext);
  const [lists, setLists] = useState([]);

  useEffect(() => {
    const tempLists = Object.keys(savedShows);

    setLists(tempLists);
  }, [savedShows]);

  return (
    <ListOptionsWrapper>
      {lists.map((list, index) => {
        return <ListOption key={index} list={list} showObj={showObj} />;
      })}
    </ListOptionsWrapper>
  );
};

export default ListOptions;

const ListOptionsWrapper = styled.ul`
  position: absolute;
  width: 200px;
  background-color: #0d0d0d;
  color: white;
  z-index: 10;
  bottom: 60px;
  right: 10px;
  margin-left: -10px;
  border-radius: 10px;
  overflow: hidden;
`;
