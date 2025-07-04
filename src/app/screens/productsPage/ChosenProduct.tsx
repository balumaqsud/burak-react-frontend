import React, { useEffect } from "react";
import { Container, Stack, Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Divider from "../../components/divider";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper";
import { setChosenProduct, setRestaurant } from "./slice";
import { Product } from "../../../lib/types/product";
import { Dispatch } from "@reduxjs/toolkit";
import { retrieveChosenProduct, retrieveRestaurant } from "./selector";
import { createSelector } from "reselect";
import { useDispatch, useSelector } from "react-redux";
import ProductService from "../../services/ProductService";
import MemberService from "../../services/MemberService";
import { useParams } from "react-router-dom";
import { Member } from "../../../lib/types/member";
import { serverApi } from "../../../lib/config";
import { CardItem } from "../../../lib/types/search";

//REDUX SLICE define
const actionDispatch = (dispatch: Dispatch) => ({
  setRestaurant: (data: Member) => dispatch(setRestaurant(data)),
  setChosenProduct: (data: Product) => dispatch(setChosenProduct(data)),
});
//selector define
const restaurantRetriever = createSelector(
  retrieveRestaurant,
  (restaurant) => ({
    restaurant,
  })
);
const chosenProductRetriever = createSelector(
  retrieveChosenProduct,
  (chosenProduct) => ({
    chosenProduct,
  })
);

interface ChosenProductProps {
  onAdd: (item: CardItem) => void;
}

export default function ChosenProduct(props: ChosenProductProps) {
  const { onAdd } = props;
  const { productId } = useParams<{ productId: string }>();
  console.log("here", productId);
  //slice call, sets the redux data
  const { setRestaurant, setChosenProduct } = actionDispatch(useDispatch());

  // setting data for redux
  useEffect(() => {
    const product = new ProductService();
    const member = new MemberService();

    product
      .getProduct(productId)
      .then((data) => {
        setChosenProduct(data);
      })
      .catch((err) => console.log(err));
    member
      .getRestaurant()
      .then((data) => {
        setRestaurant(data);
      })
      .catch((err) => console.log(err));
  }, []);

  //selector call, gets the redux data
  const { restaurant } = useSelector(restaurantRetriever);
  const { chosenProduct } = useSelector(chosenProductRetriever);
  console.log(restaurant);

  if (!chosenProduct) return null;

  return (
    <div className={"chosen-product"}>
      <Box className={"title"}>Product Detail</Box>
      <Container className={"product-container"}>
        <Stack className={"chosen-product-slider"}>
          <Swiper
            loop={true}
            spaceBetween={10}
            navigation={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="swiper-area"
          >
            {chosenProduct?.productImages.map((ele: string, index: number) => {
              return (
                <SwiperSlide key={index}>
                  <img
                    className="slider-image"
                    src={`${serverApi}/${ele}`}
                    alt=""
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Stack>
        <Stack className={"chosen-product-info"}>
          <Box className={"info-box"}>
            <strong className={"product-name"}>
              {chosenProduct?.productName}
            </strong>
            <span className={"restaurant-name"}>
              {restaurant?.memberNick}: {restaurant?.memberPhone}
            </span>
            <Box className={"rating-box"}>
              <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
              <div className={"evaluation-box"}>
                <div className={"product-view"}>
                  <RemoveRedEyeIcon sx={{ mr: "10px" }} />
                  <span>{chosenProduct?.productView}</span>
                </div>
              </div>
            </Box>
            <p className={"product-desc"}>{chosenProduct?.productDesc}</p>
            <Divider height="1" width="100%" bg="#000000" />
            <div className={"product-price"}>
              <span>Price:</span>
              <span>${chosenProduct?.productPrice}</span>
            </div>
            <div className={"button-box"}>
              <Button
                variant="contained"
                onClick={(e) => {
                  onAdd({
                    _id: chosenProduct._id,
                    quantity: 1,
                    name: chosenProduct.productName,
                    price: chosenProduct.productPrice,
                    image: chosenProduct.productImages[0],
                  });
                  e.stopPropagation();
                }}
              >
                Add To Basket
              </Button>
            </div>
          </Box>
        </Stack>
      </Container>
    </div>
  );
}
