import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../../utils";
import * as actions from "../../../store/actions";
import "./PreviewAvatar.scss";

import PreviewModal from "./PreviewAvatar";
import TableManageCatalog from "./TableManageCatalog";

class Catalog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      previewAvatarUrl: "",
      isPreviewAvatarOpen: false,

      roleName: "",
      roleKey: "",
      roleValueEn: "",
      roleValueVi: "",
      roleImage: "",
      action: "",
      catalogEditId: "",
    };
  }

  async componentDidMount() {}

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.listCatalogs !== this.props.listCatalogs) {
      this.setState({
        roleName: "",
        roleKey: "",
        roleValueEn: "",
        roleValueVi: "",
        roleImage: "",
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
        roleImage: base64,
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
    let arrInput = ["roleName", "roleKey", "roleValueEn", "roleValueVi"];
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
      this.props.createNewCatalog({
        roleName: this.state.roleName,
        roleKey: this.state.roleKey,
        roleValueEn: this.state.roleValueEn,
        roleValueVi: this.state.roleValueVi,
        roleImage: this.state.roleImage,
      });
    }
    if (action === CRUD_ACTIONS.EDIT) {
      // fire redux edit user
      this.props.editACatalog({
        id: this.state.catalogEditId,
        roleName: this.state.roleName,
        roleKey: this.state.roleKey,
        roleValueEn: this.state.roleValueEn,
        roleValueVi: this.state.roleValueVi,
        roleImage: this.state.roleImage,
      });
    }

    setTimeout(() => {
      this.props.fetchCatalog();
    }, 1000);
  };

  handleEditCatalogFromParent = (catalog) => {
    let imageBase64 = "";
    if (catalog.roleImage) {
      imageBase64 = new Buffer(catalog.roleImage, "base64").toString("binary");
    }

    this.setState({
      roleName: catalog.roleName,
      roleKey: catalog.roleKey,
      roleValueEn: catalog.roleValueEn,
      roleValueVi: catalog.roleValueVi,
      roleImage: "",
      previewAvatarUrl: imageBase64,
      action: CRUD_ACTIONS.EDIT,
      catalogEditId: catalog._id,
    });
  };

  render() {
    let language = this.props.language;
    let { roleName, roleKey, roleValueEn, roleValueVi, roleImage } = this.state;

    return (
      <div className="user-redux-container">
        <div className="title mb-5">
          <FormattedMessage id="manage-catalog.manage" />
        </div>
        <div className="user-redux-body">
          <div className="container">
            <div className="row">
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-catalog.roleName" />{" "}
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={roleName}
                  onChange={(event) => this.onChangeInput(event, "roleName")}
                />
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-catalog.roleKey" />{" "}
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={roleKey}
                  onChange={(event) => this.onChangeInput(event, "roleKey")}
                />
              </div>
              <div className="col-6">
                <label>
                  <FormattedMessage id="manage-catalog.roleValueEn" />{" "}
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={roleValueEn}
                  onChange={(event) => this.onChangeInput(event, "roleValueEn")}
                />
              </div>
              <div className="col-6">
                <label>
                  <FormattedMessage id="manage-catalog.roleImage" />{" "}
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
              <div className="col-6">
                <label>
                  <FormattedMessage id="manage-catalog.roleValueVi" />{" "}
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={roleValueVi}
                  onChange={(event) => this.onChangeInput(event, "roleValueVi")}
                />
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
                    <FormattedMessage id="manage-catalog.edit" />
                  ) : (
                    <FormattedMessage id="manage-catalog.save" />
                  )}
                </button>
              </div>
              <div className="col-12 mb-5">
                <TableManageCatalog
                  handleEditCatalogFromParent={this.handleEditCatalogFromParent}
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
    listCatalogs: state.admin.catalogs,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createNewCatalog: (data) => dispatch(actions.createNewCatalog(data)),
    fetchCatalog: () => dispatch(actions.fetchAllCatalogsStart()),
    editACatalog: (data) => dispatch(actions.editACatalog(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Catalog);
