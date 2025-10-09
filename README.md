# 🚀 DevTinder

**DevTinder** is a full-stack web application that helps developers connect, collaborate, and find potential teammates for projects based on their skills, interests, and tech stacks — similar to how Tinder matches users, but for developers.

🔗 **Live Demo:** [https://devtinder.apdev.live](https://devtinder.apdev.live)

---

## 🛠️ Tech Stack

**Frontend:** React.js, Tailwind CSS  
**Backend:** Node.js, Express.js  
**Database:** MongoDB (Mongoose ORM)  
**Authentication:** JWT (JSON Web Token)  
**Deployment:** AWS EC2 + Nginx  
**Package Manager:** npm  

---

## ✨ Features

- 🔐 **User Authentication** – Secure signup and login using JWT.  
- 👤 **Developer Profiles** – Create and customize your tech profile.  
- 💡 **Smart Matching System** – Matches developers based on shared skills and project interests.  
- 💬 **Real-Time Chat** – Communicate instantly with matched developers.  
- 🌐 **Responsive UI** – Fully responsive interface built with Tailwind CSS.  
- 🧭 **Explore Section** – Browse and connect with talented developers across domains.  

---

## 🧩 Project Structure

DevTinder/
│
├── client/ # React frontend
│ ├── src/
│ │ ├── components/ # Reusable UI components
│ │ ├── pages/ # App pages (Home, Profile, Matches, Chat, etc.)
│ │ ├── services/ # API integration files
│ │ ├── App.js
│ │ └── index.js
│ ├── public/
│ └── package.json
│
├── server/ # Backend code (Node.js + Express)
│ ├── controllers/ # Business logic for APIs
│ ├── routes/ # API endpoints
│ ├── models/ # Mongoose schemas
│ ├── middleware/ # Auth and error handling
│ ├── server.js # Entry point
│ └── package.json
│
├── .env.example # Environment variable template
├── .gitignore
├── README.md
└── LICENSE

## ⚙️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/devtinder.git
   cd devtinder

2. Install dependencies

   npm install

3. Set environment variables

   Create a .env file in the server directory and add:

    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret


4. Run the app

   npm start

5. Open your browser at
    http://localhost:3000


🌍 Deployment

Deployed on AWS EC2 using Nginx as a reverse proxy for production.
The backend runs on Node.js, and the frontend is built and served using Nginx.

👨‍💻 Developer

Ankit Patel
🎓 B.Tech CSE, IIIT Bhagalpur
💼 Full Stack Developer | MERN Stack Enthusiast
🔗 LinkedIn

🪪 License

This project is licensed under the MIT License — feel free to use and modify it.



