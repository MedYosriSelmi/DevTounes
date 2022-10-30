import React from 'react';
import './App.css';
import Uploader from "./component/Uploader"


import {
  BrowserRouter as Router,
  Route, Routes 
  
} from "react-router-dom";
function App() {
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
