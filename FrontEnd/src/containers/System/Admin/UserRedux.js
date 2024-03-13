import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../../utils";
import * as actions from "../../../store/actions";
import "./PreviewAvatar.scss";

import PreviewModal from "./PreviewAvatar";
import TableManageUser from "./TableManageUser";

class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderArr: [],
      roleArr: [],
      previewAvatarUrl: "",
      isPreviewAvatarOpen: false,

      email: "",
      name: "",
      password: "",
      confimpassword: "",
      phone: "",
      address: "",
      city: "",
      gender: "",
      roleId: "",
      avatar: "",

      action: "",
      userEditId: "",
    };
  }

  async componentDidMount() {
    this.props.getGenderStart();
    this.props.getRoleStart();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // render => componentDidUpdate
    // So sanh hien tai (this) va qua khu (previous)
    // Qua khu [], hien tai [3] => khac nhau
    // Cap nhat lai state
    // Qua khu [3], hien tai [3] => giong nhau
    // Khong lam gi
    if (prevProps.genderRedux !== this.props.genderRedux) {
      let arrGenders = this.props.genderRedux;
      this.setState({
        genderArr: arrGenders,
        gender:
          arrGenders && arrGenders.length > 0 ? arrGenders[0].roleKey : "",
      });
    }

    if (prevProps.roleRedux !== this.props.roleRedux) {
      let arrRoles = this.props.roleRedux;
      this.setState({
        roleArr: arrRoles,
        roleId: arrRoles && arrRoles.length > 0 ? arrRoles[0].roleKey : "",
      });
    }

    if (prevProps.listUsers !== this.props.listUsers) {
      let arrGenders = this.props.genderRedux;
      let arrRoles = this.props.roleRedux;

      this.setState({
        email: "",
        name: "",
        password: "",
        confimpassword: "",
        phone: "",
        address: "",
        city: "",
        gender:
          arrGenders && arrGenders.length > 0 ? arrGenders[0].roleKey : "",
        roleId: arrRoles && arrRoles.length > 0 ? arrRoles[0].roleKey : "",
        avatar: "",
        action: CRUD_ACTIONS.CREATE,
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
        avatar: base64,
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
    let arrInput = [
      "email",
      "name",
      "password",
      "confimpassword",
      "phone",
      "address",
      "city",
    ];
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

  handleSaveUser = () => {
    let isValid = this.checkValidateInput();
    if (isValid === false) return;

    let { action } = this.state;

    if (action === CRUD_ACTIONS.CREATE) {
      // fire redux create user
      this.props.createNewUser({
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        confirmPassword: this.state.confimpassword,
        phone: this.state.phone,
        address: this.state.address,
        city: this.state.city,
        avatar: this.state.avatar,
        gender: this.state.gender,
        roleId: this.state.roleId,
      });
    }
    if (action === CRUD_ACTIONS.EDIT) {
      // fire redux edit user
      this.props.editAUserRedux({
        id: this.state.userEditId,
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        confirmPassword: this.state.confimpassword,
        phone: this.state.phone,
        address: this.state.address,
        city: this.state.city,
        avatar: this.state.avatar,
        gender: this.state.gender,
        roleId: this.state.roleId,
      });
    }

    setTimeout(() => {
      this.props.fetchUserRedux();
    }, 1000);
  };

  handleEditUserFromParent = (user) => {
    let imageBase64 = "";
    if (user.avatar) {
      imageBase64 = new Buffer(user.avatar, "base64").toString("binary");
    }

    this.setState({
      email: user.email,
      name: user.name,
      password: user.password, // ko hien thi password
      confimpassword: user.confimpassword, // ko hien thi confimpassword
      phone: user.phone,
      address: user.address,
      city: user.city,
      gender: user.gender,
      roleId: user.roleId,
      avatar: "",
      previewAvatarUrl: imageBase64,
      action: CRUD_ACTIONS.EDIT,
      userEditId: user._id,
    });
  };

  render() {
    let genders = this.state.genderArr;
    let roles = this.state.roleArr;
    let language = this.props.language;
    let isLoadingGender = this.props.isLoadingGender;

    let {
      email,
      name,
      password,
      confimpassword,
      phone,
      address,
      city,
      gender,
      roleId,
      avatar,
    } = this.state;

    return (
      <div className="user-redux-container">
        <div className="title mb-5">
          <FormattedMessage id="manage-user.manage" />
        </div>
        <div className="user-redux-body">
          <div className="container">
            <div className="row">
              <div className="col-12">
                {isLoadingGender === true ? "Loading genders" : ""}
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.email" />{" "}
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={email}
                  onChange={(event) => this.onChangeInput(event, "email")}
                  disabled={
                    this.state.action === CRUD_ACTIONS.EDIT ? true : false
                  }
                />
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.name" />{" "}
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
                  <FormattedMessage id="manage-user.password" />{" "}
                </label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(event) => this.onChangeInput(event, "password")}
                  // disabled={
                  //   this.state.action === CRUD_ACTIONS.EDIT ? true : false
                  // }
                />
              </div>
              <div className="col-3">
                <label>
                  <FormattedMessage id="manage-user.confirm-password" />{" "}
                </label>
                <input
                  type="password"
                  className="form-control"
                  value={confimpassword}
                  onChange={(event) =>
                    this.onChangeInput(event, "confimpassword")
                  }
                  // disabled={
                  //   this.state.action === CRUD_ACTIONS.EDIT ? true : false
                  // }
                />
              </div>
              <div className="col-4">
                <label>
                  <FormattedMessage id="manage-user.phone-number" />{" "}
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={phone}
                  onChange={(event) => this.onChangeInput(event, "phone")}
                />
              </div>
              <div className="col-4">
                <label>
                  <FormattedMessage id="manage-user.address" />{" "}
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={address}
                  onChange={(event) => this.onChangeInput(event, "address")}
                />
              </div>
              <div className="col-4">
                <label>
                  <FormattedMessage id="manage-user.city" />{" "}
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={city}
                  onChange={(event) => this.onChangeInput(event, "city")}
                />
              </div>
              <div className="col-4">
                <label>
                  <FormattedMessage id="manage-user.gender" />{" "}
                </label>
                <select
                  className="form-control"
                  onChange={(event) => this.onChangeInput(event, "gender")}
                  value={gender}
                >
                  {genders &&
                    genders.length > 0 &&
                    genders.map((item, index) => {
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
                  <FormattedMessage id="manage-user.role" />{" "}
                </label>
                <select
                  className="form-control"
                  onChange={(event) => this.onChangeInput(event, "roleId")}
                  value={roleId}
                >
                  {roles &&
                    roles.length > 0 &&
                    roles.map((item, index) => {
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
                  <FormattedMessage id="manage-user.avatar" />{" "}
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
                  onClick={() => this.handleSaveUser()}
                >
                  {this.state.action === CRUD_ACTIONS.EDIT ? (
                    <FormattedMessage id="manage-user.edit" />
                  ) : (
                    <FormattedMessage id="manage-user.save" />
                  )}
                </button>
              </div>
              <div className="col-12 mb-5">
                <TableManageUser
                  handleEditUserFromParent={this.handleEditUserFromParent}
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
    genderRedux: state.admin.genders,
    roleRedux: state.admin.roles,
    isLoadingGender: state.admin.isLoadingGender,
    listUsers: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
    getRoleStart: () => dispatch(actions.fetchRoleStart()),
    createNewUser: (data) => dispatch(actions.createNewUser(data)),
    fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
    editAUserRedux: (data) => dispatch(actions.editAUser(data)),

    // processLogout: () => dispatch(actions.processLogout()),
    // changeLanguageAppRedux: (language) =>
    //   dispatch(actions.changeLanguageApp(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
