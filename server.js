const express = require("express");

const connectDB = require("../devConnector_1.0/config/db");


const app = express();

//connect to database
connectDB();

//Init middleware
app.use(express.json({ extendedb: false }));

const PORT = process.env.PORT || 5000;

// define Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/profile", require("./routes/api/profile"));



app.get("/", (req, res) => {
  res.send("API is Running");
});

app.listen(PORT, () => console.log(`server is up and running on PORT ${PORT}`));
