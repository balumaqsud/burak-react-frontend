import React, { useEffect, useState } from "react";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Badge from "@mui/material/Badge";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Input from "@mui/joy/Input";
import { CssVarsProvider } from "@mui/joy";
import { setProducts } from "./slice";
import { Dispatch } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import ProductService from "../../services/ProductService";
import { serverApi } from "../../../lib/config";
import { retrieveProducts } from "./selector";
import { Product, ProductInquiry } from "../../../lib/types/product";
import { createSelector } from "reselect";
import { ProductCollection } from "../../../lib/data/enums/product.enum";

//REDUX SLICE
const actionDispatch = (dispatch: Dispatch) => ({
  setProducts: (data: Product[]) => dispatch(setProducts(data)),
});
//selector
const productsRetriever = createSelector(retrieveProducts, (products) => ({
  products,
}));

const Products = () => {
  const { setProducts } = actionDispatch(useDispatch());
  const { products } = useSelector(productsRetriever);
  const [productSearch, setProductSearch] = useState({
    page: 1,
    limit: 8,
    order: "createdAt",
    productCollection: ProductCollection.DISH,
    search: "",
  });

  useEffect(() => {
    const products = new ProductService();
    products
      .getProducts(productSearch)
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => console.log(err));
  }, [productSearch]);

  //handlers
  const productSortHandler = (collection: ProductCollection) => {
    productSearch.page = 1;
    productSearch.productCollection = collection;
    setProductSearch({ ...productSearch });
  };

  return (
    <div className="products">
      <Container>
        <Stack flexDirection={"column"} alignItems={"center"}>
          <Stack className="avatar-box">
            <Typography className="title">Burak Restaurant</Typography>
            <div className="search">
              <CssVarsProvider>
                <Input placeholder="Search product" />
              </CssVarsProvider>
              <Button variant="contained" color={"primary"}>
                <SearchIcon />
                Search
              </Button>
            </div>
          </Stack>
          <Stack className="dishes-filter-section">
            <Stack className="dishes-filter-box">
              <Button variant="contained" color="primary" className="order">
                New
              </Button>
              <Button variant="contained" color="secondary" className="order">
                Price
              </Button>
              <Button variant="contained" color="secondary" className="order">
                Views
              </Button>
            </Stack>
          </Stack>
          <Stack className="list-category-section">
            <Stack className="product-category">
              <div className="category-main">
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    productSortHandler(ProductCollection.OTHER);
                  }}
                >
                  Other
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    productSortHandler(ProductCollection.DESSERT);
                  }}
                >
                  Dessert
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    productSortHandler(ProductCollection.DRINK);
                  }}
                >
                  Drink
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    productSortHandler(ProductCollection.SALAD);
                  }}
                >
                  Salad
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    productSortHandler(ProductCollection.DISH);
                  }}
                >
                  Dish
                </Button>
              </div>
            </Stack>
            <Stack className="products-wrapper">
              {products.length !== 0 ? (
                products.map((product: Product) => {
                  const imagePath = `${serverApi}/${product.productImages[0]}`;
                  const productSize =
                    product.productCollection === "DRINK"
                      ? product.productVolume + " L"
                      : product.productSize + " SIZE";
                  return (
                    <Stack key={product._id} className="product-card">
                      <Stack
                        className="product-img"
                        sx={{ backgroundImage: `url(${imagePath})` }}
                      >
                        <div className="product-sale">{productSize}</div>
                        <Button className="shop-btn">
                          <img
                            src="/icons/shopping-cart.svg"
                            style={{ display: "flex" }}
                            alt="Cart"
                          />
                        </Button>
                        <Button className="view-btn" sx={{ right: "36px" }}>
                          <Badge
                            badgeContent={product.productView}
                            color="secondary"
                          >
                            <RemoveRedEyeIcon
                              sx={{
                                color:
                                  product.productView === 0 ? "gray" : "white",
                              }}
                            />
                          </Badge>
                        </Button>
                      </Stack>

                      <Box className="product-desc">
                        <span className="product-title">
                          {product.productName}
                        </span>
                        <div className="product-desc">
                          <MonetizationOnIcon />
                          {product.productPrice}
                        </div>
                      </Box>
                    </Stack>
                  );
                })
              ) : (
                <Box className="no-data">No products available yet</Box>
              )}
            </Stack>
          </Stack>
          <Stack className="pagination-section">
            <Pagination
              count={3}
              page={1}
              renderItem={(item) => (
                <PaginationItem
                  components={{
                    previous: ArrowBackIcon,
                    next: ArrowForwardIcon,
                  }}
                  {...item}
                  color={"secondary"}
                />
              )}
            />
          </Stack>
        </Stack>
      </Container>
      <div className="brands-logo">
        <Container className={"brands"}>
          <Box className={"category-title"}>Our family brands</Box>
          <Stack className={"brand-list"}>
            <Box className={"review-box"}>
              <img src={"/img/gurme.webp"} alt="" />
            </Box>
            <Box className={"review-box"}>
              <img src={"/img/sweets.webp"} alt="" />
            </Box>
            <Box className={"review-box"}>
              <img src={"/img/seafood.webp"} alt="" />
            </Box>
            <Box className={"review-box"}>
              <img src={"/img/doner.webp"} alt="" />
            </Box>
          </Stack>
        </Container>
      </div>
      <div className="address">
        <Container>
          <Stack className={"address-area"}>
            <Box className={"title"}>Our address</Box>
            <iframe
              title="unique"
              style={{ marginTop: "60px" }}
              src="https://www.google.com/maps/embed?pb=!1m24!1m12!1m3!1d52439.55492114084!2d127.66387910076521!3d34.76888656098249!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m9!3e6!4m3!3m2!1d34.7685234!2d127.70557059999999!4m3!3m2!1d34.769263599999995!2d127.7045868!5e0!3m2!1sen!2skr!4v1745401733570!5m2!1sen!2skr"
              width="1320"
              height="500"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </Stack>
        </Container>
      </div>
    </div>
  );
};

export default Products;
