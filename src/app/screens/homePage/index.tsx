import React from "react";
import Statistics from "./statistics";
import PopularDishes from "./PopularDishes";
import NewDishes from "./NewDIshes";
import Advertisements from "./Advertisements";
import ActiveUsers from "./ActiveUsers";
import Events from "./Events";
import "../../../css/home.css";

const HomePage = () => {
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
