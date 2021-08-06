import { useState, useContext } from "react";
import styled, { css } from "styled-components/macro";
import axios from "axios";
import { baseUrl, apiKey } from "../variables/api";
import ShowsDataContext from "../contexts/ShowsDataContext";
import {
  black,
  black2,
  cyan2,
  white,
  red,
  grey,
  black1,
} from "../variables/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import { IconBtn } from "./Buttons";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showsData, setShowsData] = useContext(ShowsDataContext);

  // Tracks whether the API has loaded or not
  const [isApiLoaded, setIsApiLoaded] = useState(false);

  // Tracks if there is an API error
  const [apiLoadError, setApiLoadError] = useState(false);

  // Tracks when search begins and completes
  const [isSearching, setIsSearching] = useState(false);

  const handleChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Reset api loading states
    setIsApiLoaded(false);
    setApiLoadError(false);
    setIsSearching(true);

    axios({
      url: `${baseUrl}/search/shows`,
      method: "GET",
      dataResponse: "json",
      params: {
        api_key: `${apiKey}`,
        q: query,
      },
    })
      .then((res) => {
        if (res.request.status === 200) {
          setShowsData(res.data);
          setIsApiLoaded(true);
          setIsSearching(false);
        } else {
          throw new Error(res);
        }
      })
      .catch((err) => {
        // Update loading error states to then prompt an error message to the user
        setIsApiLoaded(true);
        setApiLoadError(true);
        setIsSearching(false);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleReset = (e) => {
    setSearchQuery("");
    setShowsData([]);
    setIsApiLoaded(false);
    setApiLoadError(false);
    setIsSearching(false);
  };

  return (
    <Container>
      <form>
        <SearchField>
          <SearchInput
            type="text"
            name="search"
            id="search"
            value={searchQuery}
            onChange={handleChange}
            searchResults={showsData.length}
            searchQuery={searchQuery}
          />
          <SearchLabel htmlFor="search" input={searchQuery}>
            Search shows
          </SearchLabel>
          <BtnContainer>
            <SearchBtn type="submit" onClick={handleSubmit}>
              <Icon icon={faSearch} />
            </SearchBtn>
            <Vertical />
            <ResetBtn type="reset" onClick={handleReset}>
              <Icon icon={faTimes} />
            </ResetBtn>
          </BtnContainer>
        </SearchField>
      </form>

      <ErrorContainer>
        {/* Prompt the users that a search is occurring */}
        {isSearching && (
          <SearchingContainer>
            <Searching>Searching for results...</Searching>
          </SearchingContainer>
        )}

        {/* Show no results if: (1) API has loaded and (2) There was no api loading error (3) Search results return nothing (4) User has entered a search query */}
        {isApiLoaded &&
          !apiLoadError &&
          showsData.length === 0 &&
          searchQuery !== "" && (
            <NoResultsMessage>No results found</NoResultsMessage>
          )}

        {/* Show api loading error if (1) User submitted a search (2) the API has loaded (3) There was a loading error thrown */}
        {searchQuery !== "" && isApiLoaded && apiLoadError && (
          <ApiLoadingError>Error fetching search results.</ApiLoadingError>
        )}
      </ErrorContainer>
    </Container>
  );
};

export default SearchBar;

const spacing = "18.5px 14px";

const Container = styled.div`
  position: relative;
`;

const SearchField = styled.div`
  position: relative;
  margin: 5px;
`;

const SearchInput = styled.input`
  padding: ${spacing};
  border: 1px solid ${black};
  margin: 1px;
  border-radius: 5px;
  width: 100%;
  background-color: ${black};
  color: ${white};

  &:hover {
    margin: 0px;
    border: 2px solid ${cyan2};
  }

  &:active,
  &:focus {
    margin: 0px;
    border: 2px solid ${cyan2};
    outline: none;
    border-radius: 5px;
  }

  /* Styles applied to input box when there are no search results / there is an error getting search results and the search is complete */
  ${({ searchResults, searchQuery }) => {
    return (
      searchQuery !== "" &&
      searchResults === 0 &&
      css`
        margin: 0px;
        border: 2px solid ${red};

        &:active,
        &:focus,
        &:hover {
          border-color: ${red};
        }
      `
    );
  }}
`;

const SearchLabel = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  margin: ${spacing};
  padding: 3px 5px;
  transition: 0.3s all ease-in-out;
  background-color: ${black};
  color: ${white};
  pointer-events: none;
  border-radius: 5px;

  ${({ input }) => {
    if (input.length !== 0) {
      return css`
        transform: translate(-10px, -28px) scale(0.7);
        color: ${cyan2};
        font-weight: 700;
      `;
    }
  }}

  ${SearchInput}:active + &, ${SearchInput}:focus + & {
    transform: translate(-10px, -28px) scale(0.7);
    color: ${cyan2};
    font-weight: 700;
  }
`;

const BtnContainer = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  margin-right: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SearchBtn = styled(IconBtn)`
  margin-right: 3px;
`;

const ResetBtn = styled(IconBtn)`
  margin-left: 3px;
`;

const Vertical = styled.div`
  height: 45%;
  width: 1px;
  background-color: ${black2};
`;

const Icon = styled(FontAwesomeIcon)``;

// Error styles

const ErrorContainer = styled.div`
  margin: 5px;
  position: absolute;
  left: 0px;
  bottom: -45px;
  font-size: 1rem;
  font-weight: 700;
  text-transform: uppercase;

  @media (max-width: 400px) {
    bottom: -65px;
  }
`;

const NoResultsMessage = styled.p`
  margin: 0px;
  padding: 10px 20px;
  border-radius: 5px;
  color: ${grey};
  background-color: ${black2};
`;

const ApiLoadingError = styled(NoResultsMessage)`
  background-color: ${red};
  color: ${black1};
`;

const SearchingContainer = styled.div``;

const Searching = styled(NoResultsMessage)``;
