import { useState } from "react";
import { useLocation } from "react-router-dom";
  import { useNavigate } from "react-router-dom";
import { Layout, Menu } from "antd";
import {
  UserOutlined,
  AppstoreOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Outlet } from "react-router-dom";



const DashboardPage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { Sider, Content } = Layout;


  // Map route to menu key
  const keyMap = {
    "/dashboard": "1",
    "/dashboard/jobs": "1",
    "/dashboard/candidates": "2",
    "/dashboard/profile": "4",
  };

  // Get current selected key based on location pathname
  const selectedKey = keyMap[location.pathname] || "1";

  const onMenuClick = ({ key }) => {
    switch (key) {
      case "1":
        navigate("/dashboard");
        break;
      case "2":
        navigate("/dashboard/candidates");
        break;
      case "3":
        navigate("/");
        break;
      case "4":
        navigate("/dashboard/profile");
        break;
      default:
        break;
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
  <Sider
    collapsible
    collapsed={collapsed}
    onCollapse={setCollapsed}
    className="bg-white shadow-md"
    breakpoint="lg"
    collapsedWidth="0"
  >
    <div className="p-4 text-center text-white text-lg font-bold bg-blue-500">
      INNOTRAT
    </div>
    <Menu
      theme="light"
      mode="inline"
      selectedKeys={[selectedKey]}
      onClick={onMenuClick}
      items={[
        {
          key: "1",
          icon: <AppstoreOutlined />,
          label: "Dashboard",
        },
        {
          key: "2",
          icon: <UserOutlined />,
          label: "Registered Candidates",
        },
        {
          key: "4",
          icon: <UserOutlined />,
          label: "Profile",
        },
        {
          key: "3",
          icon: <LogoutOutlined />,
          label: "Logout",
        },
      ]}
    />
  </Sider>

  <Layout style={{ overflow: "hidden" }}>
    <Content
      style={{
        padding: 16,
        overflowY: "auto",
        height: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Outlet />
    </Content>
  </Layout>
</Layout>

  );
};

export default DashboardPage
