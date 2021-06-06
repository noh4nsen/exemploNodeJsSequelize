const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(process.env.SYSTEM_PORT, () => {
    console.log("Server is running at localhost: ",
        process.env.SYSTEM_PORT);
});

module.exports = app;