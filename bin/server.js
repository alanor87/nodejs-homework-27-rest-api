const mongoose = require("mongoose");
require("dotenv").config();

const app = require("../app");
const { DB_HOST, PORT = 3000 } = process.env;
mongoose
  .connect(DB_HOST, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(console.log('DB is connected'))
  .then(() => {
    app.listen(PORT);
    console.log(`Listening at PORT ${PORT}`);
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
