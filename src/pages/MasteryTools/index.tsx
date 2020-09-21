import React, { useState} from 'react';
import { BodyMasteryTools } from './styles';
import Button from '../../components/Button';
import { useHistory } from 'react-router-dom';
import SelectTool from '../../components/SelectTools';



function MasteryTools() {
  const history = useHistory();


  const [selectedAreas, setSelectedAreas] = useState<string[]>();
  const tools: string[] = ["a","b","c"]; 


  return (
    <BodyMasteryTools >
      <div className="area-central container">

        <h1>Selecione suas habilidades e ferramentas de domínio</h1>
        <SelectTool />


      </div>
      <footer >
        <Button theme="secondary-yellow" >Pular</Button> <Button onClick={() => { history.push("/ExperienceAreas") }} theme="primary-yellow" >Continuar</Button>
      </footer>
    </BodyMasteryTools>
  )
}
export default MasteryTools;