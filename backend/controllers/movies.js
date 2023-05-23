const {v4: uuidv4} = require('uuid');
const {validateMovie} = require('../models/movies');
const fs = require('fs');

const dataPath = 'data/movies.json';

function getMoviesPromise() {
  return new Promise((resolve, reject) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        let movies = JSON.parse(data);
        resolve(movies);
      }
    });
  });
}

const getMovies = (req, res) => {
  getMoviesPromise()
    .then(movies => res.status(200).json(movies))
    .catch(err => res.status(500).send(err.message));
};


function addMoviePromise(movie) {
  return new Promise((resolve, reject) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        let movies = JSON.parse(data);
        const id = uuidv4();
        const newMovie = {id, ...movie};
        movies.push(newMovie);
        fs.writeFile(dataPath, JSON.stringify(movies), (err) => {
          if (err) {
            reject(err);
          } else {
            resolve(newMovie);
          }
        });
      }
    });
  });
}

const addMovie = (req, res) => {
  const movie = req.body;

  const validResult = validateMovie(movie);


  if (!validResult.valid) {
    return res.status(400).json({message: 'Invalid movie Data', errors: validResult.errors});
  }

  addMoviePromise(movie)
    .then(newMovie => res.status(200).json(newMovie))
    .catch(err => res.status(500).send(err.message));
};


function updateMoviePromise(id, movie) {
  return new Promise((resolve, reject) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        let movies = JSON.parse(data);
        const index = movies.findIndex((e) => e.id === id);
        if (index === -1) {
          reject(new Error('Movie not found'));
        } else {
          const updatedMovie = {...movies[index], ...movie};
          movies[index] = updatedMovie;
          fs.writeFile(dataPath, JSON.stringify(movies), (err) => {
            if (err) {
              reject(err);
            } else {
              resolve(updatedMovie);
            }
          });
        }
      }
    });
  });
}

const updateMovie = (req, res) => {
  const id = req.params.id;
  const movie = req.body;
  updateMoviePromise(id, movie)
    .then(updatedMovie => res.status(200).json(updatedMovie))
    .catch(err => res.status(500).send(err.message));
};


function deleteMoviePromise(id) {
  return new Promise((resolve, reject) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        const movies = JSON.parse(data);
        const index = movies.findIndex(m => m.id === id);
        if (index === -1) {
          reject(new Error('Movie not found'));
        } else {
          movies.splice(index, 1);
          fs.writeFile(dataPath, JSON.stringify(movies), err => {
            if (err) {
              reject(err);
            } else {
              resolve();
            }
          });
        }
      }
    });
  });
}

const deleteMovie = (req, res) => {
  const id = req.params.id;
  deleteMoviePromise(id)
    .then(() => res.status(200).json({message: 'Movie Deleted'}))
    .catch(err => res.status(500).send(err.message));
};

module.exports = {
  getMovies,
  addMovie,
  updateMovie,
  deleteMovie
};