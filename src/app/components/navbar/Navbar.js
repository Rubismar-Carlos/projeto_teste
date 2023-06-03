"use client"
import { useState } from "react"

import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'

import Link from "next/link"

import styles from './navbar.module.css'

export default function Navbar() {

    const [openMenu, setOpenMenu] = useState(false)
    const [btnVisivel, setBtnVisivel] = useState(true)

    const handleOpenMenu = () => {
        setOpenMenu(!openMenu)
        setBtnVisivel(false)
    }

    const handleCloseMenu = () => {
        setOpenMenu(false)
        setBtnVisivel(true)
    }

    return <div>
        <nav className={styles.nav}>
            <div>
                <Link href={'/'} target={'_self'} onClick={handleCloseMenu}>
                    <h2>Teste</h2>
                </Link>
            </div>
            <div className={styles.menu_desktop}>
                <ul>
                    <li>
                        <Link href={'/calculadora'} target={'_self'}>Comanda de pedidos</Link>
                    </li>
                    <li>
                        <Link href={'/conversor'} target={'_self'}>Conversor de números</Link>
                    </li>
                    <li>
                        <Link href={'/jogodavida'} target={'_self'}>Jogo da vida</Link>
                    </li>
                    <li>
                        <Link href={'https://portfolio-rubismar-carlos.vercel.app'} target={'_blank'} onClick={handleCloseMenu}>Meu portfólio</Link>
                    </li>
                </ul>
            </div>
            <div className={styles.btn_menu}>
                {btnVisivel && < AiOutlineMenu onClick={handleOpenMenu} />}
                {!btnVisivel && < AiOutlineClose onClick={handleCloseMenu}/>}
            </div>
        </nav>
        <div className={`${styles.menu_mobile} ${openMenu ? `${styles.menu_open}` : `${styles.menu_close}`}`}>
            <ul>
                <li>
                    <Link href={'/calculadora'} target={'_self'} onClick={handleCloseMenu}>Comanda de pedidos</Link>
                </li>
                <li>
                    <Link href={'/conversor'} target={'_self'} onClick={handleCloseMenu}>Conversor de números</Link>
                </li>
                <li>
                    <Link href={'/jogodavida'} target={'_self'} onClick={handleCloseMenu}>Jogo da vida</Link>
                </li>
                <li>
                    <Link href={'https://portfolio-rubismar-carlos.vercel.app'} target={'_blank'} onClick={handleCloseMenu}>Meu portfólio</Link>
                </li>
            </ul>
        </div>
    </div>
    
}