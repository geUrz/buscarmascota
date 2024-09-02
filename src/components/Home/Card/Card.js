import { FaCat, FaDog, FaDragon } from 'react-icons/fa'
import styles from './Card.module.css'
import Link from 'next/link'

export function Card() {
  return (

    <div className={styles.main}>
      <div className={styles.section}>
        <Link href='/perros' className={styles.card}>
          <FaDog />
          <h1>Perros</h1>
        </Link>
        <Link href='/gatos' className={styles.card}>
          <FaCat />
          <h1>Gatos</h1>
        </Link>
        <Link href='/otros' className={styles.card}>
          <FaDragon />
          <h1>Otros</h1>
        </Link>
      </div>
    </div>

  )
}
