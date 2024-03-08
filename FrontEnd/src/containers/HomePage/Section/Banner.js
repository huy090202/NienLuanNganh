import React, { Component } from "react";
import { connect } from "react-redux";

class Banner extends Component {
  render() {
    return (
      <div className="section-share section-banner">
        <div className="section-banner-header">
          <div className="section-banner-content">
            <div className="banner-img-left"></div>
          </div>
          <div className="section-banner-content">
            <div className="banner-img-right"></div>
          </div>
        </div>
      </div>
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
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Banner);
