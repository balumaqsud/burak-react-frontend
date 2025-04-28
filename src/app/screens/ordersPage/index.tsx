import { Container, Stack, Box, Typography } from "@mui/material";
import { useState, SyntheticEvent } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PausedOrders from "./PausedOrders";
import FinishedOrders from "./FinishedOrders";
import ProcessOrders from "./ProcessOrders";
import React from "react";
import "../../../css/order.css";

const OrdersPage = () => {
  const [value, setValue] = useState("1");
  const handleChange = (e: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <div className="order-page">
      <Container className="order-container">
        <Stack className="order-left">
          <TabContext value={value}>
            <Box className="order-nav-frame">
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="tabs example"
                  className="order_list"
                >
                  <Tab label="Paused Orders" value={"1"} />
                  <Tab label="Process Orders" value={"2"} />
                  <Tab label="Finished Orders" value={"3"} />
                </Tabs>
              </Box>
            </Box>
            <Stack className="order-main-content">
              <PausedOrders />
              <ProcessOrders />
              <FinishedOrders />
            </Stack>
          </TabContext>
        </Stack>
        <Stack className="order-right">
          <Box className="order-box-info">
            <Box className="member-box">
              <div className="user-image">
                <img
                  src={"/icons/default-user.svg"}
                  alt=""
                  className={"order-user-avatar"}
                />
                <div className="order-user-icon-box">
                  <img
                    src={"/icons/user-badge.svg"}
                    alt=""
                    className={"order-user-prof-img"}
                  />
                </div>
              </div>
              <Typography className="user-name">Oliver</Typography>
              <p className="user-type">USER</p>
              <div className="line"></div>
              <div className="location">
                <LocationOnIcon />
                <p>Yeosu, South Korea</p>
              </div>
            </Box>
          </Box>
          <Box className="user-card-info">
            <input
              type="text"
              placeholder="Card Number"
              name="cardNumber"
              className="cardNumber"
            ></input>
            <div className="card-second-inputs">
              <input
                type="text"
                name="cardDate"
                placeholder="Expire date"
                className="card-second-info"
              />
              <input
                type="text"
                name="CVV"
                placeholder="CVV"
                className="card-second-info"
              />
            </div>
            <input
              type="text"
              name="cardUser"
              placeholder="Card Holder's Name"
              className="cardUser"
            />
            <div className="card-types-box">
              <img src={"/icons/western-card.svg"} alt="" />
              <img src={"/icons/master-card.svg"} alt="" />
              <img src={"/icons/paypal-card.svg"} alt="" />
              <img src={"/icons/visa-card.svg"} alt="" />
            </div>
          </Box>
        </Stack>
      </Container>
    </div>
  );
};

export default OrdersPage;
