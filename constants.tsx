
import { Employee, EmployeeStatus, LeaveRequest, TimesheetEntry, LeaveStatus, UserRole, Holiday, Client, OfficeLocation, AuditLogEntry } from './types';

export const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
  [UserRole.EMPLOYEE]: ['dashboard', 'leave', 'timesheets'],
  [UserRole.HR_EXECUTIVE]: ['dashboard', 'employees', 'leave'],
  [UserRole.HR_MANAGER]: ['dashboard', 'employees', 'leave', 'compliance'],
  [UserRole.OPS_EXECUTIVE]: ['dashboard', 'employees', 'timesheets'],
  [UserRole.OPS_MANAGER]: ['dashboard', 'employees', 'timesheets', 'roadmap'],
  [UserRole.APP_ADMIN]: ['dashboard', 'employees', 'leave', 'timesheets', 'compliance'],
  [UserRole.SYSTEM_ADMIN]: ['dashboard', 'employees', 'leave', 'timesheets', 'compliance', 'roadmap', 'settings'],
};

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
    }
  },
  {
    id: 'EMP002',
    firstName: 'Marcus',
    lastName: 'Wright',
    email: 'marcus.w@lumina.io',
    phone: '+1 (555) 0456',
    department: 'Human Resources',
    role: 'HR Manager',
    status: EmployeeStatus.ACTIVE,
    joinDate: '2021-11-02',
    avatar: 'https://picsum.photos/seed/marcus/100/100',
    gdprConsent: true,
    gdprConsentDate: '2021-11-02 10:30 AM',
    sensitiveDataEncrypted: true,
    payGrade: 'Grade 9',
    supervisor: 'None',
    address: '789 SkyNet Blvd, Palo Alto, CA',
    dateOfBirth: '1975-08-22',
    emergencyContact: {
      name: 'Kyle Reese',
      relationship: 'Partner',
      phone: '+1 (555) 1111'
    }
  },
  {
    id: 'EMP003',
    firstName: 'Kyle',
    lastName: 'Reese',
    email: 'kyle.r@lumina.io',
    phone: '+1 (555) 0789',
    department: 'Sales',
    role: 'Account Executive',
    status: EmployeeStatus.ON_LEAVE,
    joinDate: '2023-01-10',
    avatar: 'https://picsum.photos/seed/kyle/100/100',
    gdprConsent: false,
    sensitiveDataEncrypted: true,
    payGrade: 'Grade 6',
    supervisor: 'Sarah Connor',
    address: '456 Past Loop, New York, NY',
    dateOfBirth: '1992-02-14',
    emergencyContact: {
      name: 'Sarah Connor',
      relationship: 'Friend',
      phone: '+1 (555) 0123'
    }
  }
];

export const MOCK_HOLIDAYS: Holiday[] = [
  { id: 'HOL001', name: 'New Year Day', date: '2024-01-01', type: 'Public' },
  { id: 'HOL002', name: 'Labor Day', date: '2024-05-01', type: 'Public' },
  { id: 'HOL003', name: 'Company Anniversary', date: '2024-10-15', type: 'Optional' },
  { id: 'HOL004', name: 'Christmas Day', date: '2024-12-25', type: 'Public' },
];

export const MOCK_CLIENTS: Client[] = [
  { id: 'CLI001', name: 'Cyberdyne Systems', industry: 'Defense AI', location: 'California, US', status: 'Active' },
  { id: 'CLI002', name: 'Weyland-Yutani', industry: 'Space Logistics', location: 'London, UK', status: 'Active' },
  { id: 'CLI003', name: 'Tyrell Corp', industry: 'Bio-Engineering', location: 'Neo-Tokyo, JP', status: 'Inactive' },
];

export const MOCK_LOCATIONS: OfficeLocation[] = [
  { id: 'LOC001', name: 'Global HQ', city: 'Palo Alto', country: 'USA', type: 'HQ' },
  { id: 'LOC002', name: 'Europe Hub', city: 'Berlin', country: 'Germany', type: 'Branch' },
  { id: 'LOC003', name: 'APAC Center', city: 'Singapore', country: 'Singapore', type: 'Branch' },
];

export const MOCK_AUDIT_LOGS: AuditLogEntry[] = [
  { id: 'AUD001', user: 'Marcus Wright', role: UserRole.SYSTEM_ADMIN, action: 'User Login', module: 'Auth', date: '2024-05-15', time: '09:00:01', details: 'Successful login from IP 192.168.1.45', status: 'Success' },
  { id: 'AUD002', user: 'Sarah Connor', role: UserRole.HR_MANAGER, action: 'PII Access', module: 'PIM', date: '2024-05-15', time: '10:22:15', details: 'Accessed profile for EMP003 (Kyle Reese)', status: 'Success' },
  { id: 'AUD003', user: 'Marcus Wright', role: UserRole.SYSTEM_ADMIN, action: 'Config Update', module: 'Settings', date: '2024-05-15', time: '11:45:00', details: 'Added new holiday: Company Anniversary', status: 'Success' },
  { id: 'AUD004', user: 'System', role: UserRole.SYSTEM_ADMIN, action: 'Auto-Purge', module: 'GDPR', date: '2024-05-15', time: '23:59:59', details: 'Cleanup of 3-year expired termination records', status: 'Success' },
  { id: 'AUD005', user: 'Sarah Connor', role: UserRole.HR_MANAGER, action: 'SAR Export', module: 'Compliance', date: '2024-05-16', time: '14:10:22', details: 'Generated GDPR SAR for EMP001', status: 'Success' },
  { id: 'AUD006', user: 'Sarah Connor', role: UserRole.HR_MANAGER, action: 'Failed Login', module: 'Auth', date: '2024-05-16', time: '14:15:05', details: 'Invalid credentials provided twice', status: 'Failure' },
];

export const MOCK_LEAVE_REQUESTS: LeaveRequest[] = [
  {
    id: 'LR001',
    employeeId: 'EMP003',
    employeeName: 'Kyle Reese',
    type: 'Annual',
    startDate: '2024-05-20',
    endDate: '2024-05-24',
    days: 5,
    status: LeaveStatus.PENDING,
    reason: 'Family vacation'
  },
  {
    id: 'LR002',
    employeeId: 'EMP001',
    employeeName: 'Sarah Connor',
    type: 'Sick',
    startDate: '2024-05-15',
    endDate: '2024-05-16',
    days: 2,
    status: LeaveStatus.APPROVED,
    reason: 'Medical checkup'
  }
];

export const MOCK_TIMESHEETS: TimesheetEntry[] = [
  {
    id: 'TS001',
    employeeId: 'EMP001',
    date: '2024-05-15',
    hours: 8,
    project: 'Project Genesis',
    task: 'Backend Optimization',
    status: 'Approved'
  },
  {
    id: 'TS002',
    employeeId: 'EMP001',
    date: '2024-05-16',
    hours: 7.5,
    project: 'Project Genesis',
    task: 'Bug Fixing',
    status: 'Submitted'
  }
];

export const DEPARTMENTS = ['Engineering', 'Human Resources', 'Sales', 'Marketing', 'Finance', 'Legal'];

export const COMPLIANCE_CHECKLIST = [
  "Right to Access Data (Art 15)",
  "Right to Rectification (Art 16)",
  "Right to Erasure (Art 17)",
  "Right to Data Portability (Art 20)",
  "Record of Processing Activities (Art 30)",
  "Data Protection Impact Assessment (Art 35)"
];
