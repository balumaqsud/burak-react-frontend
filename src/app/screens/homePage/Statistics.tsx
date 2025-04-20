import { Box, Container, Stack } from "@mui/material";
import Divider from "../../components/divider/index";
import React from "react";

const Statistics = () => {
  return (
    <div className="static-frame">
      <Container className="info">
        <Stack className="static-box">
          <Box className="static-num">12</Box>
          <Box className="static-text">Restaurants</Box>
        </Stack>
        <Divider height="64" width="2" bg="#E3C08D" />

        <Stack className="static-box">
          <Box className="static-num">8</Box>
          <Box className="static-text">Experience</Box>
        </Stack>
        <Divider height="64" width="2" bg="#E3C08D" />
        <Stack className="static-box">
          <Box className="static-num">50+</Box>
          <Box className="static-text">Menu</Box>
        </Stack>
        <Divider height="64" width="2" bg="#E3C08D" />
        <Stack className="static-box">
          <Box className="static-num">200+</Box>
          <Box className="static-text">Clients</Box>
        </Stack>
      </Container>
    </div>
  );
};

export default Statistics;
