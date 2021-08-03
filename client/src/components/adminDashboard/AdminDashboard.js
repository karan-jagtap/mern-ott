import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Layout, Menu } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  VideoCameraOutlined,
  QqOutlined,
  HomeOutlined,
  UnorderedListOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import "./AdminDashboard.css";
import AddVideos from "../addVideos/AddVideos";
import { get_user_details } from "../../actions/auth.action";
import Categories from "../categories/Categories";
import AdminHome from "../adminHome/AdminHome";

const { Header, Sider } = Layout;
const MENU_ITEMS = [
  {
    key: "home",
    name: "Home",
  },
  {
    key: "videos",
    name: "Add videos",
  },
  {
    key: "categories",
    name: "Categories",
  },
];

const AdminDashboard = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState("home");
  const [menuName, setMenuName] = useState("Home");

  useEffect(() => {
    console.log("called useEffect()");
    if (props.auth.user === null) {
      console.log("called useEffect() - API");
      props.get_user_details();
    }
  }, [props.auth.user]);

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  const onMenuItemClick = (e) => {
    console.log("menu item clicks objects = ", e);
    setSelectedKey(e.key);
    setMenuName(MENU_ITEMS.filter((item) => item.key === e.key)[0].name);
  };

  if (props.auth.user !== null) {
    if (props.auth.user.role !== "admin") {
      props.history.replace("/dashboard");
    }
  }

  return (
    <Layout id="layout-admin-dashboard">
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        className="sider-admin-dashboard"
      >
        {collapsed ? (
          <div
            style={{
              boxSizing: "border-box",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <QqOutlined
              style={{ fontSize: 32, margin: 16, color: "#f0bf33" }}
            />
          </div>
        ) : (
          <div className="app-logo-admin-dashboard">CHILLAX</div>
        )}
        <Menu
          theme="dark"
          mode="inline"
          style={{ backgroundColor: "#222222" }}
          defaultSelectedKeys={[selectedKey]}
          onClick={onMenuItemClick}
        >
          <Menu.Item
            className={selectedKey === "home" && "menu-item-selected"}
            style={{ marginTop: 0 }}
            key="home"
            icon={<HomeOutlined />}
          >
            Home
          </Menu.Item>
          <Menu.Item
            className={selectedKey === "videos" && "menu-item-selected"}
            key="videos"
            icon={<VideoCameraOutlined />}
          >
            Videos
          </Menu.Item>
          <Menu.Item
            className={selectedKey === "categories" && "menu-item-selected"}
            key="categories"
            icon={<UnorderedListOutlined />}
          >
            Categories
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="header-admin-dashboard">
          <div style={{ display: "flex", alignItems: "baseline" }}>
            {collapsed ? (
              <MenuUnfoldOutlined className="trigger" onClick={toggle} />
            ) : (
              <MenuFoldOutlined className="trigger" onClick={toggle} />
            )}
            <div>{menuName}</div>
          </div>
          <div className="logout-container">
            <LogoutOutlined />
            <span style={{ marginLeft: 10 }}>Logout</span>
          </div>
        </Header>
        {selectedKey === "home" && <AdminHome />}
        {selectedKey === "videos" && <AddVideos />}
        {selectedKey === "categories" && <Categories />}
      </Layout>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { get_user_details })(AdminDashboard);
