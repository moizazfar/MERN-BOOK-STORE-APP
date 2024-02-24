import React from "react";
import Banner from "../components/Banner";
import BestSellerBooks from "./BestSellerBooks";
import FavBooks from "./FavBook";
import PromoBanner from "./PromoBanner";
import OtherBooks from "./OtherBooks";
import Review from "./Review";

function Home() {
  return (
    <div>
      <Banner />
      <BestSellerBooks />
      <FavBooks />
      <PromoBanner />
      <OtherBooks />
      <Review />
    </div>
  );
}

export default Home;
