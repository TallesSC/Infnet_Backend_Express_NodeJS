const express = require('express');
const cors = require('cors');
const app = express();

const movieRoutes = require('./routes/movies');
const actorRoutes = require('./routes/actors');
const genreRoutes = require('./routes/genres');

const host = 'localhost';
const port = 3333;

app.use(cors("http://localhost:3000/"));
app.use(express.json());
app.use('/movies', movieRoutes);
app.use('/actors', actorRoutes);
app.use('/genres', genreRoutes);

app.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}`);
});