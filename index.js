const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const articlesRoutes = require("./routes/articles");
const categoriesRoutes = require("./routes/categories");
const authRoutes = require("./routes/auth");

app.use("/articles", articlesRoutes);
app.use("/categories", categoriesRoutes);
app.use("/auth", authRoutes);

const PORT = process.env.PORT || 3000;
app.get('/', (req, res) => {
  res.send('Server is running!');
});
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
