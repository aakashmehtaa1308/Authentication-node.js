const app = require("./src/express");
const db = require("./src/database");
const env = require("dotenv");
env.config();

try {
  db.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

db.sync().then(() => {
  app.listen(process.env.PORT || "4000", (err) => {
    if (err) {
      console.log(err);
    }
    console.log(`node server is listening on port 4000`);
  });
});
