import React, { useState, useEffect } from 'react';
import { BodyExperienceAreas } from './styles';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Select, { OptionsTypes } from '../../components/Select';
import Button from '../../components/Button';
import ToggleSwitch from '../../components/ToggleSwitch';
import { yearOptions, monthOptions } from '../../utils/dates';
import { useHistory } from 'react-router-dom';
import { BsCheck } from 'react-icons/bs';

interface PropsShowSteps {
  first: boolean;
  second: boolean;
  third: boolean;
}
export interface AreaTypes {
  name: string;
  subareas: string[];
}
interface ShowSubareaTypes {
  show: boolean;
  area: AreaTypes;
}

function ExperienceAreas() {
  const history = useHistory();
  const areas: AreaTypes[] = [{
    name: "area a",
    subareas: ["sub a", "sub b", "sub c"]
  },
  {
    name: "area b",
    subareas: ["sub a", "sub b", "sub c"]
  },
  {
    name: "area c",
    subareas: ["sub a", "sub b", "sub c", "sub a", "sub b", "sub c", "sub a", "sub b", "sub c", "sub a", "sub b", "sub c"]
  },
  {
    name: "area b",
    subareas: ["sub a", "sub b", "sub c"]
  },
  {
    name: "area c",
    subareas: ["sub a", "sub b", "sub c", "sub a", "sub b", "sub c", "sub a", "sub b", "sub c", "sub a", "sub b", "sub c"]
  },
  {
    name: "area b",
    subareas: ["sub a", "sub b", "sub c"]
  },
  {
    name: "area c",
    subareas: ["sub a", "sub b", "sub c", "sub a", "sub b", "sub c", "sub a", "sub b", "sub c", "sub a", "sub b", "sub c"]
  },
  {
    name: "area b",
    subareas: ["sub a", "sub b", "sub c"]
  },
  {
    name: "area c",
    subareas: ["sub a", "sub b", "sub c", "sub a", "sub b", "sub c", "sub a", "sub b", "sub c", "sub a", "sub b", "sub c"]
  }
  ];
  const [showSubareas, setShowSubreas] = useState<ShowSubareaTypes>({

    show: false,
    area: {
      name: "",
      subareas: [""]
    }
  });
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

  const [selectedAreas, setSelectedAreas] = useState<AreaTypes[]>([{
    name: "",
    subareas: [""]
  }]);


  useEffect(() => {

  }, [selectedAreas]);
  return (
    <BodyExperienceAreas  >
      <div className="area-central container">

        <h1>Selecione suas áreas de atuação (máx. 5)</h1>
        <section>
          <div className="area-selecionadas">
            <legend>Áreas selecionadas</legend>

          </div>
          <div className="area-selecao">
            {!showSubareas.show
              ? (<div className="area-rolagem">
                {areas.map(area => (
                  <button
                    key={area.name}
                    onClick={() => { setShowSubreas({ show: true, area: area }) }}
                  >{area.name}
                  </button>
                ))}
              </div>)
              : <aside className="area-subarea">
                <header>

                  <button
                    onClick={() => { setShowSubreas({ ...showSubareas, show: false }) }}
                  >Voltar</button>
                  <legend>{showSubareas.area.name}</legend>
                </header>
                <form>
                  {showSubareas.area.subareas.map(subarea => (
                    <label key={subarea}>
                      <div className="check-box">
                        <input type="checkbox" id={subarea}  />
                        <label htmlFor={subarea} />
                      </div>

                      <legend>{subarea}</legend>
                      <strong>+</strong>
                    </label>
                  ))}
                </form>
              </aside>
            }
          </div>
        </section>


      </div>
      <footer >
        <Button>Pular</Button> <Button onClick={() => { history.push("/masterytools") }}>Continuar</Button>
      </footer>
    </BodyExperienceAreas >
  )
}
export default ExperienceAreas;