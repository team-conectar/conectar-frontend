import React, { useState} from 'react';
import { BodyProfileFeatures } from './styles';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Select, { OptionsTypes } from '../../components/Select';
import Button from '../../components/Button';
import ToggleSwitch from '../../components/ToggleSwitch';
import { yearOptions, monthOptions } from '../../utils/dates';
import { useHistory } from 'react-router-dom';

interface PropsShowSteps {
  first: boolean;
  second: boolean;
  third: boolean;
}


function ProfileFeatures() {
  const history = useHistory();
  const vinculos: OptionsTypes[] = [
    { label: "Trainee", value: "0", },
    { label: "Terceirizado", value: "1", },
    { label: "Intermitente", value: "2", },
    { label: "Aprendiz", value: "3", },
    { label: "Estágio", value: "4", },
    { label: "Temporário", value: "5", },
    { label: "Freelance", value: "6", },
    { label: "Autônomo", value: "7", },
    { label: "Meio Período", value: "8", },
    { label: "Tempo Integral", value: "9", }
  ]
  const [steps, setSteps] = useState<PropsShowSteps>({
    first: false,
    second: false,
    third: false,
  });

  return (
    <BodyProfileFeatures showStep={steps} >
      <div className="area-central container">
        <h1>Nos conte sua experiência</h1>
        <section className="caracteristicas">
          <h2>Educação</h2>

          {!steps.first &&
            (<button onClick={() => setSteps({ ...steps, first: true })}><span>+</span> Adicionar</button>)
          }
          <aside className="area-educacao">
            <section className="bloco-um">
              <Input label="Instituição de ensino" name="" />
              <Input label="Curso" name="" />
            </section>
            <section className="bloco-dois">
              <Select
                label="Nível de formação"
                name=""
                options={vinculos}
                defaultOption="Selecione"
              />
              <aside>
                <Select
                  label="Ano incial"
                  name="initialYear"
                  options={yearOptions}
                  defaultOption="Selecione"
                />
                <Select
                  label="Ano final"
                  name="finalYear"
                  options={yearOptions}
                  defaultOption="Selecione"
                />
              </aside>
            </section>
            <section className="bloco-tres">
              <form action="">
                <aside>
                  <ToggleSwitch />
                  <span>Icompleto</span>
                </aside>
                <aside>
                  <ToggleSwitch />
                  <span>Em andamento</span>
                </aside>
                <aside>
                  <ToggleSwitch />
                  <span>Concluído</span>
                </aside>
              </form>
            </section>
            <section className="bloco-quatro">
              <Textarea name="details" label="Detalhes"></Textarea>
            </section>
            <section className="botoes">
              <Button>Salvar</Button>
              <Button>Excluir</Button>
              <Button onClick={() => setSteps({ ...steps, first: false })}>Calcelar</Button>
            </section>
          </aside>
        </section>
        <section className="caracteristicas">
          <h2>Atuação Profissional</h2>
          {!steps.second &&
            (<button onClick={() => setSteps({ ...steps, second: true })}><span>+</span> Adicionar</button>)
          }
          <aside className="area-trabalho">
            <section className="bloco-um">
              <Input label="Organização" name="organization" />
              <Input label="Cargo" name="" />
            </section>
            <section className="bloco-dois">

              <Select
                label="Vínculo"
                name="bond"
                options={vinculos}
                defaultOption="Selecione"
              />
              <Input label="Localização" name="" />
            </section>
            <section className="bloco-tres">
              <aside>
                <Select
                  label="Mês incial"
                  name="initialMonth"
                  options={monthOptions}
                  defaultOption="Selecione"
                />
                <Select
                  label="Ano incial"
                  name="initialYear"
                  options={yearOptions}
                  defaultOption="Selecione"
                />
              </aside>
              <aside>
                <ToggleSwitch /><span>Trabalho atual</span>
              </aside>
              <aside>
                <Select
                  label="Mês final"
                  name="initialMonth"
                  options={monthOptions}
                  defaultOption="Selecione"
                />
                <Select
                  label="Ano final"
                  name="initialYear"
                  options={yearOptions}
                  defaultOption="Selecione"
                />
              </aside>
            </section>
            <section className="bloco-quatro">
              <Textarea name="details" label="Detalhes"></Textarea>
            </section>
            <section className="botoes">
              <Button>Salvar</Button>
              <Button>Excluir</Button>
              <Button onClick={() => setSteps({ ...steps, second: false })}>Calcelar</Button>
            </section>
          </aside>
        </section>
        <section className="caracteristicas">
          <h2>Projetos</h2>

          {!steps.third &&
            (<button onClick={() => setSteps({ ...steps, third: true })}><span>+</span> Adicionar</button>)
          }
          <aside className="area-projeto">
            <section className="bloco-um">
              <Input label="Nome do projeto" name="projectName" />
              <Input label="Instituição de execução" name="" />
            </section>
            <section className="bloco-dois">
              <Select
                label="Situação"
                name="situation"
                options={vinculos}
                defaultOption="Selecione"
              />

              <Input label="Cargo" name="" />
            </section>
            <section className="bloco-tres">
              <aside>
                <Select
                  label="Mês incial"
                  name="initialMonth"
                  options={monthOptions}
                  defaultOption="Selecione"
                />
                <Select
                  label="Ano incial"
                  name="initialYear"
                  options={yearOptions}
                  defaultOption="Selecione"
                />
              </aside>
              <aside>
                <ToggleSwitch /><span>Estou nesse projeto atualmente</span>
              </aside>
              <aside>
                <Select
                  label="Mês final"
                  name="initialMonth"
                  options={monthOptions}
                  defaultOption="Selecione"
                />
                <Select
                  label="Ano final"
                  name="initialYear"
                  options={yearOptions}
                  defaultOption="Selecione"
                />
              </aside>
            </section>
            <section className="bloco-quatro">
              <Textarea name="details" label="Detalhes"></Textarea>
            </section>
            <section className="botoes">
              <Button>Salvar</Button>
              <Button>Excluir</Button>
              <Button onClick={() => setSteps({ ...steps, third: false })}>Calcelar</Button>
            </section>
          </aside>
        </section>
        <footer>
          <Button>Pular</Button> <Button onClick={() => { history.push("/experienceareas") }}>Continuar</Button>
        </footer>
      </div>
    </BodyProfileFeatures >
  )
}
export default ProfileFeatures;