const {v4: uuidv4} = require('uuid');
const {validateActor} = require('../models/actors');
const fs = require('fs');

const dataPath = 'data/actors.json';

function getActorsPromise() {
  return new Promise((resolve, reject) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        let actors = JSON.parse(data);
        resolve(actors);
      }
    });
  });
}

const getActors = (req, res) => {
  getActorsPromise()
    .then(actors => res.status(200).json(actors))
    .catch(err => res.status(500).send(err.message));
};


function addActorPromise(actor) {
  return new Promise((resolve, reject) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        let actors = JSON.parse(data);
        const id = uuidv4();
        const newActor = {id, ...actor};
        actors.push(newActor);
        fs.writeFile(dataPath, JSON.stringify(actors), (err) => {
          if (err) {
            reject(err);
          } else {
            resolve(newActor);
          }
        });
      }
    });
  });
}

const addActor = (req, res) => {
  const actor = req.body;

  const validResult = validateActor(actor);

  if (!validResult.valid) {
    return res.status(400).json({message: 'Invalid Actor Data', errors: validResult.errors});
  }

  addActorPromise(actor)
    .then(newActor => res.status(200).json(newActor))
    .catch(err => res.status(500).send(err.message));
};


function updateActorPromise(id, actor) {
  return new Promise((resolve, reject) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        let actors = JSON.parse(data);
        const index = actors.findIndex((e) => e.id === id);
        if (index === -1) {
          reject(new Error('Actor not found'));
        } else {
          const updatedActor = {...actors[index], ...actor};
          actors[index] = updatedActor;
          fs.writeFile(dataPath, JSON.stringify(actors), (err) => {
            if (err) {
              reject(err);
            } else {
              resolve(updatedActor);
            }
          });
        }
      }
    });
  });
}

const updateActor = (req, res) => {
  const id = req.params.id;
  const actor = req.body;
  updateActorPromise(id, actor)
    .then(updatedActor => res.status(200).json(updatedActor))
    .catch(err => res.status(500).send(err.message));
};


function deleteActorPromise(id) {
  return new Promise((resolve, reject) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        const actors = JSON.parse(data);
        const index = actors.findIndex(a => a.id === id);
        if (index === -1) {
          reject(new Error('Actor not found'));
        } else {
          actors.splice(index, 1);
          fs.writeFile(dataPath, JSON.stringify(actors), err => {
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

const deleteActor = (req, res) => {
  const id = req.params.id;
  deleteActorPromise(id)
    .then(() => res.status(200).json({message: 'Actor Deleted'}))
    .catch(err => res.status(500).send(err.message));
};

module.exports = {
  getActors,
  addActor,
  updateActor,
  deleteActor
};