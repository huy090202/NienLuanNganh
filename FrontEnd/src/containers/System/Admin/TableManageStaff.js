import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./TableManage.scss";
import * as actions from "../../../store/actions";
import { getAllStaffs } from "../../../services/userService";

class TableManageStaff extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrStaffs: [],
        };
    }

    async componentDidMount() {
        await this.fetchStaffs("All");
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        // Kiểm tra nếu props hoặc state đã thay đổi trước khi gọi lại fetchStaffs
        if (prevProps.language !== this.props.language) {
            await this.fetchStaffs("All");
        }
    }

    fetchStaffs = async (staffId) => {
        try {
            const res = await getAllStaffs(staffId);
            console.log(res);
            if (res && res.status === "OK") {
                this.setState({
                    arrStaffs: res.staffs,
                });
            }
        } catch (error) {
            console.log("Error fetching staffs:", error);
        }
    }




    handleDeleteUser = (staff) => {
        this.props.deleteAUserRedux(staff._id);
    };

    handleEditUser = (staff) => {
        this.props.handleEditUserFromParent(staff);
    };

    render() {
        let arrStaffs = this.state.arrStaffs;
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
                    {arrStaffs &&
                        arrStaffs.length > 0 &&
                        arrStaffs.map((item, index) => {
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

export default connect(mapStateToProps, mapDispatchToProps)(TableManageStaff);
