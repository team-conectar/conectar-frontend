import React, { useState, useEffect, ChangeEvent } from 'react';
import { BodySelectTool } from './styles';
import { GoCheck } from 'react-icons/go';
import axios, { AxiosError } from "axios";
import trash from "../../assets/icon/lixeira.svg";
interface SelectToolProps {
  label?: string;
}



const SelectTool: React.FC<SelectToolProps> = ({ label }) => {
  const [newTool, setNewTool] = useState<string>();
  const [tools, setTools] = useState<string[]>([]);
  useEffect(() => {
    axios
      .get("/api/v1/habilidades")
      .then((response) => {
        setTools(response.data);
      })
      .catch((err: AxiosError) => {
        // Returns error message from backend
        return err?.response?.data.detail;
      });
  }, [newTool]);
  const [selectedTools, setSelectedTools] = useState<string[]>([]);

  function handleSelectedTools(tool: string) {
    if (selectedTools?.includes(tool)) {
      setSelectedTools(selectedTools.filter(sub => sub !== tool))
    }
    else {
      setSelectedTools([...selectedTools, tool]);
    }
  }
  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    if (name === "newTool") {
      setNewTool(value)
    }
  }
  function handleAddNewTool(tool:string) {
    if ( !selectedTools.includes(tool)) {
      setSelectedTools([...selectedTools, tool]);
    }
  }
  return (
    <BodySelectTool>
      {console.log(newTool)}
      <label>{label}</label>
      <div>
        <div className="area-selecionadas">
          <legend>Habilidades e Ferramentas selecionadas</legend>
          <fieldset>
            {selectedTools?.map(tool => (
              <label key={tool}>
                <legend>{tool}</legend>
                <img
                  src={trash}
                  alt="apagar experiencia"
                  onClick={() => setSelectedTools(selectedTools.filter(sub => sub !== tool))}
                />
              </label>
            ))}
          </fieldset>
        </div>
        <div className="area-selecao">
          <legend>Habilidades e Ferramentas</legend>
          <fieldset>
            {tools?.map(tool => (
              <button
                key={tool}
                onClick={() => { handleSelectedTools(tool) }}
              >
                <span>
                  {selectedTools?.includes(tool) && <GoCheck />}
                </span>
                <legend>{tool}</legend>
                <strong>+</strong>
              </button>
            ))}
          </fieldset>
          <fieldset className="area-insercao">
            <legend>Se não encontrou insira abaixo</legend>
            <input
              placeholder="Habilidade, ferramenta ou matéria..."
              name="newTool"
              onChange={handleInputChange}
            />
            <span onClick={()=>newTool && handleAddNewTool(newTool)}> + </span>
          </fieldset>

        </div>

      </div>
    </BodySelectTool>
  )
}
export default SelectTool;