import React, { Component } from "react";
import { connect } from "react-redux";

class HomeFooter extends Component {
  render() {
    return (
      <div className="home-footer text-left">
        <p>
          &copy; 2024 Phạm Đang Huy Shopping Online Solution.{" "}
          <a href="/">Go home</a>
        </p>
        <div className="footer-contact">
          <div className="footer-icon">
            <i className="fa-brands fa-facebook"></i>
          </div>
          <div className="footer-icon">
            <i className="fa-brands fa-square-instagram"></i>
          </div>
          <div className="footer-icon">
            <i className="fa-brands fa-twitter"></i>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
