import { Container } from "@mui/material";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import React from "react";

const ProductsPage = () => {
  const products = useRouteMatch();
  return <Container>ProductsPage</Container>;
};

export default ProductsPage;
