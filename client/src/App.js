import React,{useEffect} from 'react';
import './App.css';
import Uploader from "./component/Uploader"
import ReactGA from "react-ga4";

import {
  BrowserRouter as Router,
  Route, Routes 
  
} from "react-router-dom";
function App() {
  useEffect(()=>{
    ReactGA.initialize("G-87Z37BJ7TL");
    ReactGA.send({ hitType: "pageview", page: window.location.pathname });
  })

  return (
    <div className="App">
    <Routes>


 
 
 <Route path="/" element={ <Uploader />

} />
 


</Routes>

</div>
  );
}

export default App;
