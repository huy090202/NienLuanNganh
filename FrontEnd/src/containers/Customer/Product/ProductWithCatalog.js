import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { LANGUAGES } from "../../../utils";
import * as actions from "../../../store/actions";
import "./ProductWithCatalog.scss";
import { withRouter } from "react-router";

class ProdcutWithCatalog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productRedux: [],
    };
  }

  componentDidMount() {
    this.props.fetchProductRedux();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.listProducts !== this.props.listProducts) {
      this.setState({ productRedux: this.props.listProducts });
    }
  }

  handleViewDetailProduct = (product) => {
    console.log("View detail product: ", product);
    this.props.history.push(`/get-details/${product._id}`);
  };

  render() {
    let { language } = this.props;
    let arrProducts = this.state.productRedux;

    return (
      <>
        {arrProducts &&
          arrProducts.length > 0 &&
          arrProducts.map((item, index) => {
            let imageBase64 = "";
            if (item.image) {
              imageBase64 = new Buffer(item.image, "base64").toString("binary");
            }

            let nameProduct =
              language === LANGUAGES.VI ? item.nameVi : item.nameEn;

            return (
              <div
                className="col-4 mb-4 img-customize"
                key={index}
                onClick={() => this.handleViewDetailProduct(item)}
              >
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
                    <div className="img-name">{nameProduct}</div>
                    <div className="img-price">
                      <span>{item.priceNew} đ</span>
                      <span>
                        {" "}
                        <FormattedMessage id="homepage.selled" />: {item.selled}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    listProducts: state.admin.products,
  };
};

const mapDispatchToProps = (dispatch) => {
  return { fetchProductRedux: () => dispatch(actions.fetchAllProductsStart()) };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProdcutWithCatalog)
);
