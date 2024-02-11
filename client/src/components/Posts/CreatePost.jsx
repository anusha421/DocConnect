import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../App.css";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  Box,
  Container,
  Grid,
  TextField,
  Typography,
  Modal,
  Backdrop,
  Button,
  Input,
  Dialog,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import Navbar from "../Navbar";
import Cookies from "universal-cookie";
import axios from "axios";

const cookies = new Cookies();

const EditProfile = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const createUrl = "http://localhost:3000/posts/create";
  const [data, setData] = useState({
    user: cookies.get("username"),
    content: "",
    imageUrl: "",
    likes: [],
  });

  const handleClose = () => {
    setOpen(false);
    navigate(-1);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };

  const uploadImage = async () => {
    try {
      // Fetching the image as a Blob
      const file = data.imageUrl;
      console.log(file)
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "a0sdlzbk");

      const uploadResponse = await fetch(
        `https://api.cloudinary.com/v1_1/dt2pgp0mb/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const img = await uploadResponse.json();
      setData({ ...data, imageUrl: img.secure_url });
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (data.content == "" || data.imageUrl == "") {
      setOpenDialog(true);
      return;
    }

    await uploadImage();

    axios
      .post(createUrl, data)
      .then((response) => {
        console.log(response);
        navigate(-1);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Container
      padding={3}
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Navbar />
      <Modal
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        open={open}
        onClose={handleClose}
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Box
          component="form"
          noValidate
          onSubmit={submitHandler}
          style={{
            borderColor: "white",
            backgroundColor: "rgba(0, 13, 46, .84)",
            zIndex: "1300",
            padding: "1rem",
          }}
          sx={{
            width: { lg: "25vw", sm: "50vw" },
          }}
        >
          <Typography
            variant="h4"
            color="white"
            style={{
              textAlign: "center",
              padding: "1rem 2rem",
            }}
          >
            Create Post
          </Typography>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TextField
                placeholder="Caption"
                fullWidth
                required
                name="content"
                id="content"
                value={data.content}
                onChange={handleChange}
                autoFocus
                sx={{
                  input: { color: "white" },
                  border: "1px solid#fff",
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Input
                fullWidth
                sx={{
                  input: { color: "white" },
                  border: "1px solid#fff",
                  padding: "0.5rem",
                }}
                name="imageUrl"
                id="image"
                type="file"
                value={data.imageUrl}
                onChange={handleChange}
                inputProps={{ accept: "image/*" }}
                required
                autoFocus
              />
              {/* <label htmlFor="image">
                <Button
                  fullWidth
                  component="span"
                  startIcon={<CloudUploadIcon />}
                  sx={{
                    input: { color: "white" },
                    border: "1px solid#fff",
                  }}
                >
                  Upload Photo
                </Button>
              </label> */}
            </Grid>
          </Grid>

          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Create Post
          </Button>
          <Dialog
            open={openDialog}
            onClose={handleCloseDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              Please enter all details.
            </DialogTitle>
            <DialogActions>
              <Button onClick={handleCloseDialog}>OK</Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Modal>
    </Container>
  );
};

export default EditProfile;
