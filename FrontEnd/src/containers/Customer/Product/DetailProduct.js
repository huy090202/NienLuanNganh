import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader";
import "./DetailProduct.scss";
import Suggestion from "../../HomePage/Section/Suggestion";
import HomeFooter from "../../HomePage/HomeFooter";
import { getDetailsProduct } from "../../../services/productService";

import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../../utils";

class DetailProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailProduct: {},
    };
  }

  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      let res = await getDetailsProduct(id);

      if (res && res.status === "OK") {
        this.setState({
          detailProduct: res.data,
        });
      }
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {}

  render() {
    let settings2 = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 2,
    };

    let { detailProduct } = this.state;

    let imageBase64 = "";
    if (detailProduct.image) {
      imageBase64 = new Buffer(detailProduct.image, "base64").toString(
        "binary"
      );
    }

    let { language } = this.props;

    return (
      <>
        <HomeHeader isShowBanner={false} />
        <div className="product-detail-container container">
          <div className="intro-product row">
            <div className="content-left col-5">
              <div
                className="product-image"
                style={{
                  backgroundImage: `url(${imageBase64})`,
                }}
              />
            </div>
            <div className="content-right col-7">
              <div className="product-name">{detailProduct.name}</div>
              <div className="product-selled">
                {detailProduct.selled} <FormattedMessage id="homepage.selled" />
              </div>
              <div className="product-price-discount">
                <div className="product-price">{detailProduct.price} đ</div>
                <div className="product-discount">
                  {detailProduct.discount}{" "}
                  <FormattedMessage id="homepage.discount" />
                </div>
              </div>

              <div className="product-count">
                <div className="product-input">
                  <button className="minus">-</button>
                  <input className="count-input" type="text" value="1" />
                  <button className="plus">+</button>
                </div>
                <div className="count">
                  {detailProduct.countInStock}{" "}
                  <FormattedMessage id="homepage.available" />
                </div>
              </div>
              <div className="product-buy">
                <button className="add-to-cart">
                  <i className="fas fa-cart-plus"></i>
                  <FormattedMessage id="homepage.add-to-cart" />
                </button>
                <button className="buy">
                  <FormattedMessage id="homepage.buy-now" />
                </button>
              </div>
            </div>
          </div>
          <div className="shop-product"></div>
          <div className="detail-product row">
            <div className="detail-title">
              <FormattedMessage id="homepage.product-introduction" />
            </div>
            <div className="detail-content">{detailProduct.description}</div>
          </div>
          <div className="row">
            <div className="col-12">
              <Suggestion settings2={settings2} />
            </div>
          </div>
          <div className="comment-product">
            <div className="comment-title">
              <FormattedMessage id="homepage.product-reviews" />
            </div>
            <div className="comment-content"></div>
          </div>
        </div>
        <hr />
        <HomeFooter />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailProduct);
