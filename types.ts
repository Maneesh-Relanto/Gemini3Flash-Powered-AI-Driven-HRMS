
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
  middleName?: string;
  lastName: string;
  email: string;
  personalEmail?: string;
  phone?: string;
  mobile?: string;
  department: string;
  role: string;
  status: EmployeeStatus;
  joinDate: string;
  avatar: string;
  gdprConsent: boolean;
  gdprConsentDate?: string;
  legalBasis?: string;
  sensitiveDataEncrypted: boolean;
  payGrade?: string;
  supervisor?: string;
  emergencyContact?: {
    name: string;
    relationship: string;
    phone: string;
  };
  address?: string;
  city?: string;
  country?: string;
  zipCode?: string;
  dateOfBirth?: string;
  gender?: 'Male' | 'Female' | 'Other' | 'Prefer not to say';
  nationality?: string;
  maritalStatus?: string;
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

export interface Holiday {
  id: string;
  name: string;
  date: string;
  type: 'Public' | 'Optional';
}

export interface Client {
  id: string;
  name: string;
  industry: string;
  location: string;
  status: 'Active' | 'Inactive';
}

export interface OfficeLocation {
  id: string;
  name: string;
  city: string;
  country: string;
  type: 'HQ' | 'Branch' | 'Remote Hub';
}

export interface AuditLogEntry {
  id: string;
  user: string;
  role: UserRole;
  action: string;
  module: string;
  date: string;
  time: string;
  details: string;
  status: 'Success' | 'Failure' | 'Warning';
}
