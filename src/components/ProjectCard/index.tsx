import React, { InputHTMLAttributes } from 'react'
import { BodyCard, ProjectInfo, UserInfo } from './styles'
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
      <img
        src="https://upload.wikimedia.org/wikipedia/pt/thumb/4/4d/Clube_do_Remo.png/120px-Clube_do_Remo.png"
        alt=""
      />
      <UserInfo>
        <aside>
          <h2>Jefeeeeeeee</h2>
          <p>@Jeef</p>
        </aside>
      </UserInfo>
      <div>
        <ProjectInfo>
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
            industry. Lorem Ipsum has been the industrys standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic
          </p>
        </ProjectInfo>
        <aside>
          <button>Favoritar</button>
          <button>Tenho interesse</button>
        </aside>
      </div>
    </BodyCard>
  )
}
export default ProjectCard
