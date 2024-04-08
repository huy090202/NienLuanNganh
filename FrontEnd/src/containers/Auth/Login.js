import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import { LANGUAGES } from "../../utils";

import "./style.scss";
import { FormattedMessage } from "react-intl";
import { handleLoginApi } from "../../services/userService";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isShowPassword: false,
      errMessage: "",
    };
  }

  handleOnChangeUsername = (event) => {
    this.setState({
      username: event.target.value,
    });
  };

  handleOnChangePassword = (event) => {
    this.setState({
      password: event.target.value,
    });
  };

  handleLogin = async () => {
    this.setState({
      errMessage: "",
    });

    try {
      let data = await handleLoginApi(this.state.username, this.state.password);
      if (data && data.status === "ERR") {
        this.setState({
          errMessage: data.message,
        });
      }

      if (data && data.status === "OK") {
        // save user info to redux
        // Khi dung access_token thi xoa checkUser
        this.props.userLoginSuccess(data.checkUser);
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data) {
          this.setState({
            errMessage: error.response.data.message,
          });
        }
      }
    }
  };

  handleShowHidePassword = () => {
    this.setState({
      isShowPassword: !this.state.isShowPassword,
    });
  };

  render() {
    let { language } = this.props;

    return (
      <div className="login-background">
        <div className="login-container">
          <div className="login-content row">
            <div className="col-12 text-login">
              <FormattedMessage id="login.login" />
            </div>
            <div className="col-12 form-group input-login">
              <label>
                <FormattedMessage id="login.account" />
              </label>
              <input
                type="text"
                className="form-control"
                placeholder={
                  language === LANGUAGES.VI
                    ? "Nhập vào tài khoản email của bạn"
                    : "Enter your email"
                }
                value={this.state.username}
                onChange={(event) => this.handleOnChangeUsername(event)}
              />
            </div>
            <div className="col-12 form-group input-login">
              <label>
                <FormattedMessage id="login.password" />
              </label>
              <div className="custom-input-password">
                <input
                  type={this.state.isShowPassword ? "text" : "password"}
                  className="form-control"
                  placeholder={
                    language === LANGUAGES.VI
                      ? "Nhập vào mật khẩu của bạn"
                      : "Enter your password"
                  }
                  value={this.state.password}
                  onChange={(event) => this.handleOnChangePassword(event)}
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
            <div className="col-12" style={{ color: "red" }}>
              {this.state.errMessage}
            </div>
            <div className="col-12">
              <button
                className="button-login"
                onClick={() => this.handleLogin()}
              >
                <FormattedMessage id="login.login" />
              </button>
            </div>
            <div className="col-12">
              <span className="forgot-password">
                <FormattedMessage id="login.forgot-password" />
              </span>
            </div>
            <div className="col-12 text-center mt-3">
              <span className="text-other-login">
                <FormattedMessage id="login.login-with" />
              </span>
            </div>
            <div className="col-12 social-login">
              <i className="fa-brands fa-google-plus-g google"></i>
              <i className="fa-brands fa-facebook-f facebook"></i>
            </div>
            <div className="col-12 text-center py-5">
              <span className="text-other-login">
                <FormattedMessage id="login.no-account" />{" "}
                <span
                  className="register"
                  onClick={() => this.props.navigate("/register")}
                >
                  <FormattedMessage id="login.register" />
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    // userLoginFail: () => dispatch(actions.userLoginFail()),
    userLoginSuccess: (userInfo) =>
      dispatch(actions.userLoginSuccess(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
