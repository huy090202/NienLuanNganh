import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "./HomeHeader";
import Catalog from "./Section/Catalog";
import SellingProducts from "./Section/SellingProducts";
import Suggestion from "./Section/Suggestion";
import Banner from "./Section/Banner";
import HomeFooter from "./HomeFooter";
import "./HomePage.scss";

// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class HomePage extends Component {
  render() {
    let settings1 = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
    };

    let settings2 = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 4,
    };

    return (
      <div>
        <HomeHeader />
        <Catalog settings1={settings1} />
        <SellingProducts settings2={settings2} />
        <Banner />
        <Suggestion settings2={settings2} />
        <HomeFooter />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
