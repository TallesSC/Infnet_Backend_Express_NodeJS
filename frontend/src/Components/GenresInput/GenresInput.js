import styles from './GenresInput.module.scss';
import axios from "axios";

const GenresInput = ({getData}) => {

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/genres/add', {
        name: e.target.elements.name.value,
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
        <input type="submit" value="Adicionar"/>
      </form>
    </div>
  );
};

export default GenresInput;