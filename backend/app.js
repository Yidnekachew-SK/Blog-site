const express = require('express');
const methodOverride = require('method-override');
const passport_jwt = require('./middleware/passport-jwt');
const passport_local = require('./middleware/passport');
const cors = require('cors');
require('dotenv').config();

const authRouter = require('./routes/authRoutes');
const postRouter = require('./routes/postRoutes');
const commentRouter = require('./routes/commentRoutes');

const port = process.env.PORT || 3000;
const app = express();

app.use(cors({
  origin: ['http://localhost:5173', "https://yidnekachewsk-blog-site.netlify.app"],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(passport_jwt.initialize());
app.use(passport_local.initialize());

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(express.json())

app.use('/api/', authRouter);
app.use('/api/posts', postRouter);
app.use('/api/post/:postId/comment',passport_jwt.authenticate('jwt', {session: false}), commentRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(err.status || 500).json({
    error: err.message || "Internal Server Error",
  });
});

app.listen(port, (error) => {
    if (error) {
        console.log(error);
    }
    console.log("server running on port " + port);
})