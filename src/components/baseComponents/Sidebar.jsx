// // src/components/baseComponents/Sidebar.jsx
// import React from "react";
// import { Link, useLocation } from "react-router-dom";
// import { Drawer, Menu } from "antd";
// import {
//   HomeOutlined,
//   UserOutlined,
//   ProfileOutlined,---
// } from "@ant-design/icons";

// const Sidebar = ({ isOpen, toggleSidebar }) => {
//   const location = useLocation();

//   const menuItems = [
//     {
//       key: "/dashboard/jobs",
//       icon: <HomeOutlined />,
//       label: <Link to="/dashboard/jobs">Job Opportunities</Link>,
//     },
//     {
//       key: "/dashboard/candidates",
//       icon: <UserOutlined />,
//       label: <Link to="/dashboard/candidates">Registered Candidate</Link>,
//     },
//     {
//       key: "/dashboard/profile",
//       icon: <ProfileOutlined />,
//       label: <Link to="/dashboard/profile">My Profile</Link>,
//     },
//   ];

//   return (
//     <>
//       {/* Mobile Drawer */}
//       <Drawer
//         title="Farmer Dashboard"
//         placement="left"
//         onClose={toggleSidebar}
//         open={isOpen}
//         width={240}
//         bodyStyle={{ padding: 0 }}
//         className="md:hidden"
//       >
//         <Menu
//           mode="inline"
//           selectedKeys={[location.pathname]}
//           items={menuItems}
//         />
//       </Drawer>

//       {/* Desktop Sidebar */}
//       <div className="hidden md:flex md:flex-col w-64 h-screen bg-white shadow-md fixed left-0 top-0 z-50">
//         <div className="p-4 text-xl font-semibold border-b">
//           Farmer Dashboard
//         </div>
//         <Menu
//           mode="inline"
//           selectedKeys={[location.pathname]}
//           items={menuItems}
//           style={{ flex: 1, borderRight: 0 }}
//         />
//       </div>
//     </>
//   );
// };

// export default Sidebar;
