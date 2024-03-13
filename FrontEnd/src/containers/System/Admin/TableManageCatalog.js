import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./TableManage.scss";
import * as actions from "../../../store/actions";

class TableManageCatalog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      catalogs: [],
    };
  }

  componentDidMount() {
    // fire action
    this.props.fetchCatalog();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.listCatalogs !== this.props.listCatalogs) {
      this.setState({ catalogs: this.props.listCatalogs });
    }
  }

  handleDeleteCatalog = (catalog) => {
    this.props.deleteACatalog(catalog._id);
  };

  handleEditCatalog = (catalog) => {
    this.props.handleEditCatalogFromParent(catalog);
  };

  render() {
    let arrCatalogs = this.state.catalogs;
    return (
      <table id="TableManage">
        <tbody>
          <tr>
            <th>Role Name</th>
            <th>Role Key</th>
            <th>Role Value Vi</th>
            <th>Role Value En</th>
            <th>Actions</th>
          </tr>
          {arrCatalogs &&
            arrCatalogs.length > 0 &&
            arrCatalogs.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.roleName}</td>
                  <td>{item.roleKey}</td>
                  <td>{item.roleValueVi}</td>
                  <td>{item.roleValueEn}</td>
                  <td>
                    <button
                      className="btn-edit"
                      onClick={() => this.handleEditCatalog(item)}
                    >
                      <i className="fa-solid fa-pencil"></i>
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => this.handleDeleteCatalog(item)}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    // Hung ket qua cua action vao props
    listCatalogs: state.admin.catalogs,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCatalog: () => dispatch(actions.fetchAllCatalogsStart()),
    deleteACatalog: (id) => dispatch(actions.deleteACatalog(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageCatalog);
