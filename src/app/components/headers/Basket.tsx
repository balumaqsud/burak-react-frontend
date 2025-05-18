import React from "react";
import { Box, Button, Stack } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Menu from "@mui/material/Menu";
import CancelIcon from "@mui/icons-material/Cancel";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useHistory } from "react-router-dom";
import { CardItem } from "../../../lib/types/search";
import { serverApi } from "../../../lib/config";

interface BasketProps {
  cardItems: CardItem[];
  onAdd: (item: CardItem) => void;
  onDelete: (item: CardItem) => void;
  onRemove: (item: CardItem) => void;
  onDeleteAll: () => void;
}

export default function Basket(props: BasketProps) {
  const { cardItems, onAdd, onDelete, onDeleteAll, onRemove } = props;
  const authMember = null;
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const itemsPrice: number = cardItems.reduce(
    (a: number, c: CardItem) => a + c.price * c.quantity,
    0
  );
  const shippingCost: number = itemsPrice <= 100 ? 5 : 0;
  const totalPrice = (itemsPrice + shippingCost).toFixed(2);

  /** HANDLERS **/
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box className={"hover-line"}>
      <IconButton
        aria-label="cart"
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <Badge badgeContent={cardItems.length} color="secondary">
          <img alt="shopping cart" src={"/icons/shopping-cart.svg"} />
        </Badge>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        // onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Stack className={"basket-frame"}>
          <Box className={"all-check-box"}>
            {cardItems.length === 0 ? (
              <div>Cart is empty!</div>
            ) : (
              <Stack className="basket_all">
                <div>Card products</div>
                <Button onClick={() => onDeleteAll()}>Clear All</Button>
              </Stack>
            )}
          </Box>
          <Box className={"orders-main-wrapper"}>
            <Box className={"orders-wrapper"}>
              {cardItems.map((item) => {
                const imagePath = `${serverApi}/${item.image}`;

                return (
                  <Box className={"basket-info-box"}>
                    <div className={"cancel-btn"}>
                      <CancelIcon
                        color={"primary"}
                        onClick={() => {
                          console.log("clicked");
                          onDelete(item);
                        }}
                      />
                    </div>
                    <img
                      alt="fresh"
                      src={imagePath}
                      className={"product-img"}
                    />
                    <span className={"product-name"}>{item.name}</span>
                    <p className={"product-price"}>
                      ${item.price} x {item.quantity}
                    </p>
                    <Box sx={{ minWidth: 120 }}>
                      <div className="col-2">
                        <button
                          className="remove"
                          onClick={() => {
                            console.log("clicked");
                            onRemove(item);
                          }}
                        >
                          -
                        </button>{" "}
                        <button
                          className="add"
                          onClick={() => {
                            console.log("clicked");
                            onAdd(item);
                          }}
                        >
                          +
                        </button>
                      </div>
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </Box>
          {cardItems.length !== 0 ? (
            <Box className={"basket-order"}>
              <span className={"price"}>
                Total: ${totalPrice}: ${itemsPrice} + ${shippingCost}
              </span>
              <Button startIcon={<ShoppingCartIcon />} variant={"contained"}>
                Order
              </Button>
            </Box>
          ) : null}
        </Stack>
      </Menu>
    </Box>
  );
}
