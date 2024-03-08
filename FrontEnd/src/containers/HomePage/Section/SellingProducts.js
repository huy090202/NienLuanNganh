import React, { Component } from "react";
import { connect } from "react-redux";

import Slider from "react-slick";

class SellingProducts extends Component {
  render() {
    return (
      <div className="section-share section-selling-products">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">Sản phẩm bán chạy</span>
            <button className="btn-section">Xem thêm</button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings2}>
              <div className="img-customize">
                <div className="catalog-img">
                  <div className="img-son-products selling-img" />
                  <div className="img-title">
                    <div className="img-name">Ốp lưng điện thoại</div>
                    <div className="img-price">
                      <span>100.000 đ</span>
                      <span> Đã bán 5</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="img-customize">
                <div className="catalog-img">
                  <div className="img-son-products selling-img" />
                  <div className="img-title">
                    <div className="img-name">Ốp lưng điện thoại</div>
                    <div className="img-price">
                      <span>100.000 đ</span>
                      <span> Đã bán 5</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="img-customize">
                <div className="catalog-img">
                  <div className="img-son-products selling-img" />
                  <div className="img-title">
                    <div className="img-name">Ốp lưng điện thoại</div>
                    <div className="img-price">
                      <span>100.000 đ</span>
                      <span> Đã bán 5</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="img-customize">
                <div className="catalog-img">
                  <div className="img-son-products selling-img" />
                  <div className="img-title">
                    <div className="img-name">Ốp lưng điện thoại</div>
                    <div className="img-price">
                      <span>100.000 đ</span>
                      <span> Đã bán 5</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="img-customize">
                <div className="catalog-img">
                  <div className="img-son-products selling-img" />
                  <div className="img-title">
                    <div className="img-name">Ốp lưng điện thoại</div>
                    <div className="img-price">
                      <span>100.000 đ</span>
                      <span> Đã bán 5</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="img-customize">
                <div className="catalog-img">
                  <div className="img-son-products selling-img" />
                  <div className="img-title">
                    <div className="img-name">Ốp lưng điện thoại</div>
                    <div className="img-price">
                      <span>100.000 đ</span>
                      <span> Đã bán 5</span>
                    </div>
                  </div>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(SellingProducts);
