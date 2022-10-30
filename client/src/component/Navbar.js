import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import "./Navbar.css"

import FavoriteIcon from '@mui/icons-material/Favorite';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import {Link} from "react-router-dom"
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
const drawerWidth = 240;
const navItems = ['traduction'];

function DrawerAppBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
         Shadow Knight
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;


  const [isShowingButton,setIsShowingButton] = React.useState(true)
  const [isShowingText,setIsShowingText] = React.useState(false)
  const handleEnterEvent = (e) =>{
 
    setIsShowingButton(false)
    setIsShowingText(true)
  }
  const handleLeaving = (e) =>{
    setIsShowingButton(true)
    setIsShowingText(false)
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 0.5, display: { xs: 'none', sm: 'block' } }}
          >
            <div >
            <Link
            style={{marginRight:"2%",textDecoration:"none",color:"white"}}
            to="/" >
             <FacebookIcon />
            </Link>
            <Link to="/" 
              style={{marginRight:"2%",textDecoration:"none",color:"white"}}
            >
            <TwitterIcon />
            </Link>
            <Link to="/" 
              style={{marginRight:"2%",textDecoration:"none",color:"white"}}
            >
            <YouTubeIcon />
            </Link>
            <Link to="/" style={{textDecoration:"none",color:"white"}}>
            ShadowKnight
            </Link>
            </div>
            
          
         
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          <Link to="/" style={{textDecoration:"none",color:"white"}}>
          <Button  sx={{ color: '#fff' }}>
                Translate
              </Button>
          </Link>
           
        
          </Box>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 0.5, display: { xs: 'none', sm: 'block' } }}
          >
            {isShowingButton && <>
                <Button variant="contained" style={{color:"black",backgroundColor:"yellow"}}
            onMouseEnter = {( e) => handleEnterEvent(e)}
            >
                Donate
                </Button>
            </>}

            {isShowingText && <><div class="typewriter"
            onMouseLeave={(e) => handleLeaving(e)}
            >
  <h1>You're awesome <FavoriteIcon style={{color:"red"}}/> {" "}Have a nice Day <EmojiEmotionsIcon 
  style={{color:"yellow"}}
  /></h1>
</div></>}
            
        
          </Typography>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
        
    
      </Box>
    </Box>
  );
}

DrawerAppBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default DrawerAppBar;
