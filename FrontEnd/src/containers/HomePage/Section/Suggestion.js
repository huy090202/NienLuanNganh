import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../../utils";

import Slider from "react-slick";
import * as actions from "../../../store/actions";
import { withRouter } from "react-router";

class Suggestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrProducts: [],
    };
  }

  componentDidMount() {
    this.props.loadAllProducts();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.AllProductsRedux !== this.props.AllProductsRedux) {
      this.setState({
        arrProducts: this.props.AllProductsRedux,
      });
    }
  }

  handleViewDetailProduct = (product) => {
    this.props.history.push(`/get-details/${product._id}`, {
      reload: true,
    });
  };

  render() {
    let { language } = this.props;
    let arrProducts = this.state.arrProducts;

    return (
      <div className="section-share section-suggestion">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">
              <FormattedMessage id="homepage.suggest-today" />
            </span>
            <button
              className="btn-section"
              onClick={() => this.props.navigate("/all-product")}
            >
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

                  let nameProduct =
                    language === LANGUAGES.VI ? item.nameVi : item.nameEn;

                  return (
                    <div
                      className="img-customize"
                      key={index}
                      onClick={() => this.handleViewDetailProduct(item)}
                    >
                      <div className="catalog-img">
                        <div
                          className="img-son-products suggestion-img"
                          style={{ backgroundImage: `url(${imageBase64})` }}
                        >
                          {item.discount ? (
                            <div className="sale">{item.discount}</div>
                          ) : null}
                        </div>
                        <div className="img-title">
                          <div className="img-name">{nameProduct}</div>
                          <div className="img-price">
                            <span>{item.priceNew} đ</span>
                            <span>
                              {" "}
                              <FormattedMessage id="homepage.selled" />:{" "}
                              {item.selled}
                            </span>
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
    AllProductsRedux: state.admin.suggestionProducts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    loadAllProducts: () => dispatch(actions.fetchSuggestionProducts()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Suggestion)
);
