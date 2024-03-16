import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./DescriptionProduct.scss";
import * as actions from "../../../store/actions";

import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import Select from "react-select";
import { LANGUAGES } from "../../../utils";

const mdParser = new MarkdownIt(/* Markdown-it options */);

class TableAddDescription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentHtml: "",
      contentMarkdown: "",
      selectedProduct: "",
      listProductsDescription: [],
    };
  }

  componentDidMount() {
    this.props.fetchAllProductsDescription();
  }

  buiDataSelect = (data) => {
    let result = [];

    if (data && data.length > 0) {
      data.map((item, index) => {
        let object = {};
        object.label = item.name;
        object.value = item._id;
        result.push(object);
      });
    }

    return result;
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      prevProps.allProductsDescription !== this.props.allProductsDescription
    ) {
      let dataSelect = this.buiDataSelect(this.props.allProductsDescription);
      this.setState({
        listProductsDescription: dataSelect,
      });
    }
  }

  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentHtml: html,
      contentMarkdown: text,
    });
  };

  handleSaveContentDescription = () => {
    this.props.saveProductsDescription({
      typeProductId: this.state.selectedProduct.value,
      contentHtml: this.state.contentHtml,
      contentMarkdown: this.state.contentMarkdown,
    });
  };

  handleChange = (selectedProduct) => {
    this.setState({ selectedProduct });
    console.log(`Option selected:`, selectedProduct);
  };

  render() {
    return (
      <div className="description-container">
        <div className="col-12">
          <div className="title mb-5">Thêm thông tin sản phẩm</div>
        </div>

        <div className="select-save">
          <div className="left">
            <label>Chọn sản phẩm</label>
            <Select
              value={this.state.selectedProduct}
              options={this.state.listProductsDescription}
              onChange={this.handleChange}
              className="form-control description-select"
            />
          </div>

          <div className="right">
            <button
              className="save-content-description btn btn-primary mt-4"
              onClick={() => this.handleSaveContentDescription()}
            >
              Lưu thông tin sản phẩm
            </button>
          </div>
        </div>

        <div className="description-editor mt-4">
          <MdEditor
            style={{ height: "500px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.handleEditorChange}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    allProductsDescription: state.admin.allProductsDescription,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllProductsDescription: () =>
      dispatch(actions.fetchAllProductsDescription()),
    saveProductsDescription: (data) => dispatch(actions.saveDescription(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableAddDescription);
