import { OptionHTMLAttributes } from 'react';
import { AreaType } from '../components/SelectArea';
import { ToolType } from '../components/SelectTools';

export const createOptionAreas = (areas:Array<AreaType>)=>{
  let newOptions: Array<OptionHTMLAttributes<HTMLOptionElement>> = [];
  areas.forEach(area=>{
    area.area_pai_id && newOptions.push({ value: area.descricao, label: area.descricao })
  })
  return newOptions;
}
export const createOptionTools = (tools:Array<ToolType>)=>{
  let newOptions: Array<OptionHTMLAttributes<HTMLOptionElement>> = [];
  tools.forEach(tool=>{
    newOptions.push({ value: tool.nome, label: tool.nome })
  })
  return newOptions;
}