# Chalkline — Quiz App

A React quiz app with separate teacher and student dashboards.

## Features
- Email + password login for both roles, with logout
- **Teacher:** create quizzes (multiple questions, 4 options each), view all published quizzes, view student results per quiz
- **Student:** view available quizzes, take a test (one question at a time), view personal result history
- Data is kept in React state only (no backend) — it resets on page refresh

## Run locally

```bash
npm install
npm run dev
```

Then open the printed local URL (usually `http://localhost:5173`).

## Demo logins

**Teachers**
- rao@chalkline.edu / teach123
- iyer@chalkline.edu / teach123

**Students**
- asha@chalkline.edu / learn123
- vikram@chalkline.edu / learn123
- meera@chalkline.edu / learn123

## Project structure

```
quiz-app/
├── index.html
├── package.json
├── vite.config.js
├── .gitignore
└── src/
    ├── main.jsx                    # React entry point, mounts <App />
    ├── App.jsx                     # Root component: session state + routing between screens
    ├── index.css                   # Theme variables, fonts, global styles
    ├── data/
    │   └── seedData.js             # In-memory users, quizzes, and results
    └── components/
        ├── Header.jsx              # Shared top bar with logout
        ├── EmptyState.jsx          # Reusable "nothing here yet" placeholder
        ├── LoginScreen.jsx         # Email + password login, role toggle
        ├── TeacherDashboard.jsx    # Tabs: My Quizzes / Create Quiz / Results
        ├── QuizList.jsx            # Grid of a teacher's published quizzes
        ├── CreateQuiz.jsx          # Dynamic question builder form
        ├── ResultsView.jsx         # Filterable table of student scores
        ├── StudentDashboard.jsx    # Tabs: Available Quizzes / My Results
        └── TakeQuiz.jsx            # Chalkboard-themed test-taking flow
```

## Notes
- Styling uses Tailwind (via CDN in index.html) plus custom CSS variables/fonts defined inline in App.jsx.
- To connect real persistence (a database + auth), replace the in-memory `users`, `quizzes`, and `results` state in `App.jsx` with API calls.
