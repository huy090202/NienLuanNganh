import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { emitter } from "../../utils/emitter";

class ModalUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      address: "",
      phone: "",
      city: "",
    };

    this.listenToEmitter();
  }

  listenToEmitter = () => {
    // Nghe su kien (event) tu emitter
    emitter.on("EVENT_CLEAR_MODAL_DATA", () => {
      // reset lai state
      this.setState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        address: "",
        phone: "",
        city: "",
      });
    });
  };

  componentDidMount() {}

  toggle = () => {
    this.props.toggleFromParent();
  };

  handleOnChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;

    this.setState({
      ...copyState,
    });
  };

  checkValideInput = () => {
    let isValid = true;
    let arrInput = [
      "name",
      "email",
      "password",
      "confirmPassword",
      "address",
      "phone",
      "city",
    ];
    for (let i = 0; i < arrInput.length; i++) {
      // Check empty
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert("Missing parameter: " + arrInput[i]);
        break;
      }
      // Check password
      if (this.state.password !== this.state.confirmPassword) {
        isValid = false;
        alert("Password and ConfirmPassword are not match");
        break;
      }
    }
    return isValid;
  };

  handleAddNewUser = () => {
    let isValid = this.checkValideInput();
    if (isValid === true) {
      // Call API to add new user
      this.props.createNewUser(this.state);
    }
  };

  render() {
    // console.log("Huy check child props: ", this.props);
    // console.log("Huy check child openModal: ", this.props.isOpen);
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={() => {
          this.toggle();
        }}
        className={"modal-user-container"}
        size="lg"
      >
        <ModalHeader
          toggle={() => {
            this.toggle();
          }}
        >
          Create a new user
        </ModalHeader>
        <ModalBody>
          <div className="modal-user-body">
            <div className="input-container">
              <label>Name: </label>
              <input
                type="text"
                onChange={(event) => {
                  this.handleOnChangeInput(event, "name");
                }}
                value={this.state.name}
                placeholder="Enter your name"
              />
            </div>
            <div className="input-container">
              <label>Email: </label>
              <input
                type="text"
                onChange={(event) => {
                  this.handleOnChangeInput(event, "email");
                }}
                value={this.state.email}
                placeholder="Enter your email"
              />
            </div>
            <div className="input-container">
              <label>Password: </label>
              <input
                type="password"
                onChange={(event) => {
                  this.handleOnChangeInput(event, "password");
                }}
                value={this.state.password}
                placeholder="Enter your password"
              />
            </div>
            <div className="input-container">
              <label>ConfirmPassword: </label>
              <input
                type="password"
                onChange={(event) => {
                  this.handleOnChangeInput(event, "confirmPassword");
                }}
                value={this.state.confirmPassword}
                placeholder="Enter your confirm password"
              />
            </div>
            <div className="input-container max-width-input">
              <label>Address: </label>
              <input
                type="text"
                onChange={(event) => {
                  this.handleOnChangeInput(event, "address");
                }}
                value={this.state.address}
                placeholder="Enter your address"
              />
            </div>
            <div className="input-container">
              <label>Phone number: </label>
              <input
                type="text"
                onChange={(event) => {
                  this.handleOnChangeInput(event, "phone");
                }}
                value={this.state.phone}
                placeholder="Enter your phone number"
              />
            </div>
            <div className="input-container">
              <label>City: </label>
              <input
                type="text"
                onChange={(event) => {
                  this.handleOnChangeInput(event, "city");
                }}
                value={this.state.city}
                placeholder="Enter your city"
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            className="px-3"
            onClick={() => {
              this.handleAddNewUser();
            }}
          >
            Add new
          </Button>{" "}
          <Button
            color="secondary"
            className="px-3"
            onClick={() => {
              this.toggle();
            }}
          >
            Close
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
