import styles from './ActorsInput.module.scss';
import axios from "axios";

const MovieInput = ({getData}) => {

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/actors/add', {
        name: e.target.elements.name.value,
        birthYear: Number(e.target.elements.birthYear.value),
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
        <input type="text" name="name" placeholder="Nome"/>
        <input type="number" name="birthYear" placeholder="Ano de nascimento"/>
        <input type="submit" value="Adicionar"/>
      </form>
    </div>
  );
};

export default MovieInput;