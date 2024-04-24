// const mongoose = require('mongoose');
// const app = require('./app');
// require('dotenv').config(); // Load environment variables from .env file
// const config = require("./config/config.js");
// // Create a MongoDB connection using Mongoose
// mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     console.log("Connected to MongoDB");
//     // Start the Node server
//     app.listen(process.env.XFLIX_PORT, () => {
//       console.log(`App is running on port ${process.env.XFLIX_PORT}`);
//     });
//   })
//   .catch((error) => {
//     console.error('Error connecting to MongoDB:', error);
//   });
const mongoose = require('mongoose');
const config = require("./config/config");
const app = require("./app");

const startMongo = async () => {
  try {
    await mongoose.connect(config.mongoose.url, config.mongoose.options)
         .then(() => console.log("connected to mongo DB"))
         .catch(err => console.log(err));

    app.listen(config.port, () => {
      console.log(`app listening on port ${config.port}!`)
    });
  } catch (err) {
    throw err;
  }
}

startMongo();