import styles from './GenresList.module.scss';
import { useEffect, useState } from "react";
import axios from "axios";
import GenresInput from "../GenresInput/GenresInput";

const GenresList = () => {
  const [genres, setGenres] = useState([]);
  const getData = async () => {
    try {
      const genresRes = await axios.get('/genres');
      setGenres(genresRes.data);
      console.log(genresRes.data);
    } catch (error) {
      console.error(error);
    }
  };

  const onDelete = async (name) => {
    try {
      await axios.delete(`/genres/${name}`);
      getData();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (<>
      <div className={styles.genreComponent}>
        <h2>Gêneros</h2>
        <ul>
          {
            genres.map((genre) => (
              <li key={genre} className={styles.genreItem}>
                <span>{genre}</span>
                <button className={styles.delete} onClick={() => onDelete(genre)}>🗑</button>
              </li>
            ))
          }
        </ul>
      </div>
      <GenresInput getData={getData}/>
    </>
  );
};

export default GenresList;