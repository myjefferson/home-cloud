import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AccountCircle from '@material-ui/icons/AccountCircle';

export default function SimpleMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const Exit = () => {
    window.location.href = "/Welcome";
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button 
        aria-controls="simple-menu" 
        aria-haspopup="true" 
        onClick={handleClick}
        style={{
            position: "absolute",
            right: 50,
            top: 7,
            padding: "10px 0 10px 0",
            borderRadius: "100px"
        }}
        >
        <AccountCircle
          style={{
            fontSize: "40px",
            color: "#1070FF"
          }}
        />
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {/*<MenuItem onClick={handleClose}>Profile</MenuItem>*/}
        {/*<MenuItem onClick={handleClose}>My account</MenuItem>*/}
        <MenuItem onClick={handleClose, Exit}>Sair</MenuItem>
      </Menu>
    </div>
  );
}