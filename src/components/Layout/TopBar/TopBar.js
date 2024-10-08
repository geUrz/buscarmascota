import { useState } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '@/contexts/AuthContext'
import Link from 'next/link'
import { Image } from 'semantic-ui-react'
import { FaCloudUploadAlt, FaHandHoldingUsd, FaHome,  FaQuestionCircle, FaSearch, FaSignOutAlt, FaTimes,FaUser, FaUserCircle, FaLayerGroup, FaPaw } from 'react-icons/fa'
import { SearchNegocios } from '../SearchMascotas'
import { MascotaList } from '../MascotaList'
import styles from './TopBar.module.css'


export function TopBar() {

  const { user, logout } = useAuth()

  const [search, setSearch] = useState(false)

  const onOpenCloseSearch = () => setSearch((prevState) => !prevState)

  const [resultados, setResultados] = useState([])

  const router = new useRouter()

  const [menu, setMenu] = useState()

  const menuOpen = () => {
    setMenu(prevState => !prevState)
  }

  return (

    <>
      <div className={styles.containerMenu}>

        <div className={styles.logo} onClick={() => router.push('/')}>
          <Image src='/img/buscarmascota.webp' />
        </div>

        {!search ? (
          ''
        ) : (
          <div className={styles.searchMain}>
            <SearchNegocios onResults={setResultados} onOpenCloseSearch={onOpenCloseSearch} />
            {resultados.length > 0 && (
              <MascotaList negocios={resultados} />
            )}
          </div>
        )}

        <div className={styles.menu}>

        {!search ? (
            <div className={styles.iconSearch} onClick={onOpenCloseSearch}>
              <FaSearch />
            </div>
          ) : (
            ''
          )}

          <Link href='/'>
            <FaHome /> Home
          </Link>
          <Link href='/categorias'>
            <FaLayerGroup /> Categorias
          </Link>
          <Link href='/registro'>
            <FaCloudUploadAlt /> Registrar mascota
          </Link>
          <Link href='/nosotros'>
            <FaQuestionCircle />
            ¿ Qué es Buscar Mascota ?
          </Link>
          <Link href='/donar'>
            <FaHandHoldingUsd />
            ¡ Quiero donar !
          </Link>
          <div className={styles.iconUser}
            onClick={user ? (
              () => router.push('/cuenta')
            ) : (
              () => router.push('/join/signin')
            )}
          >
            <FaUser />
            {!user ? (
              <h1>Iniciar sesión</h1>
            ) : (
              <h1>{user.usuario}</h1>
            )}
          </div>
        </div>

        <div className={styles.iconBar}>
          {!search ? (
            <div className={styles.iconSearch} onClick={onOpenCloseSearch}>
              <FaSearch />
            </div>
          ) : (
            ''
          )}
          <div onClick={menuOpen}>
            {menu ? (
              <FaTimes />
            ) : (
              <FaPaw />
            )}
          </div>
        </div>

        <div className={styles.containerMenuSide} style={{ left: menu ? '0' : '-100%' }} onClick={menuOpen}>
          <div className={styles.topMenuSide}
            onClick={user ? (
              () => router.push('/cuenta')
            ) : (
              () => router.push('/join/signin')
            )}>
            {user ? (
              <>
                <FaUserCircle />
                <h1>{user.usuario}</h1>
                <h2>ver perfil</h2>
              </>
            ) : (
              <>
                <FaUserCircle />
                <h1>Iniciar sesión</h1>
              </>
            )}
          </div>
          <div className={styles.listaMenuSide}>
            <Link href='/'>
              <div onClick={menuOpen}>
                <FaHome /> Home
              </div>
            </Link>
            <Link href='/categorias'>
              <div onClick={menuOpen}>
                <FaLayerGroup /> Categorias
              </div>
            </Link>
            <Link href='/registro'>
              <div onClick={menuOpen}>
                <FaCloudUploadAlt /> Registrar mascota
              </div>
            </Link>
            <Link href='/nosotros'>
              <div onClick={menuOpen}>
                <FaQuestionCircle />
                Qué es Buscar Mascota ?
              </div>
            </Link>
            <Link href='/donar'>
              <div onClick={menuOpen}>
                <FaHandHoldingUsd />
                ¡ Quiero donar !
              </div>
            </Link>
          </div>

          {!user ? (
            ''
          ) : (
            <div className={styles.mainSignOut}>
              <div className={styles.boxSignOut} onClick={logout}>
                <FaSignOutAlt />
              </div>
            </div>
          )}

        </div>

      </div>


    </>

  )
}
