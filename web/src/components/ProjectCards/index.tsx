import React, { InputHTMLAttributes } from 'react';
import { BodyCard } from './styles';
import { Link } from 'react-router-dom';

interface ProjectCardsProps {
  projeto: {
    title:string;
    areas:string[];
    views:number;
    likes:number;
  } 
  user: {
    imgProfile: string;
    
  } 


}
const ProjectCards: React.FC = () => {
  return (
    <BodyCard>
      <Link to="#">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT9foYOCHad0GC_wSsRh3q3FGuXmjidN0Gq1g&usqp=CAU" alt="" />
      </Link>
      <main>

        <section className="description">
          <Link
            to="#"
            className="title"
          >
            <h2>Linux</h2>
          </Link>
          <aside className="areas">
            <Link to="#" >
              Sistemas Operacionais
          </Link>
            <Link to="#" >
              OS
          </Link>
          </aside>
        </section>
        <section className="icons">
          <p><span></span>1000</p>
          <p><span>1000</span></p>


        </section>
        <section className="members">
          <Link to="#">
            <img src="https://cb.org.br/wp-content/uploads/2015/12/1280x720-a-verdadeira-face-de-jesus.psd.jpg" alt="" />
          </Link>
          <Link to="#">
            <img src="https://cb.org.br/wp-content/uploads/2015/12/1280x720-a-verdadeira-face-de-jesus.psd.jpg" alt="" />
          </Link>
        </section>
      </main>


    </BodyCard>
  )
}
export default ProjectCards;