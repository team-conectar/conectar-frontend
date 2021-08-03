/* eslint-disable react/jsx-no-target-blank */
import React from 'react'
import { AiFillFacebook, AiOutlineInstagram } from 'react-icons/ai'
import { FaLinkedinIn } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import logo from '../../../assets/image/logo.svg'
import aspasDestaque from '../../../assets/image/aspasDestaque.svg'
import { BodyFooter } from './styles'

export const Footer = () => {
  return (
    <BodyFooter>
      <footer>
        <h3>
          <img
            src={aspasDestaque}
            alt=" vamos ser aaspasDestaque nas redes sociais"
          />
          Vamos ser amigos nas redes sociais
          <img
            src={aspasDestaque}
            alt=" vamos ser aaspasDestaque nas redes sociais"
          />
        </h3>

        <section className="redes">
          <a target="_blank" href="https://www.facebook.com/boraConectar/">
            <AiFillFacebook />
            <span>/boraconectar</span>
          </a>
          <a target="_blank" href="https://www.instagram.com/boraconectar/">
            <AiOutlineInstagram />
            <span>/boraconectar</span>
          </a>
          <a
            target="_blank"
            href="https://www.linkedin.com/company/boraconectar/"
          >
            <FaLinkedinIn color="#fff" />
            <span>/company/boraconectar</span>
          </a>
        </section>
        <section>
          <img src={logo} alt="conectar logo" />
          <Link to="">Termos de Uso | Política de privacidade </Link>
        </section>

        <p> © 2020, Conectar. Todos os direitos reservados.</p>
      </footer>
    </BodyFooter>
  )
}

export default Footer
