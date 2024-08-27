import { BasicLayout } from '@/layouts'
import styles from './home.module.css'
import { Button, Image } from 'semantic-ui-react'
import { Card, Opciones } from '@/components/Home'

export default function Home() {
  return (
    
    <BasicLayout relative>

      <div className={styles.img}>
        <Image src='img/dogcat_cel.webp' />
        <div className={styles.titleImg}>
          <h1>La plataforma de mascotas donde puedes</h1>
          <h2>Donar \ Adoptar \ Recuperar</h2>
          <Button primary size='large'>
            Registrar mascota
          </Button>
        </div>

        <Card />

      </div>

      <Opciones />

    </BasicLayout>

  )
}
