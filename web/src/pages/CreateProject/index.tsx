import React, { useState } from 'react';
import { BodyCreateProject } from './styles';
import Input from '../../components/Input';
import Select from '../../components/Select';
import Textarea from '../../components/Textarea';
import Button from '../../components/Button';
import ToggleSwitch from '../../components/ToggleSwitch';
import { useHistory } from 'react-router';

import SelectArea from '../../components/SelecArea';
interface renderFacebook {
  onClick: () => void;
  disabled?: boolean;
}


function CreateProject() {

  const history = useHistory();

  const [showSecundStep, setShowSecondStep] = useState<boolean>(false);



  return (
    <BodyCreateProject >
      <div className="area-central container">
        <h1>Criar Projeto</h1>

        {!showSecundStep
          ? (<main>
            <div className="coluna-um">

              <Input name="projectTitle" label="Título do projeto" />
              <div className="upload-img">
                <label htmlFor="upload">Capa do projeto</label>
                <div className="view-img">
                  <label htmlFor="upload">Fazer Upload de Imagem</label>
                  <input
                    type="file"
                    name="upload"
                    id="upload"
                    accept="image/png, image/jpeg"

                  />
                  <p>Tamanho mínimo de 805x632px</p>
                </div>
              </div>
              <Input name="#" label="Público alvo" />
              <section className="area-toggle">

                <ToggleSwitch name="private" label="Tornar este projeto privado" />
                
              </section>


            </div>
            <div className="coluna-dois">
              <SelectArea label="Área de desenvolvimento" />
            </div>
            <section>
              <Button type="button" onClick={history.goBack}>Cancelar</Button>
              <Button onClick={() => setShowSecondStep(true)} >Continuar</Button>
            </section>


          </main>)
          : (<main>
            <div className="coluna-um">

              <Input name="inst" label="Empresa, marca ou instituição" placeholder="Para quem o projeto será feito?" />

              <Input name="projectTitle" label="Título do projeto" />
              <Textarea
                label="Objetivo do projeto"
                name=""

              />
              <Textarea
                label="Descrição simples"
                name=""

              />
              <section className="area-select">
                <Select
                  name="qtdCol"
                  label="Qtd. de Colaboradores"
                  options={[{ value: "0", label: "1" }]}
                  defaultOption="Selecione"
                />
                <Select
                  name="qtdCol"
                  label="Qtd. de Aliados"
                  options={[{ value: "0", label: "1" }]}
                  defaultOption="Selecione"
                />

              </section>


            </div>
            <div className="coluna-dois">

            </div>
            <section>
              <Button className="voltar" type="button" onClick={() => setShowSecondStep(false)}>Voltar</Button>
              <Button >Concluir</Button>
            </section>
          </main>)
        }
      </div>
    </BodyCreateProject>
  )
}
export default CreateProject;