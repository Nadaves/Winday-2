import React from "react";
import AppBar from "../components/AppBar";
import ApexChart from "../components/Chart/ApexChart";
import CardsGrid from "../components/Cards/CardsGrid";
import "./Home.css";

function Home() {
  return (
    <>
      <AppBar />
      <h1>תחזית ליומיים הקרובים</h1>
      <ApexChart />
      <h1>כרגע בחופים</h1>
      <CardsGrid />
    </>
  );
}

export default Home;
