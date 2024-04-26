import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./TableManage.scss";
import * as actions from "../../../store/actions";
import { getAllOrder } from "../../../services/productService";

class TableOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrOrders: [],
            orderStatusMap: {} // Thêm một state mới để lưu trữ trạng thái của đơn hàng
        };
    }

    async componentDidMount() {
        await this.fetchOrders();
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {
            await this.fetchOrders();
        }
    }

    fetchOrders = async () => {
        try {
            const res = await getAllOrder();
            console.log(res);
            if (res && res.status === "OK") {
                // Cập nhật trạng thái của mỗi đơn hàng dựa trên giá trị statusOrder
                const orderStatusMap = res.data.reduce((acc, order) => {
                    acc[order._id] = order.statusOrder === 1 ? "Đã xác nhận" : "Chờ xác nhận";
                    return acc;
                }, {});
                this.setState({
                    arrOrders: res.data,
                    orderStatusMap: orderStatusMap
                });
            }
        } catch (error) {
            console.log("Error fetching order:", error);
        }
    }

    handleDeleteUser = (staff) => {
        this.props.deleteAUserRedux(staff._id);
    };

    handleEditUser = (staff) => {
        this.props.handleEditUserFromParent(staff);
    };

    render() {
        const { arrOrders, orderStatusMap } = this.state;
        return (
            <table id="TableManage">
                <thead>
                    <tr className="text-center">
                        <td className="fs-2 fw-bold py-5" colSpan="6">
                            <FormattedMessage id="manage-user.order-list" />
                        </td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>
                            <FormattedMessage id="manage-user.order-user" />
                        </th>
                        <th>
                            <FormattedMessage id="manage-user.order-product" />
                        </th>
                        <th>
                            <FormattedMessage id="manage-user.order-status" />
                        </th>
                        <th>
                            <FormattedMessage id="manage-user.order-payment" />
                        </th>
                        <th>
                            <FormattedMessage id="manage-user.order-shippingPrice" />
                        </th>
                        <th>
                            <FormattedMessage id="manage-user.order-dayCreate" />
                        </th>
                    </tr>
                    {arrOrders &&
                        arrOrders.length > 0 &&
                        arrOrders.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.userId}</td>
                                    <td>{item.productId}</td>
                                    <td>{orderStatusMap[item._id]}</td> {/* Hiển thị trạng thái từ orderStatusMap */}
                                    <td>{item.paymentMethod}</td>
                                    <td>{item.shippingPrice}</td>
                                    <td>{item.dayCreated}</td>
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

export default connect(mapStateToProps, mapDispatchToProps)(TableOrder);
