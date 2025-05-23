import TabPanel from "@mui/lab/TabPanel";
import { Box, Button, Stack } from "@mui/material";
import React from "react";

//for redux
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrievePausedOrders } from "./selector";
import { Product } from "../../../lib/types/product";
import { Messages, serverApi } from "../../../lib/config";
import { Order, OrderItem, OrderUpdateInput } from "../../../lib/types/order";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import { T } from "../../../lib/types/common";
import { OrderStatus } from "../../../lib/data/enums/order.enum";
import { useGlobals } from "../../hooks/useGlobals";
import OrderService from "../../services/OrderService";

const pausedOrdersRetriever = createSelector(
  retrievePausedOrders,
  (pausedOrders) => ({
    pausedOrders,
  })
);

const PausedOrders = () => {
  const { pausedOrders } = useSelector(pausedOrdersRetriever);
  const { authMember } = useGlobals();
  console.log("this", pausedOrders);

  //hanlders
  const deleteHandler = async (e: T) => {
    try {
      if (!authMember) throw new Error(Messages.error2);
      const orderId = e.target.value;
      const input: OrderUpdateInput = {
        orderId: orderId,
        orderStatus: OrderStatus.DELETE,
      };

      const confirm = window.confirm("wanna delete");

      if (confirm) {
        const order = new OrderService();
        await order.updateOrder(input);
        //rebuild logic
      }
    } catch (error) {
      console.log(error);
      sweetErrorHandling(error).then();
    }
  };

  return (
    <TabPanel value="1">
      <Stack>
        {pausedOrders?.map((order: Order) => {
          return (
            <Box key={order._id} className="order-main-box">
              <Box className="order-box-scroll">
                {order?.orderItems?.map((item: OrderItem) => {
                  const product: Product = order.productData.filter(
                    (ele: Product) => item.productId === ele._id
                  )[0];

                  const imagePath = `${serverApi}/${product.productImages[0]}`;
                  return (
                    <Box key={item._id} className="orders-name-price">
                      <img
                        src={imagePath}
                        height={"40px"}
                        width={"30px"}
                        className="order-dish-img"
                        alt="dish"
                      />
                      <div className="dish-title">{product.productName}</div>

                      <Box className="price-box">
                        <p>${item.itemPrice}</p>
                        <img src="/icons/close.svg" alt="close" />
                        <p>{item.itemQuantity}</p>
                        <img src="/icons/pause.svg" alt="pause" />
                        <p style={{ marginLeft: "15px" }}>
                          ${item.itemQuantity * item.itemPrice}
                        </p>
                      </Box>
                    </Box>
                  );
                })}
              </Box>
              <Box className="total-price">
                <p>Product Price</p>
                <p>${order.orderTotal - order.orderDelivery}</p>
                <img src="/icons/plus.svg" alt="plus" />
                <p>Delivery Cost</p>
                <p>${order.orderDelivery}</p>
                <img src="/icons/pause.svg" alt="pause" />
                <p>Total</p>
                <p>${order.orderTotal}</p>
                <Box className="buttons">
                  <Button
                    value={order._id}
                    className="cancel-button"
                    onClick={deleteHandler}
                  >
                    Cancel
                  </Button>
                  <Button className="payment-button">Payment</Button>
                </Box>
              </Box>
            </Box>
          );
        })}
        {!pausedOrders ||
          (pausedOrders.length === 0 && (
            <Box
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"center"}
            >
              <img
                src={"/icons/noimage-list.svg"}
                style={{ width: 300, height: 300 }}
                alt=""
              />
            </Box>
          ))}
      </Stack>
    </TabPanel>
  );
};

export default PausedOrders;
