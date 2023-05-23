import styles from './MovieList.module.scss';
import { useEffect, useState } from "react";
import axios from "axios";
import MovieInput from "../MovieInput/MovieInput";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const getData = async () => {
    try {
      const moviesRes = await axios.get('/movies');
      setMovies(moviesRes.data);
    } catch (error) {
      console.error(error);
    }
  };

  const onDelete = async (id) => {
    try {
      await axios.delete(`/movies/${id}`);
      getData();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (<>
      <div className={styles.movieComponent}>
        <h2>Filmes</h2>
        <ul>
          {
            movies.map(({id, title, releaseYear, rating, duration, genre}) => (
              <li key={id} className={styles.movieItem}>
                <div className={styles.info}>
                  <div className={styles.top}>
                    <h3 className={styles.title}>{title}</h3>
                    {releaseYear && <span className={styles.releaseYear}>({releaseYear})</span>}
                    {duration && <span className={styles.duration}>{duration}min</span>}
                  </div>
                  <div className={styles.bottom}>
                    {rating && <span className={styles.rating}>Nota: {rating}/10</span>}
                    {genre && <span className={styles.genre}>{genre}</span>}
                  </div>
                </div>
                <div className={styles.buttons}>
                  <button className={styles.delete} onClick={() => onDelete(id)}>🗑</button>
                </div>
              </li>
            ))
          }
        </ul>
      </div>
      <MovieInput getData={getData}/>
    </>
  );
};

export default MovieList;