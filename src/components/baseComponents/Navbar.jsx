import React from "react";
import { Layout, Button, Typography } from "antd";
import { MenuOutlined, LogoutOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";

const { Header } = Layout;
const { Title } = Typography;

const Navbar = ({ toggleSidebar }) => {
  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 14 }}
    >
      <Header
        className="w-full z-40 bg-white flex items-center justify-between px-4 shadow-md"
        style={{ height: "64px", padding: "0 16px" }}
      >
        <div className="flex items-center gap-4">
          <Button
            icon={<MenuOutlined />}
            type="text"
            onClick={toggleSidebar}
            className="md:hidden"
          />
          <Title level={4} style={{ margin: 0 }}>
            Dashboard
          </Title>
        </div>

        <Button icon={<LogoutOutlined />} danger>
          Logout
        </Button>
      </Header>
    </motion.div>
  );
};

export default Navbar;
