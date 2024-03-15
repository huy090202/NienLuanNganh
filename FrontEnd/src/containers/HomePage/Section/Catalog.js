import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../../utils";

import Slider from "react-slick";
import * as actions from "../../../store/actions";

class Catalog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrCatalogs: [],
    };
  }

  componentDidMount() {
    this.props.loadAllCatalogs();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.listCatalogs !== this.props.listCatalogs) {
      this.setState({
        arrCatalogs: this.props.listCatalogs,
      });
    }
  }

  render() {
    let arrCatalogs = this.state.arrCatalogs;
    let { language } = this.props;

    return (
      <div className="section-share section-catalog">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">
              <FormattedMessage id="homepage.catalog" />
            </span>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings1}>
              {arrCatalogs &&
                arrCatalogs.length > 0 &&
                arrCatalogs.map((item, index) => {
                  let imageBase64 = "";
                  if (item.roleImage) {
                    imageBase64 = new Buffer(item.roleImage, "base64").toString(
                      "binary"
                    );
                  }

                  let nameCatalogVi = `${item.roleValueVi}`;
                  let nameCatalogEn = `${item.roleValueEn}`;
                  return (
                    <div className="img-customize " key={index}>
                      <div className="catalog-img">
                        <div
                          className="img-son"
                          style={{ backgroundImage: `url(${imageBase64})` }}
                        />
                        <div className="img-title text-center">
                          {language === LANGUAGES.VI
                            ? nameCatalogVi
                            : nameCatalogEn}
                        </div>
                      </div>
                    </div>
                  );
                })}
            </Slider>
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
    listCatalogs: state.admin.catalogs,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadAllCatalogs: () => dispatch(actions.fetchAllCatalogsStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Catalog);
