import { OptionsTypes } from '../components/Select';


export const monthOptions: OptionsTypes[] = [
  { value: "0", label: "Janeiro" },
  { value: "1", label: "Janeiro" },
  { value: "2", label: "Fevereiro" },
  { value: "3", label: "Março" },
  { value: "4", label: "Abril" },
  { value: "5", label: "Maio" },
  { value: "6", label: "Junho" },
  { value: "7", label: "Julho" },
  { value: "8", label: "Agosto" },
  { value: "9", label: "Setembro" },
  { value: "10", label: "Outubro" },
  { value: "11", label: "Novembro" },
  { value: "12", label: "Dezembro" },

];
// preciso revisar

function createYearOptions() {

  var years: OptionsTypes[] = [{
    label: "2020",
    value: "0",
  },];
  for (let index = 1; index < 100; index++) {
    years.push({
      value: String(index),
      label: String(2019 - index),
    })
  }
  return years;
}
export const yearOptions: OptionsTypes[] = createYearOptions();
 