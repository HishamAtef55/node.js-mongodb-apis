const express = require("express");
const app = express();
const port = 3000;
const base_url = `http://localhost:${port}`;
const db_url = "mongodb://127.0.0.1:27017/node-apis";
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const mongoose = require("mongoose");
const productRoutes = require("./routes/products");

app.listen(port, () => {
  console.log(`Server is listening at ${base_url}`);
});

mongoose
  .connect(db_url)
  .then(() => console.log("DB Connected!"))
  .catch((error) => console.error(`DB disconnected! ${error}`));
// include routes
app.use("/products", productRoutes);
