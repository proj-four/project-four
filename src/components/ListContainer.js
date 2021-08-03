import { useContext } from "react";
import SavedShowsContext from "../contexts/SavedShowsContext";

const ListContainer = (props) => {
  const [savedShows, setSavedShows] = useContext(SavedShowsContext);

  return (
    <section>
      <ul>{savedShows.map((list) => {})}</ul>
    </section>
  );
};

export default ListContainer;
