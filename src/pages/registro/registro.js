import { BasicLayout } from '@/layouts'
import { MascotaRegistroForm } from '@/components/Mascotas'
import { useState } from 'react'
import ProtectedRouteNegocio from '@/components/Layout/ProtectedRouteNegocio/ProtectedRouteNegocio'
import { ToastSuccess } from '@/components/Layout'
import styles from './registro.module.css'

export default function Registro() {
  const [reload, setReload] = useState(false)

  const onReload = () => setReload(prevState => !prevState)

  const [toastSuccessMascota, setToastSuccessMascota] = useState(false)

  const onToastSuccessMascota = () => {
    setToastSuccessMascota(true)
    setTimeout(() => {
      setToastSuccessMascota(false)
    }, 3000)
  }

  return (
    <ProtectedRouteNegocio>
      <BasicLayout relative>

        {toastSuccessMascota && <ToastSuccess contain='Mascota registrada exitosamente' onClose={() => setToastSuccessMascota(false)} />}

        <MascotaRegistroForm reload={reload} onReload={onReload} onToastSuccessMascota={onToastSuccessMascota} />

      </BasicLayout>
    </ProtectedRouteNegocio>
  )
}
