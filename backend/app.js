const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use("/", );

app.listen(PORT, (error) => {
    if (error) {
        console.log(error);
    }
    console.log(`Server listening on port ${PORT}!`);
});
