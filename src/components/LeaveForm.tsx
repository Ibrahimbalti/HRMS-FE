import React, { useState } from "react";
import { DatePicker, Form, Input, Button, Select, Card } from "antd";
import dayjs from "dayjs";
import type { LeaveRequest } from "../types/leave";
import CustomAlert from "./CustomAlert";

export const LeaveForm: React.FC = () => {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);
  const [alertData, setAlertData] = useState<{
    type: "success" | "error" | "info" | "warning";
    message: string;
    description?: string;
  } | null>(null);

  const onSubmitedForm = async (values: any) => {
    const data: LeaveRequest = {
      startDate: dayjs(values.startDate).format("YYYY-MM-DD"),
      endDate: dayjs(values.endDate).format("YYYY-MM-DD"),
      leaveType: values.leaveType,
      notes: values.notes,
    };

    setSubmitting(true);
    setAlertData(null);

    try {
      const res = await fetch("http://localhost:4000/api/leave-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok) {
        form.resetFields();
        setAlertData({
          type: "success",
          message: "Leave request submitted",
          description: `${result.message}`,
        });
      } else {
        setAlertData({
          type: "error",
          message: "Submission failed",
          description: "Please try again later.",
        });
      }
    } catch (error) {
      setAlertData({
        type: "error",
        message: "Network error",
        description: "Unable to connect to the server.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {alertData && (
        <CustomAlert
          type={alertData.type}
          message={alertData.message}
          description={alertData.description}
          onClose={() => setAlertData(null)}
        />
      )}

      <Card title="Apply for Leave">
        <Form layout="vertical" form={form} onFinish={onSubmitedForm}>
          <Form.Item
            name="startDate"
            label="Start Date"
            rules={[{ required: true }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            name="endDate"
            label="End Date"
            rules={[{ required: true }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            name="leaveType"
            label="Leave Type"
            rules={[{ required: true }]}
          >
            <Select placeholder="Select type">
              <Select.Option value="Full Day">Full Day</Select.Option>
              <Select.Option value="Half Day">Half Day</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item name="notes" label="Notes">
            <Input.TextArea placeholder="Optional notes" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={submitting}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
};
