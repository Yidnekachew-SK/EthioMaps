const express = require("express");
const passport_jwt = require('./middleware/passport-jwt');
const passport_local = require('./middleware/passport');

const authRouter = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(passport_jwt.initialize());
app.use(passport_local.initialize());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/", authRouter);

app.listen(PORT, (error) => {
    if (error) {
        console.log(error);
    }
    console.log(`Server listening on port ${PORT}!`);
});
