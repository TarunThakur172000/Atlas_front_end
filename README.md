Thanks You Atlas for giving this chance to build this project 
MovieHub – Full-Stack Movie Recommendation App
Table of Contents

Project Overview

Live Demo

Technologies

Backend Setup

Frontend Setup

Admin Credentials

Features

Folder Structure

Project Overview

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

Credential
Admin ID : admin@moviehub.com
Admin Password: Admin123

MovieHub is a full-stack application that allows users to recommend movies, upvote/downvote, and comment. Admins can manage movies and comments, and view a Top 5 leaderboard based on votes.

Live Demo : https://reliable-churros-e1fdd8.netlify.app/

Backend API: https://github.com/TarunThakur172000/Atlas_Back_end

Technologies

Frontend: React, Tailwind CSS, Vite

Backend: Node.js, Express.js

Database: PostgreSQL

Authentication: JWT, bcrypt

Deployment: Netlify (Frontend), Render (Backend)

Backend Setup

Clone the repo:

git clone https://github.com/TarunThakur172000/Atlas_Back_end.git


Install dependencies:

cd Atlas_Back_end
npm install


Create a .env file with the following variables:

PORT=5000
DATABASE_URL=postgresql://<user>:<password>@<host>/<db>
JWT_SECRET=<your_super_secret_key>


Run the server:

npm run dev


Test the API by visiting: http://localhost:5000/

Frontend Setup

Clone the repo:

git clone https://github.com/TarunThakur172000/Atlas_front_end.git


Install dependencies:

cd Atlas_front_end
npm install


Create a .env file with the backend API URL:

VITE_API_URL=http://localhost:5000/api


Start the development server:

npm run dev


Visit http://localhost:5173 in your browser.

Admin Credentials

Email: admin@example.com

Password: Admin@123

(You can update credentials in the database manually if needed.)

Features

User signup/login with JWT

Recommend movies (title + description)

Upvote / Downvote movies (1 vote per user)

Comment on movies

Admin: Remove movies/comments, view Top 5 leaderboard

Responsive UI

Folder Structure

Backend:

/routes       # All API routes
/middleware   # Auth & Admin middleware
/db.js        # PostgreSQL connection
/index.js     # Server entry point


Frontend:

/src
  /components  # Reusable UI components (MovieCard, Button, Navbar)
  /pages       # AdminDashboard, Movies, MovieDetail, Login, Signup
  /api.js      # Axios API calls
  /context     # AuthContext
/App.jsx
/main.jsx

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////      what is Learn throug this project          /////////////////////////////////////////////////////////////////////////
I had used AI for write repeated code for save time
learn about postgre sql aas I have never worked on postgre SQL 
during this project i regain my knowledge of JWT, bcrypt and system design.


