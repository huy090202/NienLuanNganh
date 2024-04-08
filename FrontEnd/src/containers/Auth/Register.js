import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import { LANGUAGES, CRUD_ACTIONS } from "../../utils";

import "./style.scss";
import { FormattedMessage } from "react-intl";
import { handleLoginApi } from "../../services/userService";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderArr: [],
      email: "",
      name: "",
      password: "",
      confirmpassword: "",
      phone: "",
      address: "",
      city: "",
      gender: "",

      isShowPassword: false,
      isShowConfirmPassword: false,
      action: "",
      userEditId: "",
    };
  }

  async componentDidMount() {
    this.props.getGenderStart();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.genderRedux !== this.props.genderRedux) {
      let arrGenders = this.props.genderRedux;
      this.setState({
        genderArr: arrGenders,
        gender:
          arrGenders && arrGenders.length > 0 ? arrGenders[0].roleKey : "",
      });
    }
  }

  checkValidateInput = () => {
    let isValid = true;
    let arrInput = [
      "email",
      "name",
      "password",
      "confirmpassword",
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

  handleRegister = () => {
    let isValid = this.checkValidateInput();
    if (isValid === false) return;
    let arrGenders = this.props.genderRedux;
    let { action } = this.state;

    // fire redux create user
    this.props.createNewUser({
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmpassword,
      phone: this.state.phone,
      address: this.state.address,
      city: this.state.city,
      avatar: this.state.avatar,
      gender: this.state.gender,
    });

    this.setState({
      email: "",
      name: "",
      password: "",
      confirmpassword: "",
      phone: "",
      address: "",
      city: "",
      gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].roleKey : "",
    });
  };

  handleOnChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };

  handleShowHidePassword = () => {
    this.setState({
      isShowPassword: !this.state.isShowPassword,
    });
  };

  handleShowHideConfirmPassword = () => {
    this.setState({
      isShowConfirmPassword: !this.state.isShowConfirmPassword,
    });
  };

  render() {
    let genders = this.state.genderArr;
    let { language } = this.props;

    let {
      email,
      name,
      password,
      confirmpassword,
      phone,
      address,
      city,
      gender,
    } = this.state;

    return (
      <div className="login-background">
        <div className="login-container">
          <div className="login-content row">
            <div className="col-12 text-login">
              <FormattedMessage id="register.register" />
            </div>

            <div className="col-6 form-group input-login">
              <label>
                <FormattedMessage id="register.account" />
              </label>
              <input
                type="text"
                className="form-control"
                placeholder={
                  language === LANGUAGES.VI
                    ? "Nhập vào tài khoản email"
                    : "Enter your email"
                }
                value={email}
                onChange={(event) => this.handleOnChangeInput(event, "email")}
              />
            </div>

            <div className="col-6 form-group input-login">
              <label>
                <FormattedMessage id="register.fullName" />
              </label>
              <input
                type="text"
                className="form-control"
                placeholder={
                  language === LANGUAGES.VI
                    ? "Nhập vào họ tên"
                    : "Enter your full name"
                }
                value={name}
                onChange={(event) => this.handleOnChangeInput(event, "name")}
              />
            </div>

            <div className="col-12 form-group input-login">
              <label>
                <FormattedMessage id="register.password" />
              </label>
              <div className="custom-input-password">
                <input
                  type={this.state.isShowPassword ? "text" : "password"}
                  className="form-control"
                  placeholder={
                    language === LANGUAGES.VI
                      ? "Nhập vào mật khẩu"
                      : "Enter your password"
                  }
                  value={password}
                  onChange={(event) =>
                    this.handleOnChangeInput(event, "password")
                  }
                />
                <span onClick={() => this.handleShowHidePassword()}>
                  <i
                    className={
                      this.state.isShowPassword
                        ? "fa-regular fa-eye"
                        : "fa-regular fa-eye-slash"
                    }
                  ></i>
                </span>
              </div>
            </div>

            <div className="col-12 form-group input-login">
              <label>
                <FormattedMessage id="register.confirmPassword" />
              </label>
              <div className="custom-input-password">
                <input
                  type={this.state.isShowConfirmPassword ? "text" : "password"}
                  className="form-control"
                  placeholder={
                    language === LANGUAGES.VI
                      ? "Xác nhận lại mật khẩu"
                      : "Confirm your password"
                  }
                  value={confirmpassword}
                  onChange={(event) =>
                    this.handleOnChangeInput(event, "confirmpassword")
                  }
                />
                <span onClick={() => this.handleShowHideConfirmPassword()}>
                  <i
                    className={
                      this.state.isShowConfirmPassword
                        ? "fa-regular fa-eye"
                        : "fa-regular fa-eye-slash"
                    }
                  ></i>
                </span>
              </div>
            </div>

            <div className="col-6 form-group input-login">
              <label>
                <FormattedMessage id="register.phone" />
              </label>
              <input
                type="text"
                className="form-control"
                placeholder={
                  language === LANGUAGES.VI
                    ? "Nhập vào số điện thoại"
                    : "Enter your phone number"
                }
                value={phone}
                onChange={(event) => this.handleOnChangeInput(event, "phone")}
              />
            </div>

            <div className="col-6 form-group input-login">
              <label>
                <FormattedMessage id="register.address" />
              </label>
              <input
                type="text"
                className="form-control"
                placeholder={
                  language === LANGUAGES.VI
                    ? "Nhập vào địa chỉ"
                    : "Enter your address"
                }
                value={address}
                onChange={(event) => this.handleOnChangeInput(event, "address")}
              />
            </div>

            <div className="col-6 form-group input-login">
              <label>
                <FormattedMessage id="register.city" />
              </label>
              <input
                type="text"
                className="form-control"
                placeholder={
                  language === LANGUAGES.VI
                    ? "Nhập vào thành phố"
                    : "Enter your city"
                }
                value={city}
                onChange={(event) => this.handleOnChangeInput(event, "city")}
              />
            </div>

            <div className="col-6 form-group input-login">
              <label>
                <FormattedMessage id="register.gender" />
              </label>
              <select
                className="form-control"
                onChange={(event) => this.handleOnChangeInput(event, "gender")}
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

            <div className="col-12">
              <button
                className="button-login"
                onClick={() => this.handleRegister()}
              >
                <FormattedMessage id="register.register" />
              </button>
            </div>

            <div className="col-12 text-center py-5">
              <span className="text-other-login">
                <FormattedMessage id="register.yes-account" />{" "}
                <span
                  className="register"
                  onClick={() => this.props.navigate("/login")}
                >
                  <FormattedMessage id="register.login" />
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genderRedux: state.admin.genders,
    isLoadingGender: state.admin.isLoadingGender,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
    createNewUser: (data) => dispatch(actions.createNewUser(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
