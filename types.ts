
export enum EmployeeStatus {
  ACTIVE = 'Active',
  ON_LEAVE = 'On Leave',
  TERMINATED = 'Terminated',
  PROBATION = 'Probation'
}

export enum LeaveStatus {
  PENDING = 'Pending',
  APPROVED = 'Approved',
  REJECTED = 'Rejected'
}

export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  role: string;
  status: EmployeeStatus;
  joinDate: string;
  avatar: string;
  gdprConsent: boolean;
  sensitiveDataEncrypted: boolean;
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  type: string;
  startDate: string;
  endDate: string;
  status: LeaveStatus;
  reason: string;
}

export interface ComplianceAudit {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  module: string;
  details: string;
}
