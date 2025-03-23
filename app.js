require("dotenv").config();
const express = require("express");

const { connectMongoDB } = require("./db/connect");
const notFound=require("./middleware/notFound")

const tasksRouter = require("./routes/tasks");

app = express();

const url = process.env.MONGO_URI;

//Database
connectMongoDB(url);

//middlewares
app.use(express.static("./public"));
app.use(express.json());



//routes
app.use("/api/v1/tasks", tasksRouter);

app.use(notFound);

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server started at ${PORT}`));
