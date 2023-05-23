const {validateGenre} = require('../models/genres');
const fs = require('fs');

const dataPath = 'data/genres.json';

function getGenresPromise() {
  return new Promise((resolve, reject) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        let genres = JSON.parse(data);
        resolve(genres);
      }
    });
  });
}

const getGenres = (req, res) => {
  getGenresPromise()
    .then(genres => res.status(200).json(genres))
    .catch(err => res.status(500).send(err.message));
};


function addGenrePromise(genre) {
  return new Promise((resolve, reject) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        let genres = JSON.parse(data);
        genres.push(genre.name);
        fs.writeFile(dataPath, JSON.stringify(genres), (err) => {
          if (err) {
            reject(err);
          } else {
            resolve(genre);
          }
        });
      }
    });
  });
}

const addGenre = (req, res) => {
  const genre = req.body;

  const validResult = validateGenre(genre);

  if (!validResult.valid) {
    return res.status(400).json({message: 'Invalid Genre Data', errors: validResult.errors});
  }

  addGenrePromise(genre)
    .then(newGenre => res.status(200).json(newGenre))
    .catch(err => res.status(500).send(err.message));
};

function deleteGenrePromise(name) {
  return new Promise((resolve, reject) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        const genres = JSON.parse(data);
        const index = genres.findIndex(g => g === name);
        if (index === -1) {
          reject(new Error('Genre not found'));
        } else {
          genres.splice(index, 1);
          fs.writeFile(dataPath, JSON.stringify(genres), err => {
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

const deleteGenre = (req, res) => {
  const name = req.params.name;
  deleteGenrePromise(name)
    .then(() => res.status(200).json({message: 'Genre Deleted'}))
    .catch(err => res.status(500).send(err.message));
};

module.exports = {
  getGenres,
  addGenre,
  deleteGenre
};