# Project Scope: Role-Based Task Management System (Node.js + MongoDB)

## 1. Project Overview

This project is a task management system built with **Node.js,
Express.js, and MongoDB**.\
It implements **JWT-based authentication** using an **Access Token +
Refresh Token** strategy.

The system includes **Role-Based Access Control (RBAC)** with multiple
roles --- **Super Admin, Admin, Manager, and Employee** --- to define
permissions for managing users and tasks.

------------------------------------------------------------------------

## 2. Core Features

### 2.1 Authentication & Authorization

**User Registration & Login** - Users register with **name, email,
password, and role**. - Passwords are hashed using **bcrypt**.

**Access Token** - Short-lived (e.g., **15 minutes**). - Sent in the
header: `Authorization: Bearer <token>` for protected routes.

**Refresh Token** - Long-lived (e.g., **7 days**). - Stored securely
(**HTTP-only cookie or database**). - Used to generate a new access
token without requiring re-login.

**Logout** - Invalidates the refresh token by deleting it from the
database.

**Role-Based Access Control (RBAC)** - **Super Admin** - Manage all
users and roles. - Assign Admins, Managers, and Employees. - **Admin** -
Manage Managers and Employees. - Can create tasks but cannot assign them
directly. - **Manager** - Assign tasks to employees under them. - View
all assigned tasks and track progress. - **Employee** - View assigned
tasks. - Update task status (**Pending, In Progress, Completed**).

------------------------------------------------------------------------

### 2.2 Task Management

**Task Fields** - Title - Description - Priority (**High, Medium,
Low**) - Status (**Pending, In Progress, Completed**) - AssignedBy
(**Manager ID**) - AssignedTo (**Employee ID**) - Due Date

**CRUD Operations**

**Create Task** - **Manager:** Can assign tasks to employees. -
**Admin:** Can create tasks but must assign them through managers. -
**Super Admin:** Full access.

**Read Tasks** - **Super Admin/Admin:** View all tasks. - **Manager:**
View tasks assigned by them. - **Employee:** View only tasks assigned to
them.

**Update Task** - **Manager:** Update tasks they assigned. -
**Employee:** Update only their task status.

**Delete Task** - **Manager:** Delete tasks they created. -
**Admin/Super Admin:** Delete any task.

------------------------------------------------------------------------

### 2.3 User & Role Management

**Super Admin Features** - Add or remove users. - Assign roles (**Admin,
Manager, Employee**). - Activate or deactivate accounts.

**Admin Features** - Manage Managers and Employees. - View all tasks.

**Manager Features** - Create and assign tasks to employees. - Track
employee progress.

**Employee Features** - View assigned tasks. - Update task status.

------------------------------------------------------------------------

## 3. Tech Stack

-   **Backend:** Node.js, Express.js\
-   **Database:** MongoDB with Mongoose\
-   **Authentication:** JWT (Access + Refresh Tokens)\
-   **Security:** Bcrypt, Helmet, CORS\
-   **Task Scheduling (Optional):** Node Cron for reminders\
-   **File Upload (Optional):** Multer for task attachments\
-   **Testing:** Postman, Jest/Mocha

------------------------------------------------------------------------

## 4. API Endpoints

### Auth Routes

-   `POST /auth/register` → Register user (roles assigned by Super
    Admin)\
-   `POST /auth/login` → Login and return Access + Refresh tokens\
-   `POST /auth/refresh` → Generate a new Access Token using Refresh
    Token\
-   `POST /auth/logout` → Logout and invalidate refresh token

### User Management (Super Admin/Admin)

-   `GET /users` → View all users\
-   `PATCH /users/:id/role` → Change user role\
-   `PATCH /users/:id/status` → Activate or deactivate user

### Task Routes

-   `POST /tasks` → Create task (Manager/Admin/Super Admin)\
-   `GET /tasks` → Get tasks with role-based access\
-   `GET /tasks/:id` → Get single task details\
-   `PATCH /tasks/:id` → Update task (role restrictions apply)\
-   `DELETE /tasks/:id` → Delete task (Manager: own tasks, Admin/Super
    Admin: all)

------------------------------------------------------------------------

## 5. Deliverables

-   Secure **Node.js + MongoDB** backend\
-   Authentication with **Access + Refresh tokens**\
-   Role-based authorization (**Super Admin, Admin, Manager,
    Employee**)\
-   Task CRUD with role-specific restrictions\
-   Postman collection for API testing\
-   Optional **Swagger API documentation**
