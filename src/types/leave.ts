export type LeaveType = "Full Day" | "Half Day";

export interface LeaveRequest {
  startDate: string;
  endDate: string;
  leaveType: LeaveType;
  notes?: string;
}

export interface LeaveBalance {
  total: number;
  used: number;
}
