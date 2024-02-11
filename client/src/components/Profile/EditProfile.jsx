import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
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
} from "@mui/material";
import Navbar from "../Navbar";

const EditProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state?.userData;
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
    navigate(-1);
  };

  function submitHandler(e) {
    e.preventDefault();
  }

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
            Edit Profile
          </Typography>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
              <TextField
                placeholder="Name"
                name="Name"
                required
                fullWidth
                id="Name"
                autoFocus
                sx={{
                  input: { color: "white" },
                  border: "1px solid#fff",
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="username"
                placeholder="Username"
                name="username"
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
                id="bio"
                placeholder="Bio"
                name="bio"
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
                  padding: "0.5rem"
                }}
                name="image"
                type="file"
                inputProps={{ accept: "image/*" }}
                required
                id="image"
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

          <Button fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Edit Profile
          </Button>
        </Box>
      </Modal>
    </Container>
  );
};

export default EditProfile;
