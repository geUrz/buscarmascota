import { FaCat, FaDog, FaDragon } from 'react-icons/fa'
import styles from './Card.module.css'

export function Card() {
  return (

    <div className={styles.main}>
      <div className={styles.section}>
        <div className={styles.card}>
          <FaDog />
          <h1>Perros</h1>
        </div>
        <div className={styles.card}>
          <FaCat />
          <h1>Gatos</h1>
        </div>
        <div className={styles.card}>
          <FaDragon />
          <h1>Otros</h1>
        </div>
      </div>
    </div>

  )
}
