import { useEffect, useState } from "react";
import firebase from "../firebase";
import ShowsDataContext from "../contexts/ShowsDataContext";
import SavedShowsContext from "../contexts/SavedShowsContext";
import Footer from "./Footer";
import OuterWrapper from "./OuterWrapper.styled";
import Header from "./Header";
import SearchResults from "./SearchResults";
import ShowList from "./ShowList";
import Loading from "./Loading";

function App() {
  // Saves user's search results
  const [showsData, setShowsData] = useState([]);

  // Saves data retrieved from firebase
  const [savedShows, setSavedShows] = useState([]);

  // Tracks when firebase data begins to get pulled
  const [isFirebaseLoaded, setIsFirebaseLoaded] = useState(false);

  useEffect(() => {
    setIsFirebaseLoaded(false);

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
      setIsFirebaseLoaded(true);
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
            {/* Connect this to the loading component */}
            {!isFirebaseLoaded && <Loading />}
            <Header />

            <main>
              <SearchResults />
              <ShowList />
            </main>

            <Footer />
          </OuterWrapper>
        </ShowsDataContext.Provider>
      </SavedShowsContext.Provider>
    </div>
  );
}

export default App;
