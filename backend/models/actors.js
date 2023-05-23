const {Validator} = require('jsonschema');
const validator = new Validator();

const actorSchema = {
  type: "object",
  properties: {
    id: {type: 'string'},
    name: {type: 'string'},
    birthYear: {type: 'number'},
    movies: {type: 'array'}
  },
  "required": ['name', 'birthYear']
};

const validateActor = (e) => {
  return validator.validate(e, actorSchema);
};

module.exports = {validateActor};
