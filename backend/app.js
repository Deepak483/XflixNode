// const express = require('express');
// const routes = require('./routes/v1');
// const httpStatus = require('http-status');
// const validate = require("./middlewares/validate");
// const videoController = require('./controllers/video.controller');
// const videoValidation = require('./validations/video.validation');
// const ApiError = require('./utils/ApiError');
// const { errorConverter, errorHandler } = require('./middlewares/error');

// const app = express();

// app.use(express.json());

// app.use(express.urlencoded({ extended: true }));
// //below line to make this app work on heroku.
// app.use('*', routes);

// app.use('/v1', routes);

// app.use('/video/:videoId', validate(videoValidation.videoById), videoController.getVideoById);

// // sending back a 404 error for unknown api request
// app.use((req, res, next) => {
//     next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
// });
  
// app.use(errorConverter);

// app.use(errorHandler);


// module.exports = app;
const express = require('express');
const httpStatus = require("http-status");
const routes = require("./routes/v1");
const cors = require("cors");
const ApiError = require("./utils/ApiError");

const app = express();

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true}));

// enable cors
app.use(cors());
app.options("*", cors());

// Reroute all API request starting with "/v1" route
app.use("/v1", routes);

app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

module.exports = app;