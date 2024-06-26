const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config({ path: path.join(__dirname, '../.env') });

const envVarsSchema = Joi.object()
.keys({
    NODE_ENV: Joi.string()
      .valid("production", "development", "test")
      .required(),
      PORTUSED: Joi.number().default(3000),
      MONGODB_URL: Joi.string().required().description("Mongo DB url"),
})
.unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);


module.exports = {
    env: envVars.NODE_ENV,
    port: envVars.PORTUSED,
    //mongoose configuration
    mongoose: {
        url: envVars.MONGODB_URL + (envVars.NODE_ENV === "test" ? "-test" : ""),
        options: {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        },
    },
};