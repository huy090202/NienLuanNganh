import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../../utils";
import * as actions from "../../../store/actions";
import "./PreviewAvatar.scss";

import PreviewModal from "./PreviewAvatar";
import TableManageProduct from "./TableManageProduct";

class ProductRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      typeRoleProductArr: [],
      previewAvatarUrl: "",
      isPreviewAvatarOpen: false,

      name: "",
      price: "",
      countInStock: "",
      rating: "",
      description: "",
      discount: "",
      selled: "",
      type: "",
      image: "",
      action: "",
      productEditId: "",
    };
  }

  async componentDidMount() {
    this.props.getTypeRoleProductStart();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.typeRoleProductsRedux !== this.props.typeRoleProductsRedux) {
      let arrTypeRolesProduct = this.props.typeRoleProductsRedux;
      this.setState({
        typeRoleProductArr: arrTypeRolesProduct,
        type:
          arrTypeRolesProduct && arrTypeRolesProduct.length > 0
            ? arrTypeRolesProduct[0].roleKey
            : "",
      });
    }

    if (prevProps.listProducts !== this.props.listProducts) {
      let arrTypeRolesProduct = this.props.typeRoleProductsRedux;

      this.setState({
        name: "",
        price: "",
        countInStock: "",
        description: "",
        discount: "",
        ciselledty: "",
        selled: "",
        type:
          arrTypeRolesProduct && arrTypeRolesProduct.length > 0
            ? arrTypeRolesProduct[0].roleKey
            : "",
        image: "",
        action: CRUD_ACTIONS.CREATE,
        previewAvatarUrl: "",
      });
    }
  }

  handleOnchangeAvatar = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      let objectUrl = URL.createObjectURL(file);
      this.setState({
        previewAvatarUrl: objectUrl,
        image: base64,
      });
    }
  };

  openPreviewAvatar = () => {
    if (!this.state.previewAvatarUrl) return;

    this.setState({
      isPreviewAvatarOpen: true,
    });
  };

  closePreviewAvatar = () => {
    this.setState({
      isPreviewAvatarOpen: false,
    });
  };

  checkValidateInput = () => {
    let isValid = true;
    let arrInput = ["name", "price", "countInStock", "description"];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert("The input is required: " + arrInput[i]);
        break;
      }
    }

    return isValid;
  };

  onChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };

  handleSaveProduct = () => {
    let isValid = this.checkValidateInput();
    if (isValid === false) return;

    let { action } = this.state;

    if (action === CRUD_ACTIONS.CREATE) {
      // fire redux create user
      this.props.createNewProduct({
        name: this.state.name,
        price: this.state.price,
        countInStock: this.state.countInStock,
        description: this.state.description,
        discount: this.state.discount,
        selled: this.state.selled,
        type: this.state.type,
        image: this.state.image,
      });
    }
    if (action === CRUD_ACTIONS.EDIT) {
      // fire redux edit user
      this.props.editAProductRedux({
        id: this.state.productEditId,
        name: this.state.name,
        price: this.state.price,
        countInStock: this.state.countInStock,
        rating: this.state.rating,
        description: this.state.description,
        discount: this.state.discount,
        selled: this.state.selled,
        type: this.state.type,
        image: this.state.image,
      });
    }

    setTimeout(() => {
      this.props.fetchProductRedux();
    }, 1000);
  };

  handleEditProductFromParent = (product) => {
    let imageBase64 = "";
    if (product.image) {
      imageBase64 = new Buffer(product.image, "base64").toString("binary");
    }

    this.setState({
      name: product.name,
      price: product.price,
      countInStock: product.countInStock,
      rating: product.rating,
      description: product.description,
      discount: product.discount,
      selled: product.selled,
      type: product.type,
      image: "",
      previewAvatarUrl: imageBase64,
      action: CRUD_ACTIONS.EDIT,
      productEditId: product._id,
    });
  };

  render() {
    let types = this.state.typeRoleProductArr;
    let language = this.props.language;
    let isLoadingRoleProduct = this.props.isLoadingRoleProduct;

    let {
      name,
      price,
      countInStock,
      description,
      discount,
      selled,
      type,
      image,
    } = this.state;

    return (
      <div className="user-redux-container">
        <div className="title mb-5">
          <FormattedMessage id="manage-product.manage" />
        </div>
        <div className="user-redux-body">
          <div className="container">
            <div className="row">
              <div className="col-12">
                {isLoadingRoleProduct === true ? "Loading role product" : ""}
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-product.name" />{" "}
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={(event) => this.onChangeInput(event, "name")}
                />
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-product.price" />{" "}
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={price}
                  onChange={(event) => this.onChangeInput(event, "price")}
                />
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-product.countInStock" />{" "}
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={countInStock}
                  onChange={(event) =>
                    this.onChangeInput(event, "countInStock")
                  }
                />
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-product.description" />{" "}
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={description}
                  onChange={(event) => this.onChangeInput(event, "description")}
                />
              </div>
              <div className="col-4">
                <label>
                  <FormattedMessage id="manage-product.discount" />{" "}
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={discount}
                  onChange={(event) => this.onChangeInput(event, "discount")}
                />
              </div>
              <div className="col-4">
                <label>
                  <FormattedMessage id="manage-product.selled" />{" "}
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={selled}
                  onChange={(event) => this.onChangeInput(event, "selled")}
                />
              </div>
              <div className="col-4">
                <label>
                  <FormattedMessage id="manage-product.type" />{" "}
                </label>
                <select
                  className="form-control"
                  onChange={(event) => this.onChangeInput(event, "type")}
                  value={type}
                >
                  {types &&
                    types.length > 0 &&
                    types.map((item, index) => {
                      return (
                        <option key={index} value={item.roleKey}>
                          {language === LANGUAGES.VI
                            ? item.roleValueVi
                            : item.roleValueEn}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="col-4">
                <label>
                  <FormattedMessage id="manage-product.image" />{" "}
                </label>
                <div className="preview-avatar-container">
                  <input
                    type="file"
                    id="previewAvatar"
                    className="form-control"
                    hidden
                    onChange={(event) => this.handleOnchangeAvatar(event)}
                  />
                  <label className="label-upload" htmlFor="previewAvatar">
                    Tải ảnh <i className="fas fa-upload"></i>
                  </label>
                  <div
                    className="preview-avatar"
                    style={{
                      backgroundImage: `url(${this.state.previewAvatarUrl})`,
                    }}
                    onClick={() => this.openPreviewAvatar()}
                  ></div>
                </div>
              </div>
              <div className="col-12 my-4">
                <button
                  className={
                    this.state.action === CRUD_ACTIONS.EDIT
                      ? "btn btn-warning"
                      : "btn btn-primary"
                  }
                  onClick={() => this.handleSaveProduct()}
                >
                  {this.state.action === CRUD_ACTIONS.EDIT ? (
                    <FormattedMessage id="manage-product.edit" />
                  ) : (
                    <FormattedMessage id="manage-product.save" />
                  )}
                </button>
              </div>
              <div className="col-12 mb-5">
                <TableManageProduct
                  handleEditProductFromParent={this.handleEditProductFromParent}
                  action={this.state.action}
                />
              </div>
            </div>
          </div>
        </div>
        {this.state.isPreviewAvatarOpen === true && (
          <PreviewModal
            isOpen={this.state.isPreviewAvatarOpen}
            imageUrl={this.state.previewAvatarUrl}
            onCloseModal={this.closePreviewAvatar}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    typeRoleProductsRedux: state.admin.typeRoleProducts,
    isLoadingRoleProduct: state.admin.isLoadingRoleProduct,
    listProducts: state.admin.products,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTypeRoleProductStart: () =>
      dispatch(actions.fetchTypeRoleProductStart()),
    createNewProduct: (data) => dispatch(actions.createNewProduct(data)),
    fetchProductRedux: () => dispatch(actions.fetchAllProductsStart()),
    editAProductRedux: (data) => dispatch(actions.editAProduct(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductRedux);
