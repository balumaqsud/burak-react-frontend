import TabPanel from "@mui/lab/TabPanel";
import { Box, Button, Stack } from "@mui/material";
import React from "react";

const PausedOrders = () => {
  const example_arr: any[] = [1, 2];
  return (
    <TabPanel value="1">
      <Stack>
        {example_arr.map((ele, index) => {
          return (
            <Box key={index} className="order-main-box">
              <Box className="order-box-scroll">
                {example_arr.map((ele2, index2) => {
                  return (
                    <Box key={index2} className="orders-name-price">
                      <img
                        src="/img/kebab.webp"
                        height={"40px"}
                        width={"30px"}
                        className="order-dish-img"
                        alt="dish"
                      />
                      <div className="dish-title">Kebab</div>

                      <Box className="price-box">
                        <p>$11</p>
                        <img src="/icons/close.svg" alt="close" />
                        <p>2</p>
                        <img src="/icons/pause.svg" alt="pause" />
                        <p style={{ marginLeft: "15px" }}>$22</p>
                      </Box>
                    </Box>
                  );
                })}
              </Box>
              <Box className="total-price">
                <p>Product Price</p>
                <p>$44</p>
                <img src="/icons/plus.svg" alt="plus" />
                <p>Delivery Cost</p>
                <p>$5</p>
                <img src="/icons/pause.svg" alt="pause" />
                <p>Total</p>
                <p>$49</p>
                <Box className="buttons">
                  <Button className="cancel-button">Cancel</Button>
                  <Button className="payment-button">Payment</Button>
                </Box>
              </Box>
            </Box>
          );
        })}
        {false && (
          <Box display={"flex"} flexDirection={"row"} justifyContent={"center"}>
            <img
              src={"/icons/noimage-list.svg"}
              style={{ width: 300, height: 300 }}
              alt=""
            />
          </Box>
        )}
      </Stack>
    </TabPanel>
  );
};

export default PausedOrders;
