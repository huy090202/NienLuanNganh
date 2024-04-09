import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { LANGUAGES } from "../../../utils";
import * as actions from "../../../store/actions";
import "./ProductWithCatalog.scss";
import { withRouter } from "react-router";
import { getAllProductWithCatalog } from "../../../services/productService";

class ProdcutWithCatalog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productRedux: {},
    };
  }

  async componentDidMount() {
    await this.props.fetchProductRedux();
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.productType !== this.props.productType) {
      let res = await getAllProductWithCatalog(this.props.productType);
      if (res.status === "OK" && res.data) {
        this.setState({ productRedux: res.data });
      }
    } else if (prevProps.listProducts !== this.props.listProducts) {
      this.setState({ productRedux: this.props.listProducts });
    }

    // let res = await getAllProductWithCatalog("C12");
    // console.log("Check: ", res);
  }

  handleViewDetailProduct = (product) => {
    this.props.history.push(`/get-details/${product._id}`);
  };

  render() {
    let { language } = this.props;
    let arrProducts = this.state.productRedux;

    if (!arrProducts || arrProducts.length === 0) {
      return (
        <div className="text-center">Chưa có sản phẩm phù hợp cho loại này</div>
      );
    }

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
