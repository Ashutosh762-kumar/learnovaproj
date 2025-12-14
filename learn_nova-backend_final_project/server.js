require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
 //upload routes


const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/courses', require('./routes/courses'));
app.use('/api/quizzes', require('./routes/quizzes'));
app.use('/api/progress', require('./routes/progress'));
app.use('/api/enrollments', require('./routes/enrollment'));
app.use("/api/uploads", require("./routes/uploads")); //upload routes


app.get('/', (req,res) => res.send('Learnova API Running'));

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => console.log('Server running on port', PORT));


                //URL GIVEN WITH CODE:
// require('dotenv').config();

// const express = require('express');
// const cors = require('cors');
// const connectDB = require('./config/db');

// const app = express();

// app.use(cors());
// app.use(express.json({ limit: '10mb' }));

// // ===============================
// // ⭐ CONNECT DATABASE
// // ===============================
// connectDB();

// // ===============================
// // ⭐ ROUTES + FRONTEND URL GUIDE
// // ===============================

// // AUTH ROUTES
// // Frontend will use:
// // POST    http://localhost:7000/api/auth/register
// // POST    http://localhost:7000/api/auth/login
// app.use('/api/auth', require('./routes/auth'));

// // USER ROUTES
// // Frontend will use:
// // GET     http://localhost:7000/api/users
// // GET     http://localhost:7000/api/users/:id
// // PUT     http://localhost:7000/api/users/:id
// app.use('/api/users', require('./routes/users'));

// // COURSES ROUTES
// // Frontend will use:
// // GET     http://localhost:7000/api/courses
// // GET     http://localhost:7000/api/courses/:id
// // POST    http://localhost:7000/api/courses
// // PUT     http://localhost:7000/api/courses/:id
// // DELETE  http://localhost:7000/api/courses/:id
// app.use('/api/courses', require('./routes/courses'));

// // QUIZ ROUTES
// // Frontend will use:
// // GET     http://localhost:7000/api/quizzes
// // POST    http://localhost:7000/api/quizzes
// // GET     http://localhost:7000/api/quizzes/:id
// app.use('/api/quizzes', require('./routes/quizzes'));

// // PROGRESS ROUTES
// // Frontend will use:
// // GET     http://localhost:7000/api/progress/:userId/:courseId
// // POST    http://localhost:7000/api/progress/update
// app.use('/api/progress', require('./routes/progress'));

// // ENROLLMENT ROUTES
// // Frontend will use:
// // POST    http://localhost:7000/api/enrollments/enroll
// // GET     http://localhost:7000/api/enrollments/user/:userId
// app.use('/api/enrollments', require('./routes/enrollment'));

// // UPLOADS ROUTES (Video/PDF/Image Upload)
// // Frontend will use:
// // POST    http://localhost:7000/api/uploads/upload
// app.use('/api/uploads', require('./routes/uploads'));

// // ===============================
// // ⭐ DEFAULT ROOT ENDPOINT
// // ===============================
// app.get('/', (req, res) => res.send('Learnova API Running'));

// // ===============================
// // ⭐ SERVER START
// // ===============================
// const PORT = process.env.PORT || 7000;
// app.listen(PORT, () => console.log('Server running on port', PORT));
