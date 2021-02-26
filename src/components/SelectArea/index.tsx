import React, {
  useState,
  useEffect,
  useRef,
  InputHTMLAttributes,
  useCallback,
  ChangeEvent,
} from 'react'
import { BodySelectArea } from './styles'
import { GoCheck, GoPlus } from 'react-icons/go'
import { IoMdArrowBack } from 'react-icons/io'
import { AxiosError } from 'axios'
import api from '../../services/api'
import trash from '../../assets/icon/lixeira.svg'
import { useField } from '@unform/core'
import { IconTrash } from '../../assets/icon'
/**
 *descricao: string;
 *id: number;
 *area_pai_id?: number;
 */
export interface AreaType {
  descricao: string
  id: number
  area_pai_id?: number
}
interface AreaTypes {
  area: AreaType
  subareas: AreaType[]
}

interface SelectAreaProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  name: string
  defaultValue?: string[]
}
/**
 * This component shows all areas of knowledge and allows the user to select their experiences
 *
 * @component
 * @param {string} name is the name on the form data
 * @param {string} label is the title that is displayed above the component
 * @param {Array<string>} defaultValue are the values ​​that arrive with the standard
 * @example
 * return (
 *   <SelectArea defaultValue={['uma area', 'outro']} name="areas" />
 * )
 */
const SelectArea: React.FC<SelectAreaProps> = ({
  label,
  name,
  defaultValue,
}) => {
  const nullArea = {
    area: {
      descricao: '',
      id: 0,
    },
    subareas: [],
  }
  const [listedArea, setListedArea] = useState<AreaTypes>(nullArea)
  const [areas, setAreas] = useState<AreaTypes[]>([])
  const [selectedAreas, setSelectedAreas] = useState<string[]>(
    defaultValue || [],
  )
  const inputRefs = useRef<HTMLInputElement[]>([])
  const { fieldName, registerField, error } = useField(name)
  useEffect(() => {
    api
      .get('/api/v1/areas', {
        withCredentials: true,
      })
      .then(result => {
        setAreas(result.data)
        console.log(result.data)
      })
      .catch((err: AxiosError) => {
        // Returns error message from backend
        return err?.response?.data.detail
      })
  }, [])
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRefs.current,
      getValue: (refs: HTMLInputElement[]) => {
        return refs.filter(ref => ref.checked).map(ref => ref.value)
      },
      clearValue: (refs: HTMLInputElement[]) => {
        refs.forEach(ref => {
          ref.checked = false
        })
      },
      setValue: (refs: HTMLInputElement[], values: string[]) => {
        refs.forEach(ref => {
          if (values.includes(ref.id)) {
            ref.checked = true
          }
        })
      },
    })
  }, [defaultValue, fieldName, registerField])
  const handleInputCheckChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target
      if (selectedAreas?.includes(value)) {
        setSelectedAreas(selectedAreas.filter(atual => atual !== value))
      } else {
        setSelectedAreas([...selectedAreas, value])
      }
    },
    [selectedAreas],
  )

  return (
    <BodySelectArea showSubarea={listedArea.area.id !== 0}>
      <label>{label}</label>
      <div>
        <div className="area-selecionadas">
          <legend>Áreas selecionadas</legend>
          <ul>
            {selectedAreas?.map((descricao: string) => (
              <li key={descricao}>
                <legend>{descricao}</legend>
                <label htmlFor={descricao}>
                  <IconTrash />
                </label>
              </li>
            ))}
          </ul>
        </div>
        <div className="area-selecao">
          <ul>
            {areas?.map(areas => (
              <li
                key={areas.area.id}
                onClick={() => {
                  setListedArea(areas)
                  console.log(listedArea)
                }}
              >
                {areas.area.descricao}
                {areas?.subareas.map(subarea => (
                  <input
                    key={subarea.id}
                    type="checkbox"
                    id={subarea.descricao}
                    value={subarea.descricao}
                    defaultChecked={
                      defaultValue
                        ? selectedAreas.includes(subarea.descricao)
                        : false
                    }
                    ref={ref => {
                      inputRefs.current[subarea.id] = ref as HTMLInputElement
                    }}
                    onChange={handleInputCheckChange}
                  />
                ))}
              </li>
            ))}
          </ul>
          <aside>
            <header>
              <IoMdArrowBack onClick={() => setListedArea(nullArea)} />
              <legend>{listedArea?.area?.descricao}</legend>
            </header>
            <ul>
              {listedArea?.subareas?.map(subarea => (
                <li key={subarea.id}>
                  <label htmlFor={subarea.descricao}>
                    <span>
                      {selectedAreas?.includes(subarea?.descricao) && (
                        <GoCheck size={20} />
                      )}
                    </span>
                    <legend>{subarea?.descricao}</legend>
                    <GoPlus size={15} />
                  </label>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>

      <span>{error}</span>
    </BodySelectArea>
  )
}
export default SelectArea
