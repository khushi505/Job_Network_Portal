#  Job & Network Portal – Full Stack AI-Powered Career Platform

A modern **job and networking platform** inspired by LinkedIn, AngelList, and Upwork — built for the **RizeOS Core Team Internship** assessment.
This full-stack application empowers users to explore jobs, post opportunities, extract resume skills using AI, and get personalized job matches — all through a seamless and intuitive interface.

---

## Features Implemented

### Authentication & Profile Management

* JWT-based user registration and login
* Profile creation and update (Name, Bio, LinkedIn)
* Upload resume and extract skills using AI (NLP)
* View public profiles and job history

### Job Board & Application System

* Post jobs (title, description, skills, salary/budget)
* Browse job listings from all users
* Filter jobs by required skills and tags
* Apply to jobs with:

  * Name, contact details, resume link, experience, skills
* View:

  * Jobs you've **posted**
  * Jobs you've **applied to**

### AI-Driven Enhancements

* **Resume Skill Extraction** (PDF parsing via NLP)
* **Match Score** between your skills and job listings
* **Smart Suggestions** for jobs based on extracted profile skills

### Clean UI & UX

* Fully responsive design with Tailwind CSS
* Dark mode-friendly color scheme (black background, white text)
* Easy navigation with Navbar and Sidebar components

---

## Tech Stack

| Layer    | Technology                                        |
| -------- | ------------------------------------------------- |
| Frontend | React.js, Tailwind CSS                            |
| Backend  | Node.js, Express.js                               |
| Database | MongoDB (Mongoose)                                |
| AI/NLP   | Python script or JS-based NLP (for skill parsing) |
| Hosting  | Vercel (frontend), Render (backend)               |

---

## Folder Structure (Frontend & Backend)

```
Job_Network_Portal/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   ├── utils/
│   └── server.js
├── frontend/
│   ├── assets/
│   ├── components/
│   ├── contexts/
│   ├── features/
│   ├── services/
│   └── main.jsx
```

---

## Local Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/khushi505/job-network-portal.git
cd job-network-portal
```

### 2. Backend Setup

```bash
cd backend
npm install
# Create .env file with MongoDB URI and JWT secret
node server.js
```

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## Environment Variables

### Backend (`backend/.env`)

```
PORT=5000
MONGODB_URI=your_mongo_uri
JWT_SECRET=your_jwt_secret
```

### Frontend (`frontend/.env`)

```
VITE_API_URL=http://localhost:5000/api
```
