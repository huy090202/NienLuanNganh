import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";

import * as actions from "../../store/actions";
import Navigator from "../../components/Navigator";
import { adminMenu, sellerMenu } from "./menuApp";
import "./Header.scss";
import { LANGUAGES, USER_ROLE } from "../../utils";
import _ from "lodash";
import { withRouter } from "react-router";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuApp: [],
    };
  }

  handleChangeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };

  componentDidMount() {
    let { userInfo } = this.props;
    let menu = [];

    if (userInfo && !_.isEmpty(userInfo)) {
      let role = userInfo.roleId;

      if (role === USER_ROLE.ADMIN) {
        menu = adminMenu;
      } else if (role === USER_ROLE.SELLER) {
        menu = sellerMenu;
      }
    }

    this.setState({
      menuApp: menu,
    });
  }

  handleGoHome = () => {
    this.props.history.push("/home");
  }

  render() {
    const { processLogout, language, userInfo } = this.props;

    return (
      <div className="header-container">
        {/* thanh navigator */}
        <div className="header-tabs-container">
          <Navigator menus={this.state.menuApp} />
        </div>

        <div className="header-goHome" onClick={() => this.handleGoHome()}>
          <i className="fa-solid fa-house"></i>
        </div>

        <div className="languages">
          <span className="welcome">
            <FormattedMessage id="homeheader.welcome" />,{" "}
            {userInfo && userInfo.name ? userInfo.name : userInfo.email}!
          </span>
          <span
            className={
              language === LANGUAGES.VI ? "language-vi active" : "language-vi"
            }
            onClick={() => this.handleChangeLanguage(LANGUAGES.VI)}
          >
            <FormattedMessage id="homeheader.vi" />
          </span>
          <span
            className={
              language === LANGUAGES.EN ? "language-en active" : "language-en"
            }
            onClick={() => this.handleChangeLanguage(LANGUAGES.EN)}
          >
            <FormattedMessage id="homeheader.en" />
          </span>
          {/* nút logout */}
          <div
            className="btn btn-logout"
            onClick={processLogout}
            title="Log out"
          >
            <i className="fas fa-sign-out-alt"></i>
          </div>
        </div>
      </div>
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
    changeLanguageAppRedux: (language) =>
      dispatch(actions.changeLanguageApp(language)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
