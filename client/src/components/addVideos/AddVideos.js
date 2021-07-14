import { Content } from "antd/lib/layout/layout";
import React, { useState } from "react";
import { connect } from "react-redux";
import "../adminDashboard/AdminDashboard.css";
import "./AddVideos.css";

const AddVideos = (props) => {
  return <Content className="sub-component-parent-layout">Add Videos</Content>;
};

const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, {})(AddVideos);
