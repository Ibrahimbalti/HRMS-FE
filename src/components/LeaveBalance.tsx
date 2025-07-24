import React from "react";
import { Card, Progress } from "antd";
import type { LeaveBalance } from "../types/leave";

export const LeaveBalanceDisplay: React.FC<{ balance: LeaveBalance }> = ({
  balance,
}) => {
  const percentUsed = (balance.used / balance.total) * 100;
  return (
    <Card title="Leave Balance">
      <p>Total: {balance.total} days</p>
      <p>Used: {balance.used} days</p>
      <Progress percent={percentUsed} status="active" />
    </Card>
  );
};
