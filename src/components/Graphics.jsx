import React from "react";
import CatGraphic from "./CatGraphic";
import FoodGraphic from "./FoodGraphic";
import NextMilkBottle from "./NextMilkBottle";

const Graphics = () => {
  return (
    <div className="dashboardComp col-12 mt-4">
      <h2 className="text-center">STATISTICS</h2>
      <hr />
      <div className="row d-flex justify-content-center justify-content-sm-around">
        <CatGraphic />
        <FoodGraphic />
        <NextMilkBottle/>
      </div>
    </div>
  );
};

export default Graphics;
