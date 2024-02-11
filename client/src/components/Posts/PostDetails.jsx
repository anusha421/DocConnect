import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Typography,
  Container,
  Grid,
  Paper,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import Cookies from "universal-cookie";
import axios from "axios";

const cookies = new Cookies();

function PostDetails({ data }) {
  const [open, setOpen] = React.useState(false);
  const [likes, setLikes] = useState(data.likes.length);
  const username = cookies.get("username");
  const navigate = useNavigate();
  const deleteURL = `http://localhost:3000/posts/${data._id}/delete`;
  const likeURL = `http://localhost:3000/posts/${data._id}/likePost`;
  // console.log(data.likes);

  function handleClickOpen() {
    setOpen(true);
  }

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

  function handleLikeClick() {
    axios.patch(likeURL, { "username": username }).catch((error) => {
      console.log(error);
      return;
    });

    setLikes(likes + 1);
  }

  return (
    <Grid item xs={12} md={6} lg={4}>
      <Paper
        style={{
          height: "30rem",
          padding: "1rem",
          display: "flex",
          flexDirection: "column",
          overflow: "none",
        }}
      >
        <Box style={{ display: "flex", justifyContent: "space-between" }}>
          <Link to={`../${data.user}`}>
            <Typography color="initial" variant="h6" fontFamily="cursive">
              {data.user}
            </Typography>
          </Link>

          <div>
            {username == data.user && (
              <>
                <Link
                  to={`../posts/edit/${data._id.$oid}`}
                  state={{ postData: data }}
                  style={{ paddingRight: "0.5rem" }}
                >
                  <EditIcon color="primary" />
                </Link>
                <Link onClick={handleClickOpen}>
                  <DeleteIcon color="primary" />
                </Link>
              </>
            )}
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Delete post?"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Are you sure you want to delete this post?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} autoFocus>
                  No
                </Button>
                <Button onClick={handleDelete}>Yes</Button>
              </DialogActions>
            </Dialog>
          </div>
        </Box>

        <Link to={`../posts/open/${data._id}`} state={{ postData: data }}>
          <Container
            sx={{
              display: "flex",
              justifyContent: "center",
              padding: 0,
              pt: "0.5rem",
            }}
          >
            <img
              className="eachPost"
              style={{ objectFit: "contain" }}
              src={data.image}
              alt="post"
            />
          </Container>
        </Link>
        <Container style={{ display: "flex", margin: 0, padding: 0 }}>
          <FavoriteIcon
            onClick={handleLikeClick}
            color="primary"
            sx={{ pt: "0.2rem", pr: "0.5rem" }}
          />
          <Typography variant="h6" color="initial">
            {likes}
          </Typography>
        </Container>
        <Typography sx={{ fontSize: "medium" }} color="initial">
          {data.content}
        </Typography>
      </Paper>
    </Grid>
  );
}

export default PostDetails;
