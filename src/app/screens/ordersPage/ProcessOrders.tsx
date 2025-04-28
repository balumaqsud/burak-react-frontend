import React from "react";
import TabPanel from "@mui/lab/TabPanel";
import { Box, Button, Stack } from "@mui/material";
import moment from "moment";

const ProcessOrders = () => {
  const example_arr: any[] = [1, 2];
  return (
    <TabPanel value="2">
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
                        className="order-dish-img"
                        alt="dish"
                      />
                      <p className="title-dish">Kebab</p>
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
                <div className="moment">{moment().format("lll")}</div>
                <Box className="process-button">
                  <Button className="fulfill-button">Verify Fulfillment</Button>
                </Box>
              </Box>
            </Box>
          );
        })}
      </Stack>
    </TabPanel>
  );
};

export default ProcessOrders;
