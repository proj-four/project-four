import { useEffect, useState } from "react";
import firebase from "../firebase";
import ShowsDataContext from "../contexts/ShowsDataContext";
import SavedShowsContext from "../contexts/SavedShowsContext";
import Footer from "./Footer";
import OuterWrapper from "./OuterWrapper.styled";
import Header from "./Header";
import SearchResults from "./SearchResults";
import ShowList from "./ShowList";


function App() {
  // Saves user's search results
  const [showsData, setShowsData] = useState([]);

  // Saves data retrieved from firebase
  const [savedShows, setSavedShows] = useState([]);

  useEffect(() => {
    // Establish connection to firebase
    const dbRef = firebase.database().ref();

    dbRef.on("value", (response) => {
      const data = response.val();
      const savedShowsTemp = {};

      // Loop through response from firebase to save it into the preferred data structure
      // Data structure: {list: [shows], list2: [shows2]}
      for (const list in data) {
        // If the list is falsy, there are no shows saved to the list, so return an empty array
        const shows = list ? Object.values(data[list]) : [];

        // Sort the shows in order based on vote count using the compare function
        const sortedShows = shows.sort(compare);

        savedShowsTemp[list] = sortedShows;
      }

      // Update context state with data retrieved from firebase
      setSavedShows(savedShowsTemp);
    });
  }, []);

  // Used with the sort array method to sort the shows in order of vote count
  const compare = (a, b) => {
    if (a.votes > b.votes) {
      return -1;
    }
    if (a.votes < b.votes) {
      return 1;
    }
    return 0;
  };

  return (
    <div>
      <SavedShowsContext.Provider value={[savedShows, setSavedShows]}>
        <ShowsDataContext.Provider value={[showsData, setShowsData]}>
          <OuterWrapper>
            <Header />
            <SearchResults />
            <ShowList />
            <Footer />
          </OuterWrapper>
        </ShowsDataContext.Provider>
      </SavedShowsContext.Provider>
    </div>
  );
}

export default App;

// PSUEDO CODE ------------------------

// HOW THE DATA STRUCTURE SHOULD BE STRUCTURED OUT

// const firebaseDb = {
//   favComedies: [
//     "asdfsdfadfadsf": {
//       title: "friends",
//       description: "great show",
//       likes: 10,
//       dislikes: 5,
//     },
//     {
//       title: "how i met your mother",
//       description: "friends knockoff",
//       likes: 15,
//       dislikes: 2,
//     },
//     {},
//   ],
//   favAction: "",
//   favDrama: "",
// };

// SEARCH BAR COMPONENT

// FORM WITH AN INPUT TYPE TEXT THAT ACCEPTS USERS
// ADD FONT AWESOME MAGNIFIYING GLASS AS A BUTTON
// ADD A ON FORM SUMBIT LISTENER FOR THE API CALL
// MAKE SURE THE FORM HAS CONTROLLED INPUTS
// WHEN THE SEARCH RESULTS RETURN WE SAVE INTO A USESTATE
// ERROR HANDLING - FOR NO RESULTS OR TYPO'S OR OTHER ERROR
//  API : https://api.tvmaze.com/search/shows?q=girls
// - https://api.tvmaze.com/shows/:id/images

// SEARCH RESULTS COMPONENT

// GET RESULTS FROM SEARCH BAR
// PASS DATA DOWN TO SEARCH RESULTS
// HAVE A SECTION WITHIN IT HAVE A UL AND THEN INSIDE THE UL HAVE A (.map) FUNCTION THAT WILL LOOP THROUGH THE STATE VARIABLE RECIEVED FROM SEARCH RESULTS COMPONENT AS A PROP
// THE MAP WILL RETURN THE SEARCH RESULTS COMPONENT
// SEARCH RESULTS COMPONENT SHOULD BE STYLED WITH DISPLAY GRID WITH A MAXIMUM OF 3 OR 4 COLUMNS

// SHOW CARD COMPONENT

// WHEN YOU MAP THROUGH THE RESULTS COMPONENT PASS DOWN THE PROP
// LI ELEMENT WILL BE THE OUTER MOST ELEMENT THAT HOLDS THE CARD
// HAVE A TERNERY THAT WILL SHOW THE LIKE AND DISLIKE BUTTON TO THE USER
// - A BOOLEAN WILL BE PASSED AS PROP TO SHOW OR HIDE THESE BUTTONS (LIKE OR DISLIKE)
// - IN THE LIKE AND DISKLIKE BUTTON HAVE AN ONCLICK THAT TOGGLE BETWEEN THE TWO
// - WILL UPDATE THE DATA STRUCTURE IN FIREBASE TO THE CORRECT VALUE
// PROPS WILL FEED IT AND RENDER A CARD WITH
//  - TITLE, DESCRIPTION ETC.
// WE WILL NEED AN ADD AND REMOVE BUTTON IN THE CARD (MOST LIKELY TOP RIGHT)
// IMPORT FAVOURITE LIST INTO RESULTS CARD COMPONENT USING FIREBASE
// BUILD A TRUE OR FALSE TERNERY THAT WILL PASSED AS PROP TO ONLY REMOVE A SHOW FROM THE LIST
// - WILL ALSO HAVE TO UPDATE FIREBASE WHEN SHOW IS REMOVED

