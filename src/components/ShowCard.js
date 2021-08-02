import { useState } from "react";
import noImageFound from './assets/noImageFound.jpg';
import { black, cyan2, grey, white } from "../variables/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";



const ShowCard = () => {

  const [ isActive, setActive ] = useState("false");

  // const handleAdd = () => {
  //   setActive(!isActive);
  //   console.log('hello');
  // }
  

  return (
    <div>
      <ul>
        {
          searchedShow.map((searchedShowObj) => {

            const regex = /(<([^>]+)>)/ig;
            const { id, image, language, name, summary } = searchedShowObj.show;
            const score = Math.floor(searchedShowObj.score * 100);

            // const summaryFormat = () => {
          //   let result;
          //   if (summary === null) {
          //     result = 'N/A';
          //   } else {
          //     summary.replace(regex, '')
          //     result = summary.substring(0, 50);
          //   }
          //   return result;
          // };

              return (
              <li key={id} className="card">
                {image ? <img src={image.medium} alt={`Poster of ${name}`}/> : <img src={noImageFound} alt="No image found" /> }
                <button className={ isActive ? "add" : "remove"}>
                {/* <button onClick={handleAdd}> */}
                {/* {/* <button onClick={handleAdd} className="add">+</button> */}
                {/* <button onClick={handleAdd} className="remove">-</button> */} 
                  <span></span>
                  <span></span>
                </button>
                <button>up</button>
                <button>down</button>
                <p>{name}</p> 
                <p>{score}%</p>
                <p>{language}</p> 
                <button onClick={handleLoad}>Load More</button>
                { summary ? <p>{summary.replace(regex, '')}</p> : <p>N/A</p>}
                {/* <p>{summaryFormat}</p> */}
              </li> 
            )
          })
        }
      </ul>
    </div>
  )
}

export default ShowCard;

const Icon = styled(FontAwesomeIcon)``;

