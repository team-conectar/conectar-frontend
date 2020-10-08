import React, { useState } from 'react';
import { BodySelectArea } from './styles';
import { GoCheck } from 'react-icons/go';

interface Area {
  descricao: string;
  id: number;
}
interface AreaTypes {
  area: Area;
  subareas: Area[];
}
interface ShowSubareaTypes {
  show: boolean;
  area: AreaTypes;
}
interface SelectAreaProps {
  label?: string;
  areas: AreaTypes[];
}



const SelectArea: React.FC<SelectAreaProps> = ({ label, areas }) => {
  const [selectedIdsSubareas, setSelectedIdsSubareas] = useState<number[]>([]);
  const [showSubareas, setShowSubareas] = useState<ShowSubareaTypes>({
    show: false,
    area: {
      area: {id: -1, descricao: ""},
      subareas: [{ descricao: "", id: -1 }]
    }
  });
  // const areas: AreaTypes[] = [{
  //   name: "area a",
  //   subareas: [{ name: "sub a", id: 0 }, { name: "sub b", id: 1 }, { name: "sub c", id: 2 }]
  // }]
  function handleSelectedSubareas(id: number) {
    if (selectedIdsSubareas.includes(id)) {
      setSelectedIdsSubareas(selectedIdsSubareas.filter(sub => sub !== id))
    }
    else {
      setSelectedIdsSubareas([...selectedIdsSubareas, id]);
      console.log(areas);
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
                <legend key={subarea.id}>{subarea.descricao}</legend>
              ))
            ))}
          </fieldset>
        </div>
        <div className="area-selecao">
          {!showSubareas.show ?
            <div className="area-rolagem">
              {areas.map(area => (
                <button
                  key={area.area.id}
                  onClick={() => { setShowSubareas({ ...showSubareas, show: true, area: area }) }}
                >{area.area.descricao}
                </button>
              ))}
            </div> :
            <aside className="area-subarea">
              <header>

                <button
                  onClick={() => { setShowSubareas({ ...showSubareas, show: false }) }}
                >Voltar</button>
                <legend>{showSubareas.area.area.descricao}</legend>
              </header>
              <fieldset>
                {showSubareas.area.subareas.map(subarea => (
                  <button key={subarea.descricao} onClick={() => { handleSelectedSubareas(subarea.id) }}>
                    <span>
                      {selectedIdsSubareas?.includes(subarea.id) && <GoCheck />}
                    </span>
                    <legend>{subarea.descricao}</legend>
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