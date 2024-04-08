import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeHeader.scss";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../utils";

import { changeLanguageApp } from "../../store/actions";
import { withRouter } from "react-router";

import "bootstrap/dist/js/bootstrap.bundle.min.js";

class HomeHeader extends Component {
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

  render() {
    let language = this.props.language;

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
                  class="offcanvas offcanvas-start"
                  tabindex="-1"
                  id="offcanvasExample"
                  aria-labelledby="offcanvasExampleLabel"
                >
                  <div class="offcanvas-header">
                    <div
                      class="offcanvas-title header-logo"
                      id="offcanvasExampleLabel"
                    ></div>
                    <button
                      type="button"
                      class="btn-close text-reset"
                      data-bs-dismiss="offcanvas"
                      aria-label="Close"
                    ></button>
                  </div>
                  <ul class="list-group list-group-flush mt-3">
                    <li
                      class="list-group-item p-3 d-flex align-items-center"
                      onClick={() => this.handleGoToLoginPage()}
                    >
                      <i className="fa-solid fa-right-to-bracket"></i>
                      <span>
                        <FormattedMessage id="login.login" />
                      </span>
                    </li>
                    <li class="list-group-item p-3 d-flex align-items-center">
                      <i className="fa-solid fa-id-card"></i>
                      <span>
                        <FormattedMessage id="homeheader.info" />
                      </span>
                    </li>
                    <li
                      class="list-group-item p-3 d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                    >
                      <i className="fa-solid fa-handshake"></i>
                      <span>
                        <FormattedMessage id="homeheader.Seller-channel" />
                      </span>

                      <div
                        class="modal fade"
                        id="exampleModal"
                        tabindex="-1"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                      >
                        <div class="modal-dialog">
                          <div class="modal-content">
                            <div class="modal-header">
                              <div class="modal-title" id="exampleModalLabel">
                                <FormattedMessage id="homeheader.Seller-channel" />
                              </div>
                              <button
                                type="button"
                                class="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              ></button>
                            </div>
                            <div class="modal-body">
                              <FormattedMessage id="homeheader.modal-body" />
                            </div>
                            <div class="modal-footer">
                              <button
                                type="button"
                                class="btn btn-secondary"
                                data-bs-dismiss="modal"
                              >
                                <FormattedMessage id="homeheader.modal-exit" />
                              </button>
                              <button type="button" class="btn btn-primary">
                                <FormattedMessage id="homeheader.modal-send" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li class="list-group-item p-3 d-flex align-items-center">
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
                <i className="fa-solid fa-search"></i>
                <input
                  type="text"
                  placeholder={
                    language === LANGUAGES.VI
                      ? "Nhập vào từ khóa tìm kiếm của bạn"
                      : "Enter your search keyword"
                  }
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
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HomeHeader)
);
