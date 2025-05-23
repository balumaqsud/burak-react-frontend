import React from "react";
import TabPanel from "@mui/lab/TabPanel";
import { Box, Button, Stack } from "@mui/material";
import moment from "moment";

//for redux
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveProcessOrders } from "./selector";
import { Product } from "../../../lib/types/product";
import { Messages, serverApi } from "../../../lib/config";
import { Order, OrderUpdateInput } from "../../../lib/types/order";
import { useGlobals } from "../../hooks/useGlobals";
import { T } from "../../../lib/types/common";
import { OrderStatus } from "../../../lib/data/enums/order.enum";
import OrderService from "../../services/OrderService";
import { sweetErrorHandling } from "../../../lib/sweetAlert";

const processOrdersRetriever = createSelector(
  retrieveProcessOrders,
  (processOrders) => ({
    processOrders,
  })
);

interface ProcessProps {
  setValue: (input: string) => void;
}

const ProcessOrders = (props: ProcessProps) => {
  const { setValue } = props;
  const { authMember, setOrderBuilder } = useGlobals();
  const { processOrders } = useSelector(processOrdersRetriever);

  //handlers
  const finishHandler = async (e: T) => {
    try {
      if (!authMember) throw new Error(Messages.error2);
      const orderId = e.target.value;
      const input: OrderUpdateInput = {
        orderId: orderId,
        orderStatus: OrderStatus.FINISH,
      };

      const confirm = window.confirm("you got it?");

      if (confirm) {
        const order = new OrderService();
        await order.updateOrder(input);
        //rebuild logic
        setValue("3");
        setOrderBuilder(new Date());
      }
    } catch (error) {
      console.log(error);
      sweetErrorHandling(error).then();
    }
  };

  return (
    <TabPanel value="2">
      <Stack>
        {processOrders?.map((order: Order) => {
          return (
            <Box key={order._id} className="order-main-box">
              <Box className="order-box-scroll">
                {order.orderItems.map((item) => {
                  const product: Product = order.productData.filter(
                    (ele: Product) => item.productId === ele._id
                  )[0];

                  const imagePath = `${serverApi}/${product.productImages[0]}`;
                  return (
                    <Box key={item._id} className="orders-name-price">
                      <img
                        src="/img/kebab.webp"
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
                          {" "}
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
                <div className="moment">{moment().format("lll")}</div>
                <Box className="process-button">
                  <Button
                    value={order._id}
                    className="fulfill-button"
                    onClick={finishHandler}
                  >
                    Verify Fulfillment
                  </Button>
                </Box>
              </Box>
            </Box>
          );
        })}
        {!processOrders ||
          (processOrders.length === 0 && (
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

export default ProcessOrders;
