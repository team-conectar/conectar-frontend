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
import { useHistory, useLocation } from 'react-router'

type TypeAttribute = 'projeto' | 'pessoa' | 'área'
interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  defaultAttribute?: TypeAttribute
}
const SearchInput: React.FC<IProps> = ({ defaultAttribute, ...rest }) => {
  const history = useHistory()
  const location = useLocation()
  const [searchFor, setSearchFor] = useState<TypeAttribute>(
    defaultAttribute || 'projeto',
  )
  const [searchKey, setSearchKey] = useState<string>('')

  const options: Array<TypeAttribute> = ['projeto', 'pessoa', 'área']

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSearchKey(event.target.value)
  }, [])
  const handleSubmit = useCallback(
    (event: FormEvent) => {
      event.preventDefault()
      if (searchFor === 'projeto' || searchFor === 'pessoa') {
        history.push(`/pesquisar/${searchFor}/nome/${searchKey}`)
      } else if (searchFor === 'área') {
      }
    },
    [history, searchFor, searchKey],
  )
  return (
    <Component
      onSubmit={handleSubmit}
      isSearchPage={location.pathname.split('/')[1] === 'pesquisar'}
    >
      <button type="submit">
        <img src={lupa} alt="botao de pesquisa" />
      </button>

      <input placeholder="Buscar" onChange={handleChange} {...rest} />
      <Dropdown IconButton={searchFor}>
        {options.map(option => (
          <LiDrop
            type="button"
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
