import { Image } from 'semantic-ui-react'
import styles from './Opciones.module.css'


export function Opciones() {
  return (

    <div className={styles.main}>
      <div className={styles.section}>
        <div className={styles.card}>
          <Image src='/img/donarpet.webp' />
          <h1>Donar</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipiscing elit conubia, sociosqu netus luctus sollicitudin.</p>
        </div>

        <div className={styles.card}>
          <Image src='/img/adoptarpet.webp' />
          <h1>Adoptar</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipiscing elit conubia, sociosqu netus luctus sollicitudin.</p>
        </div>

        <div className={styles.card}>
          <Image src='/img/recuperarpet.webp' />
          <h1>Recuperar</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipiscing elit conubia, sociosqu netus luctus sollicitudin.</p>
        </div>
      </div>
    </div>

  )
}
