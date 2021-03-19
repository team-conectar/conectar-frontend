import React, { useState, useCallback, useRef, ChangeEvent } from 'react'
import { BodySignUp, Error } from './styles'
import logo from '../../assets/image/logo_fundoClaro.svg'
import cadastro_banner from '../../assets/image/cadastro_banner.svg'
import Input from '../../components/UI/Input'
import Select from '../../components/UI/Select'
import ToggleSwitch from '../../components/UI/ToggleSwitch'
import InputMask from '../../components/UI/InputMask'
import { Link } from 'react-router-dom'
import Button from '../../components/UI/Button'
import { ReactFacebookLoginInfo } from 'react-facebook-login'
import FacebookLogin from 'react-facebook-login'
import GoogleLogin, { GoogleLoginResponse } from 'react-google-login'
import { FcGoogle } from 'react-icons/fc'
import { FaFacebookF } from 'react-icons/fa'
import { useHistory, useParams } from 'react-router'
import { daysOptions, monthOptions, yearOptions } from '../../utils/dates'
import { AxiosError } from 'axios'
import api from '../../services/api'
import * as Yup from 'yup'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import getValidationErrors from '../../utils/getValidationErrors'
import { IoMdAlert } from 'react-icons/io'

interface routeParms {
  parte: string
}
interface PessoaType {
  email: string
  telefone: string
  nome: string
  username: string
  password: string
  year: string
  month: string
  day: string
  idealizador: string
  colaborador: string
  aliado: string
}
const SignUp: React.FC = () => {
  const history = useHistory()
  const params = useParams<routeParms>()
  const formRef = useRef<FormHandles>(null)
  const [profileTypeError, setProfyleTypeError] = useState(false)
  const [showNextStep, setShowNextStep] = useState<boolean>(
    params.parte === '2',
  )

  const handleSubmit = useCallback(async (formData: PessoaType) => {
    try {
      // Remove all previous errors
      formRef.current?.setErrors({})
      const schema = Yup.object().shape({
        email: Yup.string()
          .email('Não corresponde ao formato exemple@ex.com')
          .required('Email é obrigatório'),
        password: Yup.string()
          .matches(/(?=.*[!@#$%^&*])/g, 'Deve conter caracteres especiais')
          .matches(/(?=.*[A-Z])/g, 'Deve conter caracteres maiúsculas')
          .matches(/(?=.*[0-9])/g, 'Deve conter caracteres numéricos')
          .matches(/(?=.*[a-z])/g, 'Deve conter caracteres minúsculas')
          .min(8, 'Deve conter no mínimo 8 caracteres')
          .required('Senha é obritória'),
        username: Yup.string()
          .min(4, 'Deve conter no mínimo 4 caracteres')
          .max(20, 'Deve conter no máximo 20 caracteres')
          .required('Usuário é obrigatório'),
        nome: Yup.string()
          .max(80)
          .matches(/(?=.*[ ])/g, 'Informe o nome completo')
          .required('Usuário é obrigatório'),
      })

      await schema.validate(formData, {
        abortEarly: false,
      })
      // Validation passed
      const data = new FormData()

      data.append('email', formData.email)
      data.append('nome', formData.nome)
      data.append('username', formData.username)
      data.append('password', formData.password)
      await api.post('/api/signup', data)
      setShowNextStep(true)
      console.log(formData)
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        // Validation failed
        const errors = getValidationErrors(err)
        formRef.current?.setErrors(errors)
        // alert(errors);
      }
    }
  }, [])
  const handleSecondSubmit = useCallback(
    async (formData: PessoaType) => {
      console.log(formData)

      try {
        // Remove all previogeus errors
        formRef.current?.setErrors({})
        const schema = Yup.object().shape({
          telefone: Yup.string().required('Telefone é obrigatório'),
          year: Yup.string().required('Ano é obrigatório'),
          month: Yup.string().required('Mês é obrigatório'),
          day: Yup.string().required('Dia é obrigatório'),
        })

        setProfyleTypeError(
          !(
            formData.aliado[0] === 'aliado' ||
            formData.colaborador[0] === 'colaborador' ||
            formData.idealizador[0] === 'idealizador'
          ),
        )

        await schema.validate(formData, {
          abortEarly: false,
        })
        // Validation passed
        const { year, month, day, telefone } = formData

        const data_nascimento = `${year}-${month}-${day}`

        const aliado = !!(formData.aliado[0] === 'aliado')
        const colaborador = !!(formData.colaborador[0] === 'colaborador')
        const idealizador = !!(formData.idealizador[0] === 'idealizador')

        const data = {
          data_nascimento,
          aliado,
          colaborador,
          idealizador,
          telefone,
        }
        console.log(data)
        if (
          formData.aliado[0] === 'aliado' ||
          formData.colaborador[0] === 'colaborador' ||
          formData.idealizador[0] === 'idealizador'
        ) {
          await api.put('/api/v1/pessoas', data, {
            withCredentials: true,
          })
          history.push('/experiencias-do-usuario')
        }
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          // Validation failed
          console.log(err)

          const errors = getValidationErrors(err)
          formRef.current?.setErrors(errors)
        }
      }
    },
    [history],
  )

  /** This function checks if the profile is idealizer, collaborator or ally then advances to the next form and set name and email in formData */
  async function checkProfileType() {
    const { aliado, colaborador, idealizador } = (
      await api.get('/api/v1/pessoas/me')
    ).data
    if (!aliado || !colaborador || !idealizador) {
      setShowNextStep(true)
    }
    // setFormData({ ...formData, nome, email });
  }
  const responseFacebook = async (resposta: ReactFacebookLoginInfo) => {
    const { email, name } = resposta
    const foto_perfil = resposta.picture?.data.url
    const res = await api
      .post(`/api/login?provider=facebook`, {
        email,
        nome: name,
        foto_perfil,
      })
      .then(checkProfileType)
      .catch((err: AxiosError) => {
        // Returns error message from backend
        return err?.response?.data.detail
      })

    console.log(res)
  }
  const responseGoogle = async (response: GoogleLoginResponse | any) => {
    const { tokenId } = response
    const res = await api
      .post(`/api/login?provider=google&token=${tokenId}`)
      .then(checkProfileType)
      .catch((err: AxiosError) => {
        // Returns error message from backend
        return err?.response?.data.detail
      })
    console.log(res)
  }

  return (
    <BodySignUp>
      {!showNextStep && (
        <Form
          ref={formRef}
          onSubmit={handleSubmit}
          className="area-central container"
        >
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
          <div className="primeira-etapa">
            <img src={cadastro_banner} alt="cadastro" />

            <div className="area-form">
              <h1>Criar sua conta</h1>
              <Input name="nome" label="Nome Completo" />
              <Input type="email" name="email" label="E-mail" />
              <section>
                <Input name="username" label="Nome de usuário" />
                <Input type="password" name="password" label="Senha" />
              </section>
              <p>
                Ao prosseguir, você concorda com os{' '}
                <Link to="#">Termos de Uso</Link> e{' '}
                <Link to="#">Política de Privacidade.</Link>
              </p>

              <section>
                <Link to="login">Já tem uma conta?</Link>
                <Button theme="primary" type="submit">
                  Continuar
                </Button>
              </section>
              <section>
                <FacebookLogin
                  appId="1088597931155576"
                  autoLoad={false}
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
        </Form>
      )}
      {showNextStep && (
        <Form
          ref={formRef}
          onSubmit={handleSecondSubmit}
          className="area-central container"
        >
          <div className="segunda-etapa">
            <legend>
              <h1>Bem vindo(a) ao Conectar</h1>
            </legend>
            <section>
              <InputMask
                type="tel"
                name="telefone"
                label="Celular"
                mask="(99) 99999-9999 "
              />
              <Select
                label="Ano de Nascimento"
                name="year"
                defaultOption="Ano"
                options={yearOptions}
              />
              <Select
                label="Mês de Nascimento"
                name="month"
                defaultOption="Mês"
                options={monthOptions}
              />

              <Select
                label="Dia de Nascimento"
                name="day"
                defaultOption="Dia"
                options={daysOptions(4, 2000)}
              />
            </section>
            <section className="tipo-perfil">
              <section>
                <legend>
                  Tipo de Perfil{' '}
                  {profileTypeError && (
                    <Error message="Deve selecionar ao menos um tipo de perfil abaixo">
                      <IoMdAlert />
                    </Error>
                  )}
                </legend>
                <span>Selecione um ou mais tipos</span>
              </section>
              <fieldset>
                <legend>Idealizador</legend>
                <aside>
                  <p>Interessado em criar projetos</p>
                  <ToggleSwitch
                    name="idealizador"
                    options={[{ id: 'idealizador', value: 'idealizador' }]}
                  />
                </aside>
              </fieldset>
              <fieldset>
                <legend>Colaborador</legend>
                <aside>
                  <p>Interessado em participar de projetos</p>
                  <ToggleSwitch
                    name="colaborador"
                    options={[{ id: 'colaborador', value: 'colaborador' }]}
                  />
                </aside>
              </fieldset>
              <fieldset>
                <legend>Aliado</legend>
                <aside>
                  <p>Interessado em ajudar projetos</p>
                  <ToggleSwitch
                    name="aliado"
                    options={[{ id: 'aliado', value: 'aliado' }]}
                  />
                </aside>
              </fieldset>
            </section>
            <section>
              <Button
                theme="secondary"
                type="submit"
                onClick={() => history.push('/experiencias-do-usuario')}
              >
                Pular
              </Button>
              <Button theme="primary" type="submit">
                Continuar
              </Button>
            </section>
          </div>
        </Form>
      )}
    </BodySignUp>
  )
}
export default SignUp
