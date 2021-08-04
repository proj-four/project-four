import { useContext, useEffect, useState } from "react";
import SavedListsContext from "../contexts/SavedListsContext";
import styled from "styled-components";
import ShowCard from "./ShowCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { IconBtn } from "./Buttons";
import {
  black,
  black1,
  black2,
  cyan1,
  cyan2,
  grey,
  white,
} from "../variables/colors";

const Icon = styled(FontAwesomeIcon)``;

const RemoveShowStyle = styled(IconBtn)`
  position: absolute;
  z-index: 10;
  top: 8px;
  right: 8px;
  border-radius: 100%;
  color: ${cyan1};
  padding: 5px 8px;
  font-size: 20px;
  border: 2px solid ${cyan1};
  margin-right: 5px;
`;

const SavedListsStyle = styled.div`
  width: 100%;
  min-height: 300px;
  background: black;
  padding: 20px;
  color: white;
`;

const ShowCardStyle = styled.div`
  position: relative;
  display: inline-block;
`;

const SavedLists = () => {
  const [savedLists, setSavedLists] = useContext(SavedListsContext);

  useEffect(() => {
    // Fetch lists here
  });

  const showLists = [
    {
      name: "Favorites",
      shows: [
        {
          score: 0.8718425,
          show: {
            id: 30774,
            url: "https://www.tvmaze.com/shows/30774/friends",
            name: "Friends",
            type: "Scripted",
            language: "Japanese",
            genres: ["Drama", "Romance"],
            status: "Ended",
            runtime: 65,
            averageRuntime: 65,
            premiered: "2002-02-04",
            officialSite: "http://www.tbs.co.jp/friends21/",
            schedule: {
              time: "21:00",
              days: ["Monday", "Tuesday"],
            },
            rating: {
              average: null,
            },
            weight: 47,
            network: {
              id: 159,
              name: "TBS",
              country: {
                name: "Japan",
                code: "JP",
                timezone: "Asia/Tokyo",
              },
            },
            webChannel: null,
            dvdCountry: null,
            externals: {
              tvrage: null,
              thetvdb: 99721,
              imdb: "tt0315608",
            },
            image: {
              medium:
                "https://static.tvmaze.com/uploads/images/medium_portrait/122/305714.jpg",
              original:
                "https://static.tvmaze.com/uploads/images/original_untouched/122/305714.jpg",
            },
            summary:
              "<p>Left alone on a trip to Hong Kong, Tomoko finds herself the victim of a purse-snatching. The police arrest the man she points out, but it turns out to be the wrong person: a young Korean man named Ji Hoon. Despite his anger and humiliation, he takes her out to dinner since she has lost all her money, and in return, she agrees to model for his amateur film. What follows is a magical and romantic two days. Upon returning to their respective countries, Tomoko must return to her nine-to-five job and Ji Hoon must resume studying to join the family business rather than pursuing his dream of becoming a film director. But soon the two begin to email each other and rekindle their relationship despite the distance and obstacles between them. Marking the very first time in television history that a drama has been co-produced between Japan and South Korea, the story shows us that love has no borders.</p>",
            updated: 1505768726,
            _links: {
              self: {
                href: "https://api.tvmaze.com/shows/30774",
              },
              previousepisode: {
                href: "https://api.tvmaze.com/episodes/1260315",
              },
            },
          },
        },
      ],
    },
    {
      name: "Watch Later",
      shows: [],
    },
  ];

  return (
    <SavedListsStyle>
      {showLists.map((showList, index) => {
        return (
          showList.shows &&
          showList.shows.length !== 0 && (
            <ShowList key={index} name={showList.name} shows={showList.shows} />
          )
        );
      })}
    </SavedListsStyle>
  );
};

const ShowList = (props) => {
  return (
    <div>
      <h2 style={{ marginBottom: "20px", fontSize: "44px" }}>{props.name}</h2>
      {props.shows.map((showObj, index) => (
        <ShowCardStyle key={index}>
          <RemoveShow showId={showObj.show.id} />
          <ShowCard key={showObj} showObj={showObj} />
        </ShowCardStyle>
      ))}
    </div>
  );
};

const RemoveShow = (props) => {
  const removeShowFromList = () => {
    console.log("Removing show: " + props.showId);
    // add remove here from firebase
  };

  return (
    <RemoveShowStyle onClick={removeShowFromList}>
      <Icon icon={faTimes} />
    </RemoveShowStyle>
  );
};

export default SavedLists;
