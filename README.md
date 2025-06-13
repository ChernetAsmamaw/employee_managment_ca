# SAP UI5 Employee Management Application

## Overview
This is a comprehensive SAP UI5 application that provides an employee management system with list and detail views, featuring navigation, data binding, filtering, and **CRUD operations**.

## Architecture

### Key Components

**`Component.js`** - Main application entry point that handles initialization, routing setup, and global model management.

**Controllers** - Business logic separated into focused, single-responsibility controllers:
- `EmployeeList.js` - Manages the employee directory with search, filtering, and navigation.
- `EmployeeDetail.js` - Handles individual employee profiles with **edit/delete capabilities**.
- `NotFound.js` - Manages the display and navigation for invalid URL hashes.

**Views** - XML-based declarative UI definitions that provide clean separation between presentation and logic:
- `EmployeeList.view.xml` - Responsive table layout with search capabilities.
- `EmployeeDetail.view.xml` - Detailed profile view with contact information.
- `NotFound.view.xml` - Displays a user-friendly message when a route doesn't match.

**Fragments** - Reusable UI snippets for common tasks:
- `EmployeeDialog.fragment.xml` - Provides a form for **adding and editing employee details**.

**Routing** - Configured through `manifest.json` to enable deep-linking and proper navigation flow between list and detail views, including a **`bypassed`** target for handling invalid URLs.

**Models** 
- `manifest.json` - Now declares the **JSON model** for `employeeData.json`, streamlining model initialization.
- `i18n` - Internationalization files (`i18n.properties`, `i18n_am.properties`) to support multiple languages, including **Amharic**.
## Screen Shots
![image](https://github.com/user-attachments/assets/c5489864-9881-44b7-b8f5-47f88b5acd5f)
![image](https://github.com/user-attachments/assets/8811da50-7530-4aaf-a21a-9aa9495397c6)
![image](https://github.com/user-attachments/assets/47c736c2-8b3a-465d-8d57-d00414279389)
![image](https://github.com/user-attachments/assets/d42af34e-5e47-444d-a629-36dc54e18871)
![image](https://github.com/user-attachments/assets/e73c2064-9f92-41b2-8f26-315ed9eed501)
![image](https://github.com/user-attachments/assets/5be889f7-3036-4787-b6a0-25c0945f2886)


