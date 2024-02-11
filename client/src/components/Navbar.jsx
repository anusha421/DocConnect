import React, { useEffect } from "react";
import { AppBar, Toolbar, IconButton } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import AddIcon from "@mui/icons-material/Add";
import LogoutIcon from "@mui/icons-material/Logout";
import Cookies from "universal-cookie";

const cookies = new Cookies();

function Navbar() {
  const navigate = useNavigate();
  const user = cookies.get("jwt");
  const username = cookies.get("username");

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  function handleLogout() {
    try {      
      cookies.remove("jwt");
      // window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <AppBar
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
      color=""
    >
      <Link to="/posts">
        <img className="img" src={logo} alt="logo" />
      </Link>
      <Toolbar>
        <Link to="/posts/create">
          <IconButton aria-label="account-circle">
            <AddIcon color="primary" />
          </IconButton>
        </Link>
        <Link to={`/${username}`}>
          <IconButton aria-label="account-circle">
            <AccountCircle color="primary" />
          </IconButton>
        </Link>
        {/* <Link to="/chat">
          <IconButton aria-label="chat-icon">
            <ChatBubbleIcon color="primary" />
          </IconButton>
        </Link> */}
        <Link onClick={handleLogout}>
          <IconButton aria-label="logout-icon">
            <LogoutIcon color="primary" />
          </IconButton>
        </Link>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
