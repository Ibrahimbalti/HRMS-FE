import React from "react";
import { Layout, Row, Col } from "antd";
import { LeaveBalanceDisplay } from "./components/LeaveBalance";
import { LeaveForm } from "./components/LeaveForm";

const mockBalance = { total: 20, used: 5 };

const App: React.FC = () => {
  return (
    <Layout style={{ background: "gray", minHeight: "100vh" }}>
      <Layout.Header style={{ color: "white", fontSize: "20px" }}>
        HRMS Leave Request
      </Layout.Header>

      <Layout.Content style={{ padding: 20, background: "transparent" }}>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={10}>
            <LeaveBalanceDisplay balance={mockBalance} />
          </Col>
          <Col xs={24} md={14}>
            <LeaveForm />
          </Col>
        </Row>
      </Layout.Content>
    </Layout>
  );
};

export default App;
