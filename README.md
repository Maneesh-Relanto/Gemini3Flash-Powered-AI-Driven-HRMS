
# LuminaHR | AI-Powered HRMS

LuminaHR is an enterprise-grade, modern Human Resource Management System (HRMS) designed with a **privacy-first** philosophy. Inspired by industry standards like OrangeHRM, it streamlines HR operations while ensuring strict adherence to **GDPR** and global labor regulations.

![License](https://img.shields.io/badge/License-GDPR--Compliant-indigo)
![Tech](https://img.shields.io/badge/Built%20with-React%20%2B%20Gemini%20AI-blue)

## 🚀 Key Features (MVP Scope)

### 1. Employee Management (PIM)
The **Personal Information Management** module serves as the single source of truth for employee records.
- **Rich Profiles**: Track personal details, job history, supervisors, and emergency contacts.
- **Digital Dossier**: Secure storage of employment documents and identity verification.
- **Compact UI**: A high-density, space-efficient interface for managing large workforces.

### 2. Leave Management
Automated workflows for time-off requests and balance tracking.
- **Smart Approvals**: Multi-level approval chains for HR and Supervisors.
- **Balance Insights**: Real-time tracking of annual, sick, and personal leave.
- **Privacy Controls**: Sensitive health-related leave reasons are restricted and audited.

### 3. Timesheet Management
Effortless tracking of productivity and labor law compliance.
- **Weekly Logs**: Easy-to-use grid for logging project hours and tasks.
- **Project Costing**: Associate time with specific organizational initiatives.
- **Automated Audit**: Data minimization applied to collect only necessary performance metrics.

### 4. AI-Driven Insights & Compliance
Powered by **Google Gemini API**, LuminaHR provides intelligent oversight.
- **Predictive Analytics**: AI analyzes attrition trends and hiring needs.
- **Legal Assistant**: A built-in GDPR consultant to answer complex regulatory queries.
- **Audit Logging**: Every PII access is logged to satisfy GDPR Article 30 (Record of Processing Activities).

## 🛡️ GDPR & Security

LuminaHR is built to handle sensitive "Special Category" data securely:
- **Art 15 (Right Access)**: One-click Subject Access Request (SAR) data portability exports.
- **Art 17 (Right to Erasure)**: Automated "Forget Employee" workflows for terminated staff.
- **Art 25 (Privacy by Design)**: PII is hashed and encrypted; data minimization is enforced at the UI level.
- **Art 32 (Security of Processing)**: Role-Based Access Control (RBAC) ensures data is only visible to authorized personnel.

## 🛠️ Tech Stack

- **Frontend**: React 18 (ESM), Tailwind CSS
- **Icons**: Lucide React
- **Charts**: Recharts (D3-based)
- **AI Engine**: Google Gemini (Flash & Pro models)
- **State Management**: React Hooks & Functional Components

## 🏁 Getting Started

The application runs in a modern ESM environment.
1. Ensure your environment has a valid `API_KEY` for the Google Gemini SDK.
2. Open `index.html` in a browser that supports Import Maps (Chrome 89+, Edge 89+, Safari 16.4+).

---
*LuminaHR: Human Resources, Reimagined with Intelligence and Integrity.*
