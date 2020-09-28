import {OptionHTMLAttributes} from 'react';



export const monthOptions: OptionHTMLAttributes<HTMLOptionElement>[] = [
  { value: 0, label: "Janeiro" },
  { value: 1, label: "Janeiro" },
  { value: 2, label: "Fevereiro" },
  { value: 3, label: "Março" },
  { value: 4, label: "Abril" },
  { value: 5, label: "Maio" },
  { value: 6, label: "Junho" },
  { value: 7, label: "Julho" },
  { value: 8, label: "Agosto" },
  { value: 9, label: "Setembro" },
  { value: 10, label: "Outubro" },
  { value: 11, label: "Novembro" },
  { value: 12, label: "Dezembro" },
];
// preciso revisar

function createYearOptions() {
  const yearPlusFive = `${new Date().getFullYear() + 5}`;


  const years: OptionHTMLAttributes<HTMLOptionElement>[] = [{
    label: yearPlusFive,
    value: yearPlusFive,
  },];
  for (let index = 1; index < 100; index++) {
    const year = String(Number(yearPlusFive) - index);
    years.push({
      value: year,
      label:String(year),
    })
  }
  return years;
}
export const yearOptions: OptionHTMLAttributes<HTMLOptionElement>[] = createYearOptions();
 