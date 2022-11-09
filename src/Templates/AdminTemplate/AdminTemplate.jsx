import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import "antd/dist/antd.min.css";
import "./admin.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Route } from "react-router-dom";
const { Header, Sider, Content } = Layout;

export default function AdminTemplate(props) {
  const [collapsed, setCollapsed] = useState(false);
  const { Component, ...rest } = props;
  return (
    <Route
      {...rest}
      render={(propsRoute) => {
        return (
          <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
              <div className="logo" />
              <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={[]}
                items={[
                  {
                    key: "1",
                    icon: <UserOutlined />,
                    label: <NavLink to="/admin/useradmin">User</NavLink>,
                  },
                  {
                    key: "2",
                    icon: <VideoCameraOutlined />,
                    label: "Movies",
                    children: [
                      {
                        key: "5",
                        label: (
                          <NavLink to="/admin/movieadmin">List Movie</NavLink>
                        ),
                      },
                      {
                        key: "4",
                        label: (
                          <NavLink to="/admin/movieadmin/addmovie">
                            Add Movie
                          </NavLink>
                        ),
                      },
                    ],
                  },
                ]}
              />
            </Sider>
            <Layout className="site-layout">
              <Header
                className="site-layout-background"
                style={{
                  padding: 0,
                }}
              >
                {React.createElement(
                  collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                  {
                    className: "trigger",
                    onClick: () => setCollapsed(!collapsed),
                  }
                )}
              </Header>
              <Content
                className="site-layout-background"
                style={{
                  margin: "24px 16px",
                  padding: 24,
                  minHeight: 280,
                }}
              >
                {<Component {...propsRoute} />}
              </Content>
            </Layout>
          </Layout>
        );
      }}
    />
  );
}
