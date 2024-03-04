import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeHeader.scss";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../utils";

import { changeLanguageApp } from "../../store/actions";

class HomeHeader extends Component {
  changeLanguage = (language) => {
    // fire redux event (actions)
    this.props.changeLanguageAppRedux(language);
  };

  render() {
    let language = this.props.language;

    return (
      <>
        <div className="home-header-container">
          <div className="home-header-content">
            <div className="left-content">
              <i className="fa-solid fa-bars"></i>
              <div className="header-logo"></div>
            </div>
            <div className="center-content">
              <div className="header-search">
                <i className="fa-solid fa-search"></i>
                <input type="text" placeholder="Enter your search..." />
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
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
