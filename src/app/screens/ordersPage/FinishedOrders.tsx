import React from "react";
import { Box, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import moment from "moment";
import TabPanel from "@mui/lab/TabPanel";

const FinishedOrders = () => {
  const example_arr: any[] = [1, 2];
  return (
    <TabPanel value="3">
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
              </Box>
            </Box>
          );
        })}
      </Stack>
    </TabPanel>
  );
};

export default FinishedOrders;
