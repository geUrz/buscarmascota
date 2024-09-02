import { Button, Form, FormField, FormGroup, FormTextArea, Input, Label, TextArea } from 'semantic-ui-react'
import { useState } from 'react'
import axios from 'axios'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/router'
import styles from './MascotaRegistroForm.module.css'

export function MascotaRegistroForm(props) {

  const {user} = useAuth()
  const router = useRouter()

  const [nombre, setNombre] = useState('')
  const [estatus, setEstatus] = useState('')
  const [especie, setEspecie] = useState('')
  const [raza, setRaza] = useState('')
  const [tamaño, setTamaño] = useState('')
  const [edad, setEdad] = useState('')
  const [sexo, setSexo] = useState('')
  const [esterilizado, setEsterilizado] = useState('')
  const [salud, setSalud] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [requisitos, setRequisitos] = useState('')
  const [slug, setSlug] = useState('')

  const {onToastSuccessMascota} = props

  const [errors, setErrors] = useState({})

  const validarForm = () => {
    const newErrors = {}

    if(!nombre) {
      newErrors.nombre = 'El campo es requerido'
    }

    if(!estatus) {
      newErrors.estatus = 'El campo es requerido'
    }

    if(!especie) {
      newErrors.especie = 'El campo es requerido'
    }

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
    
  }

  // Función para generar el estatus
  const generateSlug = (text) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')  // Elimina caracteres especiales
      .replace(/\s+/g, '-')          // Reemplaza espacios con guiones
      .trim()
  }

  // Actualizar el valor del estatus cada vez que cambia el nombre del nombre
  const handleMascotaChange = (e) => {
    const value = e.target.value
    setNombre(value)
    setEstatus(generateSlug(value))
  }

  const crearMascota = async (e) => {

    e.preventDefault()

    if(!validarForm()) {
      return
    }

    try {
      await axios.post('/api/mascotas/mascotas',{
        nombre,
        estatus,
        especie,
        raza,
        tamaño,
        edad,
        sexo,
        esterilizado,
        salud,
        descripcion,
        requisitos,
        slug,
        usuario_id: user.id
      })

      setNombre('')
      setEstatus('')
      setEspecie('')
      setRaza('')
      setTamaño('')
      setEdad('')
      setSexo('')
      setEsterilizado('')
      setSalud('')
      setDescripcion('')
      setRequisitos('')
      setSlug('')

      onToastSuccessMascota()
      router.push('/')

    } catch (error) {
        console.error('Error al crear la mascota:', error)
    }

  }

  return (

    <div className={styles.main}>

      <div className={styles.container}>

        <div className={styles.steps}>
          <h1>registrar nombre</h1>
        </div>

        <Form>
          <FormGroup widths='equal'>
            <FormField error={!!errors.nombre}>
              <Label className={styles.formLabel}>
                Nombre de la mascota*
              </Label>
              <Input
                name='nombre'
                type="text"
                value={nombre}
                onChange={handleMascotaChange}
              />
              {errors.nombre && <span className={styles.error}>{errors.nombre}</span>}
            </FormField>
            <FormField error={!!errors.estatus}>
              <Label className={styles.formLabel}>
                Quiero*
              </Label>
              <FormField
                name='estatus'
                type="text"
                control='select'
                value={estatus}
                onChange={(e) => setEstatus(e.target.value)}
              >
                <option value=''></option>
                <option value='Donar'>Donar</option>
                <option value='Adoptar'>Adoptar</option>
                <option value='Recuperar'>Recuperar</option>
              </FormField>
              {errors.estatus && <span className={styles.error}>{errors.estatus}</span>}
            </FormField>
            <FormField error={!!errors.especie}>
              <Label className={styles.formLabel}>
                Especie*
              </Label>
              <FormField
                name='especie'
                type="text"
                control='select'
                value={especie}
                onChange={(e) => setEspecie(e.target.value)}
              >
                <option value=''></option>
                <option value='Perro'>Perro</option>
                <option value='Gato'>Gato</option>
                <option value='Otro'>Otro</option>
              </FormField>
              {errors.especie && <span className={styles.error}>{errors.especie}</span>}
            </FormField>
            <FormField>
              <Label className={styles.formLabel}>
                Raza (opcional)
              </Label>
              <Input
                name='raza'
                type="text"
                value={raza}
                onChange={(e) => setRaza(e.target.value)}
              />
            </FormField>
            <FormField>
              <Label className={styles.formLabel}>
                Sexo (opcional)
              </Label>
              <FormField
                name='sexo'
                type="text"
                control='select'
                value={sexo}
                onChange={(e) => setSexo(e.target.value)}
              >
                <option value=''></option>
                <option value='Macho'>Macho</option>
                <option value='Hembra'>Hembra</option>
              </FormField>
            </FormField>
            <FormField>
              <Label className={styles.formLabel}>
                Tamaño (opcional)
              </Label>
              <Input
                name='tamaño'
                type="number"
                value={tamaño}
                onChange={(e) => setTamaño(e.target.value)}
              />
            </FormField>
            <FormField>
              <Label className={styles.formLabel}>
                Edad (opcional)
              </Label>
              <Input
                name='edad'
                type="number"
                value={edad}
                onChange={(e) => setEdad(e.target.value)}
              />
            </FormField>
            <FormField>
              <Label className={styles.formLabel}>
                Esterilizado (opcional)
              </Label>
              <FormField
                name='esterilizado'
                type="text"
                control='select'
                value={esterilizado}
                onChange={(e) => setEsterilizado(e.target.value)}
              >
                <option value=''></option>
                <option value='Si'>Si</option>
                <option value='No'>No</option>
              </FormField>
            </FormField>
            <FormField>
              <Label className={styles.formLabel}>
                Estado de salud (opcional)
              </Label>
              <TextArea
                name='salud'
                type="text"
                value={salud}
                onChange={(e) => setSalud(e.target.value)}
              />
            </FormField>
            <FormField>
              <Label className={styles.formLabel}>
                Descripción general (opcional)
              </Label>
              <TextArea
                name='descripcion'
                type="text"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
              />
            </FormField>
            <FormField>
              <Label className={styles.formLabel}>
                Requisitos para donar / adoptar (opcional)
              </Label>
              <TextArea
                name='requisitos'
                type="text"
                value={requisitos}
                onChange={(e) => setRequisitos(e.target.value)}
              />
            </FormField>
          </FormGroup>
          <Button
            secondary
            onClick={crearMascota}
          >
            Registrar
          </Button>

        </Form>

      </div>

    </div>

  )
}
