import { BasicLayout, BasicModal } from '@/layouts'
import styles from './home.module.css'
import { Button, Image } from 'semantic-ui-react'
import { Card, Opciones, RegistrarMascota } from '@/components/Home'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { ToastSuccess } from '@/components/Layout'
import { FaPaw } from 'react-icons/fa'

export default function Home() {

  const { reload, setReload } = useState(false)

  const onReload = () => setReload((prevState) => !prevState)

  const [toastSuccess, setToastSuccess] = useState(false)

  const onToastSuccess = () => setToastSuccess((prevState) => !prevState)

  const [showRegistro, setShowRegistro] = useState()

  const onShowRegistro = () => setShowRegistro((prevState) => !prevState)

  return (

    <BasicLayout relative>

      {toastSuccess && <ToastSuccess contain='Mascota registrada exitosamente' onClose={() => setToastSuccess(false)} />}

      <div className={styles.img}>
        {/* <Image src='img/dogcat_cel.webp' /> */}
        <div className={styles.titleImg}>
          <h1>¡ Porque cada <span>mascota </span>merece una segunda oportunidad !</h1>
          <h2>Donar <FaPaw /> Adoptar <FaPaw /> Recuperar</h2>
          <Button primary size='large' onClick={onShowRegistro}>
            Registrar mascota
          </Button>
        </div>

        <Card />

      </div>

      <Opciones />

      <BasicModal title='registrar mascota' show={showRegistro} onClose={onShowRegistro}>
        <RegistrarMascota reload={reload} onReload={onReload} onShowRegistro={onShowRegistro} onToastSuccess={onToastSuccess} />
      </BasicModal>

    </BasicLayout>

  )
}
