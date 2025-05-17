import React, { useState } from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import HomePage from "./screens/homePage";
import UsersPage from "./screens/usersPage";
import ProductsPage from "./screens/productsPage";
import HelpPage from "./screens/helpPage";
import OrdersPage from "./screens/ordersPage";
import Footer from "./components/footer";
import OtherNavbar from "./components/headers/otherNavbar";
import HomeNavbar from "./components/headers/homeNavbar";
import "../css/app.css";
import "../css/navbar.css";
import "../css/footer.css";
import { CardItem } from "../lib/types/search";

function App() {
  const location = useLocation();
  const cardJson: string | null = localStorage.getItem("cardData");
  const currentCard = cardJson ? JSON.parse(cardJson) : [];
  const [cardItems, setCardItems] = useState<CardItem[]>(currentCard);

  //handlers
  const onAdd = (input: CardItem) => {
    const exist = cardItems.find((item: CardItem) => item._id === input._id);
    if (exist) {
      const cardUpdate = cardItems.map((item) =>
        item._id === input._id
          ? { ...exist, quantity: exist.quantity + 1 }
          : item
      );
      setCardItems(cardUpdate);
      localStorage.setItem("cardData", JSON.stringify(cardUpdate));
    } else {
      const cardUpdate = [...cardItems, { ...input }];
      setCardItems(cardUpdate);
      localStorage.setItem("cardData", JSON.stringify(cardUpdate));
    }
  };

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
