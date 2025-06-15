# 🎓 Acadify - Graduation Project Management System

**Acadify** is a modern, web-based platform that helps students, teachers, and administrators manage graduation projects efficiently and collaboratively.

Built with **React**, **Tailwind CSS**, and **MockAPI**, Acadify simplifies the academic project workflow — from idea submission to approval and team coordination.

---

## 🔐 Roles & Access PINs

To register as a **Teacher** or **Admin**, a valid PIN must be entered:

- **Teacher PIN**: `1234`
- **Admin PIN**: `9999`

📝 **Students** don’t need a PIN, but their email must contain the word **`tuwaiq`**.

---

## 🌟 Features

### 👨‍🎓 Student Panel
- Register & Login (email must include `tuwaiq`)
- Submit graduation project ideas
- View idea status: Pending, Accepted, or Rejected
- View assigned supervisor and team members
- Browse approved ideas to avoid duplication

### 👨‍🏫 Teacher Panel
- View assigned students
- Review submitted ideas
- Accept or reject ideas with a reason

### 🛠 Admin Panel
- View all students and teachers
- Assign teachers to students
- Edit or delete users (students/teachers)
- Approve or reject ideas with comments
- Delete rejected ideas
- Filter students by name
- Add new users manually (student/teacher)
- View summary dashboard with interactive charts

---

## 🖼️ Screenshots

### 🎉 Welcome Page  
![Welcome_page](https://github.com/user-attachments/assets/7ad471d6-2191-447a-a8fb-b431305a0cf4)

---

## ⚙️ Tech Stack

| Technology    | Description                       |
|---------------|-----------------------------------|
| React         | Frontend framework                |
| Tailwind CSS  | Modern UI styling                 |
| React Router  | Page navigation                   |
| Axios         | HTTP requests to MockAPI          |
| SweetAlert2   | Elegant alert & confirmation modals |
| Chart.js      | Dashboard chart visualization     |
| MockAPI       | Mock backend for users & ideas    |

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/acadify.git
cd acadify

