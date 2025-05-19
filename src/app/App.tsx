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
import { sweetErrorHandling, sweetTopSuccessAlert } from "../lib/sweetAlert";
import { Messages } from "../lib/config";
import MemberService from "./services/MemberService";
import { useGlobals } from "./hooks/useGlobals";

function App() {
  const location = useLocation();
  const { setAuthMember } = useGlobals();
  const { cardItems, onAdd, onDelete, onRemove, onDeleteAll } = useBasket();
  const [loginOpen, setLoginOpen] = useState<boolean>(false);
  const [signupOpen, setSignupOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEL] = useState<HTMLElement | null>(null);

  //handlers
  const handleSignupClose = () => setSignupOpen(false);
  const handleLoginClose = () => {
    setLoginOpen(false);
  };

  const handleLogoutClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEL(e.currentTarget);
  };
  const handleCloseLogout = () => {
    setAnchorEL(null);
  };
  const handleLogoutRequest = async () => {
    try {
      const member = new MemberService();
      await member.logout();
      await sweetTopSuccessAlert("success", 700);
      setAuthMember(null);
    } catch (error) {
      console.log(error);
      sweetErrorHandling(Messages.error1).then();
    }
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
          anchorEl={anchorEl}
          handleLogoutClick={handleLogoutClick}
          handleCloseLogout={handleCloseLogout}
          handleLogoutRequest={handleLogoutRequest}
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
          anchorEl={anchorEl}
          handleLogoutClick={handleLogoutClick}
          handleCloseLogout={handleCloseLogout}
          handleLogoutRequest={handleLogoutRequest}
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
