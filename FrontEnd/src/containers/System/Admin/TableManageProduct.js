import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./TableManageProduct.scss";
import * as actions from "../../../store/actions";

class TableManageProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productRedux: [],
    };
  }

  componentDidMount() {
    // fire action
    this.props.fetchProductRedux();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.listProducts !== this.props.listProducts) {
      this.setState({ productRedux: this.props.listProducts });
    }
  }

  handleDeleteProduct = (Product) => {
    this.props.deleteAProductRedux(Product._id);
  };

  handleEditProduct = (Product) => {
    this.props.handleEditProductFromParent(Product);
  };

  render() {
    console.log("this.state.productRedux: ", this.props.listProducts);
    let arrProducts = this.state.productRedux;
    return (
      <table id="TableManageProduct">
        <tbody>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>CountInStock</th>
            <th>Description</th>
            <th>Discount</th>
            <th>Selled</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
          {arrProducts &&
            arrProducts.length > 0 &&
            arrProducts.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>{item.countInStock}</td>
                  <td>{item.description}</td>
                  <td>{item.discount}</td>
                  <td>{item.selled}</td>
                  <td>{item.type}</td>
                  <td>
                    <button
                      className="btn-edit"
                      onClick={() => this.handleEditProduct(item)}
                    >
                      <i className="fa-solid fa-pencil"></i>
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => this.handleDeleteProduct(item)}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    // Hung ket qua cua action vao props
    listProducts: state.admin.products,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProductRedux: () => dispatch(actions.fetchAllProductsStart()),
    deleteAProductRedux: (id) => dispatch(actions.deleteAProduct(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageProduct);
