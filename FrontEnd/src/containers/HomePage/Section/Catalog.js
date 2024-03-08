import React, { Component } from "react";
import { connect } from "react-redux";

import Slider from "react-slick";

class Catalog extends Component {
  render() {
    return (
      <div className="section-share section-catalog">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">Danh mục</span>
            <button className="btn-section">Xem thêm</button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings1}>
              <div className="img-customize">
                <div className="catalog-img">
                  <div className="img-son" />
                  <div className="img-title">Mục 1</div>
                </div>
                <div className="catalog-img">
                  <div className="img-son" />
                  <div className="img-title">Mục 7</div>
                </div>
              </div>
              <div className="img-customize">
                <div className="catalog-img">
                  <div className="img-son" />
                  <div className="img-title">Mục 2</div>
                </div>
                <div className="catalog-img">
                  <div className="img-son" />
                  <div className="img-title">Mục 8</div>
                </div>
              </div>
              <div className="img-customize">
                <div className="catalog-img">
                  <div className="img-son" />
                  <div className="img-title">Mục 3</div>
                </div>
                <div className="catalog-img">
                  <div className="img-son" />
                  <div className="img-title">Mục 9</div>
                </div>
              </div>
              <div className="img-customize">
                <div className="catalog-img">
                  <div className="img-son" />
                  <div className="img-title">Mục 4</div>
                </div>
                <div className="catalog-img">
                  <div className="img-son" />
                  <div className="img-title">Mục 10</div>
                </div>
              </div>
              <div className="img-customize">
                <div className="catalog-img">
                  <div className="img-son" />
                  <div className="img-title">Mục 5</div>
                </div>
                <div className="catalog-img">
                  <div className="img-son" />
                  <div className="img-title">Mục 11</div>
                </div>
              </div>
              <div className="img-customize">
                <div className="catalog-img">
                  <div className="img-son" />
                  <div className="img-title">Mục 6</div>
                </div>
                <div className="catalog-img">
                  <div className="img-son" />
                  <div className="img-title">Mục 12</div>
                </div>
              </div>
            </Slider>
          </div>
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
