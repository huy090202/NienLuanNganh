import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeHeader.scss";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../utils";

import * as actions from "../../store/actions";
import { changeLanguageApp } from "../../store/actions";
import { withRouter } from "react-router";

import "bootstrap/dist/js/bootstrap.bundle.min.js";

class HomeHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyWord: "",
    };
  }
  changeLanguage = (language) => {
    // fire redux event (actions)
    this.props.changeLanguageAppRedux(language);
  };

  handleGoToHomePage = () => {
    this.props.history.push(`/home`);
  };

  handleGoToLoginPage = () => {
    this.props.history.push(`/login`);
  };

  handleOnchangeKeyword = (event) => {
    this.setState({
      keyWord: event.target.value,
    });
  }

  handleSearch = () => {
    try {
      let { keyWord } = this.state;
      console.log("keyWord: ", keyWord);
      this.props.history.push(`/search?keyWord=${keyWord}`);
    } catch (error) {
      console.log("error: ", error);
    }
  }

  render() {
    let language = this.props.language;
    let userInfo = this.props.userInfo;
    let { processLogout } = this.props;

    let imageBase64 = "";
    if (userInfo && userInfo.avatar) {
      imageBase64 = new Buffer(userInfo.avatar, "base64").toString("binary");
    }

    return (
      <>
        <div className="home-header-container">
          <div className="home-header-content">
            <div className="left-content">
              <div className="header-setting">
                <button
                  className="btn-setting"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasExample"
                  aria-controls="offcanvasExample"
                >
                  <i className="fa-solid fa-gears"></i>
                </button>

                <div
                  className="offcanvas offcanvas-start"
                  tabIndex="-1"
                  id="offcanvasExample"
                  aria-labelledby="offcanvasExampleLabel"
                >
                  <div className="offcanvas-header">
                    <div
                      className="offcanvas-title d-flex align-items-center gap-3"
                      id="offcanvasExampleLabel"
                    >
                      <div
                        className="userAvatar rounded-circle d-flex align-items-center justify-content-center"
                        style={{ backgroundImage: `url(${imageBase64})` }}
                      ></div>
                      <div className="userName">
                        <FormattedMessage id="homeheader.welcome" />
                        {", "}
                        {userInfo && userInfo.name ? (
                          userInfo.name
                        ) : (
                          <FormattedMessage id="homeheader.welcome" />
                        )}
                      </div>
                    </div>
                    <button
                      type="button"
                      className="btn-close text-reset"
                      data-bs-dismiss="offcanvas"
                      aria-label="Close"
                    ></button>
                  </div>
                  <ul className="list-group list-group-flush mt-3">
                    <li
                      className={
                        userInfo
                          ? "list-group-item p-3 d-flex align-items-center d-none"
                          : "list-group-item p-3 d-flex align-items-center"
                      }
                      onClick={() => this.handleGoToLoginPage()}
                    >
                      <i className="fa-solid fa-right-to-bracket"></i>
                      <span>
                        <FormattedMessage id="login.login" />
                      </span>
                    </li>
                    <li
                      className={
                        userInfo
                          ? "list-group-item p-3 d-flex align-items-center"
                          : "list-group-item p-3 d-flex align-items-center d-none"
                      }
                      data-bs-toggle="modal"
                      data-bs-target="#staticBackdrop"
                    >
                      <i className="fa-solid fa-id-card"></i>
                      <span>
                        <FormattedMessage id="homeheader.info" />
                      </span>
                    </li>

                    <div
                      className="modal fade"
                      id="staticBackdrop"
                      data-bs-backdrop="static"
                      data-bs-keyboard="false"
                      tabIndex="-1"
                      aria-labelledby="staticBackdropLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5
                              className="modal-title"
                              id="staticBackdropLabel"
                            >
                              <FormattedMessage id="homeheader.info" />
                            </h5>
                            <button
                              type="button"
                              className="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div className="modal-body">
                            <div className="login-content row">
                              <div className="col-12 form-group input-login">
                                <label>Account</label>
                                <input
                                  type="text"
                                  disabled
                                  className="form-control"
                                  placeholder={
                                    language === LANGUAGES.VI
                                      ? "Nhập vào tài khoản email"
                                      : "Enter your email"
                                  }
                                  value={
                                    userInfo && userInfo.email
                                      ? userInfo.email
                                      : ""
                                  }
                                // onChange={(event) =>
                                //   this.handleOnChangeInput(event, "email")
                                // }
                                />
                              </div>
                              <div className="col-12 form-group input-login">
                                <label>Name</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder={
                                    language === LANGUAGES.VI
                                      ? "Nhập vào họ tên"
                                      : "Enter your full name"
                                  }
                                  value={
                                    userInfo && userInfo.name
                                      ? userInfo.name
                                      : ""
                                  }
                                // onChange={(event) =>
                                //   this.handleOnChangeInput(event, "name")
                                // }
                                />
                              </div>
                              <div className="col-12 form-group input-login">
                                <label>Phone</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder={
                                    language === LANGUAGES.VI
                                      ? "Nhập vào số điện thoại"
                                      : "Enter your phone number"
                                  }
                                  value={
                                    userInfo && userInfo.phone
                                      ? userInfo.phone
                                      : ""
                                  }
                                // onChange={(event) =>
                                //   this.handleOnChangeInput(event, "phone")
                                // }
                                />
                              </div>
                              <div className="col-12 form-group input-login">
                                <label>Address</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder={
                                    language === LANGUAGES.VI
                                      ? "Nhập vào địa chỉ"
                                      : "Enter your address"
                                  }
                                  value={
                                    userInfo && userInfo.address
                                      ? userInfo.address
                                      : ""
                                  }
                                // onChange={(event) =>
                                //   this.handleOnChangeInput(event, "address")
                                // }
                                />
                              </div>
                              <div className="col-6 form-group input-login">
                                <label>City</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder={
                                    language === LANGUAGES.VI
                                      ? "Nhập vào thành phố"
                                      : "Enter your city"
                                  }
                                  value={
                                    userInfo && userInfo.city
                                      ? userInfo.city
                                      : ""
                                  }
                                // onChange={(event) =>
                                //   this.handleOnChangeInput(event, "city")
                                // }
                                />
                              </div>
                              <div className="col-6 form-group input-login">
                                <label>
                                  <FormattedMessage id="register.gender" />
                                </label>
                                <select
                                  className="form-control"
                                  // onChange={(event) =>
                                  //   this.handleOnChangeInput(event, "gender")
                                  // }
                                  value={
                                    userInfo && userInfo.gender
                                      ? userInfo.gender
                                      : ""
                                  }
                                >
                                  <option value="">
                                    {userInfo && userInfo.gender
                                      ? userInfo.gender
                                      : ""}
                                  </option>
                                  {/* {genders &&
                                    genders.length > 0 &&
                                    genders.map((item, index) => {
                                      return (
                                        <option
                                          key={index}
                                          value={item.roleKey}
                                        >
                                          {language === LANGUAGES.VI
                                            ? item.roleValueVi
                                            : item.roleValueEn}
                                        </option>
                                      );
                                    })} */}
                                </select>
                              </div>
                            </div>
                          </div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="btn btn-secondary"
                              data-bs-dismiss="modal"
                            >
                              <FormattedMessage id="homeheader.modal-exit" />
                            </button>
                            <button type="button" className="btn btn-primary">
                              <FormattedMessage id="homeheader.modal-save" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <li
                      className={
                        userInfo
                          ? "list-group-item p-3 d-flex align-items-center"
                          : "list-group-item p-3 d-flex align-items-center d-none"
                      }
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                    >
                      <i className="fa-solid fa-handshake"></i>
                      <span>
                        <FormattedMessage id="homeheader.Seller-channel" />
                      </span>

                      <div
                        className="modal fade"
                        id="exampleModal"
                        tabIndex="-1"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                      >
                        <div className="modal-dialog">
                          <div className="modal-content">
                            <div className="modal-header">
                              <div
                                className="modal-title"
                                id="exampleModalLabel"
                              >
                                <FormattedMessage id="homeheader.Seller-channel" />
                              </div>
                              <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              ></button>
                            </div>
                            <div className="modal-body">
                              <FormattedMessage id="homeheader.modal-body" />
                            </div>
                            <div className="modal-footer">
                              <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                              >
                                <FormattedMessage id="homeheader.modal-exit" />
                              </button>
                              <button type="button" className="btn btn-primary">
                                <FormattedMessage id="homeheader.modal-send" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>

                    <li
                      className={
                        userInfo
                          ? "list-group-item p-3 d-flex align-items-center"
                          : "list-group-item p-3 d-flex align-items-center d-none"
                      }
                      onClick={processLogout}
                    >
                      <i className="fa-solid fa-right-from-bracket"></i>
                      <span>
                        <FormattedMessage id="homeheader.logout" />
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div
                className="header-logo"
                onClick={() => this.handleGoToHomePage()}
              ></div>
            </div>

            <div className="center-content">
              <div className="header-search">
                <i className="fa-solid fa-search" onClick={() => this.handleSearch()}></i>

                <input
                  type="text"
                  placeholder={
                    language === LANGUAGES.VI
                      ? "Nhập vào từ khóa tìm kiếm của bạn"
                      : "Enter your search keyword"
                  }
                  value={this.state.keyWord}
                  onChange={(event) => this.handleOnchangeKeyword(event)}
                />
              </div>
            </div>

            <div className="right-content">
              <div className="header-cart">
                <i className="fa-solid fa-cart-shopping"></i>

                <span>
                  <FormattedMessage id="homeheader.cart" />
                </span>
              </div>

              <div
                className={
                  language === LANGUAGES.VI
                    ? "header-language-vi active"
                    : "header-language-vi"
                }
              >
                <span onClick={() => this.changeLanguage(LANGUAGES.VI)}>
                  <FormattedMessage id="homeheader.vi" />
                </span>
              </div>

              <div
                className={
                  language === LANGUAGES.EN
                    ? "header-language-en active"
                    : "header-language-en"
                }
              >
                <span onClick={() => this.changeLanguage(LANGUAGES.EN)}>
                  <FormattedMessage id="homeheader.en" />
                </span>
              </div>
            </div>
          </div>
        </div>

        {this.props.isShowBanner === true && (
          <div className="home-header-banner">
            <div className="header-banner-up">
              <div className="header-title1">
                <FormattedMessage id="banner.title1" />
              </div>

              <div className="header-title2">
                <FormattedMessage id="banner.title2" />
              </div>
            </div>

            <div className="header-banner-down">
              <div className="header-options">
                <div className="header-option-child">
                  <div className="icon-child">
                    <i className="fa-solid fa-truck"></i>
                  </div>

                  <div className="text-child">
                    <FormattedMessage id="banner.delivery" />
                  </div>
                </div>

                <div className="header-option-child">
                  <div className="icon-child">
                    <i className="fa-solid fa-shield-halved"></i>
                  </div>

                  <div className="text-child">
                    <FormattedMessage id="banner.warranty" />
                  </div>
                </div>

                <div className="header-option-child">
                  <div className="icon-child">
                    <i className="fa-solid fa-right-left"></i>
                  </div>

                  <div className="text-child">
                    <FormattedMessage id="banner.return" />
                  </div>
                </div>

                <div className="header-option-child">
                  <div className="icon-child">
                    <i className="fa-solid fa-boxes-stacked"></i>
                  </div>

                  <div className="text-child">
                    <FormattedMessage id="banner.choice" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(actions.processLogout()),
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HomeHeader)
);
