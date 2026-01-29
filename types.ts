
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

export enum UserRole {
  EMPLOYEE = 'Employee',
  HR_EXECUTIVE = 'HR Executive',
  HR_MANAGER = 'HR Manager',
  OPS_EXECUTIVE = 'Ops Executive',
  OPS_MANAGER = 'Ops Manager',
  APP_ADMIN = 'Application Admin',
  SYSTEM_ADMIN = 'System Admin'
}

export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  department: string;
  role: string;
  status: EmployeeStatus;
  joinDate: string;
  avatar: string;
  gdprConsent: boolean;
  gdprConsentDate?: string;
  sensitiveDataEncrypted: boolean;
  payGrade?: string;
  supervisor?: string;
  emergencyContact?: {
    name: string;
    relationship: string;
    phone: string;
  };
  address?: string;
  dateOfBirth?: string;
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  type: 'Annual' | 'Sick' | 'Personal' | 'Maternity/Paternity';
  startDate: string;
  endDate: string;
  days: number;
  status: LeaveStatus;
  reason: string;
}

export interface TimesheetEntry {
  id: string;
  employeeId: string;
  date: string;
  hours: number;
  project: string;
  task: string;
  status: 'Draft' | 'Submitted' | 'Approved' | 'Rejected';
}

export interface ComplianceAudit {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  module: string;
  details: string;
}
