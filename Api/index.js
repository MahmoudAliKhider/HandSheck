const express = require("express");

const cors = require("cors");

const swaggerUI = require("swagger-ui-express");
const swaggerDocument = require("./config/swagger.json");

const dbContext = require("./database/Database");

require("dotenv").config();
const app = express();

app.use(
  cors({
    origin: "http://localhost:4200",
  })
);

app.use(express.json());
dbContext();

app.use("/swagger", swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use("/api/products", require("./routes/products-route"));
app.use('/api/users',require('./routes/auth-route'));

const port = 3000 || proccess.env.PORT;
app.listen(port, () => console.log(`Listening on port ${port}...`));
