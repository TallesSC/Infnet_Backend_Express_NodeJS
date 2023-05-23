const {Validator} = require('jsonschema');
const validator = new Validator();

const genreSchema = {
  type: "object",
  properties: {
    name: {type: 'string'},
  },
  "required": ['name']
};

const validateGenre = (e) => {
  return validator.validate(e, genreSchema);
};

module.exports = {validateGenre};
