import React, { useState, useEffect } from 'react';
import { BodySelectArea } from './styles';
import { GoCheck } from 'react-icons/go';
import { AxiosError } from "axios";
import api from "../../services/api";
import trash from "../../assets/icon/lixeira.svg";
export interface Area {
  descricao: string;
  id: number;
  area_pai_id?: number;
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
  callbackSelectedAreas: Area[];
  setCallbackSelectedAreas(areas: Area[]): void;
}



const SelectArea: React.FC<SelectAreaProps> = ({ label, callbackSelectedAreas, setCallbackSelectedAreas }) => {
  const [showSubareas, setShowSubareas] = useState<ShowSubareaTypes>({
    show: false,
    area: {
      area: { id: -1, descricao: "" },
      subareas: [{ descricao: "", id: -1 }]
    }
  });
  const [areas, setAreas] = useState<AreaTypes[]>([]);
  useEffect(() => {
    api
      .get("/api/v1/areas", {
        withCredentials: true,
      })
      .then((result) => {
        setAreas(result.data);
        console.log(result.data);
      })
      .catch((err: AxiosError) => {
        // Returns error message from backend
        return err?.response?.data.detail;
      });
  }, []);
  // const areas: AreaTypes[] = [{
  //   name: "area a",
  //   subareas: [{ name: "sub a", id: 0 }, { name: "sub b", id: 1 }, { name: "sub c", id: 2 }]
  // }]
  function handleSelectedSubareas(area: Area) {
    if (callbackSelectedAreas?.includes(area)) {
      setCallbackSelectedAreas(callbackSelectedAreas.filter(atual => atual !== area))
    }
    else {
      setCallbackSelectedAreas([...callbackSelectedAreas, area]);
    }
  }
  return (
    <BodySelectArea>
      <label>{label}</label>
      <div>
        <div className="area-selecionadas">
          <legend>Áreas selecionadas</legend>
          <fieldset>

            {callbackSelectedAreas.map(area => (
              <label>
                <legend>{area.descricao}</legend>
                <img
                  src={trash}
                  alt="apagar experiencia"
                  onClick={() => setCallbackSelectedAreas(callbackSelectedAreas.filter(atual => atual !== area))}
                />
              </label>
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
                  <button
                    key={subarea.descricao}
                    onClick={() => handleSelectedSubareas(subarea)}
                    type="button"
                  >
                    <span>
                      {callbackSelectedAreas?.includes(subarea) && <GoCheck />}
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

    </BodySelectArea >
  )
}
export default SelectArea;