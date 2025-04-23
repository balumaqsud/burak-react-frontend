import { Container } from "@mui/material";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import ChosenProduct from "./ChosenProduct";
import React from "react";
import Products from "./Products";

const ProductsPage = () => {
  const products = useRouteMatch();
  return (
    <Switch>
      <Route path={`${products.path}/:productID`}>
        <ChosenProduct />
      </Route>
      <Route path={`${products.path}`}>
        <Products />
      </Route>
    </Switch>
  );
};

export default ProductsPage;
