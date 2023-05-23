import styles from './ActorsList.module.scss';
import { useEffect, useState } from "react";
import axios from "axios";
import ActorsInput from "../ActorsInput/ActorsInput";

const ActorsList = () => {
  const [actors, setActors] = useState([]);
  const getData = async () => {
    try {
      const actorsRes = await axios.get('/actors');
      setActors(actorsRes.data);
    } catch (error) {
      console.error(error);
    }
  };

  const onDelete = async (id) => {
    try {
      await axios.delete(`/actors/${id}`);
      getData();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (<>
      <div className={styles.actorComponent}>
        <h2>Atores</h2>
        <ul>
          {
            actors.map(({id, name, birthYear}) => (
              <li key={id} className={styles.actorItem}>
                <div className={styles.info}>
                  {name && <span className={styles.name}>{name}</span>}
                  {birthYear && <span className={styles.year}>({birthYear})</span>}
                </div>
                <div className={styles.buttons}>
                  <button className={styles.delete} onClick={() => onDelete(id)}>🗑</button>
                </div>
              </li>
            ))
          }
        </ul>
      </div>
      <ActorsInput getData={getData}/>
    </>
  );
};

export default ActorsList;