import { useState } from "react";
import styled, { css } from "styled-components/macro";
import firebase from "../firebase";
import { black, black2, cyan1, cyan2, white } from "../variables/colors";
import { IconBtn } from "./Buttons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

const CreateList = (props) => {
  const [listName, setListName] = useState("");
  const [createList, setCreateList] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (listName !== "") {
      // Create a reference to the firebase db
      const dbRef = firebase.database().ref();

      // Create a reference to the specific list created by the user
      const listRef = dbRef.child(listName);

      listRef.once("value", (response) => {
        // Check if the list being created by the user already exists or not before creating a new one
        const exists = response.val();

        if (!exists && exists !== false) {
          listRef.set(false);
        } else {
          console.log("This list already exists");
        }
      });
    }

    setListName("");
    setCreateList(false);
  };

  const handleReset = () => {
    setListName("");
    setCreateList(false);
  };

  return (
    <Wrapper createList={createList}>
      <form onSubmit={handleSubmit}>
        <SearchField>
          <ListInput
            type="text"
            name="listName"
            id="listName"
            value={listName}
            // onClick={() => setCreateList(true)}
            onChange={(e) => setListName(e.target.value)}
          />
          <ListLabel htmlFor="listName" input={listName}>
            Enter list name
          </ListLabel>
          <BtnContainer>
            <SearchBtn type="submit" onClick={handleSubmit}>
              <Icon icon={faPlus} />
            </SearchBtn>
            <Vertical />
            <ResetBtn type="reset" onClick={handleReset}>
              <Icon icon={faTimes} />
            </ResetBtn>
          </BtnContainer>
        </SearchField>
      </form>
    </Wrapper>
  );
};

export default CreateList;

// TODO: Refactor with ALL styled components with SearchBar file

const Wrapper = styled.div`
  background-color: ${black};
  transition: 0.3s all ease-in-out;
  top: 0;
  right: 0;
  transform-origin: 100%;
  width: 230px;

  &:focus-within,
  &:hover {
    width: 300px;
  }

  @media (max-width: 440px) {
    width: 100%;

    &:focus-within,
    &:hover {
      width: 100%;
    }
  }
`;

const spacing = "18.5px 14px";

const SearchField = styled.div`
  position: relative;
  margin: 5px;
`;

const ListInput = styled.input`
  padding: ${spacing};
  border: 1px solid ${cyan1};
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
`;

const ListLabel = styled.label`
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

  ${ListInput}:active + &, ${ListInput}:focus + & {
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
