# Task Priority App 
------------------
A full-stack task management application built with React + TypeScript on the frontend and Node.js, Express, MongoDB (Atlas) on the backend. The app allows users to enter tasks, assign priority, and see tasks sorted by urgency. 

The app should sort tasks automatically based on:
1. High priority first
2. Earlier due date first

# Tech Stack
-----------
    Frontend
    ---------
        React
        TypeScript
        Tailwind CSS
        Vite

    Backend
    -------
        Node.js
        Express
        TypeScript
        MongoDB Atlas
        Mongoose
        Nodemon
        ts-node

# Clone The Repo 
---------------
git clone https://github.com/MSaeedTariq/task-priority-app.git

# Backend Setup
-------------
1. cd backend
2. Run npm install in the backend directory
3. Create a .env file in the backend directory from .env.example 
4. update the port number according to your machine 
5. create a db in mongo atlas and put your connection string inplace of the MONGO_URI in the .env file 
6. Run npm run dev. The backend server will start and you will see "MongoDB connected and Server running on port {env port number}"

# Frontend Setup
--------------
1. cd ../frontend
2. Run npm install
3. Create a .env file in the frontend directory from .env.example 
4. update the VITE_API_URL according to the port number set in the backend 
5. Visit http://localhost:5173 in the browser to see the application


# Task Sorting Logic
Task Sorting Logic: 
1. Hightest prioirty first
2. Earlier due date first (if priorities match)
This logic ensures urgent and important tasks always appear at the top.