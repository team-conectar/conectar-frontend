import React, { useState, useEffect, ChangeEvent } from 'react';
import { BodySelectTool } from './styles';
import { GoCheck } from 'react-icons/go';
import axios, { AxiosError } from "axios";
import trash from "../../assets/icon/lixeira.svg";
interface SelectToolProps {
  callbackSelectedTools: ToolType[];
  setCallbackSelectedTools(tools: ToolType[]): void;
  label?: string;
}

export interface ToolType {
  nome: string;
  id?: number;
}

const SelectTool: React.FC<SelectToolProps> = ({ label, callbackSelectedTools, setCallbackSelectedTools }) => {
  const [newTool, setNewTool] = useState<ToolType>();
  const [tools, setTools] = useState<ToolType[]>([]);
  useEffect(() => {
    axios
      .get("/api/v1/habilidades/")
      .then((response) => {
        setTools(response.data);
      })
      .catch((err: AxiosError) => {
        // Returns error message from backend
        return err?.response?.data.detail;
      });
  }, [newTool]);


  function handleSelectedTools(tool: ToolType) {
    if (callbackSelectedTools?.includes(tool)) {
      setCallbackSelectedTools(callbackSelectedTools.filter(atual => atual !== tool))
    }
    else {
      setCallbackSelectedTools([...callbackSelectedTools, tool]);
    }
  }
  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    if (name === "newTool") {
      setNewTool({ nome: value })
    }
  }
  async function handleAddNewTool(tool: ToolType) {
    if (!tools.includes(tool)) {
      const res = await axios
        .post("/api/v1/habilidade/pessoa", tool, {
          withCredentials: true,
        })
        .then((response) => {
          const habilidade: ToolType = response.data;
          setNewTool({} as ToolType)
          setCallbackSelectedTools([ ...callbackSelectedTools, habilidade ])
        })
        .catch((err: AxiosError) => {
          return err?.response?.data.detail;
        });
      console.log(res);
    }


  }
  return (
    <BodySelectTool>
      <label>{label}</label>
      <div>
        <div className="area-selecionadas">
          <legend>Habilidades e Ferramentas selecionadas</legend>
          <fieldset>
            {callbackSelectedTools?.map(tool => (
              <label key={tool.nome}>
                <legend>{tool.nome}</legend>
                <img
                  src={trash}
                  alt="apagar experiencia"
                  onClick={() => setCallbackSelectedTools(callbackSelectedTools.filter(atual => atual !== tool))}
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
                key={tool.nome}
                type="button"
                onClick={() => handleSelectedTools(tool)}
              >
                <span>
                  {callbackSelectedTools?.includes(tool) && <GoCheck />}
                </span>
                <legend>{tool.nome}</legend>
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
            <span onClick={() => newTool && handleAddNewTool(newTool)}> + </span>
          </fieldset>

        </div>

      </div>
    </BodySelectTool>
  )
}
export default SelectTool;