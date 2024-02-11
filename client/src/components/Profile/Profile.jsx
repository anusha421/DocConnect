import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../Navbar";
import {
  Typography,
  Avatar,
  Container,
  Stack,
  Divider,
  Chip,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import posts from "../../data";
import Cookies from "universal-cookie";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PostDetails from "../Posts/PostDetails";
import { deepPurple } from "@mui/material/colors";

const cookies = new Cookies();

function Profile() {
  const { username } = useParams();
  const loggedInUser = cookies.get("username");
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState([]);
  const [items, setItems] = useState([]);
  const postsURL = `http://localhost:3000/posts/${username}`;
  const userURL = `http://localhost:3000/users/${username}`;
  const deleteURL = `http://localhost:3000/users/delete/${username}`;

  useEffect(() => {
    axios
      .get(userURL)
      .then((response) => {
        setUser(response.data[0]);
        console.log(user.length);
      })
      .catch((error) => console.log(error));

    axios
      .get(postsURL)
      .then((response) => {
        setItems(response.data);
        // setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        // setLoading(false);
      });
  }, []);

  function handleClose() {
    setOpen(false);
  }

  function handleDelete() {
    console.log(data._id);
    axios
      .delete(deleteURL)
      .then((response) => {
        window.location.reload();
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });

    // navigate(-1);
  }

  return (
    <>
      <Navbar />

      {user.length == 0 ? (
        <Typography
          variant="h4"
          style={{
            marginTop: "10rem",
            marginBottom: "1rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          No such user.
        </Typography>
      ) : (
        <>
          <Container
            maxWidth="lg"
            style={{
              marginTop: "5rem",
              marginBottom: "1rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Avatar
              sx={{
                bgcolor: deepPurple[500],
                m: "2rem",
                width: 100,
                height: 100,
                fontSize: "xx-large",
              }}
            >
              {user.username[0].toUpperCase()}
            </Avatar>

            <Stack>
              <Typography
                variant="h4"
                style={{
                  marginBottom: "1rem",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontFamily: "cursive",
                }}
              >
                {user.username}
              </Typography>

              {user.username == loggedInUser && (
                <Container style={{ margin: 0, padding: 0 }}>
                  <Link to={`../profile/${user.username}`}>
                    {/* state={{ userData: data }} */}
                    <EditIcon color="primary" />
                  </Link>
                  <Link
                    onClick={() => {
                      setOpen(true);
                    }}
                  >
                    <DeleteIcon color="primary" />
                  </Link>
                </Container>
              )}
              <Typography color="initial">{user.name}</Typography>
              <Typography color="initial">{user?.bio}</Typography>
            </Stack>
          </Container>
          <Divider
            sx={{ margin: "0 9rem" }}
            variant="middle"
            aria-hidden="true"
          >
            <Chip label="POSTS" size="small" />
          </Divider>

          <Grid
            container
            spacing={3}
            sx={{ p: "1.5rem" }}
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {items.map((post, index) => (
              <PostDetails key={index} data={post} />
            ))}
          </Grid>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Delete post?"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure you want to delete your profile?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} autoFocus>
                No
              </Button>
              <Button onClick={handleDelete}>Yes</Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </>
  );
}

export default Profile;
