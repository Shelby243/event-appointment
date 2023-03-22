const express = require("express");
const colors = require("colors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const path = require("path");
dotenv.config();

//mongodb connection
connectDB();
//rest object
const app = express();
//middlewares
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/v1/user", require("./routes/userRoutes"));
app.use("/api/v1/admin", require("./routes/adminRoutes"));
app.use("/api/v1/event", require("./routes/eventRoutes"));

//static files
app.use(express.static(path.join(__dirname, "./client/build")));

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});
//port
const PORT = process.env.PORT || 8080;

//LISTEN PORT
app.listen(PORT, () => {
  console.log(
    `server Running in ${process.env.NODE_MODE} Mode on port ${process.env.PORT}`
      .bgCyan.white
  );
});
