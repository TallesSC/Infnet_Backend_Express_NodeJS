const {Validator} = require('jsonschema');
const validator = new Validator();

const movieSchema = {
  type: "object",
  properties: {
    id: {type: 'string'},
    title: {type: 'string'},
    releaseYear: {type: 'number'},
    rating: {type: 'number', minimum: 0, maximum: 10},
    duration: {type: 'number', minimum: 0},
    genre: {type: 'string'}
  },
  "required": ['title', 'releaseYear', 'rating', 'duration', 'genre']
};

const validateMovie = (e) => {
  return validator.validate(e, movieSchema);
};

module.exports = {validateMovie};
