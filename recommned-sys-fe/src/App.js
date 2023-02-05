import React, { useState } from "react"
import "antd/dist/antd.min.css"
import "./index.css"
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined
} from "@ant-design/icons"
import { Layout, Menu, Card } from "antd"
import MoviesLens from "./pages/MoviesLens"

const { Header, Sider, Content } = Layout
const App = () => {
  const [collapsed, setCollapsed] = useState(false)
  const [key, setCurrentKey] = useState("1")

  const pageNavigate = (key) => {
    if (key === "1") {
      return (
        <div className="overflow-y-auto">
          <MoviesLens />
        </div>
      )
    }
  }
  return (
    <Layout>
      <Sider theme="light" trigger={null} collapsible collapsed={collapsed}>
        <div className="p-[20px] text-[#000]">Recommend System</div>
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={["1"]}
          onSelect={(val) => {
            setCurrentKey(val.key)
          }}
          items={[
            {
              key: "1",
              icon: <VideoCameraOutlined />,
              label: "MovieLens Rec"
            },
            {
              key: "2",
              icon: <VideoCameraOutlined />,
              label: "nav 2"
            },
            {
              key: "3",
              icon: <UploadOutlined />,
              label: "nav 3"
            }
          ]}
        />
      </Sider>
      <Layout className="site-layout" theme="light">
        <Header
          className="site-layout-background"
          style={{
            padding: 0
          }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed)
            }
          )}
        </Header>
        <Card>{pageNavigate(key)}</Card>
      </Layout>
    </Layout>
  )
}
export default App
