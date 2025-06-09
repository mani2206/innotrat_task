import React, { useContext, useState } from 'react';
import { Form, Input, Button, Card, Row, Col, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import DataContext from '../../context/DataContext';
import images from "../../assets/images/avatar.avif";

const Profile = () => {
  const [form] = Form.useForm();
  const { jobData, setJobData } = useContext(DataContext);
  const navigate = useNavigate();

  const [imageUrl, setImageUrl] = useState(images);

  // handle image upload locally
const handleImageChange = (info) => {
  const file = info.file.originFileObj;

  // Allowed image types
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/bmp'];

  if (file) {
    if (allowedTypes.includes(file.type)) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result); // preview image
      };
      reader.readAsDataURL(file);
    } else {
      message.error("Only JPG, PNG, GIF, WEBP, or BMP images are allowed.");
    }
  }
};


  const onFinish = (values) => {
    const newCandidate = {
      name: `${values.firstName} ${values.lastName}`,
      skill: values.designation,
      status: "pending",
      photo: imageUrl, // save uploaded photo URL
    };

    const jobTitle = "New Profile Submission";
    const jobIndex = jobData.findIndex((job) => job.title === jobTitle);

    if (jobIndex !== -1) {
      const updatedJobs = [...jobData];
      updatedJobs[jobIndex].candidates.push(newCandidate);
      setJobData(updatedJobs);
    } else {
      setJobData([
        ...jobData,
        {
          id: Date.now(),
          title: jobTitle,
          candidates: [newCandidate],
        },
      ]);
    }

    console.log("New profile submitted:", values);
    navigate("/dashboard/candidates");
  };

  return (
    <Card title="My Profile" className="shadow rounded-lg">
      <Row gutter={24}>
        <Col xs={24} md={8}>
          <div className="flex flex-col items-center mb-6">
            <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200">
              <img
                src={imageUrl}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <Upload
              showUploadList={false}
              beforeUpload={() => false} // prevent auto upload
              onChange={handleImageChange}
              accept="image/*"
            >
              <Button type="link" icon={<UploadOutlined />} className="text-sky-500">
                Change Photo
              </Button>
            </Upload>
          </div>
        </Col>

        <Col xs={24} md={16}>
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            initialValues={{
              firstName: 'Manikandan',
              lastName: 'srinivasan',
              email: 'mani@gmail.com',
              bio: 'Front end developer in 2 years experience',
            }}
          >
            {/* -- all form fields same as before -- */}
            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item name="firstName" label="First Name" rules={[{ required: true }]}>
                  <Input placeholder="Enter first name" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item name="lastName" label="Last Name" rules={[{ required: true }]}>
                  <Input placeholder="Enter last name" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item name="collegeName" label="College Name">
                  <Input placeholder="Enter college name" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item name="contactEmail" label="Contact Email">
                  <Input type="email" placeholder="Enter contact email" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item name="contactNumber" label="Contact Number">
                  <Input placeholder="Enter contact number" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item name="location" label="Location">
                  <Input placeholder="Enter location" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item name="authorizedPerson" label="Authorized Person">
                  <Input placeholder="Enter authorized person name" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item name="designation" label="Designation">
                  <Input placeholder="Enter designation" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item name="authorizedNumber" label="Authorized Person Number">
                  <Input placeholder="Enter authorized person number" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item name="password" label="Password" rules={[{ required: true }]}>
                  <Input.Password placeholder="Enter password" />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item name="bio" label="Bio">
              <Input.TextArea rows={3} placeholder="Write a short bio" />
            </Form.Item>

            <div className="flex justify-end">
              <Button type="primary" htmlType="submit">
                Save Changes
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Card>
  );
};

export default Profile;
