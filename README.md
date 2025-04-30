# SKILLSYNC - Client-Freelancer Platform

**SKILLSYNC** is a modern web application that bridges the gap between clients and freelancers, offering a seamless platform for posting projects, hiring talent, and managing work efficiently. Built using **NestJS** for the backend and **ReactJS** for the frontend, the platform ensures a robust, scalable, and responsive experience for both parties.

---

## 🔧 Tech Stack

### 🚀 Frontend
- ReactJS
- React Router
- Axios
- Chakra UI
- Context API 
- Tanstackr@react-query
- React-Hook-Form

### 🛠️ Backend
- NestJS (Node.js Framework)
- TypeScript
- RESTful APIs
- MySql
- TypeORM
- Authentication with JWT / OAuth

---

## 📁 Project Structure

### Backend ( `/backend`)
- `src/modules`: Modular feature-wise folder structure
- `auth/`: Login, registration, JWT handling
- `users/`: Freelancer and client profile management
- `projects/`: Project posting and management
- `bids/`: Freelancers bidding for projects
- `milestones/`: DTOs, Guards, Interceptors, etc.
- `services/`: cloudinary , nodemailer.
- `messages/`: DTOs, Guards, Interceptors, etc.
- `common/`: DTOs, Guards, Interceptors, etc.




### Frontend (`/client`)
- `src/api`: Client and freelancer apis
- `src/pages`: Client and freelancer dashboards
- `src/components`: UI components
- `src/services`: API calls 
- `src/context`: Global state handling
- `src/contexts`: Usercontext and projectcontext
- `src/routing`: routing
- `src/App.jsx`: app.jsx




---

## 🔑 Features

### For Clients:
- Register and log in securely
- Post new projects with deadlines and budgets
- Hire freelancers and manage ongoing projects
- Chat with the freelancers for better convineance
- Forget Password , Updae Profile

### For Freelancers:
- Register and log in securely
- Create and update a professional profile
- Browse available projects and place bids
- Communicate and manage tasks with clients
- Forget Password 

### General Features:
- JWT Authentication and role-based access
- Modular architecture with NestJS
- Clean and responsive UI with React
- RESTful API communication
- Error handling and validation

---

## ⚙️ Installation
Migation setuo
```bash
npm run migration:generate --name=CreateUsersTable
npm run migration:run

### Backend Setup
```bash
cd backend
npm install
npm run start:dev

### Frontend Setup 
cd client 
npm install
npm run dev 

```

!important 
### .env setup 
```bash
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=
SMTP_PASSWORD=
FRONTEND_URL=http://localhost:5173
SMTP_FROM="SkillSync <no-reply@skillsync.com>"
```

Author : BhusahnDDS 
bhushanshirsat637@gmail.com


