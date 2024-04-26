import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader";
import "./ProductCart.scss";
import HomeFooter from "../../HomePage/HomeFooter";

import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../../utils";

import { withRouter } from "react-router";
import { getAllProducts, createOrder, updateCountInStock } from "../../../services/productService";

class ProductCart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productCarts: [],
        };
    }

    async componentDidMount() {
        await this.loadProductCart();
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.location.key !== this.props.location.key) {
            await this.loadProductCart();
        }
    }

    async loadProductCart() {
        if (this.props.match.params.id) {
            let id = this.props.match.params.id;
            let res = await getAllProducts(id);
            if (res && res.status === "OK") {
                this.setState({
                    productCarts: res.products,
                });
                console.log("Product cart: ", res.products);
                // Lưu thông tin sản phẩm vào local storage
                localStorage.setItem('productCart', JSON.stringify(res.products));
            }
        }
    }

    handlePay = async (product, user) => {
        const res = await createOrder({
            userId: user._id,
            productId: product._id,
        });
        if (res.status === "OK") {
            alert("Thanh toán thành công");
            const updatedCountInStock = await updateCountInStock({
                id: product._id,
                countInStock: product.countInStock - 1,
            });

            if (updatedCountInStock.status === "OK") {
                console.log("Update countInStock successfully");
            } else {
                console.log("Update countInStock failed");
            }
            this.setState({
                productCarts: [],
            })
        } else {
            alert("Thanh toán thất bại");
        }
    }

    render() {
        let { language } = this.props;
        let { userInfo } = this.props;

        let arrProducts = this.state.productCarts;

        let imageBase64 = "";

        if (arrProducts.image) {
            imageBase64 = new Buffer(arrProducts.image, "base64").toString(
                "binary"
            );
        }

        let nameProduct =
            language === LANGUAGES.VI ? arrProducts.nameVi : arrProducts.nameEn;

        return (
            <div>
                <HomeHeader />
                <div className="container product-cart">
                    <div className="row">
                        <div className="col-12">
                            <h1 className="text-center fw-bold py-5"><FormattedMessage id="homeheader.addToCart" /></h1>
                        </div>

                        <div className="col-12">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">STT</th>
                                        <th scope="col"><FormattedMessage id="manage-product.image" /></th>
                                        <th scope="col"><FormattedMessage id="manage-product.name" /></th>
                                        <th scope="col"><FormattedMessage id="manage-product.quantity" /></th>
                                        <th scope="col"><FormattedMessage id="manage-product.pay" /></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <th>
                                        <div className="my-3">1</div>
                                    </th>
                                    <th>
                                        <div
                                            className="product-cart-image my-3"
                                            style={{ backgroundImage: `url(${imageBase64})` }}
                                        ></div>
                                    </th>
                                    <th>
                                        <div className="my-3">
                                            {nameProduct}
                                        </div>
                                    </th>
                                    <th>
                                        <div className="product-input my-3">
                                            <button className="minus">-</button>
                                            <input className="count-input" type="text" value="1" />
                                            <button className="plus">+</button>
                                        </div>
                                    </th>
                                    <th>
                                        <button className="btn btn-primary my-3" onClick={() => this.handlePay(arrProducts, userInfo)}><FormattedMessage id="manage-product.pay" /></button>
                                    </th>
                                </tbody>
                            </table>
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
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductCart));
