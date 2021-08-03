import { useState } from "react";
import firebase from "../firebase";

const CreateList = () => {
  const [listName, setListName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a reference to the firebase db
    const dbRef = firebase.database().ref();

    // Create a reference to the specific list created by the user
    const listRef = dbRef.child(listName);

    listRef.on("value", (response) => {
      // Check if the list being created by the user already exists or not before creating a new one
      const exists = response.val();

      if (!exists && exists !== false) {
        listRef.set(false);
      } else {
        console.log("This list already exists");
      }
    });

    setListName("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter list name..."
          value={listName}
          onChange={(e) => setListName(e.target.value)}
        />
        <button type="submit" onClick={handleSubmit}>
          Create list
        </button>
      </form>
    </div>
  );
};

export default CreateList;
