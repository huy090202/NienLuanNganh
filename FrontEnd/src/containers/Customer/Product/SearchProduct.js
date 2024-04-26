import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader";
import "../../HomePage/HomePage.scss";
import HomeFooter from "../../HomePage/HomeFooter";

import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../../utils";

import { withRouter } from "react-router";
import { productSearch } from "../../../services/productService";

class SearchProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productSearch: [],
        };
    }

    async componentDidMount() {
        const params = new URLSearchParams(this.props.location.search);
        const keyWord = params.get("keyWord");

        const res = await productSearch(keyWord);
        this.setState({
            productSearch: res.products,
        });
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {

    }

    handleViewDetailProduct = (product) => {
        this.props.history.push(`/get-details/${product._id}`);
    }

    render() {
        console.log(this.state.productSearch);
        let { language } = this.props;

        let productSearchs = this.state.productSearch;

        let imageBase64 = "";

        if (productSearchs.image) {
            imageBase64 = new Buffer(productSearchs.image, "base64").toString(
                "binary"
            );
        }

        let nameProduct =
            language === LANGUAGES.VI ? productSearchs.nameVi : productSearchs.nameEn;

        return (
            <div>
                <HomeHeader />
                <div className="container search-product">
                    <div className="row">
                        <div className="col-12">
                            <h1 className="text-center fw-bold py-5"><FormattedMessage id="homeheader.search" /></h1>
                        </div>

                        <div className="col-12 d-flex justify-content-center flex-row flex-wrap">
                            {productSearchs &&
                                productSearchs.length > 0 &&
                                productSearchs.map((item, index) => {
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
                        </div>
                    </div>
                </div>
                <HomeFooter />
            </div>
        )
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchProduct));
