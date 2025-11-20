# 🚀 TinyLink – Full Stack URL Shortener
# TinyLink – Full Stack URL Shortener

![TinyLink Screenshot](./TInyLink.png)

TinyLink is a modern, full‑stack URL shortening platform built using **React (Vite)** and **Node.js + Express**.  
It enables users to shorten URLs, create custom aliases, track link clicks, and manage all URLs through a clean real‑time dashboard.

This project demonstrates production‑grade full‑stack development with:

- ⚡ Optimistic UI  
- 🏗️ Monorepo structure  
- 🔄 React Query for state management  
- 📡 REST API with Express  
- 🍃 MongoDB with Mongoose  
- ☁️ Deployment on Render + MongoDB Atlas  

---

## 🌐 Live Demo

🔗 **Public URL:** https://linkshorter-ov3j.onrender.com/  
🎥 **Demo Video:** *https://drive.google.com/file/d/1CGgboW5cFsJRb3shxisopk94yG5NjVJE/view?usp=drive_link*

---

## 🛠 Tech Stack

### **Frontend**
- React (Vite)
- Tailwind CSS
- TanStack Query (React Query)
- React Router DOM
- React Hot Toast
- Lucide Icons

### **Backend**
- Node.js
- Express.js
- Mongoose (MongoDB)
- Joi (Validation)
- NanoID (Custom alphanumeric generator)

### **Deployment**
- Render
- MongoDB Atlas
- Monolithic deployment (Backend serves built frontend)

---

## ✨ Features

### 🔗 URL Shortening
- Shorten any valid HTTPS URL
- Optional custom alias (e.g., `/myportfolio`)
- Strict URL validation (Joi)
- Ensures globally unique codes

### 🚀 Smart Redirects
- 302 redirect to the destination URL
- Auto‑updates:
  - Total Clicks
  - Last Clicked Timestamp

### 📊 Dashboard & Stats
- Real‑time UI updates powered by React Query
- Instant optimistic interactions
- Search links by code or URL
- Copy link with one click
- Delete link with real‑time feedback

### 📱 Responsive UI
- Works perfectly on Desktop, Tablet, and Mobile

---

## 📂 Project Structure

```
linkshorter-root/
├── backend/                # Express API & redirect logic
│   ├── src/
│   │   ├── models/         # Mongoose Schemas
│   │   ├── routes/         # API endpoints
│   │   ├── controllers/    # Create, Redirect, Stats logic
│   │   └── app.js          # Server entry
│   └── package.json
│
├── frontend/               # React Vite frontend
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── pages/          # Dashboard & Stats page
│   │   └── helper/         # Axios + BaseURL utilities
│   └── package.json
│
└── package.json            # Root config (Render build/deploy)
```

---

## 🔧 Installation & Setup

### **1. Clone the Repository**
```bash
git clone https://github.com/21R11A0426/LinkShorter.git
cd LinkShorter
```

### **2. Install Dependencies**
Installs dependencies for both backend & frontend:
```bash
npm run build
```

### **3. Backend Environment Variables**
Create a `.env` file in `/backend`:

```
MONGO_URI=mongodb://localhost:27017/tinylink
PORT=8080
BASE_URL=http://localhost:8080
```

### **4. Start the App**
```bash
npm start
```

### **Running Locally**
- Backend → http://localhost:8080  
- Frontend → http://localhost:5173 (if running separately via `npm run dev --prefix frontend`)

---

## 🧪 API Endpoints

### **POST /api/links**
Create a new short URL.

#### Request:
```json
{
  "url": "https://example.com",
  "code": "optional-custom-code"
}
```

### **GET /:code**
Redirect to the original URL.

### **GET /api/links**
Fetch all links.

### **DELETE /api/links/:code**
Delete a link.

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 👤 Author

**Vikas Maldanngari**

- 🐙 GitHub: https://github.com/21R11A0426  
- 💼 LinkedIn: *(https://www.linkedin.com/in/maldannagari-vikas/)*  
- 🌐 Portfolio: *(https://vikas-portfolio-teal.vercel.app/)*  
