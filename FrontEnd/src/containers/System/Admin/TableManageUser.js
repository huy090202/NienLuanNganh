import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./TableManage.scss";
import * as actions from "../../../store/actions";

class TableManageUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userRedux: [],
    };
  }

  componentDidMount() {
    // fire action
    this.props.fetchUserRedux();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.listUsers !== this.props.listUsers) {
      this.setState({ userRedux: this.props.listUsers });
    }
  }

  handleDeleteUser = (user) => {
    this.props.deleteAUserRedux(user._id);
  };

  handleEditUser = (user) => {
    this.props.handleEditUserFromParent(user);
  };

  render() {
    let arrUsers = this.state.userRedux;
    return (
      <table id="TableManage">
        <tbody>
          <tr>
            <th>
              <FormattedMessage id="manage-user.table-email" />
            </th>
            <th>
              <FormattedMessage id="manage-user.table-name" />
            </th>
            <th>
              <FormattedMessage id="manage-user.table-phone-number" />
            </th>
            <th>
              <FormattedMessage id="manage-user.table-address" />
            </th>
            <th>
              <FormattedMessage id="manage-user.table-city" />
            </th>
            <th>
              <FormattedMessage id="manage-user.table-gender" />
            </th>
            <th>
              <FormattedMessage id="manage-user.table-role" />
            </th>
            <th>
              <FormattedMessage id="manage-user.table-action" />
            </th>
          </tr>
          {arrUsers &&
            arrUsers.length > 0 &&
            arrUsers.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.email}</td>
                  <td>{item.name}</td>
                  <td>{item.phone}</td>
                  <td>{item.address}</td>
                  <td>{item.city}</td>
                  <td>{item.gender}</td>
                  <td>{item.roleId}</td>
                  <td>
                    <button
                      className="btn-edit"
                      onClick={() => this.handleEditUser(item)}
                    >
                      <i className="fa-solid fa-pencil"></i>
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => this.handleDeleteUser(item)}
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
    language: state.app.language,
    // Hung ket qua cua action vao props
    listUsers: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
    deleteAUserRedux: (id) => dispatch(actions.deleteAUser(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
