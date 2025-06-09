import React, { useState } from "react";
import { Form, Input, Button, Checkbox, Typography, Card } from "antd";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import loginSchema from "../../schema/login.json";
import loginValidationSchema from "../../schema/loginValidationSchema";
import { login } from "../../utils/auth";

import network from "../../assets/images/network.png";

const { Title, Text, Link } = Typography;

const LoginPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);
    setShake(false);

    try {
      await loginValidationSchema.validate(values, { abortEarly: false });

      const response = await new Promise((resolve) =>
        setTimeout(() => {
          if (
            values.email === "user@example.com" &&
            values.password === "mani123"
          ) {
            resolve({ success: true, message: "Login successful!" });
          } else {
            resolve({ success: false, message: "Invalid email or password." });
          }
        }, 1500)
      );

      if (response.success) {
        login("your-auth-token-here");
        toast.success(response.message);
        navigate("/dashboard", { replace: true });
      } else {
        setShake(true); // Trigger shake on error
        toast.error(response.message);
      }
    } catch (error) {
      if (error.name === "ValidationError") {
        const fieldErrors = {};
        error.inner.forEach((e) => {
          if (e.path) fieldErrors[e.path] = e.message;
        });
        form.setFields(
          Object.keys(fieldErrors).map((key) => ({
            name: key,
            errors: [fieldErrors[key]],
          }))
        );
      } else {
        toast.error("Something went wrong!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Left Side  */}
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="hidden md:flex items-center justify-center bg-gray-200"
        >
          <img
            src={network}
            alt="Job Vacancy"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Right Side  */}
      <div className="flex items-center justify-center bg-gray-100 px-6 py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
         
          <motion.div
            animate={shake ? { x: [-10, 10, -6, 6, 0] } : {}}
            transition={{ duration: 0.4 }}
          >
            <Card className="shadow-xl rounded-lg p-6">
              <div className="text-center mb-6">
                <Title level={3}>{loginSchema.pageTitle}</Title>
                <Text type="secondary">
                  Or <Link href="#">{loginSchema.createAccountLinkText}</Link>
                </Text>
              </div>

              <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                initialValues={{ email: "", password: "", remember: true }}
              >
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[{ required: true, message: "Email is required" }]}
                >
                  <Input placeholder="Enter your email" />
                </Form.Item>

                <Form.Item
                  label="Password"
                  name="password"
                  rules={[{ required: true, message: "Password is required" }]}
                >
                  <Input.Password placeholder="Enter your password" />
                </Form.Item>

                <Form.Item name="remember" valuePropName="checked">
                  <Checkbox>{loginSchema.rememberMeLabel}</Checkbox>
                </Form.Item>

                <Form.Item>
                  <motion.div whileTap={{ scale: 0.95 }}>
                    <Button
                      type="primary"
                      htmlType="submit"
                      block
                      loading={loading}
                    >
                      {loginSchema.signInButtonText}
                    </Button>
                  </motion.div>
                </Form.Item>

                <div className="text-center">
                  <Link href="#">{loginSchema.forgotPasswordLinkText}</Link>
                </div>
              </Form>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
