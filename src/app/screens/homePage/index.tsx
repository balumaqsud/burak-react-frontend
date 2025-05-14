import React, { useEffect } from "react";
import Statistics from "./stats";
import PopularDishes from "./PopularDishes";
import NewDishes from "./NewDIshes";
import Advertisements from "./Advertisements";
import ActiveUsers from "./ActiveUsers";
import Events from "./Events";
import "../../../css/home.css";

import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setNewDishes, setPopularDishes, setTopUsers } from "./slice";
import { Product } from "../../../lib/types/product";
import ProductService from "../../services/ProductService";
import { ProductCollection } from "../../../lib/data/enums/product.enum";
import MemberService from "../../services/MemberService";
import { Member } from "../../../lib/types/member";

//REDUX SLICE
const actionDispatch = (dispatch: Dispatch) => ({
  setPopularDishes: (data: Product[]) => dispatch(setPopularDishes(data)),
  setNewDishes: (data: Product[]) => dispatch(setNewDishes(data)),
  setTopUsers: (data: Member[]) => dispatch(setTopUsers(data)),
});

const HomePage = () => {
  //selector: store => data
  const { setPopularDishes, setNewDishes, setTopUsers } =
    actionDispatch(useDispatch());

  useEffect(() => {
    const products = new ProductService();
    const members = new MemberService();
    //Backend server data request = Data
    //Slice: Data => Store
    products
      .getProducts({
        page: 1,
        limit: 4,
        order: "productViews",
        productCollection: ProductCollection.DISH,
      })
      .then((data) => {
        setPopularDishes(data);
      })
      .catch((err) => console.log(err));

    //for new dishes
    products
      .getProducts({
        page: 1,
        limit: 4,
        order: "createdAt",
        // productCollection: ProductCollection.DISH,
      })
      .then((data) => {
        console.log("came here:", data);
        setNewDishes(data);
      })
      .catch((err) => console.log(err));

    //active users
    members
      .getTopUsers()
      .then((data) => {
        console.log("top users", data);
        setTopUsers(data);
      })
      .catch((error) => console.log(error));
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
