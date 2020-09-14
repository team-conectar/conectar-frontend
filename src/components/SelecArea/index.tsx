import React, { useState } from 'react';
import { BodySelectArea } from './styles';
import { GoCheck } from 'react-icons/go';

interface SubareasType {
  name: string;
  id: number;

}
interface AreaTypes {
  name: string;
  subareas: SubareasType[];
}
interface ShowSubareaTypes {
  show: boolean;
  area: AreaTypes;
}
interface SelectAreaProps {
  label?: string;
}



const SelectArea: React.FC<SelectAreaProps> = ({ label }) => {
  const [selectedIdsSubareas, setSelectedIdsSubareas] = useState<number[]>([]);
  const [showSubareas, setShowSubareas] = useState<ShowSubareaTypes>({
    show: false,
    area: {
      name: "",
      subareas: [{ name: "", id: -1 }]
    }
  });
  const areas: AreaTypes[] = [{
    name: "area a",
    subareas: [{ name: "sub a", id: 0 }, { name: "sub b", id: 1 }, { name: "sub c", id: 2 }]
  }]
  function handleSelectedSubareas(id: number) {
    if (selectedIdsSubareas.includes(id)) {
      setSelectedIdsSubareas(selectedIdsSubareas.filter(sub => sub !== id))
    }
    else {
      setSelectedIdsSubareas([...selectedIdsSubareas, id]);
    }
  }
  return (
    <BodySelectArea>
      <label>{label}</label>
      <div>
        <div className="area-selecionadas">
          <legend>Áreas selecionadas</legend>
          <fieldset>
            {areas.map(area => (
              area.subareas.map(subarea => (
                selectedIdsSubareas.includes(subarea.id) &&
                <legend>{area.name}</legend>


              ))
            ))}
          </fieldset>
        </div>
        <div className="area-selecao">
          {!showSubareas.show ?
            <div className="area-rolagem">
              {areas.map(area => (
                <button
                  key={area.name}
                  onClick={() => { setShowSubareas({ ...showSubareas, show: true, area: area }) }}
                >{area.name}
                </button>
              ))}
            </div> :
            <aside className="area-subarea">
              <header>

                <button
                  onClick={() => { setShowSubareas({ ...showSubareas, show: false }) }}
                >Voltar</button>
                <legend>{showSubareas.area.name}</legend>
              </header>
              <fieldset>
                {showSubareas.area.subareas.map(subarea => (
                  <button key={subarea.name} onClick={() => { handleSelectedSubareas(subarea.id) }}>
                    <strong>
                      {selectedIdsSubareas?.includes(subarea.id) && <GoCheck />}
                    </strong>
                    <legend>{subarea.name}</legend>
                    <strong>+</strong>
                  </button>
                ))}
              </fieldset>
            </aside>
          }
        </div>
      </div>

    </BodySelectArea>
  )
}
export default SelectArea;