import styles from './global.module.scss';
import { useEffect } from "react";
import axios from "axios";
import MovieList from "./Components/MovieList/MovieList";
import ActorsList from "./Components/ActorsList/ActorsList";
import GenresList from "./Components/GenresList/GenresList";

function App() {


  // const [actors, setActors] = useState([]);
  // const [genres, setGenres] = useState([]);

  const getData = async () => {
    try {
      const moviesRes = await axios.get('/movies');
      const actorsRes = await axios.get('/actors');
      const genresRes = await axios.get('/genres');
      // setActors(actorsRes.data.actors);
      // setGenres(genresRes.data.genres);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <main>
      <div className={styles.column}>
        <MovieList/>
      </div>
      <div className={styles.column}>
        <ActorsList/>
      </div>
      <div className={styles.column}>
        <GenresList/>
      </div>
    </main>
  );
}

export default App;
