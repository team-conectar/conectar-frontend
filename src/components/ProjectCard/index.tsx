import React, { InputHTMLAttributes } from 'react'
import { BodyCard } from './styles'
import { Link } from 'react-router-dom'

interface ProjectCardProps {
  projeto: {
    title: string
    areas: string[]
    views: number
    likes: number
  }
  user: {
    imgProfile: string
  }
}
const ProjectCard: React.FC = () => {
  return (
    <BodyCard>
      <main>
        <aside>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT9foYOCHad0GC_wSsRh3q3FGuXmjidN0Gq1g&usqp=CAU"
            alt=""
          />

          <section>
            <h3>Title</h3>
            <ul>
              <li></li>
            </ul>
            <p>publicado em</p>
          </section>
        </aside>
        <p>
          orem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industrys standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic
        </p>
      </main>
      <aside>
        <button>Favoritar</button>
        <button>Tenho interesse</button>
      </aside>
    </BodyCard>
  )
}
export default ProjectCard
