import React, { useState } from 'react';
import { BodyCreateProject } from './styles';
import logo from '../../assets/image/logo_fundoClaro.svg';
import Input from '../../components/Input';
import Select from '../../components/Select';
import Textarea from '../../components/Textarea';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';
import ToggleSwitch from '../../components/ToggleSwitch';
import { ReactFacebookLoginInfo, ReactFacebookFailureResponse } from 'react-facebook-login';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebookF } from 'react-icons/fa';
import { useHistory } from 'react-router';
import { monthOptions, yearOptions } from '../../utils/dates';
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
              <Input name="projectTitle" label="Título do projeto" />
              <section className="area-toggle">

                <ToggleSwitch id="private" />
                <label htmlFor="private">Tornar este projeto privado</label>
              </section>


            </div>
            <div className="coluna-dois">

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