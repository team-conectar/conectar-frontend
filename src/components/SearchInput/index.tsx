import React, {
  ChangeEvent,
  useCallback,
  useState,
  FormEvent,
  InputHTMLAttributes,
} from 'react'
import { Component, LiDrop } from './styles'
import lupa from '../../assets/icon/lupa.svg'
import Dropdown from '../Dropdown'
import { useHistory } from 'react-router'

type TypeAtribute = 'projeto' | 'pessoa' | 'area'

const SearchInput: React.FC<InputHTMLAttributes<HTMLInputElement>> = ({
  ...rest
}) => {
  const history = useHistory()
  const [searchFor, setSearchFor] = useState<TypeAtribute>('projeto')
  const [searchKey, setSearchKey] = useState<string>('')

  const options: Array<TypeAtribute> = ['projeto', 'pessoa', 'area']

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSearchKey(event.target.value)
  }, [])
  const handleSubmit = useCallback(
    (event: FormEvent) => {
      event.preventDefault()
      if (searchFor === 'projeto' || searchFor === 'pessoa') {
        history.push(`/pesquisar/${searchFor}/nome/${searchKey}`)
      } else if (searchFor === 'area') {
      }
    },
    [history, searchFor, searchKey],
  )
  return (
    <Component onSubmit={handleSubmit}>
      <button type="submit">
        <img src={lupa} alt="botao de pesquisa" />
      </button>

      <input placeholder="Buscar" onChange={handleChange} {...rest} />
      <Dropdown IconButton={searchFor}>
        {options.map(option => (
          <LiDrop
            isSelected={option === searchFor}
            key={option}
            onClick={() => {
              setSearchFor(option)
            }}
          >
            {option}
          </LiDrop>
        ))}
      </Dropdown>
    </Component>
  )
}

export default SearchInput
