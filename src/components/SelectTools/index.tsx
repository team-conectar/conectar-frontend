import React, { useState } from 'react';
import { BodySelectTool } from './styles';
import { GoCheck } from 'react-icons/go';

interface ToolsType {
  name: string;
  id: number;

}

interface SelectToolProps {
  label?: string;
}



const SelectTool: React.FC<SelectToolProps> = ({ label }) => {
  const [selectedIdsTools, setSelectedIdsTools] = useState<number[]>([]);
  const tools: ToolsType[] = [{ name: "a", id: 0 }, { name: "b", id: 1 }, { name: "c", id: 2 }];

  function handleSelectedTools(id: number) {
    if (selectedIdsTools.includes(id)) {
      setSelectedIdsTools(selectedIdsTools.filter(sub => sub !== id))
    }
    else {
      setSelectedIdsTools([...selectedIdsTools, id]);
    }
  }
  return (
    <BodySelectTool>
      <label>{label}</label>
      <div>
        <div className="area-selecionadas">
          <legend>Habilidades e Ferramentas selecionadas</legend>
          <fieldset>

          </fieldset>
        </div>
        <div className="area-selecao">
          <legend>Habilidades e Ferramentas</legend>


          <fieldset>
            {tools.map(tool => (
              <button key={tool.id} onClick={() => { handleSelectedTools(tool.id) }}>
                <span>
                  {selectedIdsTools?.includes(tool.id) && <GoCheck />}
                </span>
                <legend>{tool.name}</legend>
                <strong>+</strong>
              </button>
            ))}
          </fieldset>
          <fieldset className="area-insercao">
            <legend>Se não encontrou insira abaixo</legend>
            <input placeholder="Habilidade, ferramenta ou matéria..."/>
            <span> + </span>
          </fieldset>

        </div>

      </div>
    </BodySelectTool>
  )
}
export default SelectTool;