//  LIST OPTIONS COMPONENT

// WILL BE A CONTAINER THAT WILL MAP THROUGH A STATE VARIABLE
// WILL GO TO FIREBASE GET THE DATA FROM FIREBASE
// THIS WILL BE A UL AND A .MAP FUNCTION
// MAP WILL RETURN LIST OPTION ITEMS COMPONENTS
// USEEFFECT WILL TAP INTO FIREBASE AND GET OUR LISTS FROM FIREBASE AT THAT POINT IN TIME (WHATEVER IS IN THE DATABASE)
// THAT LIST IS WHAT WE WILL MAP THROUGH IN THE MAP FUNCTION

// LIST OPTION ITEM COMPONENT

// PASSED A PROP THAT GIVES A LIST NAME
// THAT PROP WILL COME FROM .MAP IN THELIST OPTIONS COMPONENT ABOVE
// WITH IN THE PROP HAVE A BOOLEAN THAT WILL BE PASSED DOWN TO INDICATE IF THE SHOW HAS BEEN ADDED TO A SPECIFIC LIST OR GIVEN LIST OR NOT
// THAT TRUE OR FALSE WILL EFFECT HOW THE LIST IS STYLED

// THE WHOLE LIST ITEM COMPONENT WILL HAVE AN ONCLICK SO USER CAN ADD THE SHOW TO A LIST OR NOT
// WILL BE HANDLED IN A HANDLELCLICK FUNCITON
// HANDLECLICK FUNCTION WILL UPDATE THE DATABASE(FIREBASE) FOR EITHER ADDING OR REMOVING A SHOW FROM THE LIST

// LISTS (Container for the rows) COMPONENT

// SECTION WITH A UL
// .ON LISTENER FOR FIREBASE CALL
// LOOP THROUGH THE RESULTS FROM FIREBASE TO STRUCTURE THE OBJECT INTO OUR PREFERRED DATA STRUCTURE
//  SORT EACH LIST BASED ON THE NUMBER OF NET LIKES OR DISLIKES
// HAVE TO SAVE IT IN STATE
// - TODO USE A CONTEXT HOOK (WILL NEED TO BE SETUP AS PARENT)FOR CONVINENCE TO ACCESS OUR STATE VARIABLE TO USE FIREBASE DATABASE (WONT NEED TO PASS DOWN AS PROP)
// HAVE A .MAP WILL RENDER EACH INDIVIDUAL ROW
// TO RENDER EACH INDIVIDUAL SHOW LIST COMPONENT
// - TODO HAVE A BUTTON TO (ONSCROLL)RIGHT OR LEFT (!leave for now!)

// SHOW LIST COMPONENT (ROW OF SHOWS)

// SECTION WILL BE AN LI
// WITH IN THE LI WILL A UL THAT WILL .MAP THROUGH THE LIST OF SHOWS
// GOING TO MAP AND RENDER SHOW CARD COMPONENT
//  - IN HERE PASS A PROP WITH A VALUE OF TRUE TO DISPLAY THE LIKE AND DISLIKE BUTTON

// SHOW ITEM COMPONENT

// IMPORT THE SHOW CARD COMPONENT
// WILL HAVE TO PASS THE RIGHT PROPS INTO SHOW CARD COMPONENT
// AND WILL HAVE TO HAVE THE FUNCTIONALITY FOR LIKE AND DISLIKE BUTTON
// PROPS WILL FEED IT AND RENDER A CARD WITH
//  - TITLE, DESCRIPTION ETC.
// WE WILL NEED AN ADD AND REMOVE BUTTON IN THE CARD (MOST LIKELY TOP RIGHT)

// ADD HEADER COMPONENT

// ADD A LOGO IN THE TOP LEFT CORNER
// Button included to "create a new custom list"
// - ADD A CREATE LIST BUTTON THAT EXPANDS WHERE YOU CAN CREATE A LIST
// - UPDATE FIREBASE TO CREATE AN EMPTY LIST
// - WILL CREATE A FORM TO WRITE A NEW LIST HAVE FORM     CONTROLLED
// - WHERE USER CAN ADD OR REMOVE SHOWS
// ADD A SIMILAR LISTS POP-UP THAT WILL PROMPT THE USER THAT THERE IS ANOTHER LIST WITH A SIMILAR LIST NAME
// MAKE SEARCH BAR STICKY (POSITION FIXED) SO IT MOVES WITH THE USER AS THEY SCROLL THROUGH THE CREATED LISTS

// ADD FOOTER COMPONENT

// LINK IT TO GITHUB AND OR LINKED IN PAGES
// ADD JUNO COLLEGE AND LINK TO WEBSITE
