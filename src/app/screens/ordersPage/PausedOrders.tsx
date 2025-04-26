import TabPanel from "@mui/lab/TabPanel";
import { Box, Stack } from "@mui/material";
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
                      <p className="dish-title">Kebab</p>

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
            </Box>
          );
        })}
      </Stack>
    </TabPanel>
  );
};

export default PausedOrders;
