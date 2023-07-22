/* eslint-disable no-unused-vars */
import React from "react";
import { useSelector } from "react-redux";
import "./HomePage.css";
import LeftCard from "./LeftCard";
import TopMiddle from "./TopMiddle";
import RightCard from "./RightCard";
import BottomMiddle from "./BottomMiddle";

const HomePage = () => {
  const user = useSelector((state) => state.user);
const mode=useSelector((state)=>state.mode)


  return (
    <div className={mode==="light"?("light container-fluid vh-100  overflow-scroll"):("dark container-fluid vh-100  overflow-scroll")}>
      <div className="row mt-3 ">
        <div
          className="col-3 me-5 card-1"
          style={{ borderRadius: "20px", height: "200px" }}
        >
          <LeftCard />
        </div>
        <div className="col-5 me-5 card-2">
          <div
            className="row"
            style={{
              height: "270px",
              backgroundColor: "white",
              borderRadius: "20px",
            }}
          >
            <TopMiddle />
          </div>

          <div className="row mt-5 middlebottom-card" >
            <BottomMiddle />
          </div>
        </div>

        <div
          className="col me-3 right-card"
          style={{
            backgroundColor: "white",
            borderRadius: "20px",
            width: "200px",
            
          }}
        >
          <RightCard />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
