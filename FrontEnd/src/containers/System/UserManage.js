import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserManage.scss";
import {
  getAllUsers,
  createNewUserService,
  deleteUserService,
  editUserService,
} from "../../services/userService";
import ModalUser from "./ModalUser";
import { emitter } from "../../utils/emitter";
import ModalEditUser from "./ModalEditUser";

class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUsers: [],
      isOpenModalUser: false,
      isOpenModalEditUser: false,
      userEdit: {},
    };
  }

  async componentDidMount() {
    await this.getAllUsersFromReact();
  }

  getAllUsersFromReact = async () => {
    const response = await getAllUsers("All");

    if (response && response.status === "OK") {
      this.setState({
        arrUsers: response.users,
      });
    }
  };

  handleAddNewUser = () => {
    this.setState({
      isOpenModalUser: true,
    });
  };

  toggleUserModal = () => {
    this.setState({
      isOpenModalUser: !this.state.isOpenModalUser,
    });
  };

  toggleUserEditModal = () => {
    this.setState({
      isOpenModalEditUser: !this.state.isOpenModalEditUser,
    });
  };

  createNewUser = async (data) => {
    try {
      let response = await createNewUserService(data);
      // console.log("Huy check createNewUser: ", response);
      if (response && response.status === "OK") {
        await this.getAllUsersFromReact();
        this.toggleUserModal();
        // truyen su kien (event) len component cha
        emitter.emit("EVENT_CLEAR_MODAL_DATA");
      } else {
        alert("Error in createNewUser: " + response.message);
      }
    } catch (error) {
      console.log("Error in createNewUser: ", error);
    }
  };

  editUser = async (user) => {
    try {
      let res = await editUserService(user);
      if (res && res.status === "OK") {
        await this.getAllUsersFromReact();
        this.toggleUserEditModal();
      } else {
        alert("Error in editUser: " + res.message);
      }
    } catch (error) {
      console.log("Error in editUser: ", error);
    }
  };

  handleDeleteUser = async (user) => {
    // console.log("Huy check handleDeleteUser: ", user);
    try {
      let res = await deleteUserService(user._id);
      if (res && res.status === "OK") {
        await this.getAllUsersFromReact();
      } else {
        alert("Error in handleDeleteUser: " + res.message);
      }
    } catch (error) {
      console.log("Error in handleDeleteUser: ", error);
    }
  };

  handleEditUser = async (user) => {
    // console.log("Huy check handleEditUser: ", user);
    this.setState({
      isOpenModalEditUser: true,
      userEdit: user,
    });
  };

  render() {
    let arrUsers = this.state.arrUsers;
    return (
      <div className="users-container">
        <ModalUser
          isOpen={this.state.isOpenModalUser}
          toggleFromParent={this.toggleUserModal}
          createNewUser={this.createNewUser}
        />
        {this.state.isOpenModalEditUser && (
          <ModalEditUser
            isOpen={this.state.isOpenModalEditUser}
            toggleFromParent={this.toggleUserEditModal}
            currenUser={this.state.userEdit}
            editUser={this.editUser}
          />
        )}
        <div className="title text-center">Manage users</div>
        <div className="mx-1">
          <button
            className="btn btn-primary px-3"
            onClick={() => this.handleAddNewUser()}
          >
            <i className="fa-solid fa-plus"></i>
            <span> Add new user</span>
          </button>
        </div>
        <div className="users-table mt-3 mx-1">
          <table id="customers">
            <tbody>
              <tr>
                <th>Email</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Address</th>
                <th>City</th>
                <th>Actions</th>
              </tr>
              {arrUsers &&
                arrUsers.map((item, index) => {
                  // console.log("Huy check map: ", item, index);
                  return (
                    <tr>
                      <td>{item.email}</td>
                      <td>{item.name}</td>
                      <td>{item.phone}</td>
                      <td>{item.address}</td>
                      <td>{item.city}</td>
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
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
