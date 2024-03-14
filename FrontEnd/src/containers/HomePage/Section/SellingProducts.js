import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../../utils";

import Slider from "react-slick";
import * as actions from "../../../store/actions";

class SellingProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrProducts: [],
    };
  }

  componentDidMount() {
    this.props.loadTopProducts();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.topProductsRedux !== this.props.topProductsRedux) {
      this.setState({
        arrProducts: this.props.topProductsRedux,
      });
    }
  }

  render() {
    let arrProducts = this.state.arrProducts;

    return (
      <div className="section-share section-selling-products">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">
              <FormattedMessage id="homepage.selling-products" />
            </span>
            <button className="btn-section">
              <FormattedMessage id="homepage.more-infor" />
            </button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings2}>
              {arrProducts &&
                arrProducts.length > 0 &&
                arrProducts.map((item, index) => {
                  let imageBase64 = "";
                  if (item.image) {
                    imageBase64 = new Buffer(item.image, "base64").toString(
                      "binary"
                    );
                  }
                  return (
                    <div className="img-customize" key={index}>
                      <div className="catalog-img">
                        <div
                          className="img-son-products selling-img"
                          style={{ backgroundImage: `url(${imageBase64})` }}
                        >
                          {item.discount ? (
                            <div className="sale">{item.discount}</div>
                          ) : null}
                        </div>
                        <div className="img-title">
                          <div className="img-name">{item.name}</div>
                          <div className="img-price">
                            <span>{item.price} đ</span>
                            <span> Đã bán: {item.selled}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </Slider>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    isLoggedIn: state.user.isLoggedIn,
    topProductsRedux: state.admin.topProducts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadTopProducts: () => dispatch(actions.fetchTopProducts()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SellingProducts);
