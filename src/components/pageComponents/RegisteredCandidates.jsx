import React, { useState, useContext } from "react";
import {
  Table,
  Tag,
  Button,
  Card,
  Modal,
  Descriptions,
  Popconfirm,
  message,
  Avatar,
  Input,
  Form,
  Tooltip,
} from "antd";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import DataContext from "../../context/DataContext";

const RegisteredCandidate = () => {
  const { jobData, setJobData } = useContext(DataContext);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [detailModalContent, setDetailModalContent] = useState(null);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [form] = Form.useForm();

  const flattenedCandidates = jobData.flatMap((job) =>
    job.candidates.map((candidate, index) => ({
      id: `${job.id}-${index}`,
      jobId: job.id,
      candidateIndex: index,
      ...candidate,
      jobTitle: job.title,
    }))
  );

  const filteredCandidates = flattenedCandidates.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.skill.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleView = (record) => {
    setSelectedCandidate(record);
    setViewModalVisible(true);
  };

  const handleDelete = (record) => {
    const updatedJobData = jobData.map((job) => {
      if (job.id === record.jobId) {
        return {
          ...job,
          candidates: job.candidates.filter(
            (_, index) => index !== record.candidateIndex
          ),
        };
      }
      return job;
    });
    setJobData(updatedJobData);
    message.success(`Deleted candidate: ${record.name}`);
  };

  const handleEdit = (record) => {
    setSelectedCandidate(record);
    form.setFieldsValue(record);
    setEditModalVisible(true);
  };

  const handleEditSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        const updatedJobData = jobData.map((job) => {
          if (job.id === selectedCandidate.jobId) {
            const newCandidates = [...job.candidates];
            newCandidates[selectedCandidate.candidateIndex] = {
              ...newCandidates[selectedCandidate.candidateIndex],
              ...values,
            };
            return { ...job, candidates: newCandidates };
          }
          return job;
        });
        setJobData(updatedJobData);
        message.success("Candidate updated successfully");
        setEditModalVisible(false);
      })
      .catch(() => {
        message.error("Please fill all required fields.");
      });
  };

  const handleDetailClick = (type, record) => {
    setDetailModalContent({
      type,
      value:
        type === "scheduled"
          ? record.scheduledInterview
          : type === "mock"
          ? record.mockInterviews
          : record.jobInterviews,
      name: record.name,
    });
    setDetailModalVisible(true);
  };

  const columns = [
    {
      title: "Photo",
      dataIndex: "photo",
      key: "photo",
      render: (photo, record) => (
        <Avatar src={photo} alt={record.name}>
          {record.name?.[0]}
        </Avatar>
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Skill",
      dataIndex: "skill",
      key: "skill",
    },
    {
      title: "Job Title",
      dataIndex: "jobTitle",
      key: "jobTitle",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filters: [
        { text: "Approved", value: "approved" },
        { text: "Pending", value: "pending" },
        { text: "Rejected", value: "rejected" },
      ],
      onFilter: (value, record) => record.status === value,
      render: (status) => {
        const color = {
          approved: "green",
          pending: "gold",
          rejected: "red",
        }[status];
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: "Mock Interviews",
      dataIndex: "mockInterviews",
      key: "mockInterviews",
      render: (value, record) => (
        <Button type="link" onClick={() => handleDetailClick("mock", record)}>
          {value}
        </Button>
      ),
    },
    {
      title: "Job Interviews",
      dataIndex: "jobInterviews",
      key: "jobInterviews",
      render: (value, record) => (
        <Button type="link" onClick={() => handleDetailClick("job", record)}>
          {value}
        </Button>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div className="flex flex-wrap gap-1">
          <Tooltip title="View">
            <Button
              type="text"
              icon={<EyeOutlined />}
              onClick={() => handleView(record)}
            />
          </Tooltip>
          <Tooltip title="Edit">
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => handleEdit(record)}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Popconfirm
              title="Are you sure to delete this candidate?"
              onConfirm={() => handleDelete(record)}
              okText="Yes"
              cancelText="No"
            >
              <Button type="text" icon={<DeleteOutlined />} danger />
            </Popconfirm>
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-gray-50 min-h-screen">
      <Card
        title="All Job Candidates"
        className="overflow-x-auto max-w-full"
        styles={{ body: { padding: "12px" } }}
      >
        <Input.Search
          placeholder="Search by name or skill"
          allowClear
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:max-w-xs mb-4"
        />

        <div className="overflow-x-auto">
          <Table
            columns={columns}
            dataSource={filteredCandidates}
            rowKey="id"
            pagination={{ pageSize: 5 }}
          />
        </div>
      </Card>

      {/* View Modal */}
      <Modal
        title="Candidate Details"
        open={viewModalVisible}
        onCancel={() => setViewModalVisible(false)}
        footer={null}
      >
        {selectedCandidate && (
          <>
            <div className="flex justify-center mb-4 text-center">
              <Avatar size={64} src={selectedCandidate.photo}>
                {selectedCandidate.name?.[0]}
              </Avatar>
            </div>
            <Descriptions
              bordered
              column={2}
              className="text-sm"
            >
              <Descriptions.Item label="Name">
                {selectedCandidate.name}
              </Descriptions.Item>
              <Descriptions.Item label="Skill">
                {selectedCandidate.skill}
              </Descriptions.Item>
              <Descriptions.Item label="Job Title">
                {selectedCandidate.jobTitle}
              </Descriptions.Item>
              <Descriptions.Item label="Status">
                <Tag
                  color={
                    {
                      approved: "green",
                      pending: "gold",
                      rejected: "red",
                    }[selectedCandidate.status]
                  }
                >
                  {selectedCandidate.status.toUpperCase()}
                </Tag>
              </Descriptions.Item>
            </Descriptions>
          </>
        )}
      </Modal>

      {/* Edit Modal */}
      <Modal
        title="Edit Candidate"
        open={editModalVisible}
        onCancel={() => setEditModalVisible(false)}
        onOk={handleEditSubmit}
        okText="Update"
      >
        <Form form={form} layout="vertical" className="space-y-4">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please enter name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="skill"
            label="Skill"
            rules={[{ required: true, message: "Please enter skill" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: "Please enter status" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="photo" label="Photo URL">
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      {/* Detail Modal */}
      <Modal
        title={`Details for ${detailModalContent?.name}`}
        open={detailModalVisible}
        onCancel={() => setDetailModalVisible(false)}
        footer={null}
      >
        {detailModalContent && (
          <Descriptions bordered column={{ xs: 1, sm: 1, md: 1 }}>
            <Descriptions.Item label="Type">
              {
                {
                  mock: "Mock Interviews Attended",
                  job: "Job Interviews Attended",
                  scheduled: "Scheduled Interview",
                }[detailModalContent.type]
              }
            </Descriptions.Item>
            <Descriptions.Item label="Value">
              {detailModalContent.value}
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </div>
  );
};

export default RegisteredCandidate;
