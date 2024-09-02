import { Image } from 'semantic-ui-react'
import styles from './Opciones.module.css'


export function Opciones() {
  return (

    <div className={styles.main}>
      <div className={styles.section}>
        <div className={styles.card}>
          <Image src='/img/donarpet.webp' />
          <h1>Donar</h1>
          <p>Buscamos un nuevo hogar para nuestra mascota, donde pueda recibir el afecto y la atención que merece.</p>
        </div>

        <div className={styles.card}>
          <Image src='/img/adoptarpet.webp' />
          <h1>Adoptar</h1>
          <p>En busca de una mascota que se convierta en un amigo fiel y parte de la familia.</p>
        </div>

        <div className={styles.card}>
          <Image src='/img/recuperarpet.webp' />
          <h1>Recuperar</h1>
          <p>Te ayudamos a buscar tu mascota perdida.</p>
        </div>
      </div>
    </div>

  )
}
