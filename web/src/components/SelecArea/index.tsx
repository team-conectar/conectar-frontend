import React, { useState } from 'react';
import { BodySelectArea } from './styles';
import {BsCheck} from 'react-icons/bs';


interface AreaTypes {
  name: string;
  subareas: string[];
}
interface ShowSubareaTypes {
  show: boolean;
  selected:boolean;
  area: AreaTypes;
}
interface SelectAreaProps {
  label?: string;



}
const SelectArea: React.FC<SelectAreaProps> = ({ label }) => {
  const [showSubareas, setShowSubreas] = useState<ShowSubareaTypes>({

    show: false,
    selected:false,
    area: {
      name: "",
      subareas: [""]
    }
  });
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

  return (
    <BodySelectArea>
      <label>{label}</label>
      <div>
        <div className="area-selecionadas">
          <legend>Áreas selecionadas</legend>

        </div>
        <div className="area-selecao">
          {!showSubareas.show ?
            <div className="area-rolagem">
              {areas.map(area => (
                <button
                  key={area.name}
                  onClick={() => { setShowSubreas({...showSubareas, show: true, area: area }) }}
                >{area.name}
                </button>
              ))}
            </div> :
            <aside className="area-subarea">
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
                      <input type="checkbox" id={subarea} />
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
      </div>

    </BodySelectArea>
  )
}
export default SelectArea;