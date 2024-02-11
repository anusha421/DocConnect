import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.svg";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import Cookies from "universal-cookie";
import axios from "axios";
const apiURL = "http://localhost:3000/auth/signin";

const cookies = new Cookies();

function Login({ setIsLogin }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("Please enter correct credentials.");

  const handleClose = () => {
    setOpen(false);
  };

  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const submitHandler = async (event) => {
    event.preventDefault();

    if (userData.username == "" || userData.password == "") {
      setOpen(true);
      return;
    }

    let res;

    try {
      res = await axios.post(apiURL, userData);
      navigate("./posts");
    } catch (error) {
      // console.log(error)
      setMessage(error.response.data.message);
      setOpen(true);
      return;
    }

    cookies.set("jwt", res.data.token);
    cookies.set("username", res.data.userObj.username);
    // cookies.set("stream", stream);
  };

  function handleChange(event) {
    const { name, value } = event.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  }

  return (
    <>
      <img src={logo} alt="logo" width="80%" />
      <Typography variant="h4" color="white">
        Login
      </Typography>
      <Box sx={{ p: 3 }} component="form" noValidate onSubmit={submitHandler}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="username"
              placeholder="Username"
              name="username"
              value={userData.username}
              onChange={handleChange}
              sx={{
                input: { color: "white" },
                border: "1px solid#fff",
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="password"
              placeholder="Password"
              name="password"
              type="password"
              value={userData.password}
              onChange={handleChange}
              sx={{
                input: { color: "white" },
                border: "1px solid#fff",
              }}
            />
          </Grid>
        </Grid>

        {/* <Link to="./posts"> */}
        <Button
          fullWidth
          type="submit"
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Log In
        </Button>
        {/* </Link> */}

        <Grid container justifyContent="flex-end">
          <Grid item sx={{ color: "white" }}>
            Not yet registered?{" "}
            <Link
              onClick={() => {
                setIsLogin(false);
              }}
            >
              Sign Up
            </Link>{" "}
            to continue.
          </Grid>
        </Grid>
      </Box>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Please Try Again"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>OK</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Login;
