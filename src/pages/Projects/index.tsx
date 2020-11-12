import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { BodyProjects } from './styles';
import edit from '../../assets/icon/editar.svg'
import no_couver from '../../assets/image/no_couver.svg'
import { useHistory } from 'react-router';
import Button from '../../components/Button';




function Projects() {

  const history = useHistory();

  return (
    <BodyProjects>
      <header>
        <img src={no_couver} alt="" />
        <section>
          <Link to="" >+</Link>
          <img src={edit} alt="editar" />
        </section>
        <aside>
          <h1>Medicare <img src={edit} alt="editar" /></h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vitae porttitor lacus. Praesent ac nisl ut magna dapibus semper auctor sed justo. Nulla mattis massa eu ligula consectetur consequat. Donec a ante nisl. Donec quam erat, feugiat eleifend quam vel, tincidunt lacinia nisl. Aliquam tempus elementum mauris.</p>
          <section>

            <Button>Curtir</Button>
            <Button>Salvar</Button>
          </section>
        </aside>
      </header>
      <main className="container">
        <div className="objdes">

          <aside>
            <section>
              <legend>Objetivo</legend>
              <img src={edit} alt="editar" />
            </section>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vitae porttitor lacus. Prae</p>
          </aside>
          <aside>
            <section>
              <legend>Descrição</legend>
              <img src={edit} alt="editar" />
            </section>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vitae porttitor lacus. Prae</p>
          </aside>
        </div>
        <div className="caracteristicas">
          <legend>Áreas de desenvolvimento</legend>
          <aside>
            <span>Genetica humana</span>
            <span>Genetica humana</span>
            <span>Genetica humana</span>
            <span>Genetica humana</span>
            <span>Genetica humana</span>
          </aside>
          <legend>Habilidades e ferramentas</legend>
          <aside>
            <span>Genetica humana</span>
            <span>Genetica humana</span>
            <span>Genetica humana</span>
            <span>Genetica humana</span>
            <span>Genetica humana</span>
          </aside>
        </div>

        <aside>

          <div className="vagas">
            <legend>Vagas <img src={edit} alt="editar" /></legend>
            <section>
              <aside>

                <legend>Ux Designer</legend>
                <p>
                  Trainee | Não remunerado <br />
                  2 Vagas
                </p>
              </aside>
              <img src={edit} alt="editar" />
            </section>
            <section>
              <aside>

                <legend>Ux Designer</legend>
                <p>
                  Trainee | Não remunerado <br />
                  2 Vagas
                </p>
              </aside>
              <img src={edit} alt="editar" />
            </section>
          </div>
          <div className="descricao">
            <legend>Descrição</legend>
            <section>
              <p>Sobre a Empresa:<br /><br />
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vitae porttitor lacus. Praesent ac nisl ut magna dapibus semper auctor sed justo. Nulla mattis massa eu ligula consectetur consequat. Donec a ante nisl. Donec quam erat, feugiat eleifend quam vel, tincidunt lacinia nisl. Aliquam tempus elementum mauris
              

              </p>
            </section>
          </div>
        </aside>
      </main>
    </BodyProjects>
  )
}
export default Projects;