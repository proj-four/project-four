import { useState, useContext } from "react";
import SavedShowsContext from "../contexts/SavedShowsContext";
import styled from "styled-components";
import { black, black2, cyan1, cyan2, grey, white } from "../variables/colors";
import ShowCard from "./ShowCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { IconBtn } from "./Buttons";
import Container from "./Container.styled";
import Title from "./Title.styled";

const ShowList = () => {
  const [savedShows, setSavedShows] = useContext(SavedShowsContext);
  return (
    <div>
      {Object.entries(savedShows).map((list, index) => {
        return (
          <div key={`savedShowContainer-${index}`}>
            <Title>{list[0]}</Title>
            <Container key={`savedShowList-${index}`}>
              {list[1].map((favoritedShow, index) => {
                return (
                  <ShowCard
                    key={`favoritedShow-${index}`}
                    showObj={favoritedShow}
                    favorite={true}
                    list={list[0]}
                  />
                );
              })}
            </Container>
          </div>
        );
      })}
    </div>
  );
};

export default ShowList;
