
import { Employee, EmployeeStatus, LeaveStatus } from './types';

export const MOCK_EMPLOYEES: Employee[] = [
  {
    id: 'EMP001',
    firstName: 'Sarah',
    lastName: 'Connor',
    email: 'sarah.c@lumina.io',
    department: 'Engineering',
    role: 'Lead Developer',
    status: EmployeeStatus.ACTIVE,
    joinDate: '2022-03-15',
    avatar: 'https://picsum.photos/seed/sarah/100/100',
    gdprConsent: true,
    sensitiveDataEncrypted: true
  },
  {
    id: 'EMP002',
    firstName: 'Marcus',
    lastName: 'Wright',
    email: 'marcus.w@lumina.io',
    department: 'Human Resources',
    role: 'HR Manager',
    status: EmployeeStatus.ACTIVE,
    joinDate: '2021-11-02',
    avatar: 'https://picsum.photos/seed/marcus/100/100',
    gdprConsent: true,
    sensitiveDataEncrypted: true
  },
  {
    id: 'EMP003',
    firstName: 'Kyle',
    lastName: 'Reese',
    email: 'kyle.r@lumina.io',
    department: 'Sales',
    role: 'Account Executive',
    status: EmployeeStatus.ON_LEAVE,
    joinDate: '2023-01-10',
    avatar: 'https://picsum.photos/seed/kyle/100/100',
    gdprConsent: false,
    sensitiveDataEncrypted: true
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
