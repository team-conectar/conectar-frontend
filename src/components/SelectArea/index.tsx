import React, {
  useState,
  useEffect,
  useRef,
  InputHTMLAttributes,
  useCallback,
  ChangeEvent,
} from 'react'
import { BodySelectArea } from './styles'
import { GoCheck } from 'react-icons/go'
import { AxiosError } from 'axios'
import api from '../../services/api'
import trash from '../../assets/icon/lixeira.svg'
import { useField } from '@unform/core'
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

const SelectArea: React.FC<SelectAreaProps> = ({
  label,
  name,
  defaultValue,
}) => {
  const [listedArea, setListedArea] = useState<string>('')
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
    <BodySelectArea showSubarea={!!listedArea}>
      <label>{label}</label>
      <div>
        <div className="area-selecionadas">
          <legend>Áreas selecionadas</legend>
          <ul>
            {selectedAreas?.map((descricao: string) => (
              <li key={descricao}>
                <legend>{descricao}</legend>
                <label htmlFor={descricao}>
                  <img src={trash} alt="apagar experiencia" />
                </label>
              </li>
            ))}
          </ul>
        </div>
        <div className="area-selecao">
          <ul>
            {areas.map(area => (
              <>
                <li
                  key={area.area.id}
                  onClick={() => setListedArea(area.area.descricao)}
                >
                  {area.area.descricao}
                </li>
                <ul>
                  {
                    <header>
                      <button type="button" onClick={() => setListedArea('')}>
                        Voltar
                      </button>
                      <legend>{listedArea}</legend>
                    </header>
                  }

                  {area?.subareas.map((subarea, index) => (
                    <li key={subarea.id}>
                      <label htmlFor={subarea.descricao}>
                        <span>
                          {selectedAreas?.includes(subarea?.descricao) && (
                            <GoCheck />
                          )}
                        </span>
                        <legend>{subarea?.descricao}</legend>
                        <strong>+</strong>
                      </label>
                      <input
                        type="checkbox"
                        id={subarea.descricao}
                        value={subarea.descricao}
                        defaultChecked={
                          defaultValue
                            ? selectedAreas.includes(subarea.descricao)
                            : false
                        }
                        ref={ref => {
                          inputRefs.current[index] = ref as HTMLInputElement
                        }}
                        onChange={handleInputCheckChange}
                      />
                    </li>
                  ))}
                </ul>
              </>
            ))}
          </ul>
        </div>
      </div>

      <span>{error}</span>
    </BodySelectArea>
  )
}
export default SelectArea
