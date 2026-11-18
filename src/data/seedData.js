// In-memory seed data. Replace these with real API calls / a database
// once you wire up a backend — the rest of the app only depends on the
// shapes below, not on where the data comes from.

export const SEED_USERS = [
  { id: "t1", role: "teacher", email: "rao@chalkline.edu", password: "teach123", name: "Ms. Rao" },
  { id: "t2", role: "teacher", email: "iyer@chalkline.edu", password: "teach123", name: "Mr. Iyer" },
  { id: "t3", role: "teacher", email: "madhesh.66666@gmail.com", password: "teach123", name: "Madhesh" },
  { id: "s1", role: "student", email: "asha@chalkline.edu", password: "learn123", name: "Asha" },
  { id: "s2", role: "student", email: "vikram@chalkline.edu", password: "learn123", name: "Vikram" },
  { id: "s3", role: "student", email: "meera@chalkline.edu", password: "learn123", name: "Meera" },
];

export const SEED_QUIZZES = [
  {
    id: "q1",
    title: "World Capitals",
    subject: "Geography",
    teacherId: "t1",
    createdAt: "2026-08-10",
    questions: [
      { q: "What is the capital of Japan?", options: ["Seoul", "Tokyo", "Beijing", "Bangkok"], correct: 1 },
      { q: "What is the capital of Australia?", options: ["Sydney", "Melbourne", "Canberra", "Perth"], correct: 2 },
      { q: "What is the capital of Canada?", options: ["Toronto", "Vancouver", "Ottawa", "Montreal"], correct: 2 },
    ],
  },
  {
    id: "q2",
    title: "Basic Algebra",
    subject: "Mathematics",
    teacherId: "t1",
    createdAt: "2026-08-14",
    questions: [
      { q: "Solve: 2x + 4 = 12. What is x?", options: ["2", "4", "6", "8"], correct: 1 },
      { q: "What is the value of 5 squared?", options: ["10", "15", "20", "25"], correct: 3 },
    ],
  },
];

export const SEED_RESULTS = [
  { id: "r1", quizId: "q1", studentId: "s1", studentName: "Asha", score: 3, total: 3, submittedAt: "2026-08-12" },
  { id: "r2", quizId: "q1", studentId: "s2", studentName: "Vikram", score: 2, total: 3, submittedAt: "2026-08-13" },
];

export const emptyQuestion = () => ({ q: "", options: ["", "", "", ""], correct: 0 });
