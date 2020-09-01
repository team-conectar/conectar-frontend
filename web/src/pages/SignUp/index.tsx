import React, { useEffect, useState } from 'react';
import { BodySignUp } from './styles';
import logo from '../../assets/image/logo_fundoClaro.svg';
import Input from '../../components/Input';
import Select from '../../components/Select';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';
import { ReactFacebookLoginInfo, ReactFacebookFailureResponse } from 'react-facebook-login';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebookF } from 'react-icons/fa';
import {closestIndexTo, addYears, getISODay, isToday} from 'date-fns';

interface renderFacebook {
  onClick: () => void;
  disabled?: boolean;
}
interface options {
  value:string;
  label:string;
}

function SignUp() {
  
  
  const monthOptions: options[]= [
    {value: "0", label: "Janeiro"},
    {value: "1", label: "Janeiro"},
    {value: "2", label: "Fevereiro"},
    {value: "3", label: "Março"},
    {value: "4", label: "Abril"},
    {value: "5", label: "Maio"},
    {value: "6", label: "Junho"},
    {value: "7", label: "Julho"},
    {value: "8", label: "Agosto"},
    {value: "9", label: "Setembro"},
    {value: "10", label: "Outubro"},
    {value: "11", label: "Novembro"},
    {value: "12", label: "Dezembro"},
    
  ];
  
  var yearOptions: options[] = [{
    label: "2020",
    value: "0",
  },];
  for (let index = 1; index < 100; index++) {
    yearOptions.push({
      value:String(index),
      label:String(2019-index),
    })
  }
  
  const [step, setStep] = useState<string>("primeira");

  const responseFacebook = (resposta: ReactFacebookLoginInfo | ReactFacebookFailureResponse) => {
    console.log(resposta);
  }
  const responseGoogle = (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    console.log(response);
  }

  return (
    <BodySignUp segunda={(step == "segunda") ? true : false}>
      <form className="area-central container">
        <Link to="/"><img src={logo} alt="logo" /></Link>
        <div className="primeira-etapa">

          <img src="" alt="#" className="area-img" />


          <div className="area-form">


            <h1>Criar sua conta</h1>
            <Input name="nome" label="Nome Completo" />
            <Input type="email" name="email" label="E-mail" />
            <section>
              <Input name="user" label="Nome de usuário" />
              <Input type="password" name="password" label="Senha" />
            </section>
            <p>Ao prosseguir, você concorda com os <Link to="#">Termos de Uso</Link> e <Link to="#">Política de Privacidade.</Link></p>

            <section>
              <Link to="login">Já tem uma conta?</Link>
              <Button type="button" onClick={() => setStep("segunda")}>Continuar</Button>
            </section>
            <section>

              <FacebookLogin
                appId="1088597931155576"
                autoLoad={true}
                fields="name,email,picture"
                callback={responseFacebook}
                cssClass="facebook-button"
                textButton="Cadastre-se com Facebook"
                icon={<FaFacebookF />}

              />
              <GoogleLogin
                clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
                render={renderProps => (
                  <button
                    className="google-button"
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                  >
                    <FcGoogle />
                  Inscreva-se com Google
                  </button>
                )}
                buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
              />


            </section>
          </div>
        </div>
        <div className="segunda-etapa">
          <legend>
            <h1>Bem vindo(a) ao Conectar</h1>
          </legend>
          <section>
            <Input type="tel" name="phone" label="Celular"></Input>
            <Select
              label="Data de Nascimento"
              name="month"
              defaultOption="Ano"
              options={yearOptions}
            />
            <Select
              name="year"
              defaultOption="Mês"
              options={monthOptions}
            />
            <Input type="number" name="day" placeholder="Dia"></Input>
            
            {/* /*
            <Select
              label="Data de Nascimento"
              name="year"
              options={}
            /> */ }
          </section>
          <section>
            <legend>Tipo de Perfil</legend>
            <span>Selecione um ou mais tipos</span>
          </section>
          <section className="tipo-perfil">
            <fieldset>

              <legend>Idealizador</legend>
              <aside>
                <p>xxxxxxxxxxxxxxxx xxx xxxx</p>
                <label className="switch">
                  <input type="checkbox" />
                  <span className="slider"></span>
                </label>

              </aside>
            </fieldset>
            <fieldset>

              <legend>Colaborador</legend>
              <aside>
                <p>xxxxxxxxxxxxxxxx xxx xxxx</p>
                <label className="switch">
                  <input type="checkbox" />
                  <span className="slider"></span>
                </label>

              </aside>
            </fieldset>
            <fieldset>
              <legend>Aliado</legend>
              <aside>
                <p>xxxxxxxxxxxxxxxx xxx xxxx</p>
                <label className="switch">
                  <input type="checkbox" />
                  <span className="slider"></span>
                </label>
              </aside>
            </fieldset>
          </section>
          <section>
            <button className="voltar" type="button" onClick={() => setStep("primeira")}>Voltar</button>
            <Button>Enviar</Button>
          </section>
        </div>
      </form>
    </BodySignUp>
  )
}
export default SignUp;