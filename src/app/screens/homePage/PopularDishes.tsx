import { Box, Container, Stack } from "@mui/material";
import * as React from "react";
import { CssVarsProvider } from "@mui/material";
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";

const list = [
  { productName: "Lavash", imagePath: "/img/lavash.webp" },
  { productName: "Cutlet", imagePath: "/img/cutlet.webp" },
  { productName: "Kebab", imagePath: "/img/kebab.webp" },
  { productName: "Kebab", imagePath: "/img/kebab-fresh.webp" },
];

const PopularDishes = () => {
  return (
    <div className="popular-frame">
      <Container>
        <Stack className="popular-section">
          <Box className="title">Popular Dishes</Box>
          <Stack className="cards-frame">
            <CssVarsProvider>
              <Card sx={{ minHeight: "280px", width: 320 }}>
                <CardCover>
                  <img
                    src="https://images.unsplash.com/photo-1542773998-9325f0a098d7?auto=format&fit=crop&w=320"
                    srcSet="https://images.unsplash.com/photo-1542773998-9325f0a098d7?auto=format&fit=crop&w=320&dpr=2 2x"
                    loading="lazy"
                    alt=""
                  />
                </CardCover>
                <CardCover
                  sx={{
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)",
                  }}
                />
                <CardContent sx={{ justifyContent: "flex-end" }}>
                  <Typography level="title-lg" textColor="#fff">
                    Yosemite National Park
                  </Typography>
                  <Typography
                    startDecorator={<LocationOnRoundedIcon />}
                    textColor="neutral.300"
                  >
                    California, USA
                  </Typography>
                </CardContent>
              </Card>
            </CssVarsProvider>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
};

export default PopularDishes;
