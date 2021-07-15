import { Content } from "antd/lib/layout/layout";
import React, { useState } from "react";
import { connect } from "react-redux";
import { Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import "../adminDashboard/AdminDashboard.css";
import "./AddVideos.css";

const { Option } = Select;
const AddVideos = (props) => {
  return (
    <Content className="sub-component-parent-layout">
      {/* Start - Title Input */}
      <div>
        <div>
          <span style={{ marginLeft: 5 }}>Title :</span>
          <span style={{ color: "red", marginLeft: 5 }}>*</span>
        </div>
        <div className="input-layout">
          <input
            className="input-login"
            style={{ color: "black", width: "100%" }}
            name="title"
            type="text"
          />
        </div>
      </div>
      {/* End - Title Input */}

      {/* Start - Description Input */}
      <div style={{ marginTop: 10 }}>
        <div>
          <span style={{ marginLeft: 5 }}>Description :</span>
        </div>
        <div className="input-layout">
          <textarea
            className="input-login"
            rows={5}
            style={{
              color: "black",
              width: "100%",
            }}
            name="description"
            type="text"
          />
        </div>
      </div>
      {/* End - Description Input */}

      {/* Start - Video ID Input */}
      <div style={{ marginTop: 10 }}>
        <div>
          <span style={{ marginLeft: 5 }}>Video ID / Url :</span>
          <span style={{ color: "red", marginLeft: 5 }}>*</span>
        </div>
        <div className="input-layout">
          <input
            className="input-login"
            style={{ color: "black", width: "100%" }}
            name="videoId"
            type="text"
          />
        </div>
      </div>
      {/* End - Video ID Input */}

      {/* Start - Thumbnail Input */}
      <div style={{ marginTop: 10, display: "flex", alignItems: "center" }}>
        <div>
          <span style={{ marginLeft: 5 }}>Thumbnail :</span>
          <span style={{ color: "red", marginLeft: 5, marginRight: 5 }}>*</span>
        </div>
        <div>
          <input style={{ color: "black" }} name="thumbnailFile" type="file" />
        </div>
      </div>
      {/* End - Thumbnail Input */}

      {/* Start - Categories Input */}
      <div style={{ marginTop: 10, display: "flex", alignItems: "center" }}>
        <div>
          <span style={{ marginLeft: 5 }}>Categories :</span>
          <span style={{ color: "red", marginLeft: 5, marginRight: 5 }}>*</span>
        </div>
        <div>
          <Select
            mode="multiple"
            size="middle"
            placeholder="Please select"
            style={{ width: "100%" }}
          >
            <Option>Karan1</Option>
            <Option>Karan2</Option>
            <Option>Karan3</Option>
            <Option>Karan4</Option>
            <Option>Karan5</Option>
            <Option>Karan6</Option>
            <Option>Karan7</Option>
            <Option>Karan8</Option>
            <Option>Karan9</Option>
          </Select>
        </div>
      </div>
      {/* End - Categories Input */}
    </Content>
  );
};

const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, {})(AddVideos);
