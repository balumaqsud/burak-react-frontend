import React, { useState } from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import HomePage from "./screens/homePage";
import UsersPage from "./screens/usersPage";
import ProductsPage from "./screens/productsPage";
import HelpPage from "./screens/helpPage";
import OrdersPage from "./screens/ordersPage";
import Footer from "./components/footer";
import HomeNavbar from "./components/headers/homeNavbar";
import "../css/app.css";
import "../css/navbar.css";
import "../css/footer.css";
import { CardItem } from "../lib/types/search";
import OtherNavbar from "./components/headers/otherNavbar";
import useBasket from "./hooks/useBasket";

function App() {
  const location = useLocation();
  const { cardItems, onAdd } = useBasket();

  return (
    <>
      {location.pathname === "/" ? (
        <HomeNavbar cardItems={cardItems} />
      ) : (
        <OtherNavbar cardItems={cardItems} />
      )}
      <Switch>
        <Route path="/orders">
          <OrdersPage />
        </Route>
        <Route path="/users">
          <UsersPage />
        </Route>
        <Route path="/products">
          <ProductsPage onAdd={onAdd} />
        </Route>
        <Route path="/help">
          <HelpPage />
        </Route>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
      <Footer />
    </>
  );
}

export default App;
