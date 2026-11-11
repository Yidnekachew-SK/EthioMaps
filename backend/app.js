const express = require("express");
const passport_jwt = require('./middleware/passport-jwt');
const passport_local = require('./middleware/passport');
const cors = require('cors');

const authRouter = require('./routes/authRoutes');
const uploadRouter = require("./routes/uploadRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: ['http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'file-name']
}));

app.use(passport_jwt.initialize());
app.use(passport_local.initialize());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/", authRouter);
app.use("/files", uploadRouter);

app.listen(PORT, (error) => {
    if (error) {
        console.log(error);
    }
    console.log(`Server listening on port ${PORT}!`);
});
