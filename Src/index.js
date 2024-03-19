require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT;
const connectdb = require("./connectiondb");
const router = require("./Routes/routers");
const cors = require("cors");

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: "http://127.0.0.1:5173",
    credentials: true,
  })
);
app.use("/api", router);

app.get("/", (req, res) => {
  res.send("this is root of backend");
});

app.listen(PORT, (e) => {
  console.log(`Server is live on port ${PORT}`);
  connectdb();
});
