import React, { useState, useEffect, ChangeEvent, useRef, useCallback } from 'react';
import { BodySelectTool } from './styles';
import { GoCheck } from 'react-icons/go';
import { AxiosError } from "axios";
import trash from "../../assets/icon/lixeira.svg";
import api from "../../services/api";
import { useField } from '@unform/core';
import { Form } from '@unform/web';
interface SelectToolProps {
  name: string;
  defaultValue?: string[];
  label?: string;
}

export interface ToolType {
  nome: string;
  id?: number;
}

const SelectTool: React.FC<SelectToolProps> = ({ label, name, defaultValue }) => {
  const [newTool, setNewTool] = useState<ToolType>();
  const [tools, setTools] = useState<ToolType[]>([]);
  const [selectedTools, setSelectedTools] = useState<string[]>(defaultValue || []);
  const inputRefs = useRef<HTMLInputElement[]>([]);
  useEffect(() => {
    api
      .get("/api/v1/habilidades", {
        withCredentials: true,
      })
      .then((response) => {
        setTools(response.data);
      })
      .catch((err: AxiosError) => {
        // Returns error message from backend
        return err?.response?.data.detail;
      });
  }, []);

  async function handleAddNewTool(tool: ToolType) {
    if (!tools.includes(tool)) {
      const res = await api
        .post("/api/v1/habilidade/pessoa", tool, {
          withCredentials: true,
        })
        .then((response) => {
          const habilidade: ToolType = response.data;
          setNewTool({ nome: "" });
        })
        .catch((err: AxiosError) => {
          return err?.response?.data.detail;
        });
      console.log(res);
    }


  }
  const { fieldName, registerField, error } = useField(name);
  useEffect(() => {

    registerField({
      name: fieldName,
      ref: inputRefs.current,
      getValue: (refs: HTMLInputElement[]) => {
        return refs.filter(ref => ref.checked).map(ref => ref.value);
      },
      clearValue: (refs: HTMLInputElement[]) => {
        refs.forEach(ref => {
          ref.checked = false;
        });

      },
      setValue: (refs: HTMLInputElement[], values: string[]) => {
        refs.forEach(ref => {
          if (values.includes(ref.id)) {
            ref.checked = true;
          }
        });
      },
    });
  }, [defaultValue, fieldName, registerField]);
  const handleInputCheckChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (selectedTools?.includes(value)) {
      setSelectedTools(selectedTools.filter(atual => atual !== value))
    }
    else {
      setSelectedTools([...selectedTools, value]);
    }
  }, [selectedTools])
  return (
    <BodySelectTool>
      <label>{label}</label>
      <div>
        <div className="area-selecionadas">
          <legend>Habilidades e Ferramentas selecionadas</legend>
          <ul>
            {selectedTools?.map(nome => (
              <li key={nome}>
                <legend>{nome}</legend>
                <label htmlFor={nome}>
                  <img
                    src={trash}
                    alt="apagar experiencia"
                  />
                </label>
              </li>
            ))}
          </ul>
        </div>
        <div className="area-selecao">
          <legend>Habilidades e Ferramentas</legend>
          <ul>
            {tools?.filter((tool) => {
              if (tool.nome && newTool?.nome) {
                const name = newTool.nome.toLowerCase();
                const tool_name = tool.nome.toLowerCase();
                return tool_name.includes(name) ? tool : null
              }
              return tool;
            }).map((tool, index) => (
              <li key={tool.nome}>
                <label htmlFor={tool.nome}>
                  <span>
                    {selectedTools?.includes(tool.nome) && <GoCheck />}
                  </span>
                  <legend>{tool.nome}</legend>
                  <strong>+</strong>
                </label>
                <input
                  type="checkbox"
                  id={tool.nome}
                  value={tool.nome}
                  defaultChecked={defaultValue ? selectedTools.indexOf(tool.nome) >= 0 : false}
                  ref={ref => {
                    inputRefs.current[index] = ref as HTMLInputElement;
                  }}
                  onChange={handleInputCheckChange}
                />
              </li>
            ))}
          </ul>
          <fieldset className="area-insercao">
            <legend>ou insira abaixo</legend>
            <input
              placeholder="Habilidade, ferramenta ou matéria..."
              name="newTool"
            />
            <button type="button" onClick={() => newTool && handleAddNewTool(newTool)}> + </button>
          </fieldset>

        </div>

      </div>
      <span>{error}</span>
    </BodySelectTool>
  )
}
export default SelectTool;