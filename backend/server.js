// Server setup (port configuration)

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const circularRoutes = require("./routes/circularRoutes");
const acknowledgementRoutes = require("./routes/acknowledgementRoutes");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/circulars", circularRoutes);
app.use("/api/acknowledge", acknowledgementRoutes);

app.get("/", (req, res) => {
    res.send("Hello world!");
});

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})