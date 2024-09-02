import styles from './RegistrarMascota.module.css'
import { Button, Form, FormField, FormGroup, Input, Label, TextArea } from 'semantic-ui-react'
import { IconClose } from '@/components/Layout'
import { useState } from 'react'
import { generateUniqueId } from '@/helpers'
import axios from 'axios'
import { useAuth } from '@/contexts/AuthContext'

export function RegistrarMascota(props) {

  const {reload, onReload, onShowRegistro, onToastSuccess} = props

  const {user} = useAuth()

  const [mascota, setMascota] = useState({
    nombre:'',
    estatus:'',
    especie:'',
    raza:'',
    tamaño:'',
    sexo:'',
    edad:'',
    esterilizado:'',
    salud:'',
    descripcion:'',
    requisitos:''  
  })

  const [errors, setErrors] = useState({})

  const validarForm = () => {

    const newErrors = {}

    if (!mascota.nombre) {
      newErrors.nombre = 'El campo es requerido'
    }

    if (!mascota.estatus) {
      newErrors.estatus = 'El campo es requerido'
    }

    if (!mascota.especie) {
      newErrors.especie = 'El campo es requerido'
    }

    if (!mascota.raza) {
      newErrors.raza = 'El campo es requerido'
    }

    if (!mascota.tamaño) {
      newErrors.tamaño = 'El campo es requerido'
    }

    if (!mascota.sexo) {
      newErrors.sexo = 'El campo es requerido'
    }

    if (!mascota.edad) {
      newErrors.edad = 'El campo es requerido'
    }

    if (!mascota.esterilizado) {
      newErrors.esterilizado = 'El campo es requerido'
    }

    if (!mascota.salud) {
      newErrors.salud = 'El campo es requerido'
    }

    if (!mascota.descripcion) {
      newErrors.descripcion = 'El campo es requerido'
    }

    if (!mascota.requisitos) {
      newErrors.requisitos = 'El campo es requerido'
    }

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0

  }

  const registrarMascota = async (e) => {

    e.preventDefault()

    if(!validarForm()) {
      return 
    }

    const folio = generateUniqueId(5)

    try {
      
      await axios.post('/api/mascotas/mascotas', {
        mascotas,
        usuario_id: user.id,
        folio
      })

      setMascota({
        nombre: '',
        estatus: '',
        especie: '',
        raza: '',
        tamaño: '',
        sexo: '',
        edad: '',
        esterilizado: '',
        salud: '',
        descripcion: '',
        requisitos: ''
      })

      onToastSuccess()
      onShowRegistro()

    } catch (error) {
        console.error('Error al registrar la mascota:', error)
    }

  }

  return (

    <>

      <IconClose onOpenClose={onShowRegistro} />

      <Form>
        <FormGroup widths='equal'>
          <FormField error={!!errors.nombre}>
            <Label>
              Nombre
            </Label>
            <Input
              name='nombre'
              type='text'
              value={mascota.nombre}
              onChange={(e) => setMascota({ ...mascota, nombre: e.target.value })}
            />
            {errors.nombre && <span className={styles.error}>{errors.nombre}</span>}
          </FormField>
          <FormField error={!!errors.estatus}>
            <Label>
              Quiero
            </Label>
            <select
              name='estatus'
              type='text'
              value={mascota.estatus}
              onChange={(e) => setMascota({ ...mascota, estatus: e.target.value})}
            >
              <option value=''></option>
              <option value='donar'>Donar</option>
              <option value='adoptar'>Adoptar</option>
              <option value='recuperar'>Recuperar</option>
            </select>
            {errors.estatus && <span className={styles.error}>{errors.estatus}</span>}
          </FormField>
          <FormField error={!!errors.especie}>
            <Label>
              Especie
            </Label>
            <select
              name='especie'
              type='text'
              value={mascota.especie}
              onChange={(e) => setMascota({ ...mascota, especie: e.target.value})}
            >
              <option value=''></option>
              <option value='perro'>Perro</option>
              <option value='gato'>Gato</option>
              <option value='otro'>Otro</option>
            </select>
            {errors.especie && <span className={styles.error}>{errors.especie}</span>}
          </FormField>
          <FormField error={!!errors.raza}>
            <Label>
              Raza
            </Label>
            <Input
              name='raza'
              type='text'
              value={mascota.raza}
              onChange={(e) => setMascota({ ...mascota, raza: e.target.value})}
            />
            {errors.raza && <span className={styles.error}>{errors.raza}</span>}
          </FormField>
          <FormField error={!!errors.tamaño}>
            <Label>
              Tamaño
            </Label>
            <select
              name='tamaño'
              type='text'
              value={mascota.tamaño}
              onChange={(e) => setMascota({ ...mascota, tamaño: e.target.value})}
            >
              <option value=''></option>
              <option value='chico'>Chico</option>
              <option value='mediano'>Mediano</option>
              <option value='grande'>Grande</option>
            </select>
            {errors.tamaño && <span className={styles.error}>{errors.tamaño}</span>}
          </FormField>
          <FormField error={!!errors.sexo}>
            <Label>
              Sexo
            </Label>
            <select
              name='sexo'
              type='text'
              value={mascota.sexo}
              onChange={(e) => setMascota({ ...mascota, sexo: e.target.value})}
            >
              <option value=''></option>
              <option value='macho'>Macho</option>
              <option value='hembra'>Hembra</option>
            </select>
            {errors.sexo && <span className={styles.error}>{errors.sexo}</span>}
          </FormField>
          <FormField error={!!errors.edad}>
            <Label>
              Edad
            </Label>
            <Input
              name='edad'
              type='number'
              value={mascota.edad}
              onChange={(e) => setMascota({ ...mascota, edad: e.target.value})}
            />
            {errors.edad && <span className={styles.error}>{errors.edad}</span>}
          </FormField>
          <FormField error={!!errors.esterilizado}>
            <Label>
              Esterilizado
            </Label>
            <select
              name='esterilizado'
              type='text'
              value={mascota.esterilizado}
              onChange={(e) => setMascota({ ...mascota, esterilizado: e.target.value})}
            >
              <option value=''></option>
              <option value='si'>Si</option>
              <option value='no'>No</option>
            </select>
            {errors.esterilizado && <span className={styles.error}>{errors.esterilizado}</span>}
          </FormField>
          <FormField error={!!errors.salud}>
            <Label>
              Estado de salud
            </Label>
            <TextArea
              name='salud'
              type='text'
              value={mascota.salud}
              onChange={(e) => setMascota({ ...mascota, salud: e.target.value})}
            >
            </TextArea>
            {errors.salud && <span className={styles.error}>{errors.salud}</span>}
          </FormField>
          <FormField error={!!errors.descripcion}>
            <Label>
              Descripción general
            </Label>
            <TextArea
              name='descripcion'
              type='text'
              value={mascota.descripcion}
              onChange={(e) => setMascota({ ...mascota, descripcion: e.target.value})}
            >
            </TextArea>
            {errors.descripcion && <span className={styles.error}>{errors.descripcion}</span>}
          </FormField>
          <FormField error={!!errors.requisitos}>
            <Label>
              Requisitos especiales
            </Label>
            <TextArea
              name='requisitos'
              type='text'
              value={mascota.requisitos}
              onChange={(e) => setMascota({ ...mascota, requisitos: e.target.value})}
            >
            </TextArea>
            {errors.requisitos && <span className={styles.error}>{errors.requisitos}</span>}
          </FormField>
        </FormGroup>

        <Button primary onClick={registrarMascota}>
          Registrar
        </Button>

      </Form >

    </>

  )
}
