import { OptionHTMLAttributes } from 'react'
import { AreaType } from '../components/UI/SelectArea'
import { ToolType } from '../components/UI/SelectTools'

export const createOptionAreas = (areas: Array<AreaType>) => {
  const newOptions: Array<OptionHTMLAttributes<HTMLOptionElement>> = []
  areas?.forEach(area => {
    area.area_pai_id &&
      newOptions.push({ value: area.descricao, label: area.descricao })
  })
  return newOptions
}
export const createOptionTools = (tools: Array<ToolType>) => {
  const newOptions: Array<OptionHTMLAttributes<HTMLOptionElement>> = []
  tools?.forEach(tool => {
    newOptions.push({ value: tool.nome, label: tool.nome })
  })
  return newOptions
}
