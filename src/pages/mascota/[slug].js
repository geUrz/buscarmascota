import { useRouter } from 'next/router'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { BasicLayout } from '@/layouts'
import { Loading } from '@/components/Layout'
import styles from './slug.module.css'
import { FaAddressCard, FaEnvelope, FaFacebook, FaGlobe, FaImage, FaMapMarkerAlt, FaMobileAlt, FaWhatsapp } from 'react-icons/fa'
import Link from 'next/link'
import { ArrowBack } from '@/components/Layout/ArrowBack'
import { Image } from 'semantic-ui-react'

export default function Mascota() {
  const router = useRouter()
  const { slug } = router.query

  const [negocio, setNegocio] = useState(null)

  useEffect(() => {
    if (slug) {
      (async () => {
        try {
          const response = await axios.get(`/api/negocios/negocios?slug=${slug}`)
          setNegocio(response.data)
        } catch (error) {
          console.error('Error fetching negocio:', error)
        }
      })()
    }
  }, [slug])

  if (!negocio) return <Loading size={45} loading={0} />

  return (

    <BasicLayout relative>

      <ArrowBack title={slug} />

      <div className={styles.main}>
        <div className={styles.section}>
          <div className={styles.img}>
            {!negocio.image ? (
              <FaImage />
            ) : (
              <Image src={negocio.image} />
            )}
          </div>
          <h1>{negocio.negocio}</h1>
          <p>{
            !negocio.descripcion ? (
              'No disponible'
            ) : (
              negocio.descripcion
            )}

          </p>
          <div>
            <FaMobileAlt />
            <h2>{
              !negocio.tel ? (
                'No disponible'
              ) : (
                negocio.tel
              )
            }</h2>
          </div>
          <div>
            <FaWhatsapp />
            <h2>{
              !negocio.whatsapp ? (
                'No disponible'
              ) : (
                negocio.whatsapp
              )
            }</h2>
          </div>
          <div>
            <FaFacebook />
            <h2>{
              !negocio.facebook ? (
                'No disponible'
              ) : (
                negocio.facebook
              )
            }</h2>
          </div>
          <div>
            <FaEnvelope />
            <h2>{
              !negocio.email ? (
                'No disponible'
              ) : (
                negocio.email
              )
            }</h2>
          </div>
          <div>
            <FaGlobe />
            <h2>{
              !negocio.web ? (
                'No disponible'
              ) : (
                <Link href={`${negocio.web}`} target="_blank">
                  {negocio.web}
                </Link>
              )
            }</h2>
          </div>
          <div>
            <FaAddressCard />
            <h2>{
              !negocio.ubicacion ? (
                'No disponible'
              ) : (
                negocio.ubicacion
              )
            }</h2>
          </div>
          <div>
            <FaMapMarkerAlt />
            {!negocio.mapa ? (
              <h2>Mapa no disponible</h2>
            ) : (
              <Link href={`${negocio.mapa}`} target="_blank">
                Click para ver la ubicación en el mapa
              </Link>
            )}
          </div>
        </div>
      </div>

    </BasicLayout>

  )
}
