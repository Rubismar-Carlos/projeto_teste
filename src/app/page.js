'use client'
import styles from './page.module.css'

import Link from 'next/link'

export default function Home() {
  
  return (
    <main className={styles.main}>
        <h2>Olá me chamo <br /> Rubismar Carlos</h2>
        <div className={styles.container_btns}>
          <p>Escolha por onde começar</p>
          <div className={styles.box_btns}>
            <Link href={'/conversor'} target={'_self'}>
              <button className={styles.btn}>Conversor de Números</button>
            </Link>
            <Link href={'/calculadora'} target={'_self'}>
              <button className={styles.btn}>Comanda de Pedidos</button>
            </Link>
            <Link href={'/jogodavida'} target={'_self'}>
              <button className={styles.btn}>Jogo da vida</button>
            </Link>
            <Link href={'https://portfolio-rubismar-carlos.vercel.app'} target={'_blank'}>
              <button className={styles.btn}>Meu portfólio</button>
            </Link>
          </div>
        </div>
    </main>
  )
}
