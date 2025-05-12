import React, { useEffect } from "react";
import Statistics from "./stats";
import PopularDishes from "./PopularDishes";
import NewDishes from "./NewDIshes";
import Advertisements from "./Advertisements";
import ActiveUsers from "./ActiveUsers";
import Events from "./Events";
import "../../../css/home.css";

import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { setPopularDishes } from "./slice";
import { retrievePopularDishes } from "./selector.ts";
import { Product } from "../../../lib/types/product";

/** REDUX SLICE & SELECTOR */
const actionDispatch = (dispatch: Dispatch) => ({
  setPopularDishes: (data: Product[]) => dispatch(setPopularDishes(data)),
});

const popularDishesRetriever = createSelector(
  retrievePopularDishes,
  (popularDishes) => ({ popularDishes })
);

const HomePage = () => {
  //selector: store => data
  const { setPopularDishes } = actionDispatch(useDispatch());
  const { popularDishes } = useSelector(popularDishesRetriever);

  useEffect(() => {
    //Backend server data request = Data
    //Slice: Data => Store
  }, []);
  return (
    <div className="homepage">
      <Statistics />
      <PopularDishes />
      <NewDishes />
      <Advertisements />
      <ActiveUsers />
      <Events />
    </div>
  );
};

export default HomePage;
