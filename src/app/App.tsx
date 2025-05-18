import React, { useState } from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import HomePage from "./screens/homePage";
import UsersPage from "./screens/usersPage";
import ProductsPage from "./screens/productsPage";
import HelpPage from "./screens/helpPage";
import OrdersPage from "./screens/ordersPage";
import Footer from "./components/footer";
import HomeNavbar from "./components/headers/homeNavbar";
import OtherNavbar from "./components/headers/otherNavbar";
import useBasket from "./hooks/useBasket";
import AuthenticationModal from "./components/auth/index";
import "../css/app.css";
import "../css/navbar.css";
import "../css/footer.css";

function App() {
  const location = useLocation();
  const { cardItems, onAdd, onDelete, onRemove, onDeleteAll } = useBasket();
  const [loginOpen, setLoginOpen] = useState<boolean>(false);
  const [signupOpen, setSignupOpen] = useState<boolean>(false);

  //handlers
  const handleSignupClose = () => setSignupOpen(false);
  const handleLoginClose = () => {
    setLoginOpen(false);
  };

  return (
    <>
      {location.pathname === "/" ? (
        <HomeNavbar
          cardItems={cardItems}
          onAdd={onAdd}
          onDelete={onDelete}
          onRemove={onRemove}
          onDeleteAll={onDeleteAll}
          setLoginOpen={setLoginOpen}
          setSignupOpen={setSignupOpen}
        />
      ) : (
        <OtherNavbar
          cardItems={cardItems}
          onAdd={onAdd}
          onDelete={onDelete}
          onRemove={onRemove}
          onDeleteAll={onDeleteAll}
          setLoginOpen={setLoginOpen}
          setSignupOpen={setSignupOpen}
        />
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
      <AuthenticationModal
        loginOpen={loginOpen}
        signupOpen={signupOpen}
        handleSignupClose={handleSignupClose}
        handleLoginClose={handleLoginClose}
      />
    </>
  );
}

export default App;
