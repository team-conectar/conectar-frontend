import React, { useState, useEffect } from 'react';
import { BodyExperienceAreas } from './styles';
import Button from '../../components/Button';
import { useHistory } from 'react-router-dom';
import SelectArea from '../../components/SelectArea';


interface AreaTypes {
  name: string;
  subareas: string[];
}


function ExperienceAreas() {
  const history = useHistory();


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
        <SelectArea />


      </div>
      <footer >
        <Button
          theme="secondary-yellow"
          onClick={() => { history.push("/masterytools") }}
        >Pular</Button>
        <Button
          onClick={() => { history.push("/masterytools") }}
          theme="primary-yellow"
        >Continuar</Button>
      </footer>
    </BodyExperienceAreas >
  )
}
export default ExperienceAreas;