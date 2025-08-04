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

## 🔧 Tech Stack

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

## 📦 Environment Variables

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

---

## Go-To-Market (GTM) Strategy

To reach the first **10,000 users** with a total marketing budget of **₹5,000**, the following cost-effective, high-impact strategy will be executed:

### 1. Influencer Shoutouts — ₹1,000

* **Platform**: Instagram & YouTube Shorts
* **Target**: 2–3 student-focused micro-influencers
* **Pitch**:

  > “This free platform gives you job-ready resume tips, internship suggestions, and shows roles based on your profile. Try it now!”
* **Focus**: Demo-driven, short, relatable content
* **Estimated Users**: 3,000–4,000

---

### 2. WhatsApp & Telegram Groups — Free

* **Target**: College placement cells, fresher job groups, and course-specific communities
* **Message Example**:

  > “Upload your resume → Get instant feedback + internships + job matches for free. Try this app.”
* **Estimated Users**: 2,000–3,000

---

### 3. LinkedIn Organic Posts — Free

* **Post Type**: Personal stories by founders or ambassadors
* **Content**:
  “We built a platform to help students get real jobs/internships using AI.”
* **Extras**: Screenshots of resume feedback, job match visuals, and friendly CTAs
* **Estimated Users**: 1,000–1,500

---

### 4. Live Resume & Internship Help Session — ₹500–₹1,000

* **Format**: Zoom or Google Meet
* **Topic**:
  “How to build a job-ready resume + Where to find real internships”
* **Promotion**: Instagram Stories, LinkedIn posts, group shares
* **Access**: Free for users who register on the platform
* **Estimated Users**: 1,000–2,000

---

### 5. Weekly Internship & Job Alerts — Free

* **Method**: In-app notification + email campaigns
* **CTA**:
  “Get weekly internship/job updates tailored to your profile”
* **Impact**: Boosts long-term user engagement and retention

---

### Summary

| Channel                    | Budget      | Estimated Users |
| -------------------------- | ----------- | --------------- |
| Influencer Shoutouts       | ₹1,000      | 3,000–4,000     |
| WhatsApp & Telegram Groups | Free        | 2,000–3,000     |
| LinkedIn Organic           | Free        | 1,000–1,500     |
| Live Resume Help Session   | ₹500–₹1,000 | 1,000–2,000     |
| Weekly Job Alerts          | Free        | Retention Tool  |

**Goal**: 10,000+ total users in 3 months within ₹5,000 budget.

---
