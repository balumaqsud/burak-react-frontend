import React from "react";
import "../css/app.css";
import { Container, Stack, Box, Typography, Button } from "@mui/material";

function App() {
  return (
    <Container maxWidth="sm">
      <Stack flexDirection={"column"}>
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component={"h4"}>
            This is material UI with React
          </Typography>
        </Box>
        <Button variant="contained">material ui</Button>
      </Stack>
    </Container>
  );
}

export default App;
