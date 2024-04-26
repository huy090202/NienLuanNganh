import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import UserRedux from "../containers/System/Admin/UserRedux";
import ProductRedux from "../containers/System/Admin/ProductRedux";
import Catalog from "../containers/System/Admin/Catalog";
import Header from "../containers/Header/Header";
import Staffs from "../containers/System/Admin/Staffs";
import Admins from "../containers/System/Admin/Admins";
import TableOrder from "../containers/System/Admin/TableOrder";

class System extends Component {
  render() {
    const { systemMenuPath, isLoggedIn } = this.props;
    return (
      <React.Fragment>
        {isLoggedIn && <Header />}
        <div className="system-container">
          <div className="system-list">
            <Switch>
              <Route path="/system/user-user" component={UserRedux} />
              <Route path="/system/product-redux" component={ProductRedux} />
              <Route path="/system/manage-catalog" component={Catalog} />
              <Route path="/system/user-seller" component={Staffs} />
              <Route path="/system/admin-admin" component={Admins} />
              <Route path="/system/manage-order" component={TableOrder} />
              <Route
                component={() => {
                  return <Redirect to={systemMenuPath} />;
                }}
              />
            </Switch>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    systemMenuPath: state.app.systemMenuPath,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
