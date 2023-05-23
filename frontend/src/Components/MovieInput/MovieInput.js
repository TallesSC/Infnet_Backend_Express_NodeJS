import styles from './MovieInput.module.scss';
import axios from "axios";

const MovieInput = ({getData}) => {

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/movies/add', {
        title: e.target.elements.title.value,
        releaseYear: Number(e.target.elements.releaseYear.value),
        rating: Number(e.target.elements.rating.value),
        duration: Number(e.target.elements.duration.value),
        genre: e.target.elements.genre.value
      });
      console.log(response.data);
      getData();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.wrapper}>
      <form onSubmit={onSubmit}>
        <input type="text" name="title" placeholder="Título"/>
        <input type="number" name="releaseYear" placeholder="Data de lançamento"/>
        <input type="number" max="10" min="0" name="rating" placeholder="Nota"/>
        <input type="number" name="duration" placeholder="Duração"/>
        <input type="text" name="genre" placeholder="Gênero"/>
        <input type="submit" value="Adicionar"/>
      </form>
    </div>
  );
};

export default MovieInput;