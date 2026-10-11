# Quiz App

A simple quiz application with a React frontend and Express.js backend.

## Project Structure

```
quizapp/
├── backend/          # Express.js server
│   ├── server.js
│   ├── package.json
│   └── routes/
│       └── quizzes.js
├── frontend/         # React application
│   ├── src/
│   │   ├── App.js
│   │   ├── components/
│   │   │   ├── Quiz.js
│   │   │   └── Results.js
│   │   ├── index.js
│   │   └── App.css
│   ├── package.json
│   └── public/
│       └── index.html
└── README.md
```

## Setup & Installation

### Backend Setup

```bash
cd backend
npm install
npm start
```

The backend runs on `http://localhost:5000`

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

The frontend runs on `http://localhost:3000`

## Features

- Take quizzes with multiple choice questions
- Real-time score tracking
- View results after completing a quiz
- Responsive design

## API Endpoints

- `GET /api/quizzes` - Get all available quizzes
- `GET /api/quizzes/:id` - Get a specific quiz
- `POST /api/quizzes/:id/submit` - Submit quiz answers and get results
