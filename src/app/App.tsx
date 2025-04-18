import React from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import HomePage from "./screens/homePage";
import UsersPage from "./screens/usersPage";
import ProductsPage from "./screens/productsPage";
import HelpPage from "./screens/helpPage";
import OrdersPage from "./screens/ordersPage";
import Footer from "./components/footer";
import { OtherNavbar } from "./components/headers/otherNavbar";
import { HomeNavbar } from "./components/headers/homeNavbar";
import "../css/app.css";
import "../css/navbar.css";

function App() {
  const location = useLocation();
  return (
    <>
      {location.pathname === "/" ? <HomeNavbar /> : <OtherNavbar />}
      <Switch>
        <Route path="/orders">
          <OrdersPage />
        </Route>
        <Route path="/users">
          <UsersPage />
        </Route>
        <Route path="/products">
          <ProductsPage />
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
