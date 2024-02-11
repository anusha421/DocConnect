import React, { useState, useEffect } from "react";
import bg from "../../assets/bg.jpg";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.svg";
import Login from "./Login";
import Signup from "./Signup";
import Cookies from "universal-cookie";
import { Card, Container } from "@mui/material";

const cookies = new Cookies();

function Authentication() {
  const [isLogin, setIsLogin] = useState(true);
  const user = cookies.get("jwt");
  const navigate = useNavigate();

  useEffect(() => {
    if(user) {
      navigate("/posts");
    }
  }, [user, navigate])

  return (
    <Container
      style={{
        minHeight: "100vh",
        minWidth: "100vw",
        backgroundImage: `url(${bg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        style={{
          margin: "auto",
          width: "30rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0, 13, 46, .84)",
        }}
        sx={{overflowY: "auto", scrollbarWidth: "thin"}}
      >
        {isLogin ? (
          <Login setIsLogin={setIsLogin} />
        ) : (
          <Signup setIsLogin={setIsLogin} />
        )}
      </Card>
    </Container>
  );
}

export default Authentication;
