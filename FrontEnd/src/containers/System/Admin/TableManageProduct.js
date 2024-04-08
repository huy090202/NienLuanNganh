import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./TableManage.scss";
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
    let arrProducts = this.state.productRedux;
    return (
      <table id="TableManage">
        <tbody>
          <tr>
            <th>
              <FormattedMessage id="manage-product.table-nameVi" />
            </th>
            <th>
              <FormattedMessage id="manage-product.table-nameEn" />
            </th>
            <th>
              <FormattedMessage id="manage-product.table-priceOld" />
            </th>
            <th>
              <FormattedMessage id="manage-product.table-priceNew" />
            </th>
            <th>
              <FormattedMessage id="manage-product.table-countInStock" />
            </th>
            <th>
              <FormattedMessage id="manage-product.table-descriptionVi" />
            </th>
            <th>
              <FormattedMessage id="manage-product.table-descriptionEn" />
            </th>
            <th>
              <FormattedMessage id="manage-product.table-discount" />
            </th>
            <th>
              <FormattedMessage id="manage-product.table-selled" />
            </th>
            <th>
              <FormattedMessage id="manage-product.table-type" />
            </th>
            <th>
              <FormattedMessage id="manage-product.table-action" />
            </th>
          </tr>
          {arrProducts &&
            arrProducts.length > 0 &&
            arrProducts.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.nameVi}</td>
                  <td>{item.nameEn}</td>
                  <td>{item.priceOld}</td>
                  <td>{item.priceNew}</td>
                  <td>{item.countInStock}</td>
                  <td>{item.descriptionVi}</td>
                  <td>{item.descriptionEn}</td>
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
    language: state.app.language,
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
