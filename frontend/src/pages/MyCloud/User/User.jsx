import React from 'react';

const SimpleMenu = () => {
  const Exit = () => {
    window.location.href = "/Welcome";
  }

  return (
    <div>
      <button 
        aria-controls="simple-menu" 
        aria-haspopup="true" 
        style={{
            position: "absolute",
            right: 50,
            top: 7,
            padding: "10px 0 10px 0",
            borderRadius: "100px"
        }}
        >
        {/* <AccountCircle
          style={{
            fontSize: "40px",
            color: "#1070FF"
          }}
        /> */}
      </button>
      <nav
        id="simple-menu"
        keepMounted
      >
        {/*<MenuItem onClick={handleClose}>Profile</MenuItem>*/}
        {/*<MenuItem onClick={handleClose}>My account</MenuItem>*/}
        {/* <MenuItem onClick={{handleClose, Exit}}><a href="/">Sair</a></MenuItem> */}
      </nav>
    </div>
  );
}

export default SimpleMenu