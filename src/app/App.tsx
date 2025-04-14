import React from "react";
import "../css/app.css";
import { Container, Stack, Box, Typography, Button } from "@mui/material";
import { RippleBadge } from "./MaterialTheme/styled";

function App() {
  return (
    <Container sx={{ background: "purple" }}>
      <Stack flexDirection={"column"}>
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component={"h4"} sx={{ color: "white" }}>
            This is material UI with React
          </Typography>
        </Box>
        <Box>
          <RippleBadge badgeContent={10}>
            <Button variant="contained">material ui</Button>
          </RippleBadge>
        </Box>
      </Stack>
    </Container>
  );
}

export default App;
