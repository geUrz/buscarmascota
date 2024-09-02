import { Button, Form, FormField, FormGroup, FormTextArea, Input, Label, TextArea } from 'semantic-ui-react'
import styles from './MascotaModForm.module.css'
import { IconClose } from '@/components/Layout'
import { useState } from 'react'

export function MascotaModForm(props) {

  const { onToastSuccess, onShowModForm, formValues, handleInputChange, updateMascota } = props

  const [errors, setErrors] = useState({})

  const validarForm = () => {
    const newErrors = {}

    if(!formValues.nombre) {
      newErrors.nombre = 'El campo es requerido'
    }

    if(!formValues.estatus) {
      newErrors.estatus = 'El campo es requerido'
    }

    if(!formValues.especie) {
      newErrors.especie = 'El campo es requerido'
    }

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
    
  }

  const onUpdateMascota = (e) => {

    e.preventDefault()

    if (!validarForm()) {
      return
    }

    updateMascota()

    onToastSuccess()

  }

  return (

    <>

      <IconClose onOpenClose={onShowModForm} />

      <Form>
        <FormGroup widths='equal'>
          <FormField error={!!errors.nombre}>
            <Label className={styles.formLabel}>
              Nombre de la mascotA*
            </Label>
            <Input
              name='nombre'
              type="text"
              value={formValues.nombre}
              onChange={handleInputChange}
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
              value={formValues.estatus}
              onChange={handleInputChange}
            >
              <option value=''></option>
              <option value='donar'>Donar</option>
              <option value='adoptar'>Adoptar</option>
              <option value='recuperar'>Recuperar</option>
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
              value={formValues.especie}
              onChange={handleInputChange}
            >
              <option value=''></option>
              <option value='perro'>Perro</option>
              <option value='gato'>Gato</option>
              <option value='otro'>Otro</option>
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
              value={formValues.raza}
              onChange={handleInputChange}
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
              value={formValues.sexo}
              onChange={handleInputChange}
            >
              <option value=''></option>
              <option value='macho'>Macho</option>
              <option value='hembra'>Hembra</option>
            </FormField>
          </FormField>
          <FormField>
            <Label className={styles.formLabel}>
              Tamaño (opcional)
            </Label>
            <Input
              name='tamaño'
              type="number"
              value={formValues.tamaño}
              onChange={handleInputChange}
            />
          </FormField>
          <FormField>
            <Label className={styles.formLabel}>
              Edad (opcional)
            </Label>
            <Input
              name='edad'
              type="number"
              value={formValues.edad}
              onChange={handleInputChange}
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
              value={formValues.esterilizado}
              onChange={handleInputChange}
            >
              <option value=''></option>
              <option value='si'>Si</option>
              <option value='no'>No</option>
            </FormField>
          </FormField>
          <FormField>
            <Label className={styles.formLabel}>
              Estado de salud (opcional)
            </Label>
            <TextArea
              name='salud'
              type="text"
              value={formValues.salud}
              onChange={handleInputChange}
            />
          </FormField>
          <FormField>
            <Label className={styles.formLabel}>
              Descripción general (opcional)
            </Label>
            <TextArea
              name='descripcion'
              type="text"
              value={formValues.descripcion}
              onChange={handleInputChange}
            />
          </FormField>
          <FormField>
            <Label className={styles.formLabel}>
              Requisitos para donar / adoptar (opcional)
            </Label>
            <TextArea
              name='requisitos'
              type="text"
              value={formValues.requisitos}
              onChange={handleInputChange}
            />
          </FormField>
        </FormGroup>
        <Button
          secondary
          onClick={onUpdateMascota}
        >
          Guardar
        </Button>

      </Form>

    </>

  )
}
