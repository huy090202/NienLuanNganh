import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { LANGUAGES } from "../../../utils";

import "./AllProduct.scss";
import * as actions from "../../../store/actions";
import HomeHeader from "../../HomePage/HomeHeader";
import ProductWithCatalog from "./ProductWithCatalog";

class AllProduct extends Component {
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

  //   handleViewProductWithCatalog = (catalogId) => {
  //     console.log("View product with catalog: ", catalogId);
  //     this.props.history.push(`/all-product/${catalogId}`);
  //   };

  render() {
    let { language } = this.props;
    let arrCatalogs = this.state.arrCatalogs;
    return (
      <>
        <HomeHeader />
        <div className="container my-5">
          <div className="row">
            <div className="col-3 allProduct-content-left">
              <ul class="list-group list-group-flush">
                <li class="list-group-item active">
                  <FormattedMessage id="homepage.catalog" />
                </li>
              </ul>
              {arrCatalogs &&
                arrCatalogs.length > 0 &&
                arrCatalogs.map((item, index) => {
                  let nameCatalog =
                    language === LANGUAGES.VI
                      ? item.roleValueVi
                      : item.roleValueEn;

                  return (
                    <>
                      <ul class="list-group list-group-flush" key={index}>
                        <li class="list-group-item">{nameCatalog}</li>
                      </ul>
                    </>
                  );
                })}
            </div>
            <div className="col-9 allProduct-content-right">
              <div className="row">
                <div className="mb-1 text-right">
                  <div class="dropdown">
                    <button
                      class="btn btn-secondary dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i className="fa-solid fa-filter-circle-dollar"></i>
                    </button>
                    <ul
                      class="dropdown-menu"
                      aria-labelledby="dropdownMenuButton1"
                    >
                      <li>
                        <a class="dropdown-item" href="#">
                          <FormattedMessage id="homepage.Under " /> 100.000đ
                        </a>
                      </li>
                      <li>
                        <a class="dropdown-item" href="#">
                          100.000đ - 500.000đ
                        </a>
                      </li>
                      <li>
                        <a class="dropdown-item" href="#">
                          <FormattedMessage id="homepage.Over" /> 500.000đ
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <ProductWithCatalog />
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
    language: state.app.language,
    listCatalogs: state.admin.catalogs,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadAllCatalogs: () => dispatch(actions.fetchAllCatalogsStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllProduct);
