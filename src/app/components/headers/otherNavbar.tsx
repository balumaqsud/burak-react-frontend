import { Box, Button, Container, Stack } from "@mui/material";
import { NavLink } from "react-router-dom";
import Basket from "./Basket";
import { CardItem } from "../../../lib/types/search";

interface OtherNavbarProps {
  cardItems: CardItem[];
  onAdd: (item: CardItem) => void;
  onDelete: (item: CardItem) => void;
  onRemove: (item: CardItem) => void;
  onDeleteAll: () => void;
}

export default function OtherNavbar(props: OtherNavbarProps) {
  const { cardItems, onAdd, onDelete, onDeleteAll, onRemove } = props;
  const authMember = null;

  return (
    <div className="other-navbar">
      <Container className="navbar-container">
        <Stack className="menu">
          <Box>
            <NavLink to="/">
              <img
                src="/icons/burak.svg"
                style={{ width: "125px", height: "30px" }}
                alt="burak logo"
              />
            </NavLink>
          </Box>
          <Stack className="links">
            <Box className="hover-line">
              <NavLink to="/">Home</NavLink>
            </Box>
            <Box className="hover-line">
              <NavLink to="/products">Products</NavLink>
            </Box>
            {authMember ? (
              <Box className="hover-line">
                <NavLink to="/orders">Orders</NavLink>
              </Box>
            ) : null}
            {authMember ? (
              <Box className="hover-line">
                <NavLink to="/member-page">My Page</NavLink>
              </Box>
            ) : null}
            <Box className="hover-line">
              <NavLink to="/help">Help</NavLink>
            </Box>
            <Basket
              cardItems={cardItems}
              onAdd={onAdd}
              onDelete={onDelete}
              onRemove={onRemove}
              onDeleteAll={onDeleteAll}
            />
            {!authMember ? (
              <Box>
                <Button variant="contained" className="login-button">
                  Login
                </Button>
              </Box>
            ) : (
              <img
                className="user-avatar"
                src={"/icons/default-user.svg"}
                aria-haspopup={"true"}
                alt=""
              />
            )}
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
