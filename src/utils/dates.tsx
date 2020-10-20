import {OptionHTMLAttributes} from 'react';

export const monthOptions: OptionHTMLAttributes<HTMLOptionElement>[] = [
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
export function toMonth(month:string) {
  /**
   * Helper function to handle inputChanges when using hooks
   * @param {number} month
   * 
   */
  let stringMonth = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro"
  ];
  return stringMonth[parseInt(month)-1];
}
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
      label: year,
    })
  }
  return years;
}
export const finalYearOptions = (initialYear:number) => {
  const yearPlusFive = `${new Date().getFullYear() + 5}`;


  const years: OptionHTMLAttributes<HTMLOptionElement>[] = [{
    label: yearPlusFive,
    value: yearPlusFive,
  },];
  for (let index = Number(yearPlusFive) - 1 ; index > initialYear; index--) {
    const year = String(index);
    years.push({
      value: year,
      label: year,
    })
  }
  return years;
}
export const yearOptions: OptionHTMLAttributes<HTMLOptionElement>[] = createYearOptions();
 