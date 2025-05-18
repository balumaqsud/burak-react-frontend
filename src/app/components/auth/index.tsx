import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Fab, Stack, TextField } from "@mui/material";
import styled from "styled-components";
import LoginIcon from "@mui/icons-material/Login";
import { T } from "../../../lib/types/common";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 2, 2),
  },
}));

const ModalImg = styled.img`
  width: 62%;
  height: 100%;
  border-radius: 10px;
  background: #000;
  margin-top: 9px;
  margin-left: 10px;
`;

interface AuthenticationModalProps {
  signupOpen: boolean;
  loginOpen: boolean;
  handleSignupClose: () => void;
  handleLoginClose: () => void;
}

export default function AuthenticationModal(props: AuthenticationModalProps) {
  const { signupOpen, loginOpen, handleSignupClose, handleLoginClose } = props;
  const classes = useStyles();
  const [memberNick, setMemberNick] = useState<string>("");
  const [memberPhone, setMemberPhone] = useState<string>("");
  const [memberPassword, setMemberPassword] = useState<string>("");

  /** HANDLERS **/
  const usernameHandler = (e: T) => {
    setMemberNick(e.target.value);
  };
  const phoneNumberHandler = (e: T) => {
    setMemberPhone(e.target.value);
  };
  const passwordHandler = (e: T) => {
    setMemberPassword(e.target.value);
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={signupOpen}
        onClose={handleSignupClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={signupOpen}>
          <Stack
            className={classes.paper}
            direction={"row"}
            sx={{ width: "400px" }}
          >
            <Stack sx={{ width: "100%", alignItems: "center" }}>
              <h1>Signup Form</h1>

              <TextField
                sx={{ width: "100%", marginTop: "7px" }}
                id="outlined-basic"
                label="username"
                variant="outlined"
                onChange={usernameHandler}
              />
              <TextField
                sx={{ width: "100%", my: "17px" }}
                id="outlined-basic"
                label="phone number"
                variant="outlined"
                onChange={phoneNumberHandler}
              />
              <TextField
                id="outlined-basic"
                label="password"
                variant="outlined"
                sx={{ width: "100%" }}
                onChange={passwordHandler}
              />
              <Fab
                sx={{ marginTop: "30px", width: "100%", marginBottom: "20px" }}
                variant="extended"
                color="primary"
              >
                <LoginIcon sx={{ mr: 1 }} />
                Signup
              </Fab>
            </Stack>
          </Stack>
        </Fade>
      </Modal>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={loginOpen}
        onClose={handleLoginClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={loginOpen}>
          <Stack
            className={classes.paper}
            direction={"row"}
            sx={{ width: "400px" }}
          >
            <Stack
              sx={{
                marginTop: "25px",
                alignItems: "center",
                width: "100%",
              }}
            >
              <h1>Login Form</h1>
              <TextField
                id="outlined-basic"
                label="username"
                variant="outlined"
                sx={{ my: "10px", width: "100%" }}
              />
              <TextField
                id={"outlined-basic"}
                label={"password"}
                variant={"outlined"}
                type={"password"}
                sx={{ width: "100%" }}
              />
              <Fab
                sx={{ marginTop: "27px", width: "100%", marginBottom: "20px" }}
                variant={"extended"}
                color={"primary"}
              >
                <LoginIcon sx={{ mr: 1 }} />
                Login
              </Fab>
            </Stack>
          </Stack>
        </Fade>
      </Modal>
    </div>
  );
}
