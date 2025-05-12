import React, { useEffect } from "react";
import Statistics from "./stats";
import PopularDishes from "./PopularDishes";
import NewDishes from "./NewDIshes";
import Advertisements from "./Advertisements";
import ActiveUsers from "./ActiveUsers";
import Events from "./Events";
import "../../../css/home.css";

const HomePage = () => {
  //selector: store => data

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
