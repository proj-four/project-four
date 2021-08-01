import { useState, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import { baseUrl, apiKey } from "../variables/api";
import ShowsDataContext from "../contexts/ShowsDataContext";
import { black, cyan2, grey, white } from "../variables/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showsData, setShowsData] = useContext(ShowsDataContext);

  const handleChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

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
        } else {
          throw new Error(res);
        }
      })
      .catch((err) => {
        // TODO: error handling
        // No results found -> what to show in the UI?
        // Any other error -> what to show in the UI?
        console.log(err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <form>
        <SearchField>
          <SearchInput
            type="text"
            name="search"
            id="search"
            value={searchQuery}
            onChange={handleChange}
          />
          <SearchLabel htmlFor="search">Search shows</SearchLabel>
          <SearchButton type="submit" onClick={handleSubmit}>
            <Icon icon={faSearch} />
          </SearchButton>
        </SearchField>
      </form>
    </div>
  );
};

export default SearchBar;

const padding = "18.5px 14px";
const margin = "20.5px 16px";

const SearchField = styled.div`
  position: relative;
  display: inline-block;
`;

const SearchInput = styled.input`
  padding: ${padding};
  border: 1px solid ${grey};
  border-radius: 5px;
  margin: 5px;

  &:hover {
    margin: 4px;
    border: 2px solid ${black};
  }

  &:active,
  &:focus {
    margin: 4px;
    border: 2px solid ${cyan2};
    outline: none;
    border-radius: 5px;
  }
`;

const SearchLabel = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  margin: ${margin};
  padding: 3px 5px;
  transition: 0.3s all ease-in-out;
  background-color: ${white};
  pointer-events: none;

  ${SearchInput}:active + &, ${SearchInput}:focus + & {
    transform: translate(-10px, -28px) scale(0.7);
    color: ${cyan2};
  }
`;

const SearchButton = styled.button`
  position: absolute;
  top: 0;
  right: 0px;
  bottom: 0;
  margin-right: 14px;
  border: none;
  background: none;
`;

const Icon = styled(FontAwesomeIcon)`
  ${SearchInput}:active + & , ${SearchInput}:focus + & {
    color: ${cyan2};
  }
`;
