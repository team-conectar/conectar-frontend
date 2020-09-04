import React, { useState, useEffect } from 'react';
import { BodyMasteryTools } from './styles';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Select, { OptionsTypes } from '../../components/Select';
import Button from '../../components/Button';
import ToggleSwitch from '../../components/ToggleSwitch';
import { yearOptions, monthOptions } from '../../utils/dates';
import { useHistory } from 'react-router-dom';




function MasteryTools() {
  const history = useHistory();


  const [selectedAreas, setSelectedAreas] = useState<string[]>();
  const tools: string[] = ["a","b","c"]; 


  return (
    <BodyMasteryTools >
      <div className="area-central container">

        <h1>Selecione suas habilidades e ferramentas de domínio</h1>
        <section>
          <div className="area-selecionadas">
            <legend>Habilidades e Ferramentas selecionadas</legend>

          </div>
          <div className="area-selecao">
            <legend>Habilidades e Ferramentas</legend>

            <form>
              {tools.map(tool => (
                <label key={tool}>
                  <div className="check-box">
                    <input type="checkbox" id={tool} />
                    <label htmlFor={tool} />
                  </div>

                  <legend>{tool}</legend>
                  <strong>+</strong>
                </label>
              ))}
            </form>
            <input />

          </div>
        </section>


      </div>
      <footer >
        <Button>Pular</Button> <Button onClick={() => { history.push("/ExperienceAreas") }}>Continuar</Button>
      </footer>
    </BodyMasteryTools>
  )
}
export default MasteryTools;