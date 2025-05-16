import { Box, Container, Stack } from "@mui/material";
import * as React from "react";
import { CssVarsProvider } from "@mui/joy/styles";
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import { CardOverflow } from "@mui/joy";
import { useHistory } from "react-router-dom";

//for redux
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrievePopularDishes } from "./selector";
import { Product } from "../../../lib/types/product";
import { serverApi } from "../../../lib/config";

const popularDishesRetriever = createSelector(
  retrievePopularDishes,
  (popularDishes) => ({ popularDishes })
);

const PopularDishes = () => {
  const { popularDishes } = useSelector(popularDishesRetriever);
  console.log("pops", popularDishes);

  const history = useHistory();

  //chosen product detail page
  const chosenProductHandler = (id: string) => {
    history.push(`/products/${id}`);
  };
  return (
    <div className="popular-frame">
      <Container>
        <Stack className="popular-section">
          <Box className="title">Popular Dishes</Box>
          <Stack className="cards-frame">
            {popularDishes.length !== 0 ? (
              popularDishes.map((product: Product) => {
                const imagePath = `${serverApi}/${product.productImages[0]}`;
                return (
                  <CssVarsProvider key={product._id}>
                    <Card
                      className="card"
                      onClick={() => chosenProductHandler(product._id)}
                    >
                      <CardCover>
                        <img src={imagePath} alt="" />
                      </CardCover>
                      <CardCover className="card-cover" />
                      <CardContent sx={{ justifyContent: "flex-end" }}>
                        <Stack
                          flexDirection={"row"}
                          justifyContent={"space-between"}
                        >
                          <Typography
                            level="h2"
                            fontSize="lg"
                            textColor="#fff"
                            mb={1}
                          >
                            {product.productName}
                          </Typography>
                          <Typography
                            sx={{
                              fontWeight: "md",
                              color: "neutral.300",
                              alignItems: "center",
                              display: "flex",
                            }}
                          >
                            {product.productView}
                            <VisibilityIcon
                              sx={{ fontSize: 25, marginLeft: "5px" }}
                            />
                          </Typography>
                        </Stack>
                      </CardContent>
                      <CardOverflow
                        sx={{
                          display: "flex",
                          gap: 1.5,
                          py: 1.5,
                          px: "var(--Card-padding)",
                          borderTop: "1px solid",
                          height: "60px",
                        }}
                      >
                        <Typography
                          startDecorator={<DescriptionOutlinedIcon />}
                          textColor="neutral.100"
                        >
                          {product.productDesc}
                        </Typography>
                      </CardOverflow>
                    </Card>
                  </CssVarsProvider>
                );
              })
            ) : (
              <Box className="no-dishes">No new dish are available yet</Box>
            )}
          </Stack>
        </Stack>
      </Container>
    </div>
  );
};

export default PopularDishes;
