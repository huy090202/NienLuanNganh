import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./TableManage.scss";
import * as actions from "../../../store/actions";
import { getAllAdmins } from "../../../services/userService";

class TableManageAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrAdmins: [],
        };
    }

    async componentDidMount() {
        await this.fetchAdmins("All");
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        // Kiểm tra nếu props hoặc state đã thay đổi trước khi gọi lại fetchAdmins
        if (prevProps.language !== this.props.language) {
            await this.fetchAdmins("All");
        }
    }

    fetchAdmins = async (adminId) => {
        try {
            const res = await getAllAdmins(adminId);
            console.log(res);
            if (res && res.status === "OK") {
                this.setState({
                    arrAdmins: res.admins,
                });
            }
        } catch (error) {
            console.log("Error fetching admins:", error);
        }
    }




    handleDeleteUser = (staff) => {
        this.props.deleteAUserRedux(staff._id);
    };

    handleEditUser = (staff) => {
        this.props.handleEditUserFromParent(staff);
    };

    render() {
        let arrAdmins = this.state.arrAdmins;
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
                    {arrAdmins &&
                        arrAdmins.length > 0 &&
                        arrAdmins.map((item, index) => {
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

    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        deleteAUserRedux: (id) => dispatch(actions.deleteAUser(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageAdmin);
