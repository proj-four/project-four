import { useEffect, useState } from 'react';
import axios from 'axios';


function App() {

  useEffect(() => {
    axios({
      url: ' https://api.tvmaze.com/shows/139/images',
      method: 'GET',
      dataResponse: 'json',
      params: {
        api_key: 'Y6sBDEBiE9eU7nhyUf5NOycV9IzoiwYQ',
        q: 'girls'
      }
    }).then((res) => {
      console.log(res);
    })
  })

  return  (
  <div>
    <h1>HELLO</h1>
  </div>

  )
}

export default App;
