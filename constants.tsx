import { Employee, EmployeeStatus, LeaveRequest, LeaveStatus, LeaveType, UserRole, Holiday, Client, OfficeLocation, AuditLogEntry } from './types.ts';

export interface Permission {
  read: boolean;
  write: boolean;
}

export const ROLE_PERMISSIONS: Record<UserRole, Record<string, Permission>> = {
  [UserRole.EMPLOYEE]: {
    dashboard: { read: true, write: false },
    leave: { read: true, write: true },
    timesheets: { read: true, write: true },
    payDetails: { read: false, write: false },
  },
  [UserRole.HR_EXECUTIVE]: {
    dashboard: { read: true, write: false },
    employees: { read: true, write: false },
    leave: { read: true, write: true },
    payDetails: { read: true, write: true },
  },
  [UserRole.HR_MANAGER]: {
    dashboard: { read: true, write: false },
    employees: { read: true, write: true },
    leave: { read: true, write: true },
    compliance: { read: true, write: true },
    payDetails: { read: true, write: true },
  },
  [UserRole.OPS_EXECUTIVE]: {
    dashboard: { read: true, write: false },
    employees: { read: true, write: false },
    timesheets: { read: true, write: false },
    payDetails: { read: false, write: false },
  },
  [UserRole.OPS_MANAGER]: {
    dashboard: { read: true, write: false },
    employees: { read: true, write: false },
    timesheets: { read: true, write: true },
    roadmap: { read: true, write: false },
    payDetails: { read: false, write: false },
  },
  [UserRole.APP_ADMIN]: {
    dashboard: { read: true, write: true },
    employees: { read: true, write: true },
    leave: { read: true, write: true },
    timesheets: { read: true, write: true },
    compliance: { read: true, write: false },
    payDetails: { read: false, write: false },
  },
  [UserRole.SYSTEM_ADMIN]: {
    dashboard: { read: true, write: true },
    employees: { read: true, write: true },
    leave: { read: true, write: true },
    timesheets: { read: true, write: true },
    compliance: { read: true, write: true },
    roadmap: { read: true, write: true },
    settings: { read: true, write: true },
    payDetails: { read: false, write: false },
    aiConfig: { read: true, write: true },
  },
};

export const DEPARTMENTS = ['Engineering', 'Human Resources', 'Sales', 'Marketing', 'Legal', 'Operations'];

export const MOCK_HOLIDAYS: Holiday[] = [
  { id: 'HOL1', name: 'New Year', date: '2024-01-01', type: 'Public' },
  { id: 'HOL2', name: 'Christmas Day', date: '2024-12-25', type: 'Public' },
  { id: 'HOL3', name: 'Labour Day', date: '2024-05-01', type: 'Public' },
];

export const MOCK_LOCATIONS: OfficeLocation[] = [
  { id: 'LOC1', name: 'Global HQ', city: 'Palo Alto', country: 'USA', type: 'HQ' },
  { id: 'LOC2', name: 'London Office', city: 'London', country: 'UK', type: 'Branch' },
];

export const MOCK_CLIENTS: Client[] = [
  { id: 'CLI1', name: 'Acme Corp', industry: 'Manufacturing', location: 'USA', status: 'Active' },
  { id: 'CLI2', name: 'Global Finance', industry: 'Banking', location: 'Switzerland', status: 'Active' },
];

export const MOCK_LEAVE_REQUESTS: LeaveRequest[] = [
  { id: 'LR001', employeeId: 'EMP001', employeeName: 'Sarah Connor', type: LeaveType.ANNUAL, startDate: '2024-06-10', endDate: '2024-06-15', days: 5, status: LeaveStatus.PENDING, reason: 'Family vacation' },
  { id: 'LR002', employeeId: 'EMP001', employeeName: 'Sarah Connor', type: LeaveType.SICK, startDate: '2024-05-12', endDate: '2024-05-12', days: 1, status: LeaveStatus.APPROVED, reason: 'Doctor appointment' },
];

export const MOCK_EMPLOYEES: Employee[] = [
  {
    id: 'EMP001',
    firstName: 'Sarah',
    lastName: 'Connor',
    email: 'sarah.c@lumina.io',
    phone: '+1 (555) 0123',
    department: 'Engineering',
    role: 'Lead Developer',
    status: EmployeeStatus.ACTIVE,
    joinDate: '2022-03-15',
    avatar: 'https://picsum.photos/seed/sarah/100/100',
    gdprConsent: true,
    gdprConsentDate: '2022-03-15 09:00 AM',
    sensitiveDataEncrypted: true,
    payGrade: 'Grade 8',
    supervisor: 'Marcus Wright',
    address: '123 Resistance Way, Los Angeles, CA',
    dateOfBirth: '1985-05-12',
    emergencyContact: {
      name: 'John Connor',
      relationship: 'Son',
      phone: '+1 (555) 9999'
    },
    currentSalary: 125000,
    salaryHistory: [
      { id: 'S1', amount: 110000, currency: 'USD', effectiveDate: '2022-03-15', changeReason: 'Hiring Salary', approvedBy: 'HR Lead' },
      { id: 'S2', amount: 125000, currency: 'USD', effectiveDate: '2023-04-01', changeReason: 'Performance Review', approvedBy: 'Marcus Wright' },
    ]
  },
];

export const MOCK_AUDIT_LOGS: AuditLogEntry[] = [
  { id: 'AUD001', user: 'Admin', role: UserRole.SYSTEM_ADMIN, action: 'User Login', module: 'Auth', date: '2024-05-18', time: '09:00 AM', details: 'Successful login from IP 192.168.1.1', status: 'Success' },
];

export const COMPLIANCE_CHECKLIST = [
  'Data Processing Agreement (DPA) Signed',
  'Record of Processing Activities (ROPA) Updated',
  'Privacy Impact Assessment (DPIA) Completed',
  'Consent Management Verified',
  'Data Breach Response Plan Active'
];