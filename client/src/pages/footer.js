import React from "react";


import FavoriteIcon from '@mui/icons-material/Favorite';
import CopyrightIcon from '@mui/icons-material/Copyright';
const Footer = (props) =>{
  const {version} = props
    return (
        <>
         <div 
         style={{display:"flex",justifyContent:"space-between"}}
     
      >
        <div   >Made By <FavoriteIcon style={{color:"red"}} /></div>
    
        <div><CopyrightIcon /> {new Date().getFullYear()} ShadowKnight{" "} {version}</div>
      </div>
        </>
    )
}

export default Footer