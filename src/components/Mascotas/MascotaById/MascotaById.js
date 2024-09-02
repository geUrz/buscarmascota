import { useEffect, useState } from 'react'
import axios from 'axios'
import { FaAddressCard, FaCheck, FaDog, FaEdit, FaEnvelope, FaFacebook, FaGlobe, FaImage, FaMapMarkerAlt, FaMobileAlt, FaSlash, FaStoreSlash, FaTimes, FaTrash, FaWhatsapp } from 'react-icons/fa'
import { size } from 'lodash'
import Link from 'next/link'
import { Confirm } from '@/components/Layout'
import { BasicModal } from '@/layouts'
import { MascotaModForm } from '../MascotaModForm'
import styles from './MascotaById.module.css'

export function MascotaById(props) {
  
  const { user, onToastSuccess, onToastDelete } = props
  
  const [mascota, setMascota] = useState([])
  const [formValues, setFormValues] = useState({})
  const [showConfirm, setShowConfirm] = useState(false)
  const [showModForm, setShowModForm] = useState(false)
  
  const onShowConfirm = () => setShowConfirm((prevState) => !prevState)
  const onShowModForm = () => setShowModForm((prevState) => !prevState)
  
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`/api/mascotas/mascotas?usuario_id=${user.id}`)
        setMascota(res.data)
        setFormValues(res.data)
      } catch (error) {
        console.error(error)
      }
    })()
  }, [user.id])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormValues({
      ...formValues,
      [name]: value,
    })
  }

  const updateMascota = async () => {
    try {
      const response = await axios.put(`/api/mascotas/mascotas?id=${mascota.id}`, formValues);
      const updatedMascota = { ...formValues, slug: response.data.slug }; // Asegúrate de incluir el slug en el estado actualizado
      setMascota(updatedMascota); // Actualiza el estado con el mascota modificado
      onShowModForm();  // Cierra el modal
    } catch (error) {
      console.error('Error al actualizar la mascota:', error);
    }
  };

  const delMascota = async () => {
    try {
      await axios.delete(`/api/mascotas/mascotas?id=${mascota.id}`)
      setMascota([])
      onShowConfirm()
      onToastDelete()
    } catch (error) {
      console.error('Error al eliminar la mascota:', error)
    }
  }


  return (

    <>

      {size(mascota) === 0 ? (
        <div className={styles.noShop}>
          <div>
            <FaDog />
            <FaSlash className={styles.slash} />
          </div>
          <Link href='registro'>
            Publicar mascota
          </Link>
        </div>
      ) : (
        <div className={styles.main}>
          <div className={styles.img}>
            <FaImage />
          </div>
          <h1>{mascota.nombre}</h1>
          <div>
            <h2>{
              !mascota.estatus ? (
                'No disponible'
              ) : (
                mascota.estatus
              )
            }</h2>
          </div>
          <div>
            <h2>{
              !mascota.especie ? (
                'No disponible'
              ) : (
                mascota.especie
              )
            }</h2>
          </div>
          <div>
            <h2>{
              !mascota.raza ? (
                'No disponible'
              ) : (
                mascota.raza
              )
            }</h2>
          </div>
          <div>
            <h2>{
              !mascota.tamaño ? (
                'No disponible'
              ) : (
                mascota.tamaño
              )
            }</h2>
          </div>
          <div>
            <h2>{
              !mascota.edad ? (
                'No disponible'
              ) : (
                mascota.edad
              )
            }</h2>
          </div>
          <div>
            <h2>{
              !mascota.sexo ? (
                'No disponible'
              ) : (
                mascota.sexo
              )
            }</h2>
          </div>
          <div>
            <h2>{
              !mascota.esterilizado ? (
                'No disponible'
              ) : (
                mascota.esterilizado
              )
            }</h2>
          </div>
          <div>
            <p>{
              !mascota.salud ? (
                'No disponible'
              ) : (
                mascota.salud
              )}
            </p>
          </div>
          <div>
            <p>{
              !mascota.descripcion ? (
                'No disponible'
              ) : (
                mascota.descripcion
              )}
            </p>
          </div>
          <div>
            <p>{
              !mascota.requisitos ? (
                'No disponible'
              ) : (
                mascota.requisitos
              )}
            </p>
          </div>

          <div className={styles.iconEditTrash}>
            <div>
              <FaEdit onClick={onShowModForm} />
            </div>
            <div onClick={onShowConfirm}>
              <FaTrash />
            </div>
          </div>

        </div>
      )}

      <BasicModal title='modificar mascota' show={showModForm} onClose={onShowModForm}>
        <MascotaModForm 
          onShowModForm={onShowModForm}
          onToastSuccess={onToastSuccess}
          formValues={formValues}
          handleInputChange={handleInputChange}
          updateMascota={updateMascota}
        />
      </BasicModal>

      <Confirm
        open={showConfirm}
        cancelButton={
          <div className={styles.iconClose}>
            <FaTimes />
          </div>
        }
        confirmButton={
          <div className={styles.iconCheck}>
            <FaCheck />
          </div>
        }
        onConfirm={delMascota}
        onCancel={onShowConfirm}
        content='¿Estás seguro de eliminar el mascota?'
      />

    </>

  )
}
