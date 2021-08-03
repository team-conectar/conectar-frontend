/* eslint-disable react/jsx-no-target-blank */
import React from 'react'
import { BodyCard } from './styles'
import { Link } from 'react-router-dom'

import { FaLinkedinIn } from 'react-icons/fa'
import { AiFillFacebook, AiOutlineInstagram } from 'react-icons/ai'
import aspasDestaque from '../../assets/image/aspasDestaque.svg'
/**
 * Component fpr showing links of plataform
 *
 * @component
 */
const LinksCard: React.FC = () => {
  return (
    <BodyCard>
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
      <a target="_blank" href="https://www.facebook.com/boraConectar/">
        <AiFillFacebook />
        <span>/boraconectar</span>
      </a>
      <a target="_blank" href="https://www.instagram.com/boraconectar/">
        <AiOutlineInstagram />
        <span>/boraconectar</span>
      </a>
      <a target="_blank" href="https://www.linkedin.com/company/boraconectar/">
        <FaLinkedinIn />
        <span>/boraconectar</span>
      </a>
    </BodyCard>
  )
}
export default LinksCard
