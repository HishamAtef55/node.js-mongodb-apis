const express = require("express");
const app = express();
const mongoose = require("mongoose");

require("dotenv").config();
const PORT = process.env.NODE_DOCKER_PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.o7rdbu7.mongodb.net/${process.env.APP_NAME}`
  )
  .then(() => console.log("DB Connected!"))
  .catch((error) => console.error(`DB disconnected! ${error}`));
// const db_url = "mongodb://127.0.0.1:27017/node-apis";
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const productRoutes = require("./routes/products");
const personsRoutes = require("./routes/persons");

// include routes
app.use("/products", productRoutes);
app.use("/persons", personsRoutes);
