const express = require("express");
require("dotenv").config();
const cors = require('cors');
const app = express();
const connectDb = require("./utils/db");
const authRoutes = require("./routes/auth");

const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credential:true,     
}

app.use(cors(corsOptions));
app.use(express.json());
app.use("/api/auth", authRoutes);
app.get("/", (req, res) => {
  res.json({
    message: "Server is running; you are seeing this on the deployed server",
  });
});

const PORT = 5000;

connectDb().then(() =>{
  app.listen(PORT, () =>{
      console.log(`Server is running at port: ${PORT}`);
  });
});