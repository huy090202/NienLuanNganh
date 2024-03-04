import React, { Component } from "react";
import { connect } from "react-redux";
import "./Catalog.scss";

import Slider from "react-slick";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class Catalog extends Component {
  render() {
    let setting = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
    };

    return (
      <div className="section-catalog">
        <div className="catalog-content">
          <Slider {...setting}>
            <div className="img-customize">
              <h3>1</h3>
            </div>
            <div className="img-customize">
              <h3>2</h3>
            </div>
            <div className="img-customize">
              <h3>3</h3>
            </div>
            <div className="img-customize">
              <h3>4</h3>
            </div>
            <div className="img-customize">
              <h3>5</h3>
            </div>
            <div className="img-customize">
              <h3>6</h3>
            </div>
          </Slider>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Catalog);
